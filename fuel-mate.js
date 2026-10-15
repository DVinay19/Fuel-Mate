
const rideForm = document.getElementById("rideForm");
const searchForm = document.getElementById("searchForm");
const postStatus = document.getElementById("postStatus");
const searchStatus = document.getElementById("searchStatus");
const matchesSection = document.getElementById("matches-section");
const matchesContainer = document.getElementById("matches");

let currentTripId = null;

function setStatus(element, message, isError = false) {
    element.textContent = message;
    element.classList.toggle("error", isError);
}

function normalizeDestination(value) {
    return value.trim().replace(/\s+/g, " ");
}

async function readJson(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "The request failed.");
    }

    return data;
}

// Post a trip to the Flask backend.
rideForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const travelerName =
        document.getElementById("travelerName").value.trim();

    const destination =
        normalizeDestination(document.getElementById("location").value);

    const distance =
        Number(document.getElementById("distance").value);

    const passengers =
        Number(document.getElementById("passengers").value);

    if (
        !travelerName ||
        !destination ||
        !Number.isFinite(distance) ||
        distance <= 0 ||
        !Number.isInteger(passengers) ||
        passengers < 1
    ) {
        setStatus(postStatus, "Please enter valid trip details.", true);
        return;
    }

    setStatus(postStatus, "Saving your trip...");

    try {
        const response = await fetch("/api/trips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                traveler_name: travelerName,
                destination,
                distance,
                passengers
            })
        });

        const data = await readJson(response);

        currentTripId = data.trip.id;

        // Automatically search for other trips to this destination.
        document.getElementById("searchDestination").value = destination;

        setStatus(postStatus, `Trip saved successfully. Trip ID: ${currentTripId}`);

        await searchTrips(destination);
    } catch (error) {
        setStatus(postStatus, error.message, true);
    }
});

// Search the database for trips to the same destination.
async function searchTrips(destination) {
    const cleanedDestination = normalizeDestination(destination);

    if (!cleanedDestination) {
        setStatus(searchStatus, "Enter a destination.", true);
        return;
    }

    setStatus(searchStatus, "Searching saved trips...");
    matchesContainer.replaceChildren();
    matchesSection.hidden = false;

    try {
        const params = new URLSearchParams({
            destination: cleanedDestination
        });

        // Exclude the current user's own posted trip when known.
        if (currentTripId !== null) {
            params.set("exclude_id", String(currentTripId));
        }

        const response = await fetch(`/api/trips?${params.toString()}`);
        const data = await readJson(response);

        if (data.matches.length === 0) {
            setStatus(searchStatus, "No matching trips found yet.");

            const message = document.createElement("p");
            message.textContent =
                "No other saved trip currently matches this destination.";
            matchesContainer.appendChild(message);
            return;
        }

        setStatus(
            searchStatus,
            `Found ${data.matches.length} matching saved trip(s).`
        );

        data.matches.forEach((trip) => {
            const card = document.createElement("article");
            card.className = "match-item";

            const heading = document.createElement("h3");
            heading.textContent = trip.destination;

            const details = [
                `Traveler: ${trip.traveler_name}`,
                `Distance: ${trip.distance} km`,
                `Travelers listed: ${trip.passengers}`,
                `Trip ID: ${trip.id}`
            ];

            card.appendChild(heading);

            details.forEach((detail) => {
                const paragraph = document.createElement("p");
                paragraph.textContent = detail;
                card.appendChild(paragraph);
            });

            matchesContainer.appendChild(card);
        });
    } catch (error) {
        setStatus(searchStatus, error.message, true);
    }
}

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    currentTripId = null;

    const destination =
        document.getElementById("searchDestination").value;

    await searchTrips(destination);
});

// Calculate estimated fuel costs independently of trip matching.
document.getElementById("estimateButton").addEventListener("click", () => {
    const distance = Number(document.getElementById("distance").value);
    const mileage = Number(document.getElementById("mileage").value);
    const fuelPrice = Number(document.getElementById("fuelPrice").value);
    const passengers = Number(document.getElementById("passengers").value);
    const result = document.getElementById("estimateResult");

    if (
        !Number.isFinite(distance) || distance <= 0 ||
        !Number.isFinite(mileage) || mileage <= 0 ||
        !Number.isFinite(fuelPrice) || fuelPrice <= 0 ||
        !Number.isInteger(passengers) || passengers < 1
    ) {
        result.textContent =
            "Enter a valid distance, mileage, fuel price, and traveler count.";
        return;
    }

    const litres = distance / mileage;
    const totalCost = litres * fuelPrice;
    const costPerPerson = totalCost / passengers;

    result.textContent =
        `Fuel needed: ${litres.toFixed(2)} litres | ` +
        `Total: ₹${totalCost.toFixed(2)} | ` +
        `Per person: ₹${costPerPerson.toFixed(2)}`;
});
