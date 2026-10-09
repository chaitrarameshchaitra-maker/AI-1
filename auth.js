/**
 * AI-1 / Dr. Schedly — Google Sign-In
 * Uses Google Identity Services (GSI) — no backend needed.
 */

const AUTH_KEYS = {
  profile: 'ai1.profile'
};

/**
 * Decode a Google ID token (JWT) payload.
 * We only read the payload, NOT verify — because there is no backend.
 * For a production app, verification must happen server-side.
 */
function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const json = decodeURIComponent(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const authService = {
  loadProfile() {
    try {
      const raw = localStorage.getItem(AUTH_KEYS.profile);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(AUTH_KEYS.profile, JSON.stringify(profile));
    } catch { /* ignore */ }
  },

  signOut() {
    try {
      localStorage.removeItem(AUTH_KEYS.profile);
    } catch { /* ignore */ }
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  },

  init(callback) {
    const clientId = window.AI1_CONFIG?.GOOGLE_CLIENT_ID ?? '';
    if (!clientId || clientId.includes('PASTE_YOUR')) {
      console.warn('[auth] Google Client ID not configured.');
      return false;
    }
    if (!window.google?.accounts?.id) {
      console.warn('[auth] Google Identity Services not loaded.');
      return false;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        const payload = decodeJwtPayload(response.credential);
        if (!payload) return;
        const profile = {
          googleId: payload.sub,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          signedInWithGoogle: true,
          signedInAt: new Date().toISOString()
        };
        this.saveProfile(profile);
        callback(profile);
      },
      auto_select: false,
      cancel_on_tap_outside: true
    });

    return true;
  },

  renderButton(container, options = {}) {
    if (!window.google?.accounts?.id) return;
    window.google.accounts.id.renderButton(container, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'pill',
      logo_alignment: 'left',
      width: 260,
      ...options
    });
  },

  prompt() {
    if (!window.google?.accounts?.id) {
      alert('Google Sign-In is not configured yet. Please add your GOOGLE_CLIENT_ID to config.js.');
      return;
    }
    window.google.accounts.id.prompt();
  }
};

window.AI1_AUTH = authService;