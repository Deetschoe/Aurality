async function fetchTopArtists() {
    const accessToken = '1POdFZRZbvb...qqillRxMr2z'; // Replace with your access token
    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        console.log("Top Artists:", data);
        // Process the retrieved top artists data here
    } catch (error) {
        console.error('Error fetching top tracks:', error);
    }
}

// Call fetchTopTracks() and handle the response
fetchTopTracks().then(tracks => {
    if (tracks) {
        addTopTracksToScene(tracks);
    }
});

function addTopTracksToScene(tracks) {
    const sceneEl = document.querySelector('a-scene'); // Reference to your A-Frame scene

    // Limit to top 5 tracks
    tracks.slice(0, 5).forEach((track, index) => {
        const imageUrl = track.album.images[0].url; // Album cover image URL
        const previewUrl = track.preview_url; // URL to song preview

        // Create an entity for this track
        const trackEl = document.createElement('a-entity');
        trackEl.setAttribute('geometry', { primitive: 'plane', height: 1, width: 1 });
        trackEl.setAttribute('material', { src: imageUrl });
        trackEl.setAttribute('position', { x: index * 2 - 4, y: 1, z: -3 }); // Adjust positioning as necessary
        trackEl.setAttribute('class', 'clickable'); // Make it clickable

        // Add an event listener for the click (tap) event
        trackEl.addEventListener('click', () => {
            playPreview(previewUrl);
        });

        sceneEl.appendChild(trackEl); // Add this track entity to the scene
    });
}

function playPreview(previewUrl) {
    // Implementation of playPreview function
}
