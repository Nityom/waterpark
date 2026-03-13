export const ADMIN_EMAIL = "admin@waves.com";
export const ADMIN_PASSWORD = "Admin@123";
export const ADMIN_COOKIE_NAME = "waves_admin_session";
export const ADMIN_COOKIE_VALUE = "authenticated";

export function isValidAdminCredentials(email, password) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
