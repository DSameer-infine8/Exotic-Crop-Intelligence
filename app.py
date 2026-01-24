from flask import Flask, request, jsonify, render_template
import pandas as pd
import pickle
import os

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
# Pages
# -----------------------------
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/crops")
def crops_page():
    return render_template("crops.html")

@app.route("/recommend")
def recommend_page():
    return render_template("recommend.html")

# -----------------------------
# Prediction API
# -----------------------------
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # 1️⃣ Build input dataframe
        input_df = pd.DataFrame([{
            "Nitrogen": float(data["Nitrogen"]),
            "Phosphorous": float(data["Phosphorous"]),
            "Potassium": float(data["Potassium"]),
            "Temperature": float(data["Temperature"]),
            "Humidity": float(data["Humidity"]),
            "Soil_pH": float(data["Soil_pH"]),
            "Rainfall": float(data["Rainfall"]),
            "Altitude_msl": float(data["Altitude_msl"]),
            "Organic_Carbon": float(data["Organic_Carbon"]),
            "Budget_per_Acre": float(data["Budget_per_Acre"]),
            "Sunlight_Hours": float(data["Sunlight_Hours"]),
            "Soil_Type": data["Soil_Type"]
        }])

        # 2️⃣ One-hot encode Soil_Type
        input_df = pd.get_dummies(input_df, columns=["Soil_Type"])

        # 3️⃣ Align with training columns
        input_df = input_df.reindex(columns=model_columns, fill_value=0)

        # 4️⃣ Predict
        encoded_pred = rf_best_model.predict(input_df)[0]
        crop_name = le.inverse_transform([encoded_pred])[0]

        # 5️⃣ Return JSON
        return jsonify({
            "success": True,
            "predicted_crop": crop_name,
            "class_id": int(encoded_pred)
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

# -----------------------------
# Run App on Local
# -----------------------------
'''
if __name__ == "__main__":
    app.run(debug=True)
   
''' 


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 10000))
    )
