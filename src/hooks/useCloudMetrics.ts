import { useGetApi } from "./useGetApi";
import { API_ENDPOINTS } from "@/api-client/endpoints";

/**
 * Raw shape from https://dummyjson.com/products
 * Only the fields we actually consume are typed.
 */
export type RawProduct = {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  discountPercentage: number;
  brand?: string;
  category?: string;
  availabilityStatus?: "In Stock" | "Low Stock" | string;
};

export type RawProductsResponse = {
  products: RawProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type CloudKpi = {
  id: string;
  label: string;
  value: number;
  unit: "%" | "k" | "";
  trend: "up" | "down";
  delta: number;
  tone: "primary" | "success" | "error";
  source: string;
};

const SELECT_FIELDS = [
  "id",
  "title",
  "price",
  "rating",
  "stock",
  "discountPercentage",
  "brand",
  "category",
  "availabilityStatus",
].join(",");

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Map a single raw product into a cloud-themed KPI.
 * Each card has a deterministic role driven by the product index.
 */
function transform(raw: RawProductsResponse): CloudKpi[] {
  return raw.products.slice(0, 3).map((p, i) => {
    const source = p.brand ?? p.category ?? p.title;

    switch (i) {
      case 0: {
        // Optimization Score — derived from rating (0–5 → 0–100)
        const value = clamp(Math.round((p.rating ?? 0) * 20), 0, 100);
        return {
          id: String(p.id),
          label: "Optimization Score",
          value,
          unit: "%",
          tone: "primary",
          trend: value >= 60 ? "up" : "down",
          delta: clamp(Math.round((p.rating - 3) * 6), -30, 30),
          source: `from ${source}`,
        };
      }
      case 1: {
        // Active Clusters — derived from stock (raw count → "k" units, min 1k)
        const value = Math.max(1, Math.round((p.stock ?? 0) / 4));
        return {
          id: String(p.id),
          label: "Active Clusters",
          value,
          unit: "k",
          tone: "success",
          trend: "up",
          delta: clamp(Math.round((p.stock ?? 0) / 12), 1, 25),
          source: `from ${source}`,
        };
      }
      default: {
        // Cost Reduction — discountPercentage maps 1:1 to cost savings %
        const value = clamp(Math.round(p.discountPercentage ?? 0), 0, 99);
        return {
          id: String(p.id),
          label: "Cost Reduction",
          value,
          unit: "%",
          tone: "success",
          trend: value > 0 ? "up" : "down",
          delta: clamp(Math.round(value / 3), 1, 40),
          source: `from ${source}`,
        };
      }
    }
  });
}

export function useCloudMetrics() {
  const query = useGetApi<RawProductsResponse>(
    API_ENDPOINTS.CLOUD_METRICS,
    { limit: 3, select: SELECT_FIELDS },
    {
      staleTime: 5 * 60 * 1000, // 5 min — instant on revisit
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  );

  return {
    ...query,
    metrics: query.data ? transform(query.data) : undefined,
  };
}
