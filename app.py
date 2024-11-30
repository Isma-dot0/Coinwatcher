from flask import Flask, jsonify, request

app = Flask(__name__)

# Simulated portfolio data
portfolio = []

@app.route('/')
def home():
    return "Welcome to the Crypto Tracker Backend API!"

# Route to get all portfolio items
@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    total_value = sum(item['value'] for item in portfolio)
    return jsonify({"portfolio": portfolio, "total_value": total_value})

# Route to add a cryptocurrency to the portfolio
@app.route('/portfolio', methods=['POST'])
def add_to_portfolio():
    data = request.json
    name = data.get('name')
    holdings = data.get('holdings')
    value = data.get('value')

    if not name or not holdings or not value:
        return jsonify({"error": "Missing required fields"}), 400

    portfolio.append({
        "name": name,
        "holdings": holdings,
        "value": value
    })

    return jsonify({"message": f"{name} added to portfolio"}), 201

# Route to get market data (placeholder for now)
@app.route('/market', methods=['GET'])
def get_market_data():
    return jsonify({"message": "Market data endpoint placeholder"})

if __name__ == "__main__":
    app.run(debug=True)

