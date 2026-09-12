"use client";

import { useMemo, useState } from "react";
import { FiltersPanel, type FilterState } from "@/components/stays/FiltersPanel";
import { StayCard } from "@/components/stays/StayCard";
import { cities, filterStays, popularLocationsByCity, type PropertyType } from "@/lib/data";

const EMPTY_FILTERS: FilterState = {
  priceMax: 0,
  propertyTypes: [],
  propertyRating: 0,
  userRatingMin: 0,
  amenities: [],
  locations: [],
};

const PAGE_SIZES = [10, 20, 50];

export function StaysExplorer({
  initialCity,
  initialCheckIn,
  initialCheckOut,
}: {
  initialCity: string;
  initialCheckIn: string;
  initialCheckOut: string;
}) {
  const [city, setCity] = useState(initialCity);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const locationOptions = popularLocationsByCity[city] ?? [];

  const results = useMemo(() => {
    return filterStays({
      city,
      priceMax: filters.priceMax || undefined,
      propertyTypes: filters.propertyTypes as PropertyType[],
      propertyRating: filters.propertyRating || undefined,
      userRatingMin: filters.userRatingMin || undefined,
      amenities: filters.amenities,
      locations: filters.locations,
    });
  }, [city, filters]);

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageResults = useMemo(
    () => results.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [results, currentPage, pageSize]
  );

  function updateFilters(next: FilterState) {
    setFilters(next);
    setPage(1);
  }

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8 lg:px-20">
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-mist-100 p-5 sm:flex-row sm:items-end sm:gap-4">
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-500">City / location</span>
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              updateFilters(EMPTY_FILTERS);
            }}
            className="rounded-xl border border-line-soft bg-mist-100 px-4 py-3 text-base font-medium text-ink-700 outline-none"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-500">Check-in</span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded-xl border border-line-soft bg-mist-100 px-4 py-3 text-base font-medium text-ink-700 outline-none"
          />
        </label>
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-500">Check-out</span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded-xl border border-line-soft bg-mist-100 px-4 py-3 text-base font-medium text-ink-700 outline-none"
          />
        </label>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <FiltersPanel state={filters} onChange={updateFilters} onReset={() => updateFilters(EMPTY_FILTERS)} locationOptions={locationOptions} />

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-ink-500">
              {results.length} {results.length === 1 ? "stay" : "stays"} in {city}, sorted by distance
            </p>
            <label className="flex items-center gap-2 text-sm font-medium text-ink-600">
              Show
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-full border border-line-soft bg-mist-100 px-3 py-1.5 outline-none"
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              per page
            </label>
          </div>

          {pageResults.length > 0 ? (
            <div className="flex flex-col gap-4">
              {pageResults.map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-line-soft p-10 text-center">
              <p className="text-lg font-medium text-ink-700">No stays match these filters</p>
              <p className="mt-2 text-sm text-ink-500">Try widening your price range or clearing a few filters.</p>
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="flex items-center justify-center gap-2 pt-2" aria-label="Pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-9 w-9 rounded-full border border-line text-sm font-medium text-ink-600 disabled:opacity-40"
                aria-label="Previous page"
              >
                ←
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i + 1)}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                  className={`h-9 w-9 rounded-full text-sm font-medium ${
                    currentPage === i + 1 ? "bg-brand-blue text-mist-100" : "border border-line text-ink-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="h-9 w-9 rounded-full border border-line text-sm font-medium text-ink-600 disabled:opacity-40"
                aria-label="Next page"
              >
                →
              </button>
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
}
