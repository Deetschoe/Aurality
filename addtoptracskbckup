async function fetchTopTracks() {
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        console.log("Top Tracks:", data);
        // Call function to add top tracks to A-Frame scene
        addTopTracksToScene(data.items);
    } catch (error) {
        console.error('Error fetching top tracks:', error);
    }
}

function addTopTracksToScene(tracks) {
    const sceneEl = document.querySelector('a-scene'); // Reference to your A-Frame scene

    // Limit to top 5 tracks
    tracks.slice(0, 5).forEach((track, index) => {
        const imageUrl = track.album.images[0].url; // Track album image URL
        const trackName = track.name; // Track name

        // Create an entity for this track
        const trackEl = document.createElement('a-entity');
        trackEl.setAttribute('geometry', { primitive: 'plane', height: 1, width: 1 });
        trackEl.setAttribute('material', { src: imageUrl });
        trackEl.setAttribute('position', { x: index * 2 - 4, y: 1, z: -3 }); // Adjust positioning as necessary
        trackEl.setAttribute('class', 'clickable'); // Make it clickable

        // Add text above the track entity indicating "Most listened to song"
        const textEl = document.createElement('a-text');
        textEl.setAttribute('value', 'Most listened to song');
        textEl.setAttribute('align', 'center');
        textEl.setAttribute('position', { x: index * 2 - 4, y: 2, z: -3 }); // Adjust positioning as necessary

        sceneEl.appendChild(trackEl); // Add this track entity to the scene
        sceneEl.appendChild(textEl); // Add the text entity to the scene
    });
}

// Call fetchTopTracks() to fetch top tracks data
fetchTopTracks();
