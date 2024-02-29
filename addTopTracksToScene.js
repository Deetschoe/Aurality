async function fetchTopArtists() {
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        console.log("Top Artists:", data);
        // Call function to add top artists to A-Frame scene
        addTopArtistsToScene(data.items);
    } catch (error) {
        console.error('Error fetching top artists:', error);
    }
}

function addTopArtistsToScene(artists) {
    const sceneEl = document.querySelector('a-scene'); // Reference to your A-Frame scene

    // Limit to top 5 artists
    artists.slice(0, 5).forEach((artist, index) => {
        const imageUrl = artist.images[0].url; // Artist image URL

        // Create an entity for this artist
        const artistEl = document.createElement('a-entity');
        artistEl.setAttribute('geometry', { primitive: 'plane', height: 1, width: 1 });
        artistEl.setAttribute('material', { src: imageUrl });
        artistEl.setAttribute('position', { x: index * 2 - 4, y: 1, z: -3 }); // Adjust positioning as necessary
        artistEl.setAttribute('class', 'clickable'); // Make it clickable

        // Add an event listener for the click (tap) event
        artistEl.addEventListener('click', () => {
            // Implement functionality to interact with the artist
        });

        sceneEl.appendChild(artistEl); // Add this artist entity to the scene
    });
}

// Call fetchTopArtists() to fetch top artists data
fetchTopArtists();
