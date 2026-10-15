# Fuel-Mate 🚗

**Share the ride. Split the fuel. Save more.**

Fuel-Mate is a web-based ride-sharing prototype that helps travelers discover other saved trips heading to the same destination. It includes fuel-cost estimation, trip storage, and destination-based matching.

## Features

- **Trip Management:** Save traveler names, destinations, distances, and passenger counts.
- **Destination Matching:** Find previously saved trips going to the same destination.
- **Fuel Cost Estimator:** Estimate fuel consumption, total cost, and cost per person.
- **Persistent Storage:** Store trips using SQLite.
- **Responsive Interface:** HTML and CSS frontend with JavaScript interactions.
- **REST API:** Flask endpoints for creating and searching trips.

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- Database: SQLite

## Run Locally

1. Install Python 3.
2. Install Flask:

   ```bash
   python -m pip install flask
   ```

3. Start the application:

   ```bash
   python app.py
   ```

4. Open `http://127.0.0.1:5000` in your browser.

## Current Limitations

Matching is currently based on destination text. Authentication, travel-date matching, seat availability, and online deployment are planned improvements.

## Future Improvements

- User authentication and profiles
- Travel-date and route matching
- Seat availability management
- Deployment for access across devices
- Improved trip validation and testing

## Project Status

Working local prototype — actively developing.
