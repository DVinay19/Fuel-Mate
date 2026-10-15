
from flask import Flask, jsonify, request, send_from_directory
import sqlite3
from pathlib import Path

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "fuel_mate.db"


def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    with get_db() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS trips (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                traveler_name TEXT NOT NULL,
                destination TEXT NOT NULL,
                destination_key TEXT NOT NULL,
                distance REAL NOT NULL,
                passengers INTEGER NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "fuel-mate.html")


@app.route("/fuel-mate.css")
def serve_css():
    return send_from_directory(BASE_DIR, "fuel-mate.css")


@app.route("/fuel-mate.js")
def serve_js():
    return send_from_directory(BASE_DIR, "fuel-mate.js")


@app.route("/api/trips", methods=["POST"])
def create_trip():
    data = request.get_json(silent=True) or {}

    name = str(data.get("traveler_name", "")).strip()
    destination = str(data.get("destination", "")).strip()

    try:
        distance = float(data.get("distance", 0))
        passengers = int(data.get("passengers", 0))
    except (ValueError, TypeError, OverflowError):
        return jsonify({"error": "Invalid distance or passenger count."}), 400

    if not name or not destination:
        return jsonify({"error": "Name and destination are required."}), 400

    if len(name) > 80 or len(destination) > 120:
        return jsonify({"error": "Name or destination is too long."}), 400

    if not (0 < distance <= 10000):
        return jsonify({"error": "Distance must be between 1 and 10000 km."}), 400

    if not (1 <= passengers <= 50):
        return jsonify({"error": "Passengers must be between 1 and 50."}), 400

    destination_key = " ".join(destination.casefold().split())

    with get_db() as db:
        cursor = db.execute("""
            INSERT INTO trips
                (traveler_name, destination, destination_key,
                 distance, passengers)
            VALUES (?, ?, ?, ?, ?)
        """, (name, destination, destination_key, distance, passengers))

        trip_id = cursor.lastrowid

        trip = db.execute(
            "SELECT * FROM trips WHERE id = ?", (trip_id,)
        ).fetchone()

    return jsonify({
        "message": "Trip saved successfully.",
        "trip": dict(trip)
    }), 201


@app.route("/api/trips", methods=["GET"])
def find_matches():
    destination = request.args.get("destination", "").strip()

    if not destination:
        return jsonify({"error": "Enter a destination to search."}), 400

    destination_key = " ".join(destination.casefold().split())

    try:
        exclude_id = int(request.args.get("exclude_id", "0"))
    except ValueError:
        return jsonify({"error": "Invalid trip ID."}), 400

    with get_db() as db:
        rows = db.execute("""
            SELECT id, traveler_name, destination,
                   distance, passengers, created_at
            FROM trips
            WHERE destination_key = ? AND id != ?
            ORDER BY id DESC
        """, (destination_key, exclude_id)).fetchall()

    return jsonify({
        "destination": destination,
        "count": len(rows),
        "matches": [dict(row) for row in rows]
    })


if __name__ == "__main__":
    initialize_database()
    print("Fuel-Mate server starting...")
    print("Open http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=False)
