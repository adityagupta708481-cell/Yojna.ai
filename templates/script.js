// --- script.js ---

// 1. Handle form submission on index.html
const form = document.getElementById('schemeForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            dob: document.getElementById('dob').value,
            familyIncome: document.getElementById('familyIncome').value,
            occupation: document.getElementById('occupation').value,
            gender: document.getElementById('gender').value
        };

        // Save data to localStorage to pass it to the result page
        localStorage.setItem('userProfile', JSON.stringify(formData));
        
        // Redirect to result page
        window.location.href = 'result.html';
    });
}

// 2. Handle results loading on result.html
if (window.location.pathname.includes('result.html')) {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingSection = document.getElementById('loadingSection');
    const resultSection = document.getElementById('resultSection');

    async function fetchSchemes() {
        try {
            const response = await fetch('http://127.0.0.1:5500/api/check-eligibility', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json','Cache-Control': 'no-cache' },
                body: JSON.stringify(profile)
            });
            
            const data = await response.json();
            
            // UI Switch: Hide loading, show results
            loadingSection.style.display = 'none';
            resultSection.style.display = 'block';

            if (data.schemes && data.schemes.length > 0) {
                resultsContainer.innerHTML = `<div class="schemes-list">` + 
                    data.schemes.map(s => `
                        <div class="scheme-item">
                            <div class="scheme-header">
                                <h3 class="scheme-title">${s.title}</h3>
                                <span class="scheme-status status-high-match">${s.status}</span>
                            </div>
                            <p class="scheme-description">${s.description}</p>
                        </div>
                    `).join('') + `</div>`;
            } else {
                resultsContainer.innerHTML = `<p>No matching schemes found. Please try different criteria.</p>`;
            }
        } catch (err) {
            console.error("Error:", err);
            resultsContainer.innerHTML = `<p>Error loading results. Ensure the Python backend is running.</p>`;
        }
    }

    // Run the fetch if profile data exists
    if (profile) {
        fetchSchemes();
    } else {
        resultsContainer.innerHTML = `<p>No profile data found. Please go back to the home page.</p>`;
    }
}
