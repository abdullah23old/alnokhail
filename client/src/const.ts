export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  try {
    // Safe defaults for production
    const oauthPortalUrl = "https://oauth.manus.computer";
    const appId = "alnokhail";
    
    if (typeof window === "undefined") {
      return "#";
    }
    
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);

    const params = new URLSearchParams({
      appId: appId,
      redirectUri: redirectUri,
      state: state,
      type: "signIn"
    });

    return `${oauthPortalUrl}/app-auth?${params.toString()}`;
  } catch (error) {
    console.error("Error generating login URL:", error);
    return "#";
  }
};
