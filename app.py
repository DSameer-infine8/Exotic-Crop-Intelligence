from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
import pickle

# -----------------------------
# App Initialization
# -----------------------------
app = Flask(__name__)

# -----------------------------
# Load Pickled Objects
# -----------------------------
rf_best_model = pickle.load(open("models/rf_model.pkl", "rb"))
le = pickle.load(open("models/label.pkl", "rb"))
model_columns = pickle.load(open("models/model_columns.pkl", "rb"))

# -----------------------------
# Home Route
# -----------------------------
@app.route("/")
def home():
    return render_template("index.html")


# -----------------------------
# Crops Detail Page
# -----------------------------
@app.route("/crops")
def crops_page():
    return render_template("crops.html")



# -----------------------------
# Recommendation Page
# -----------------------------
@app.route("/recommend")
def recommend_page():
    return render_template("recommend.html")


# -----------------------------
# Prediction API (JSON)
# -----------------------------
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Create input dataframe
        input_data = pd.DataFrame([{
            'Nitrogen': float(data['Nitrogen']),
            'Phosphorous': float(data['Phosphorous']),
            'Potassium': float(data['Potassium']),
            'Temperature': float(data['Temperature']),
            'Humidity': float(data['Humidity']),
            'Soil_pH': float(data['Soil_pH']),
            'Rainfall': float(data['Rainfall']),
            'Altitude_msl': float(data['Altitude_msl']),
            'Soil_Type': data['Soil_Type'],
            'Organic_Carbon': float(data['Organic_Carbon']),
            'Budget_per_Acre': float(data['Budget_per_Acre']),
            'Sunlight_Hours': float(data['Sunlight_Hours'])
        }])

        # One-hot encode Soil_Type
        input_data = pd.get_dummies(input_data, columns=['Soil_Type'])

        # Align with training columns
        input_data = input_data.reindex(
            columns=model_columns,
            fill_value=0
        )

        # Predict
        pred_encoded = rf_best_model.predict(input_data)[0]
        predicted_crop = le.inverse_transform([pred_encoded])[0]

        return jsonify({
            "status": "success",
            "predicted_crop": predicted_crop,
            "class_id": int(pred_encoded)
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400


# -----------------------------
# Run App
# -----------------------------
if __name__ == "__main__":
    app.run(debug=False)
