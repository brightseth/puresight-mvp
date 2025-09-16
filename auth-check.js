// Authentication check for PURESIGHT pages
(function() {
    // Check if we're on the auth page
    if (window.location.pathname.includes('auth.html')) {
        return; // Don't check auth on the auth page itself
    }

    // Check authentication status
    const auth = sessionStorage.getItem('puresight_auth');
    const authTime = sessionStorage.getItem('puresight_auth_time');

    if (auth !== 'true' || !authTime) {
        // Not authenticated, redirect to auth page
        window.location.href = 'auth.html';
        return;
    }

    // Check if session has expired (1 hour)
    const elapsed = Date.now() - parseInt(authTime);
    if (elapsed > 3600000) {
        // Session expired, clear and redirect
        sessionStorage.removeItem('puresight_auth');
        sessionStorage.removeItem('puresight_auth_time');
        window.location.href = 'auth.html';
    }
})();