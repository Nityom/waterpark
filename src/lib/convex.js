import { ConvexHttpClient } from "convex/browser";

function getConvexDeploymentUrl() {
  const deploymentUrl =
    process.env.CONVEX_DEPLOYMENT_URL ||
    process.env.NEXT_PUBLIC_CONVEX_URL

  return deploymentUrl.replace(/\/$/, "");
}

export function getConvexHttpActionsUrl() {
  const httpUrl =
    process.env.CONVEX_HTTP_ACTIONS_URL;

  return httpUrl.replace(/\/$/, "");
}

export function createConvexClient() {
  return new ConvexHttpClient(getConvexDeploymentUrl(), { logger: false });
}
