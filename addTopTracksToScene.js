async function fetchTopArtists() {
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
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

async function fetchTopTracksForArtist(artistId) {
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        console.log("Top Tracks for Artist:", data);
        return data.tracks;
    } catch (error) {
        console.error('Error fetching top tracks for artist:', error);
        return [];
    }
}

async function fetchTopTracks() {
    await fetchTopArtists(); // Fetch top artists first
}

function addTopArtistsToScene(artists) {
    const sceneEl = document.querySelector('a-scene'); // Reference to your A-Frame scene

    // Iterate over each top artist
    artists.forEach(async (artist, index) => {
        const imageUrl = artist.images[0].url; // Artist image URL
        const artistName = artist.name; // Name of the artist

        // Create an entity for this artist
        const artistEl = document.createElement('a-entity');
        artistEl.setAttribute('geometry', { primitive: 'plane', height: 1, width: 1 });
        artistEl.setAttribute('material', { src: imageUrl });
        artistEl.setAttribute('position', { x: index * 2 - 4, y: 1, z: -3 }); // Adjust positioning as necessary
        artistEl.setAttribute('class', 'clickable'); // Make it clickable

        // Add text entity to display artist name
        const textEl = document.createElement('a-entity');
        textEl.setAttribute('text', {
            value: `${artistName}`,
            color: 'white',
            align: 'center',
            width: 3
        });
        textEl.setAttribute('position', { x: index * 2 - 4, y: 2, z: -3 }); // Adjust positioning as necessary

        // Add event listener for fetching top tracks of the artist
        artistEl.addEventListener('click', async () => {
            const topTracks = await fetchTopTracksForArtist(artist.id);
            addTopTracksToScene(topTracks);
        });

        sceneEl.appendChild(artistEl); // Add this artist entity to the scene
        sceneEl.appendChild(textEl); // Add text entity above the artist
    });
}

function addTopTracksToScene(tracks) {
    // Clear existing tracks in the scene
    const sceneEl = document.querySelector('a-scene');
    sceneEl.querySelectorAll('.track-entity').forEach(entity => entity.remove());

    // Limit to top 5 tracks
    tracks.slice(0, 5).forEach((track, index) => {
        const imageUrl = track.album.images[0].url; // Album cover image URL
        const previewUrl = track.preview_url; // URL to song preview
        const trackName = track.name; // Name of the song
        const artistName = track.artists[0].name; // Name of the artist

        // Create an entity for this track
        const trackEl = document.createElement('a-entity');
        trackEl.classList.add('track-entity'); // Add a class for easy removal later
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
