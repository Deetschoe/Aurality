function playPreview(previewUrl) {
    // Stop any currently playing previews
    const existingAudio = document.querySelector('audio#previewPlayer');
    if (existingAudio) {
        existingAudio.pause();
        existingAudio.currentTime = 0; // Reset time
        existingAudio.src = ''; // Clear the source
    }

    // If there's a preview URL, play it
    if (previewUrl) {
        const audioEl = existingAudio || document.createElement('audio');
        audioEl.id = 'previewPlayer';
        audioEl.src = previewUrl;
        audioEl.play(); // Play the preview

        if (!existingAudio) {
            document.body.appendChild(audioEl); // Append to the document if it's a new element
        }
    }
}
