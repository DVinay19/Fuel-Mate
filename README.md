# Fuel-Mate — Smart Ride Sharing & Fuel Cost Management

<p align="center">
  <strong>Share the Ride. Split the Fuel. Save More.</strong>
  <br/>
  A web-based ride-sharing platform that connects travelers heading to the same destination, simplifies trip discovery, and makes shared travel more affordable.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

---

##  Overview

**Fuel-Mate** is a web-based ride-sharing prototype designed to make everyday travel more economical by helping travelers discover other saved trips heading to the same destination.

The platform combines destination-based trip matching with fuel-cost estimation and persistent trip storage.

Instead of traveling independently and bearing the entire fuel expense, users can explore available saved trips, compare travel information, and estimate how much each passenger would contribute.

Fuel-Mate aims to make shared transportation simpler, more accessible, and cost-effective.

##  Key Features

| Feature | Description |
|---|---|
|  Trip Management | Create and save trips with traveler names, destinations, distances, and passenger counts |
|  Destination Matching | Discover previously saved trips heading to the same destination |
|  Fuel Cost Estimator | Estimate fuel consumption and total travel expenses |
|  Cost Per Passenger | Calculate estimated fuel expenses per passenger |
|  Persistent Storage | Store trip information using an SQLite database |
|  Web Interface | Interact with trip management and matching through a browser |
|  REST API | Flask-powered endpoints for creating and searching trips |
|  Responsive Design | Access the application through a responsive web interface |

##  Technology Stack

| Layer | Technology |
|---|---|
| Programming Language | Python |
| Backend Framework | Flask |
| Frontend | HTML5, CSS3, JavaScript |
| Database | SQLite |
| API Architecture | REST API |
| Development Environment | Visual Studio Code |
| Version Control | Git & GitHub |

##  How Fuel-Mate Works

```text
          User Opens Fuel-Mate
                  |
                  ▼
          Enter Trip Details
                  |
                  ▼
          Trip Information
          (Name, Destination,
           Distance, Passengers)
                  |
                  ▼
          Save Trip Details
                  |
                  ▼
           SQLite Database
                  |
          ┌───────┴────────┐
          ▼                ▼
     Find Matching     Fuel Cost
        Trips          Estimation
          |                |
          ▼                ▼
     Destination       Total Fuel
       Matching          Cost
          |                |
          ▼                ▼
     Matched Trips    Cost Per Person
          |                |
          └───────┬────────┘
                  ▼
           Display Results
```

##  Core Functionalities

### 1. Trip Management
Users can save trip information, including traveler names, destinations, distances, and passenger counts.

### 2. Destination-Based Matching
The application searches previously stored trips and identifies trips heading to the same destination.

### 3. Fuel Cost Estimation
Users can estimate the fuel expenses associated with a journey.

The calculation can be represented as:

**Fuel Consumption**

```text
Fuel Used = Distance / Mileage
```

**Total Fuel Cost**

```text
Total Cost = Fuel Used × Fuel Price
```

**Cost Per Passenger**

```text
Cost Per Person = Total Cost / Passenger Count
```

These calculations provide an estimated fuel contribution for each passenger.

##  Database

Fuel-Mate uses **SQLite** to maintain trip information even after the application is restarted.

The database stores information such as:

- Traveler name
- Destination
- Travel distance
- Passenger count
- Saved trip details

Persistent storage allows users to search previously created trips without entering the information again.

##  Application Workflow

1. Open the Fuel-Mate web application.
2. Enter the required trip information.
3. Save the trip to the database.
4. Search for travelers heading to the same destination.
5. Review matching trip information.
6. Estimate fuel expenses and cost per passenger.

##  Getting Started

### Prerequisites

Make sure the following are installed:

- Python 3
- Git
- Visual Studio Code (recommended)
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Fuel-Mate.git
```

### 2. Navigate to the Project Directory

```bash
cd Fuel-Mate
```

### 3. Install Dependencies

```bash
python -m pip install flask
```

### 4. Start the Application

```bash
python app.py
```

### 5. Open Fuel-Mate

Visit the following address in your browser:

```text
http://127.0.0.1:5000
```

Keep the application running in the terminal while using the website.

##  API Capabilities

Fuel-Mate uses Flask REST endpoints to support its trip management operations.

| Operation | Description |
|---|---|
| Create Trip | Accept and save new trip information |
| Search Trips | Find saved trips by destination |
| Retrieve Trips | Access stored trip information |

##  Project Structure

```text
Fuel-Mate/
│
├── app.py
├── README.md
├── requirements.txt
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
└── database/
    └── trips.db
```

*The structure above represents a suggested organization. Adjust it to match the actual repository files.*

##  Current Limitations

Fuel-Mate is currently a working local prototype.

- Destination matching currently relies on text comparison.
- User authentication and account management are not implemented.
- Travel-date-based matching is not available.
- Route similarity and geographical matching are not implemented.
- Seat availability management is not available.
- The application is not yet deployed for public access.

##  Project Objectives

- Encourage affordable shared transportation.
- Simplify the process of discovering matching trips.
- Reduce individual fuel expenses through cost sharing.
- Demonstrate practical full-stack web development.
- Implement persistent data storage and REST API functionality.

##  Future Enhancements

Potential improvements include:

- [ ] User registration and authentication
- [ ] Travel-date-based trip matching
- [ ] Location and route-based matching
- [ ] Interactive maps and route visualization
- [ ] Real-time seat availability management
- [ ] Trip booking and confirmation
- [ ] User profiles and trip history
- [ ] Cloud deployment
- [ ] Automated testing and improved input validation

##  Project Status

**Working Local Prototype — Actively Developing**

Fuel-Mate is an ongoing project focused on improving shared travel through destination matching, fuel-cost estimation, and persistent trip management.

## 📄 License

No open-source license has been specified yet. A license can be added if the project is intended for open-source distribution.

---

<p align="center">
  <strong>Fuel-Mate — Making Every Journey More Affordable.</strong>
  <br/>
  Built with Python, Flask, HTML, CSS, JavaScript and SQLite.
</p>

<p align="center">
  <a href="https://github.com/YOUR-USERNAME/Fuel-Mate">GitHub Repository</a>
</p>
