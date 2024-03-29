
        const matchDetailsElement = document.getElementById('matchDetails');

        async function fetchAndDisplayMatchData() {
            try {
                const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=f5d4ce25-7862-4e9c-964a-c173b575696b&offset=0");
                if (!response.ok) throw new Error('Network response was not ok');
        
                const { data } = await response.json();
                const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];

console.log(formattedDate);
           
              
                const matches = data.filter(element => element.series_id === "76ae85e2-88e5-4e99-83e4-5f352108aebc"&& element.date==formattedDate);
                console.log(matches);
                if (matches.length === 0) {
                    matchDetailsElement.textContent = "No match found.";
                    return;
                }
        
                matches.forEach(match => {
                    const { name, score, teams, venue, status, teamInfo } = match;
        
                    const scoreDetails = score.map((inning, index) => `
                        <p><strong>Inning ${index + 1}:</strong> ${inning.inning} - Runs: ${inning.r}, Wickets: ${inning.w}, Overs: ${inning.o}</p>
                    `).join('');
                    const img = teamInfo.map(elem => elem.img);
                    const images = img.map(src => `<img src="${src}" alt="Team Logo" />`)
                    const matchTemplate = `
                        <div class="match">
                            <h2>${name}</h2>
                            <div class="images">${images[1]}<span class="vs">VS</span>${images[0]}</div>
                            <div class="score-details">${scoreDetails}</div>
                            <p class="venue">Venue: ${venue}</p>
                            <p class="status">Status: ${status}</p>
                        </div>
                    `;
        
                    matchDetailsElement.insertAdjacentHTML('beforeend', matchTemplate);
                });
            } catch (error) {
                console.error('Error fetching or displaying match data:', error);
                matchDetailsElement.textContent = "Error fetching match data.";
            }
        }
        
        fetchAndDisplayMatchData();
    