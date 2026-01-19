// ================================
// Exotic Crop Recommendation - recommendation.js
// ================================

const API_URL = "/api/predict";

// -------------------------------
// DOM Elements
// -------------------------------
const form = document.getElementById("recommendationForm");
const resultSection = document.getElementById("resultsSection");
const errorEl = document.getElementById("errorMsg");

// -------------------------------
// Form Submit
// -------------------------------
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();   // ✅ FIXED
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
    } catch {
        showError("Please fill all fields correctly.");
        return null;
    }
}

// -------------------------------
// Helper
// -------------------------------
function getVal(id) {
    const el = document.getElementById(id);
    if (!el || el.value === "") throw new Error();
    return parseFloat(el.value);
}

// -------------------------------
// Fetch Prediction
// -------------------------------
function fetchPrediction(payload) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success && data.predicted_crop) {
                displayRecommendation(data.predicted_crop); // ✅ FIXED
            } else {
                showError(data.error || "Prediction failed.");
            }
        })
        .catch(() => showError("Server error. Please try again."));
}

// -------------------------------
// Display Recommendation (MAIN UI)
// -------------------------------
function displayRecommendation(cropKey) {
    const crop = cropsData[cropKey];

    if (!crop) {
        displayNoMatchWarning();
        return;
    }

    const recommendationCard = document.getElementById("recommendationCard");
    recommendationCard.innerHTML = `
        <div class="recommendation-header">
            <img class="recommendation-img" src='/static/images/${crop.name}.jpg' height="300" width="350">
            <div class="recommendation-icon">${crop.image || "🌱"}</div>
            <h2 class="recommendation-title">${crop.name}</h2>
            <p class="recommendation-subtitle">${crop.scientificName}</p>
        </div>

        <div class="recommendation-body">
            <div class="recommendation-details">
                <div class="detail-card">
                    <div class="detail-label">Initial Investment</div>
                    <div class="detail-value">${crop.initialCostPerAcre}</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Annual Maintenance</div>
                    <div class="detail-value">${crop.maintenanceCostPerYear}</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Expected Profit</div>
                    <div class="detail-value">${crop.expectedProfitPerYear}</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Cultivation Period</div>
                    <div class="detail-value">${crop.cultivationDuration}</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Market Demand</div>
                    <div class="detail-value">${crop.marketDemand.split(' - ')[0]}</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Export Potential</div>
                    <div class="detail-value">${crop.exportPotential}</div>
                </div>
            </div>
        </div>
    `;


    // ✅ THIS WAS MISSING
    resultSection.style.display = "block";
}

// -------------------------------
// No Match UI
// -------------------------------
function displayNoMatchWarning() {
    const recommendationCard = document.getElementById("recommendationCard");

    recommendationCard.innerHTML = `
        <div class="recommendation-header warning">
            <div class="recommendation-icon">⚠️</div>
            <h2>No Strong Match Found</h2>
            <p>Try adjusting soil or climate parameters.</p>
        </div>
    `;

    resultSection.style.display = "block";
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
