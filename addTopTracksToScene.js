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
        const imageUrl = track.album.images[0].url; // Album cover image URL
        const previewUrl = track.preview_url; // URL to song preview
        const trackName = track.name; // Name of the song
        const artistName = track.artists[0].name; // Name of the artist

        // Create an entity for this track
        const trackEl = document.createElement('a-entity');
        trackEl.setAttribute('data-preview-url', previewUrl);
        trackEl.setAttribute('geometry', { primitive: 'plane', height: 1, width: 1 });
        trackEl.setAttribute('material', { src: imageUrl });
        trackEl.setAttribute('position', { x: index * 2 - 4, y: 1, z: -3 }); // Adjust positioning as necessary
        trackEl.setAttribute('class', 'clickable'); // Make it clickable

        // Create text entity to display song name and artist
        const textEl = document.createElement('a-entity');
        textEl.setAttribute('text', {
            value: `${trackName} - ${artistName}`,
            color: 'white',
            align: 'center',
            width: 3
        });
        textEl.setAttribute('position', { x: index * 2 - 4, y: 2, z: -3 }); // Adjust positioning as necessary

        // Add event listener for playing the preview
        trackEl.addEventListener('click', () => {
            playPreview(previewUrl);
        });

        sceneEl.appendChild(trackEl); // Add this track entity to the scene
        sceneEl.appendChild(textEl); // Add text entity above the track
    });
}

function playPreview(previewUrl) {
    const audioEl = new Audio(previewUrl);
    audioEl.play()
        .then(() => console.log("Audio playback started"))
        .catch(error => console.error("Audio playback failed", error));
}

// Call fetchTopTracks() to fetch top tracks data
fetchTopTracks();