"use client";

import { amenitiesList, propertyTypes, type PropertyType } from "@/lib/data";

const PRICE_OPTIONS = [
  { label: "Any price", value: 0 },
  { label: "Under ₹2,000", value: 2000 },
  { label: "Under ₹5,000", value: 5000 },
  { label: "Under ₹10,000", value: 10000 },
];

const PROPERTY_RATING_OPTIONS = [0, 3, 4, 5];
const USER_RATING_OPTIONS = [0, 4, 4.5];

export interface FilterState {
  priceMax: number;
  propertyTypes: PropertyType[];
  propertyRating: number;
  userRatingMin: number;
  amenities: string[];
  locations: string[];
}

export function FiltersPanel({
  state,
  onChange,
  onReset,
  locationOptions,
}: {
  state: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  locationOptions: string[];
}) {
  function toggle<K extends "propertyTypes" | "amenities" | "locations">(key: K, value: string) {
    const current = state[key] as string[];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ ...state, [key]: next } as FilterState);
  }

  return (
    <aside className="flex w-full flex-col gap-6 rounded-2xl border border-line bg-mist-100 p-6 lg:w-[280px] lg:shrink-0">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-ink-700">Filters</p>
        <button type="button" onClick={onReset} className="text-sm font-medium text-brand-blue hover:underline">
          Reset filters
        </button>
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 text-xs font-medium text-ink-500">Price range</legend>
        {PRICE_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2.5 text-sm text-ink-700">
            <input
              type="radio"
              name="priceMax"
              checked={state.priceMax === opt.value}
              onChange={() => onChange({ ...state, priceMax: opt.value })}
              className="h-4 w-4 accent-brand-blue"
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 text-xs font-medium text-ink-500">Property type</legend>
        {propertyTypes.map((type) => (
          <label key={type} className="flex items-center gap-2.5 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={state.propertyTypes.includes(type)}
              onChange={() => toggle("propertyTypes", type)}
              className="h-4 w-4 accent-brand-blue"
            />
            {type}
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 text-xs font-medium text-ink-500">Property rating</legend>
        {PROPERTY_RATING_OPTIONS.map((r) => (
          <label key={r} className="flex items-center gap-2.5 text-sm text-ink-700">
            <input
              type="radio"
              name="propertyRating"
              checked={state.propertyRating === r}
              onChange={() => onChange({ ...state, propertyRating: r })}
              className="h-4 w-4 accent-brand-blue"
            />
            {r === 0 ? "Any rating" : `${r} star${r > 1 ? "s" : ""}`}
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 text-xs font-medium text-ink-500">User rating</legend>
        {USER_RATING_OPTIONS.map((r) => (
          <label key={r} className="flex items-center gap-2.5 text-sm text-ink-700">
            <input
              type="radio"
              name="userRatingMin"
              checked={state.userRatingMin === r}
              onChange={() => onChange({ ...state, userRatingMin: r })}
              className="h-4 w-4 accent-brand-blue"
            />
            {r === 0 ? "Any rating" : `${r}+`}
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 text-xs font-medium text-ink-500">Amenities</legend>
        {amenitiesList.map((a) => (
          <label key={a} className="flex items-center gap-2.5 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={state.amenities.includes(a)}
              onChange={() => toggle("amenities", a)}
              className="h-4 w-4 accent-brand-blue"
            />
            {a}
          </label>
        ))}
      </fieldset>

      {locationOptions.length > 0 ? (
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-1 text-xs font-medium text-ink-500">
            Popular locations
          </legend>
          {locationOptions.map((loc) => (
            <label key={loc} className="flex items-center gap-2.5 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={state.locations.includes(loc)}
                onChange={() => toggle("locations", loc)}
                className="h-4 w-4 accent-brand-blue"
              />
              {loc}
            </label>
          ))}
        </fieldset>
      ) : null}
    </aside>
  );
}
