from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

LOG_FILE = 'test_log.log'

@app.route('/performance', methods=['POST'])
def log_data():
    try:
        data = request.get_json()
        fps = data.get('fps')
        timestamp = data.get('timestamp')

        if fps is None or timestamp is None:
            return "Error: Missing 'fps' or 'timestamp' in request data", 400

        with open(LOG_FILE, 'a') as f:
            f.write(f"{timestamp} - {fps}\n")

        return "Data logged successfully", 200

    except Exception as e:
        return f"Error logging data: {str(e)}", 500


@app.route('/keys', methods=['POST'])
def log_keys():
    try:
        data = request.get_json()
        keys = data.get('keys')
        timestamp = data.get('timestamp')

        if keys is None or timestamp is None:
            return "Error: Missing 'keys' or 'timestamp' in request data", 400

        with open(LOG_FILE, 'a') as f:
            f.write(f"{timestamp} - Keys pressed: {keys}\n")

        return "Data logged successfully", 200

    except Exception as e:
        return f"Error logging data: {str(e)}", 500


@app.route('/time', methods=['POST'])
def log_time():
    try:
        data = request.get_json()
        time = data.get('time')


        if time is None:
            return "Error: Missing 'time' ", 400

        with open(LOG_FILE, 'a') as f:
            f.write(f" Time to complete: {time}\n")

        return "Data logged successfully", 200

    except Exception as e:
        return f"Error logging data: {str(e)}", 50

if __name__ == '__main__':
    app.run(debug=True, port=3000)