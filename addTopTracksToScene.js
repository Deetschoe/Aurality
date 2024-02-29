// Function to preload music previews
async function preloadMusicPreviews(tracks) {
    for (const track of tracks) {
        const previewUrl = track.preview_url;
        if (previewUrl) {
            try {
                const audio = new Audio(previewUrl);
                // Load the audio file in the background
                await audio.load();
                // Once loaded, store the audio element in memory or cache
                // You can store it in an array or any other data structure for later use
                // For simplicity, let's store it as a property of the track object
                track.audio = audio;
            } catch (error) {
                console.error('Error preloading music preview:', error);
            }
        }
    }
}

// Function to play the music preview
function playPreview(track) {
    if (track.audio) {
        track.audio.play();
    } else {
        console.error('Music preview not preloaded for track:', track);
    }
}

// Fetch top tracks data and preload music previews
async function fetchTopTracksAndPreload() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        console.error('Access Token not found');
        return;
    }

    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        const topTracks = data.items;
        
        // Preload music previews in the background
        await preloadMusicPreviews(topTracks);

        // Once previews are preloaded, add them to the scene or perform any other actions
        addTopTracksToScene(topTracks);
    } catch (error) {
        console.error('Error fetching or preloading top tracks:', error);
    }
}

// Call fetchTopTracksAndPreload() to fetch top tracks data and preload music previews
fetchTopTracksAndPreload();
