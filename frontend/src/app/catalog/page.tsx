"use client";

import { useState } from "react";
import UiIcon from "../../components/UiIcon";
import { categories, productTypes, sampleDeals, filterDeals } from "./deals";

const control = "min-h-12 w-full rounded-lg border border-[#547084] bg-[#071B2B] px-4 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5B779]";

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [productType, setProductType] = useState("All");
  const deals = filterDeals(sampleDeals, query, category, productType);
  const hasFilters = Boolean(query || category !== "All" || productType !== "All");

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setProductType("All");
  }

  return (
    <div className="min-h-screen bg-[#071B2B]">
      <section aria-labelledby="catalog-title" className="mx-auto max-w-7xl px-6 py-10 md:py-16">

        <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#D5B779]">Harbour Island Marina of Seawaren</p>
            <h1 id="catalog-title" className="text-4xl font-bold text-white md:text-5xl">Find your next <span className="text-[#D5B779]">great deal.</span></h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#B8C7D3]">Browse coupons for your boat, your dock, and your next day on the water.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#547084] bg-[#0D293D] px-4 py-2 text-sm font-bold text-[#D5B779]"><UiIcon name="catalog" size={18} /> Coupon catalog</span>
        </div>

        <p className="mb-6 rounded-lg border border-[#547084] bg-[#0D293D] px-4 py-3 text-sm leading-relaxed text-[#D5B779]">
          <strong>Demo preview:</strong> These sample coupons are fictional. Real offers will appear when the catalog is connected to the backend.
        </p>

        <div role="search" aria-label="Search and filter coupons" className="mb-8 rounded-2xl border border-[#254357] bg-[#0D293D] p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="md:col-span-2">
              <label htmlFor="deal-search" className="mb-2 block font-bold text-white">Search coupons</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-4 text-[#B8C7D3]"><UiIcon name="search" size={20} /></span>
                <input id="deal-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try propeller, trailer winch, or fishing…" className={`${control} pl-12 placeholder:text-[#B8C7D3]`} />
              </div>
            </div>
            <div>
              <label htmlFor="deal-category" className="mb-2 block font-bold text-white">Category</label>
              <select id="deal-category" value={category} onChange={(event) => setCategory(event.target.value)} className={control}>
                <option value="All">All categories</option>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="deal-type" className="mb-2 block font-bold text-white">Product type</label>
              <select id="deal-type" value={productType} onChange={(event) => setProductType(event.target.value)} className={control}>
                <option value="All">All types</option>
                {productTypes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#B8C7D3]">Results update as you type. Combine a search with either filter.</p>
            <button type="button" onClick={resetFilters} disabled={!hasFilters} className="min-h-12 rounded-lg px-4 font-bold text-[#D5B779] hover:bg-[#103A52] focus-visible:outline-2 focus-visible:outline-[#D5B779] disabled:cursor-default disabled:opacity-50">Clear filters</button>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <UiIcon name="tag" size={22} />
          <h2 className="text-xl font-bold text-white">{category === "All" ? "All coupons" : category}</h2>
          <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-[#B8C7D3]">{deals.length} {deals.length === 1 ? "result" : "results"}</p>
        </div>

        {deals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#547084] bg-[#0D293D] px-6 py-16 text-center">
            <div className="mb-4 flex justify-center text-[#D5B779]"><UiIcon name="search" size={40} /></div>
            <h3 className="text-2xl font-bold text-white">No deals match your search</h3>
            <p className="mx-auto mt-3 max-w-md break-words text-[#B8C7D3]">{query.trim() ? `We couldn’t find coupons for “${query.trim()}” with your selected filters.` : "No coupons match your selected filters."} Try another keyword or choose All categories and All types.</p>
            <button type="button" onClick={resetFilters} className="mt-6 min-h-12 rounded-lg bg-[#D5B779] px-6 py-3 font-bold text-[#071B2B] hover:bg-[#E7CB91] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Reset search and filters</button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {deals.map((deal) => (
              <article key={deal.id} className="flex flex-col overflow-hidden rounded-2xl border border-[#254357] bg-[#0D293D]">
                <div className="flex items-center justify-between gap-3 border-b border-[#254357] bg-[#103A52] px-6 py-5">
                  <span className="text-3xl font-bold text-[#D5B779]">{deal.offer}</span>
                  <span className="rounded-full border border-[#547084] px-3 py-1 text-xs font-bold text-white">SAMPLE</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-sm text-[#B8C7D3]">{deal.retailer}</p>
                  <h3 className="text-xl font-bold leading-snug text-white">{deal.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-[#B8C7D3]">{deal.description}</p>
                  <div className="my-5 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-full bg-[#103A52] px-3 py-2 text-[#F4F7FA]">{deal.category}</span>
                    <span className="rounded-full border border-[#547084] px-3 py-2 text-[#B8C7D3]">{deal.productType}</span>
                  </div>
                  <div className="rounded-lg border border-dashed border-[#547084] bg-[#071B2B] p-3">
                    <p className="text-xs text-[#B8C7D3]">{deal.code ? "Sample coupon code" : "Coupon details"}</p>
                    <p className="mt-1 break-all font-bold tracking-wide text-[#D5B779]">{deal.code ?? "No code required"}</p>
                  </div>
                  {deal.url && /^https?:\/\//i.test(deal.url) ? (
                    <a href={deal.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#D5B779] px-4 font-bold text-[#071B2B] hover:bg-[#E7CB91] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={`View ${deal.title} deal (opens in a new tab)`}>View deal <UiIcon name="chevron-right" size={18} /></a>
                  ) : (
                    <p className="mt-4 text-sm text-[#B8C7D3]">Demo offer — redemption unavailable.</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
