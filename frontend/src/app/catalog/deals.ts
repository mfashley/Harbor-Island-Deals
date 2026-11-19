export const categories = ["Dock Supplies", "Boat Maintenance", "Fishing Supplies", "Boat Parts", "Safety Equipment", "Community Deals"] as const;
export const productTypes = ["Supply", "Part", "Equipment", "Submitted link"] as const;

export interface Deal {
  id: string;
  title: string;
  description: string;
  category: (typeof categories)[number];
  productType: (typeof productTypes)[number];
  retailer: string;
  offer: string;
  code?: string;
  url?: string;
  expiresOn?: string | null;
  expired?: boolean;
  community?: boolean;
}

export interface ApiDeal {
  id: number;
  title: string;
  url: string;
  expires_on: string | null;
  expired: boolean;
  source: "link" | "qr";
  created_at: string;
}

export function fromApiDeal(d: ApiDeal): Deal {
  let retailer = "Community submission";
  try {
    retailer = new URL(d.url).hostname.replace(/^www\./, "");
  } catch {}
  return {
    id: `api-${d.id}`,
    title: d.title,
    description: d.source === "qr" ? "Shared by a community member via QR code." : "Shared by a community member.",
    category: "Community Deals",
    productType: "Submitted link",
    retailer,
    offer: "Community deal",
    url: d.url,
    expiresOn: d.expires_on,
    expired: d.expired,
    community: true,
  };
}

// Parse YYYY-MM-DD as a local date (new Date("2026-11-30") would shift a day in US timezones)
export function formatExpiry(iso?: string | null) {
  if (!iso) return "No expiration listed";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// DEMO DATA ONLY: these are fictional offers, not verified coupons.
// Replace this array with deals returned by your backend, mapped to Deal.
export const sampleDeals: Deal[] = [
  { id: "demo-1", title: "Stainless Steel Propeller", description: "Replacement propeller for your next boat repair.", category: "Boat Parts", productType: "Part", retailer: "Demo Marine Store", offer: "15% off", code: "DEMO15" },
  { id: "demo-2", title: "Trailer Winch", description: "Equipment for loading and securing your boat trailer.", category: "Boat Parts", productType: "Equipment", retailer: "Demo Boating Outlet", offer: "$20 off" },
  { id: "demo-3", title: "Braided Dock Lines", description: "Docking rope for keeping your boat secured at the marina.", category: "Dock Supplies", productType: "Supply", retailer: "Demo Marine Store", offer: "20% off", code: "DEMODOCK" },
  { id: "demo-4", title: "Dock Fender Set", description: "Protect your hull when docking and mooring.", category: "Dock Supplies", productType: "Equipment", retailer: "Demo Boating Outlet", offer: "$10 off" },
  { id: "demo-5", title: "Marine Hull Cleaner", description: "Cleaning supplies for routine boat maintenance.", category: "Boat Maintenance", productType: "Supply", retailer: "Demo Marine Store", offer: "10% off", code: "DEMOCLEAN" },
  { id: "demo-6", title: "Engine Oil Filter", description: "Replacement filter for scheduled engine maintenance.", category: "Boat Maintenance", productType: "Part", retailer: "Demo Boating Outlet", offer: "15% off" },
  { id: "demo-7", title: "Saltwater Fishing Rod", description: "Fishing equipment for your next trip on the water.", category: "Fishing Supplies", productType: "Equipment", retailer: "Demo Tackle Shop", offer: "25% off", code: "DEMO25" },
  { id: "demo-8", title: "Fishing Lure Pack", description: "A selection of lures for your tackle box.", category: "Fishing Supplies", productType: "Supply", retailer: "Demo Tackle Shop", offer: "$5 off" },
  { id: "demo-9", title: "Life Jacket", description: "Safety equipment for time aboard your boat.", category: "Safety Equipment", productType: "Equipment", retailer: "Demo Marine Store", offer: "20% off" },
];

export function filterDeals(deals: Deal[], query: string, category: string, productType: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return deals.filter((deal) => {
    const text = [deal.title, deal.description, deal.category, deal.productType, deal.retailer].join(" ").toLowerCase();
    return (category === "All" || deal.category === category)
      && (productType === "All" || deal.productType === productType)
      && words.every((word) => text.includes(word));
  });
}
