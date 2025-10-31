document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('status');

    // VERIFIED N8N WEBHOOK URL
    const WEBHOOK_URL_BASE = 'https://sdavis8.app.n8n.cloud/webhook-test/gps-receiver';

    // Function to get a URL parameter (like chat_id)
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const conversationId = getUrlParameter('chat_id');
    const conversationUrl = getUrlParameter('webhook_url'); // Currently unused, but good practice to capture it.

    if ('geolocation' in navigator) {
        statusElement.textContent = "Waiting for location permission (This may take a moment)...";

        // CRITICAL: Builds and sends the final URL upon success or failure.
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                // SUCCESS: Coordinates found.
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
