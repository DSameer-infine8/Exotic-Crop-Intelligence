// ================================
// Exotic Crop Recommendation - recommendation.js
// ================================

// API endpoint
const API_URL = "/api/predict";

// -------------------------------
// DOM Elements (FIXED IDs)
// -------------------------------
const form = document.getElementById("recommendationForm");
const resultSection = document.getElementById("resultsSection");
const cropNameEl = document.getElementById("cropResult");
const cropImageEl = document.getElementById("cropImage");
const errorEl = document.getElementById("errorMsg");

// -------------------------------
// Form Submit Handler
// -------------------------------
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        clearUI();

        const payload = collectFormData();
        if (!payload) return;

        fetchPrediction(payload);
    });
}

// -------------------------------
// Collect Form Data
// -------------------------------
function collectFormData() {
    try {
        return {
            Nitrogen: getVal("Nitrogen"),
            Phosphorous: getVal("Phosphorous"),
            Potassium: getVal("Potassium"),
            Temperature: getVal("Temperature"),
            Humidity: getVal("Humidity"),
            Soil_pH: getVal("Soil_pH"),
            Rainfall: getVal("Rainfall"),
            Altitude_msl: getVal("Altitude_msl"),
            Organic_Carbon: getVal("Organic_Carbon"),
            Budget_per_Acre: getVal("Budget_per_Acre"),
            Sunlight_Hours: getVal("Sunlight_Hours"),
            Soil_Type: document.getElementById("Soil_Type").value
        };
    } catch (err) {
        showError("Please fill all fields correctly.");
        return null;
    }
}

// -------------------------------
// Helper: Get Numeric Value
// -------------------------------
function getVal(id) {
    const el = document.getElementById(id);
    if (!el || el.value === "") {
        throw new Error(`Missing value: ${id}`);
    }
    return parseFloat(el.value);
}

// -------------------------------
// Fetch Prediction from Flask
// -------------------------------
function fetchPrediction(payload) {
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showResult(data.predicted_crop);
            } else {
                showError(data.error || "Prediction failed.");
            }
        })
        .catch(err => {
            console.error(err);
            showError("Server error. Please try again.");
        });
}

// -------------------------------
// Show Result
// -------------------------------
function showResult(cropName) {
    cropNameEl.innerText = cropName;

    // Load crop image if exists
    if (cropImageEl) {
        cropImageEl.src = `/static/images/crops/${cropName}.jpg`;
        cropImageEl.alt = cropName;
    }

    resultSection.style.display = "block";

    // Optional hook
    drawProfitChart(cropName);
}

// -------------------------------
// Clear UI
// -------------------------------
function clearUI() {
    if (errorEl) errorEl.innerText = "";
    if (resultSection) resultSection.style.display = "none";
}

// -------------------------------
// Show Error
// -------------------------------
function showError(message) {
    if (errorEl) {
        errorEl.innerText = message;
    } else {
        alert(message);
    }
}

// -------------------------------
// Chart Hook (Optional)
// -------------------------------
function drawProfitChart(cropName) {
    /*
      Hook with Chart.js / Recharts / ApexCharts
      Example:
      - Fetch cost & profit data based on cropName
      - Render bar / line chart
    */
    console.log("Draw chart for:", cropName);
}
