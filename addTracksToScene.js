function addTracksToScene(tracks) {
    const sceneEl = document.querySelector('a-scene'); // Get the scene

    tracks.forEach((track, index) => {
        const imageUrl = track.album.images[0].url; // Assuming the first image is what you want
        const posX = index * 1.5 - (tracks.length / 2); // Example: spread them out along the X-axis

        // Create the entity for the album art
        const albumArtEl = document.createElement('a-entity');
        albumArtEl.setAttribute('geometry', {
            primitive: 'plane',
            height: 1, // Set the size of the album art entity
            width: 1
        });
        albumArtEl.setAttribute('material', {src: imageUrl});
        albumArtEl.setAttribute('position', {x: posX, y: 1.5, z: -3}); // Adjust position as needed

        sceneEl.appendChild(albumArtEl); // Add the album art entity to the scene
    });
}
