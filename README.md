# 🌱 Exotic Crop Intelligence  
### AI-Powered Exotic Crop Recommendation System for High-Profit Farming

---

## 📌 Overview

**Exotic Crop Intelligence** is an AI-driven web application that recommends the **most suitable and profitable exotic crop** based on soil, climate, and budget parameters.

The system uses a **Random Forest Machine Learning model**, integrated with a **Flask backend** and an intuitive **web-based UI**.  
It helps farmers, researchers, and agri-tech developers make **data-driven crop decisions** to maximize yield and profit.

---

## 🎯 Key Features

- 🌾 Exotic crop recommendation using ML
- 🤖 Random Forest Classifier model
- 🌍 Soil, climate, and budget-based prediction
- 🧠 One-hot encoding for soil types
- 💻 Flask-based web application
- 📊 Clean and simple frontend UI
- 🚀 Fast prediction API
- 🔁 Re-trainable ML model using notebook

---

## 🎥 Demo Preview

### 1️. Application UI & Design Flow
_Shows homepage, form input, and navigation_

![UI Demo](static/ui.gif)

---

### 2️. Recommendation System (Model → Output)
_Shows input values, model execution, and predicted crop_

![Model Demo](static/recommend.gif)


---

## 🧠 Machine Learning Model

- **Algorithm:** Random Forest Classifier
- **Training Environment:** Jupyter Notebook
- **Target Variable:** Exotic Crop Name
- **Encoding:** Label Encoding + One-Hot Encoding
- **Serialized Files:**
  - `rf_model.pkl`
  - `label.pkl`
  - `model_columns.pkl`

---

## 📥 Input Parameters

| Feature | Description |
|------|-----------|
| Nitrogen | Soil nitrogen level |
| Phosphorous | Soil phosphorous level |
| Potassium | Soil potassium level |
| Temperature | Avg temperature (°C) |
| Humidity | Relative humidity (%) |
| Soil_pH | Soil pH value |
| Rainfall | Annual rainfall (mm) |
| Altitude_msl | Altitude above sea level |
| Organic_Carbon | Soil organic carbon |
| Budget_per_Acre | Investment budget |
| Sunlight_Hours | Avg sunlight per day |
| Soil_Type | Soil category |

---

## 🏗️ Project Structure
```
Exotic-Crop-Intelligence/
│
├── app.py # Flask backend
├── requirements.txt # Python dependencies
│
├── models/
│ ├── rf_model.pkl
│ ├── label.pkl
│ └── model_columns.pkl
│
├── data/ # Dataset files
│
├── notebook/
│ └── Exotic_Crop_Recommendation.ipynb
│
├── templates/
│ ├── index.html
│ ├── crops.html
│ └── recommend.html
│
├── static/
│ ├── css/
│ ├── js/
│ 
│
└── README.md
```


---

## ⚙️ Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS, JavaScript
- **Machine Learning:** scikit-learn, pandas, numpy
- **Model Storage:** Pickle
- **Development:** Jupyter Notebook

---

## 🖥️ How to Run the Project Locally

### ✅ Step 1: Download or Clone Repository

```bash
git clone https://github.com/your-username/Exotic-Crop-Intelligence.git
cd Exotic-Crop-Intelligence
```

### ✅ Step 2: Create a Virtual Environment (Recommended)

```bash
python -m venv venv
```

Activate the virtual environment:

Windows
```bash
venv\Scripts\activate
```

### ✅ Step 3: Install Required Dependencies

Make sure you are inside the project root directory, then run:
```bash
pip install -r requirements.txt
```

### ✅ Step 4: Run the Flask Application

Start the Flask server using:
```bash
python app.py
```

### ✅ Step 5: Open the Application in Browser

Open your web browser and visit:
```
http://127.0.0.1:5000/
```

You can now interact with the Exotic Crop Recommendation System through the web interface.🥳