export const ADMIN_EMAIL = "admin@thewaves.com";
export const ADMIN_PASSWORD = "Admin@468";
export const ADMIN_COOKIE_NAME = "waves_admin_session";
export const ADMIN_COOKIE_VALUE = "authenticated";

export function isValidAdminCredentials(email, password) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
