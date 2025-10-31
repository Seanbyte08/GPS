document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('status');

    // --- CRITICAL LINE ADDED HERE ---
    const WEBHOOK_URL_BASE = 'https://sdavis8.app.n8n.cloud/webhook-test/gps-receiver'; 
    // --- END CRITICAL LINE ---

    // Function to get a URL parameter (like chat_id)
    function getUrlParameter(name) {
        // ... (Rest of the getUrlParameter function code)
    }

    // Your chat ID is pulled from the URL passed by the AI Agent
    const conversationId = getUrlParameter('chat_id');

    if ('geolocation' in navigator) {
        // ... (Rest of the geolocation success/error logic)
        
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Build the final redirect URL back to n8n
                const redirectUrl = 
                    `${WEBHOOK_URL_BASE}?lat=${latitude}&lon=${longitude}&chat_id=${conversationId}`;

                // ... (Rest of the redirect logic)
                window.location.href = redirectUrl;
            },
            // ... (Error function and options)
        );
    } 
    // ... (End of script)
});
