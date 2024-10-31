import "server-only";

// export const setLoginCookieExpiry = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
export const setLoginCookieExpiry = () => new Date(Date.now() + 1 * 60 * 1000);
export const setVerifyCookieExpiry = () => new Date(Date.now() + 1 * 60 * 1000);
// export const setVerifyCookieExpiry = () => new Date(Date.now() + 15 * 60 * 1000);
