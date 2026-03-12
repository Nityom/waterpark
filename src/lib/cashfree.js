import { Cashfree, CFEnvironment } from "cashfree-pg";

function resolveCashfreeMode() {
  const explicitMode = process.env.CASHFREE_ENV?.trim().toLowerCase();

  if (explicitMode === "production") {
    return "production";
  }

  if (explicitMode === "sandbox") {
    return "sandbox";
  }

  const secret = process.env.CASHFREE_SECRET_KEY?.toLowerCase() || "";
  const appId = process.env.CASHFREE_APP_ID?.toLowerCase() || "";
  const combined = `${secret} ${appId}`;

  if (combined.includes("prod") || combined.includes("production")) {
    return "production";
  }

  return "sandbox";
}

export function configureCashfree() {
  const environment =
    resolveCashfreeMode() === "production"
      ? CFEnvironment.PRODUCTION
      : CFEnvironment.SANDBOX;

  return new Cashfree(
    environment,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
  );
}

export function getCashfreeMode() {
  return resolveCashfreeMode();
}
