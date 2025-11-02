// Function to get location and send to n8n
function getLocationAndSend() {
    const statusDiv = document.getElementById('status');
    
    // Step 1: Check for Geolocation support
    if ("geolocation" in navigator) {
        
        // Step 2: Request the current, high-accuracy position
        navigator.geolocation.getCurrentPosition(
            // Success Callback: Location is found
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                statusDiv.innerHTML = '<h1>Location Found!</h1><p>Preparing your recommendations...</p>';
                
                // Step 3: CRITICAL - Construct the webhook URL with the coordinates
                // NOTE: The URL must match the receiver URL in your n8n workflow exactly.
                const webhookUrl = `https://sdavis8.app.n8n.cloud/webhook-test/gps-receiver?latitude=${lat}&longitude=${lon}`;
                
                // Step 4: Send the data to your n8n webhook using a GET request
                fetch(webhookUrl)
                    .then(() => {
                        // Success: The data has been sent to n8n.
                        statusDiv.innerHTML = '<h1>Success!</h1><p>You can now return to the chat. Your Flo-Rider AI is ready!</p>';
                    })
                    .catch(error => {
                        // Error sending data after location was found
                        statusDiv.innerHTML = '<h1>Error</h1><p>Location found, but failed to send data. Please try again or provide an address.</p>';
                        console.error('Fetch Error:', error);
                    });
            },
            // Error Callback: Permission denied or location failed
            function(error) {
                // The user denied access or the device couldn't get a fix.
                statusDiv.innerHTML = '<h1>Permission Required</h1><p>Location access was denied or failed. Please provide a specific address back in the chat.</p>';
                console.error("Geolocation Error:", error.message);
            },
            // Options for high accuracy
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    } else {
        // Geolocation not supported
        statusDiv.innerHTML = '<h1>Device Error</h1><p>Your device does not support geolocation. Please provide a specific address back in the chat.</p>';
    }
}

// Execute the function immediately when the page loads
window.onload = getLocationAndSend;
