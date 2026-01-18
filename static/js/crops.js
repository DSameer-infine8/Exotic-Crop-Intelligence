// Crops Page Functionality
document.addEventListener('DOMContentLoaded', function () {
    loadCrops();
});

// Load all crops into the grid
function loadCrops() {
    const cropsGrid = document.getElementById('cropsGrid');

    Object.keys(cropsData).forEach((cropKey, index) => {
        const crop = cropsData[cropKey];
        const cropCard = createCropCard(crop, cropKey);

        // Add stagger animation
        setTimeout(() => {
            cropCard.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);

        cropsGrid.appendChild(cropCard);
    });
}

// Create crop card element
function createCropCard(crop, cropKey) {
    const card = document.createElement('div');
    card.className = 'crop-card';
    card.onclick = () => openModal(cropKey);

    card.innerHTML = `
        <div class="crop-image">
            ${crop.image}
        </div>
        <div class="crop-content">
            <h3 class="crop-name">${crop.name}</h3>
            <p class="crop-scientific">${crop.scientificName}</p>
            
            <div class="crop-info-grid">
                <div class="crop-info-item">
                    <span class="info-label">Climate</span>
                    <span class="info-value">${crop.climate.split(' ')[0]}</span>
                </div>
                <div class="crop-info-item">
                    <span class="info-label">Water Need</span>
                    <span class="info-value">${crop.waterRequirement.split(' ')[0]}</span>
                </div>
                <div class="crop-info-item">
                    <span class="info-label">Duration</span>
                    <span class="info-value">${crop.cultivationDuration.split(' ')[0]}</span>
                </div>
                <div class="crop-info-item">
                    <span class="info-label">Market</span>
                    <span class="info-value">${crop.marketDemand.split(' ')[0]}</span>
                </div>
            </div>
            
            <div class="crop-profit">
                <div class="profit-label">Expected Annual Profit</div>
                <div class="profit-value">${crop.expectedProfitPerYear}</div>
            </div>
        </div>
    `;

    return card;
}

// Open modal with crop details
function openModal(cropKey) {
    const crop = cropsData[cropKey];
    const modal = document.getElementById('cropModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-crop-icon">${crop.image}</div>
            <h2 class="modal-crop-name">${crop.name}</h2>
            <p class="modal-crop-scientific">${crop.scientificName}</p>
        </div>
        
        <div class="modal-body">
            <!-- Description -->
            <div class="modal-section">
                <h3 class="modal-section-title">About ${crop.name}</h3>
                <p style="line-height: 1.8; color: var(--dark-gray);">${crop.description}</p>
            </div>
            
            <!-- Climate & Soil Requirements -->
            <div class="modal-section">
                <h3 class="modal-section-title">Climate & Soil Requirements</h3>
                <div class="modal-grid">
                    <div class="modal-info-card">
                        <div class="modal-info-label">Climate Type</div>
                        <div class="modal-info-value">${crop.climate}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Temperature Range</div>
                        <div class="modal-info-value">${crop.temperature.min}°C - ${crop.temperature.max}°C</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Optimal Temperature</div>
                        <div class="modal-info-value">${crop.temperature.optimal}°C</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Soil Type</div>
                        <div class="modal-info-value">${crop.soilType}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Soil pH Range</div>
                        <div class="modal-info-value">${crop.soilPH.min} - ${crop.soilPH.max}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Water Requirement</div>
                        <div class="modal-info-value">${crop.waterRequirement}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Rainfall Range</div>
                        <div class="modal-info-value">${crop.rainfall.min}-${crop.rainfall.max} mm</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Sunlight Hours</div>
                        <div class="modal-info-value">${crop.sunlightHours.optimal} hrs/day</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Altitude Range</div>
                        <div class="modal-info-value">${crop.altitude.min}-${crop.altitude.max} m</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Humidity Range</div>
                        <div class="modal-info-value">${crop.humidity.min}-${crop.humidity.max}%</div>
                    </div>
                </div>
            </div>
            
            <!-- Soil Nutrients -->
            <div class="modal-section">
                <h3 class="modal-section-title">Soil Nutrient Requirements</h3>
                <div class="modal-grid">
                    <div class="modal-info-card">
                        <div class="modal-info-label">Nitrogen (N)</div>
                        <div class="modal-info-value">${crop.nitrogen.min}-${crop.nitrogen.max} kg/ha</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Phosphorus (P)</div>
                        <div class="modal-info-value">${crop.phosphorus.min}-${crop.phosphorus.max} kg/ha</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Potassium (K)</div>
                        <div class="modal-info-value">${crop.potassium.min}-${crop.potassium.max} kg/ha</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Organic Carbon</div>
                        <div class="modal-info-value">${crop.organicCarbon.min}-${crop.organicCarbon.max}%</div>
                    </div>
                </div>
            </div>
            
            <!-- Financial Information -->
            <div class="modal-section">
                <h3 class="modal-section-title">Financial Analysis</h3>
                <div class="modal-grid">
                    <div class="modal-info-card">
                        <div class="modal-info-label">Initial Cost per Acre</div>
                        <div class="modal-info-value">${crop.initialCostPerAcre}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Annual Maintenance</div>
                        <div class="modal-info-value">${crop.maintenanceCostPerYear}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Expected Profit/Year</div>
                        <div class="modal-info-value">${crop.expectedProfitPerYear}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Cultivation Duration</div>
                        <div class="modal-info-value">${crop.cultivationDuration}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Harvest Cycle</div>
                        <div class="modal-info-value">${crop.harvestCycle}</div>
                    </div>
                </div>
            </div>
            
            <!-- Market Information -->
            <div class="modal-section">
                <h3 class="modal-section-title">Market Information</h3>
                <div class="modal-grid">
                    <div class="modal-info-card">
                        <div class="modal-info-label">Market Demand</div>
                        <div class="modal-info-value">${crop.marketDemand}</div>
                    </div>
                    <div class="modal-info-card">
                        <div class="modal-info-label">Export Potential</div>
                        <div class="modal-info-value">${crop.exportPotential}</div>
                    </div>
                </div>
            </div>
            
            <!-- Key Benefits -->
            <div class="modal-section">
                <h3 class="modal-section-title">Key Benefits</h3>
                <ul class="benefits-list">
                    ${crop.keyBenefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            
            <!-- Challenges -->
            <div class="modal-section">
                <h3 class="modal-section-title">Cultivation Challenges</h3>
                <ul class="challenges-list">
                    ${crop.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                </ul>
            </div>
            
            <!-- Suitable States -->
            <div class="modal-section">
                <h3 class="modal-section-title">Suitable Indian States</h3>
                <div class="states-grid">
                    ${crop.suitableStates.map(state => `<span class="state-badge">${state}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('cropModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
