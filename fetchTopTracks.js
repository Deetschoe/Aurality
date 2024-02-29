async function fetchTopTracks() {
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
        console.log(data.items); // Log the top tracks to see the structure
        return data.items; // Return the top tracks for further processing
    } catch (error) {
        console.error('Error fetching top tracks:', error);
    }
}
