// =====================================
// Recommendation Page JS (UI + Flask)
// =====================================

// DOM Elements
const form = document.getElementById("recommendationForm");
const progressFill = document.getElementById("progressFill");

const resultsSection = document.getElementById("resultsSection");
const recommendationCard = document.getElementById("recommendationCard");

const errorMsg = document.getElementById("errorMsg");
const profitChartCanvas = document.getElementById("profitChart");

// Progress calculation
const totalInputs = form.querySelectorAll("input, select").length;

// -----------------------------
// Progress Bar Logic
// -----------------------------
form.addEventListener("input", () => {
    const filled = [...form.querySelectorAll("input, select")]
        .filter(el => el.value !== "").length;

    const progress = Math.round((filled / totalInputs) * 100);
    progressFill.style.width = `${progress}%`;
});

// -----------------------------
// Form Submit
// -----------------------------
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearUI();

    const payload = collectFormData();
    if (!payload) return;

    try {
        const res = await fetch("/api/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (data.status === "success") {
            showRecommendation(data.predicted_crop);
        } else {
            showError(data.message || "Prediction failed.");
        }

    } catch (err) {
        showError("Server error. Please try again.");
    }
});

// -----------------------------
// Collect Form Data
// -----------------------------
function collectFormData() {
    try {
        return {
            Nitrogen: +get("nitrogen"),
            Phosphorous: +get("phosphorus"),
            Potassium: +get("potassium"),
            Soil_pH: +get("soilPH"),
            Organic_Carbon: +get("organicCarbon"),
            Soil_Type: get("soilType"),
            Temperature: +get("temperature"),
            Humidity: +get("humidity"),
            Rainfall: +get("rainfall"),
            Sunlight_Hours: +get("sunlightHours"),
            Altitude_msl: +get("altitude"),
            Budget_per_Acre: +get("budget")
        };
    } catch {
        showError("Please fill all required fields correctly.");
        return null;
    }
}

function get(id) {
    const el = document.getElementById(id);
    if (!el || el.value === "") throw new Error();
    return el.value;
}

// -----------------------------
// UI Rendering
// -----------------------------
function showRecommendation(cropName) {
    resultsSection.style.display = "block";

    recommendationCard.innerHTML = `
        <h2 class="recommendation-title">${cropName}</h2>
        <p class="recommendation-text">
            Based on your soil, climate, and budget inputs,
            <strong>${cropName}</strong> is the most suitable exotic crop.
        </p>
        <img 
            src="/static/images/crops/${cropName.replace(/\s+/g, '')}.jpg"
            alt="${cropName}"
            class="recommendation-image"
        />
    `;

    initChart();
}


// -----------------------------
// Error Handling
// -----------------------------
function showError(message) {
    resultsSection.style.display = "block";
    recommendationCard.innerHTML = "";
    errorMsg.innerText = message;
}

function clearUI() {
    errorMsg.innerText = "";
    recommendationCard.innerHTML = "";
    resultsSection.style.display = "none";
}
