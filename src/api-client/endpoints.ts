export const API_ENDPOINTS = {
  CLOUD_METRICS: "/products",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
