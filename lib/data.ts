// Central content model for TravelWithLocals.
// In production these would come from the Itinerary / Booking / Recommendation
// services described in the SRS — this file stands in for those APIs.

// Primary nav links shared by the hero (homepage) and interior-page headers.
export const primaryNavLinks = [
  { label: "Discover", href: "/#destinations" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Trips", href: "/#trips" },
] as const;

// The two kinds of static "location" content a traveler can favorite.
export type LocationType = "destination" | "getaway";

export type ScenePalette =
  | "ocean"
  | "forest"
  | "sunset"
  | "mountain"
  | "desert"
  | "dusk"
  | "coast"
  | "city";

export interface Getaway {
  slug: string;
  name: string;
  duration: string;
  palette: ScenePalette;
}

export const weekendGetaways: Getaway[] = [
  { slug: "goa", name: "Goa", duration: "3 Days", palette: "ocean" },
  { slug: "coorg", name: "Coorg", duration: "2 Days", palette: "forest" },
  { slug: "ooty", name: "Ooty", duration: "3 Days", palette: "mountain" },
  { slug: "munnar", name: "Munnar", duration: "4 Days", palette: "forest" },
  { slug: "pondicherry", name: "Pondicherry", duration: "2 Days", palette: "sunset" },
];

export interface Destination {
  slug: string;
  name: string;
  fromPrice: string;
  days: number;
  palette: ScenePalette;
}

export const popularDestinations: Destination[] = [
  { slug: "kerala", name: "Kerala", fromPrice: "₹24k", days: 5, palette: "forest" },
  { slug: "goa", name: "Goa", fromPrice: "₹18k", days: 3, palette: "ocean" },
  { slug: "bali", name: "Bali", fromPrice: "₹42k", days: 6, palette: "sunset" },
  { slug: "japan", name: "Japan", fromPrice: "₹68k", days: 7, palette: "city" },
  { slug: "dubai", name: "Dubai", fromPrice: "₹35k", days: 4, palette: "desert" },
  { slug: "singapore", name: "Singapore", fromPrice: "₹39k", days: 4, palette: "city" },
];

export interface CommunityStory {
  slug: string;
  title: string;
  traveler: string;
  readTime: string;
  palette: ScenePalette;
  body: string[];
}

export const communityStories: CommunityStory[] = [
  {
    slug: "sunrise-train-to-ooty",
    title: "Sunrise train to Ooty",
    traveler: "Aarav",
    readTime: "6 min read",
    palette: "mountain",
    body: [
      "The 6:10 AM toy train out of Mettupalayam was our local host's idea, not something we'd have found on our own. Nobody mentions the cold at that altitude, so we were glad for the blanket she'd packed for us.",
      "By the time we cleared the first ghat section, the valley below was still holding onto night while the ridge line went gold. Our host knew the guard by name and got us the window seats without asking twice.",
      "We stopped twice for tea at platforms that don't appear on any tourist map, and arrived in Ooty by mid-morning with a whole day still ahead of us — something no direct bus route could have given us.",
    ],
  },
  {
    slug: "village-dinner-in-coorg",
    title: "A village dinner in Coorg",
    traveler: "Mira",
    readTime: "4 min read",
    palette: "forest",
    body: [
      "We'd asked for 'something local, not a restaurant' and ended up at a family kitchen in a coffee-growing village outside Madikeri, cooking pandi curry alongside three generations of one household.",
      "Nothing about the evening was staged for visitors — the recipes were argued over in Kodava, the pork was from a pig the family had raised, and we were handed a spoon and told to stir before we'd even sat down.",
      "It's the kind of dinner you can't book through a listing. Our host made one phone call, and that was the whole booking process.",
    ],
  },
  {
    slug: "48-hours-in-pondicherry",
    title: "48 hours in Pondicherry",
    traveler: "Naina",
    readTime: "5 min read",
    palette: "sunset",
    body: [
      "Two days felt tight for Pondicherry until our local host built us a route that skipped the promenade crowds entirely — quiet French Quarter lanes at sunrise, a bakery that doesn't have a sign, an Auroville detour most guides only mention in passing.",
      "The second morning was the one that stuck: a bicycle loop through White Town before the heat set in, ending at a beach that had exactly four other people on it.",
      "We left with the sense that Pondicherry rewards a slower pace far more than the average weekend-trip itinerary gives it credit for.",
    ],
  },
  {
    slug: "finding-hidden-goa-trails",
    title: "Finding hidden Goa trails",
    traveler: "Kabir",
    readTime: "7 min read",
    palette: "coast",
    body: [
      "Everyone told us Goa was 'done' — beaches, shacks, repeat. Our local guide had other plans: a laterite plateau trail above Vagator that most travelers never learn exists, reachable only on foot or scooter.",
      "We hiked out before the tourist buses arrived, past an abandoned Portuguese fort and down to a cove with no name on any map we'd seen. It's still the best two hours of the whole trip.",
      "The lesson, we think, is that even the most 'discovered' places have a local layer underneath — you just need someone who actually lives there to show you where to look.",
    ],
  },
];

export interface LocalExperienceFeature {
  title: string;
  subtitle: string;
}

export const localExperienceFeatures: LocalExperienceFeature[] = [
  { title: "Village Walk", subtitle: "Morning walks with resident hosts" },
  { title: "Food Tour", subtitle: "Local kitchens, night markets, street eats" },
  { title: "Hidden Trails", subtitle: "Secret routes locals have walked for years" },
  { title: "Culture Tour", subtitle: "Craft villages, music nights, regional stories" },
];

export type ItineraryPace = "explorer" | "balanced" | "premium" | "remote-work";

export interface ItineraryDay {
  label: string;
  title: string;
  detail: string;
}

export interface Itinerary {
  slug: string;
  pace: ItineraryPace;
  chipLabel: string;
  chipTone: "blue" | "teal" | "orange" | "violet";
  destination: string;
  title: string;
  summary: string;
  days: number;
  durationLabel: string;
  price: number;
  priceLabel: string;
  vibe: string;
  includes: string[];
  route: string[];
  itinerary: ItineraryDay[];
  whyItWorks: string[];
  stay: {
    heading: string;
    text: string;
    perks: string[];
  };
}

export const itineraries: Record<ItineraryPace, Itinerary> = {
  explorer: {
    slug: "goa-adventure",
    pace: "explorer",
    chipLabel: "Off-Grid",
    chipTone: "blue",
    destination: "Goa",
    title: "Goa Adventure",
    summary:
      "A 3-day local-first itinerary with coastal stays, hidden trails, a food circuit and flexible transit options.",
    days: 3,
    durationLabel: "3 Days",
    price: 18000,
    priceLabel: "₹18k",
    vibe: "Adventure + local",
    includes: ["Hotels", "Activities", "Transfers", "Meals"],
    route: ["Panjim", "Assagao", "Vagator"],
    itinerary: [
      {
        label: "Day 1",
        title: "Arrival, food circuit and old quarter walk",
        detail:
          "Check into a boutique stay, settle in with a hosted lunch, then explore Fontainhas and a curated sunset food crawl.",
      },
      {
        label: "Day 2",
        title: "Hidden trail + beach club downtime",
        detail:
          "Head out early for a private trail experience, afternoon break by the coast, and a flexible nightlife recommendation set.",
      },
      {
        label: "Day 3",
        title: "Market morning and departure transfers",
        detail:
          "Start with a local market route, wrap with a brunch stop, and take a managed transfer back to the airport or next city.",
      },
    ],
    whyItWorks: [
      "Built for first-time Goa travelers who still want local depth.",
      "Transit windows are realistic, so the plan feels usable rather than aspirational.",
      "Every day includes one anchor experience and one flexible block.",
    ],
    stay: {
      heading: "Stay and vibe",
      text: "Boutique coastal stay in Panjim with easy access to food routes and flexible day-two transfers.",
      perks: [
        "Daily breakfast included",
        "Late checkout recommendation",
        "Airport pickup option",
        "Locals-only dining list",
      ],
    },
  },
  balanced: {
    slug: "goa-local-mix",
    pace: "balanced",
    chipLabel: "Local Mix",
    chipTone: "teal",
    destination: "Goa",
    title: "Goa Local Mix",
    summary:
      "A 5-day balanced itinerary that pairs the Explorer route with slower village mornings and a second coastal base.",
    days: 5,
    durationLabel: "5 Days",
    price: 32000,
    priceLabel: "₹32k",
    vibe: "Balanced + local",
    includes: ["Hotels", "Activities", "Transfers", "Meals"],
    route: ["Panjim", "Assagao", "Vagator", "Ashwem"],
    itinerary: [
      {
        label: "Day 1",
        title: "Arrival and old quarter food circuit",
        detail:
          "Check into a boutique stay in Panjim, then join a hosted sunset food crawl through Fontainhas.",
      },
      {
        label: "Day 2",
        title: "Village morning + hidden trail",
        detail:
          "Slow start with a village breakfast, then a private trail experience out to a lesser-known viewpoint.",
      },
      {
        label: "Day 3",
        title: "Beach club transfer day",
        detail:
          "Move base to Ashwem with a scenic coastal drive, afternoon at a local-run beach shack, easy evening.",
      },
      {
        label: "Day 4",
        title: "Craft village + night market",
        detail:
          "Visit a pottery and cashew-feni village circuit, then a night market crawl with a local host.",
      },
      {
        label: "Day 5",
        title: "Market morning and departure transfers",
        detail:
          "Local market route, brunch stop, and a managed transfer back to the airport or your next city.",
      },
    ],
    whyItWorks: [
      "Adds a second base so the trip doesn't feel rushed end to end.",
      "Mixes anchor experiences with genuinely unscheduled time.",
      "Good fit for a couple or small group wanting depth over ticking off sights.",
    ],
    stay: {
      heading: "Stay and vibe",
      text: "Two boutique stays — Panjim for the food circuit, Ashwem for a quieter coastal close.",
      perks: [
        "Daily breakfast included",
        "Mid-trip transfer arranged for you",
        "Airport pickup option",
        "Locals-only dining list",
      ],
    },
  },
  premium: {
    slug: "goa-full-immersion",
    pace: "premium",
    chipLabel: "Full Immersion",
    chipTone: "orange",
    destination: "Goa",
    title: "Goa Full Immersion",
    summary:
      "A 7-day premium itinerary with private guiding, upgraded stays and a deeper spread across North and South Goa.",
    days: 7,
    durationLabel: "7 Days",
    price: 58000,
    priceLabel: "₹58k",
    vibe: "Premium + local",
    includes: ["Hotels", "Activities", "Transfers", "Meals"],
    route: ["Panjim", "Assagao", "Vagator", "Ashwem", "Palolem"],
    itinerary: [
      {
        label: "Day 1",
        title: "Arrival and private food circuit",
        detail:
          "Private car transfer, boutique check-in, and a hosted multi-course tasting through Fontainhas.",
      },
      {
        label: "Day 2",
        title: "Private trail + spice plantation",
        detail:
          "A private guided trail experience followed by a spice plantation lunch with a local family.",
      },
      {
        label: "Day 3",
        title: "North Goa beach transfer",
        detail: "Private transfer to Ashwem, afternoon at a boutique beach club, sunset cruise.",
      },
      {
        label: "Day 4",
        title: "Craft villages and night market",
        detail: "Full-day private circuit through pottery and cashew-feni villages, then a night market.",
      },
      {
        label: "Day 5",
        title: "South Goa transfer",
        detail: "Scenic private drive south to Palolem with a stop at a heritage church trail.",
      },
      {
        label: "Day 6",
        title: "Palolem coves + dolphin watch",
        detail: "Private boat to nearby coves, dolphin watching, and a beachfront dinner.",
      },
      {
        label: "Day 7",
        title: "Slow morning and departure",
        detail: "Relaxed breakfast, last-minute market run, private transfer to the airport.",
      },
    ],
    whyItWorks: [
      "Covers both North and South Goa without the logistics falling on you.",
      "Private guiding throughout, so the pace stays flexible day to day.",
      "Upgraded stays and experiences without losing the local-first thread.",
    ],
    stay: {
      heading: "Stay and vibe",
      text: "Upgraded boutique stays in Panjim, Ashwem and Palolem, each chosen with a local host on call.",
      perks: [
        "Daily breakfast + one hosted meal per day",
        "Private transfers between every base",
        "24/7 local host support",
        "Locals-only dining list",
      ],
    },
  },
  "remote-work": {
    slug: "goa-remote-work",
    pace: "remote-work",
    chipLabel: "Remote Work",
    chipTone: "violet",
    destination: "Goa",
    title: "Goa Remote Work",
    summary:
      "A 10-day slow-travel itinerary built around a reliable work setup, with weekends kept free for local exploring.",
    days: 10,
    durationLabel: "10 Days",
    price: 72000,
    priceLabel: "₹72k",
    vibe: "Remote work + local",
    includes: ["Hotels", "Activities", "Transfers", "Meals"],
    route: ["Assagao", "Vagator"],
    itinerary: [
      {
        label: "Day 1–2",
        title: "Settle in + co-working orientation",
        detail:
          "Check into a long-stay villa in Assagao with a verified work desk and fibre connection; local orientation walk.",
      },
      {
        label: "Day 3–7",
        title: "Work week, local evenings",
        detail:
          "Weekday mornings free for work, with optional hosted evening experiences — food tours, village walks, live music.",
      },
      {
        label: "Day 8–9",
        title: "Weekend at the coast",
        detail: "Short transfer to Vagator for two unscheduled days by the coast.",
      },
      {
        label: "Day 10",
        title: "Wrap-up and departure",
        detail: "Slow morning, luggage-friendly transfer to the airport.",
      },
    ],
    whyItWorks: [
      "Designed around a working week, not a vacation sprint.",
      "One base for most of the stay keeps things low-friction.",
      "Local experiences are optional add-ons, never mandatory scheduling.",
    ],
    stay: {
      heading: "Stay and vibe",
      text: "A long-stay villa in Assagao with a dedicated desk, plus a coastal weekend base in Vagator.",
      perks: [
        "Verified work desk + fibre internet",
        "Weekly housekeeping included",
        "Optional evening experiences",
        "Locals-only dining list",
      ],
    },
  },
};

export const itineraryOrder: ItineraryPace[] = ["explorer", "balanced", "premium", "remote-work"];

// ---------------------------------------------------------------------------
// Stay search + booking (see "Stay search" and detailed-spec docs)
// ---------------------------------------------------------------------------

export type PropertyType = "Boutique Hotel" | "Resort" | "Homestay" | "Villa" | "Hostel";

export interface Room {
  id: string;
  category: string;
  sizeSqm: number;
  view: string;
  price: number;
  maxPersons: number;
  facilities: string[];
  palette: ScenePalette;
}

export interface Review {
  author: string;
  rating: number;
  comment: string;
}

export interface Stay {
  id: string;
  name: string;
  city: string;
  location: string;
  distanceKm: number;
  propertyType: PropertyType;
  propertyRating: number; // star rating, 1-5
  userRating: number; // out of 5
  startingPrice: number;
  amenities: string[];
  palette: ScenePalette;
  about: string;
  restaurants: { name: string; cuisine: string }[];
  rules: string[];
  cancellation: string;
  reviews: Review[];
  rooms: Room[];
}

export const cities = ["Goa", "Coorg", "Ooty", "Munnar", "Pondicherry", "Kerala"] as const;

export const popularLocationsByCity: Record<string, string[]> = {
  Goa: ["Panjim", "Calangute", "Anjuna", "Candolim", "Vagator", "Palolem"],
  Coorg: ["Madikeri", "Virajpet", "Kushalnagar"],
  Ooty: ["Charing Cross", "Fernhill", "Doddabetta"],
  Munnar: ["Devikulam", "Chinnakanal", "Pallivasal"],
  Pondicherry: ["White Town", "Auroville", "Serenity Beach"],
  Kerala: ["Fort Kochi", "Alleppey", "Munnar Town"],
};

export const amenitiesList = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Breakfast Included",
  "Airport Pickup",
  "Air Conditioning",
  "Parking",
  "Pet Friendly",
  "Spa",
];

export const propertyTypes: PropertyType[] = ["Boutique Hotel", "Resort", "Homestay", "Villa", "Hostel"];

function makeRooms(base: number, palette: ScenePalette): Room[] {
  return [
    {
      id: "standard",
      category: "Standard Room",
      sizeSqm: 22,
      view: "Garden view",
      price: base,
      maxPersons: 2,
      facilities: ["Free Wi-Fi", "Air Conditioning", "Attached Bathroom", "Daily Housekeeping"],
      palette,
    },
    {
      id: "deluxe",
      category: "Deluxe Room",
      sizeSqm: 30,
      view: "Pool view",
      price: Math.round(base * 1.4),
      maxPersons: 3,
      facilities: ["Free Wi-Fi", "Air Conditioning", "Mini Bar", "Balcony", "Daily Housekeeping"],
      palette,
    },
    {
      id: "suite",
      category: "Suite",
      sizeSqm: 45,
      view: "Sea view",
      price: Math.round(base * 2.1),
      maxPersons: 4,
      facilities: ["Free Wi-Fi", "Air Conditioning", "Mini Bar", "Private Balcony", "Bathtub", "Living Area"],
      palette,
    },
  ];
}

export const stays: Stay[] = [
  {
    id: "casa-fontainhas",
    name: "Casa Fontainhas Boutique Stay",
    city: "Goa",
    location: "Panjim",
    distanceKm: 1.2,
    propertyType: "Boutique Hotel",
    propertyRating: 4,
    userRating: 4.7,
    startingPrice: 3200,
    amenities: ["Free Wi-Fi", "Breakfast Included", "Air Conditioning", "Airport Pickup"],
    palette: "coast",
    about:
      "A restored Portuguese-era townhouse in the Fontainhas quarter, steps from the sunset food crawl route.",
    restaurants: [{ name: "Casa Kitchen", cuisine: "Goan-Portuguese" }],
    rules: ["Check-in from 2 PM", "Check-out by 11 AM", "No smoking indoors", "ID proof required at check-in"],
    cancellation: "Free cancellation up to 48 hours before check-in.",
    reviews: [
      { author: "Priya", rating: 5, comment: "Felt like staying with a local host, not a hotel." },
      { author: "Daniel", rating: 4, comment: "Great location for the food circuit, rooms are cosy." },
    ],
    rooms: makeRooms(3200, "coast"),
  },
  {
    id: "assagao-longstay-villa",
    name: "Assagao Longstay Villa",
    city: "Goa",
    location: "Anjuna",
    distanceKm: 6.5,
    propertyType: "Villa",
    propertyRating: 5,
    userRating: 4.8,
    startingPrice: 5400,
    amenities: ["Free Wi-Fi", "Swimming Pool", "Air Conditioning", "Parking", "Pet Friendly"],
    palette: "forest",
    about: "A quiet villa with a verified work desk and fibre internet, built for slower, longer stays.",
    restaurants: [],
    rules: ["Check-in from 1 PM", "Check-out by 12 PM", "Minimum stay 3 nights", "Pets allowed on request"],
    cancellation: "Free cancellation up to 7 days before check-in.",
    reviews: [
      { author: "Rhea", rating: 5, comment: "Internet was rock solid, worked from the pool deck most days." },
    ],
    rooms: makeRooms(5400, "forest"),
  },
  {
    id: "vagator-cliffside",
    name: "Vagator Cliffside Resort",
    city: "Goa",
    location: "Vagator",
    distanceKm: 9.1,
    propertyType: "Resort",
    propertyRating: 4,
    userRating: 4.5,
    startingPrice: 4600,
    amenities: ["Free Wi-Fi", "Swimming Pool", "Breakfast Included", "Spa"],
    palette: "ocean",
    about: "Cliffside rooms looking over Vagator beach, close to the flea market and sunset points.",
    restaurants: [{ name: "Cliffline Grill", cuisine: "Seafood" }],
    rules: ["Check-in from 2 PM", "Check-out by 11 AM", "No outside food at the pool deck"],
    cancellation: "Free cancellation up to 48 hours before check-in.",
    reviews: [
      { author: "Wei", rating: 4, comment: "Sunset view from the room was worth it alone." },
      { author: "Ana", rating: 5, comment: "Spa was a nice surprise, staff were fantastic." },
    ],
    rooms: makeRooms(4600, "ocean"),
  },
  {
    id: "candolim-homestay",
    name: "Candolim Family Homestay",
    city: "Goa",
    location: "Candolim",
    distanceKm: 4.3,
    propertyType: "Homestay",
    propertyRating: 3,
    userRating: 4.6,
    startingPrice: 2100,
    amenities: ["Free Wi-Fi", "Breakfast Included", "Air Conditioning"],
    palette: "sunset",
    about: "Run by a local family for three generations, with home-cooked meals on request.",
    restaurants: [],
    rules: ["Check-in from 12 PM", "Check-out by 10 AM", "Quiet hours after 10 PM"],
    cancellation: "Free cancellation up to 24 hours before check-in.",
    reviews: [{ author: "Meera", rating: 5, comment: "The family's home cooking was the highlight of our trip." }],
    rooms: makeRooms(2100, "sunset"),
  },
  {
    id: "palolem-beach-hostel",
    name: "Palolem Beach Hostel",
    city: "Goa",
    location: "Palolem",
    distanceKm: 14.8,
    propertyType: "Hostel",
    propertyRating: 3,
    userRating: 4.3,
    startingPrice: 900,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Parking"],
    palette: "coast",
    about: "Budget-friendly beachside bunks with a communal kitchen and a nightly bonfire.",
    restaurants: [],
    rules: ["Check-in from 2 PM", "Check-out by 10 AM", "Lockers available, bring your own lock"],
    cancellation: "Non-refundable.",
    reviews: [{ author: "Tom", rating: 4, comment: "Best hostel crowd we met on the whole trip." }],
    rooms: makeRooms(900, "coast"),
  },
  {
    id: "calangute-seaview",
    name: "Calangute Seaview Suites",
    city: "Goa",
    location: "Calangute",
    distanceKm: 2.7,
    propertyType: "Resort",
    propertyRating: 5,
    userRating: 4.4,
    startingPrice: 6200,
    amenities: ["Free Wi-Fi", "Swimming Pool", "Breakfast Included", "Spa", "Air Conditioning"],
    palette: "ocean",
    about: "Full-service resort on Calangute beach with a spa and three in-house restaurants.",
    restaurants: [
      { name: "The Deck", cuisine: "Multi-cuisine" },
      { name: "Spice Route", cuisine: "Indian" },
    ],
    rules: ["Check-in from 2 PM", "Check-out by 11 AM"],
    cancellation: "Free cancellation up to 72 hours before check-in.",
    reviews: [{ author: "Sofia", rating: 4, comment: "Great for families, kids' pool was a hit." }],
    rooms: makeRooms(6200, "ocean"),
  },
];

/** A location is bookable through the stay search when its city has real stay listings. */
export function isBookable(locationName: string): boolean {
  return (cities as readonly string[]).includes(locationName);
}

/** The public/images subfolder a favoritable location's photo lives in. */
export function locationImageFolder(type: LocationType): "destinations" | "getaways" {
  return type === "destination" ? "destinations" : "getaways";
}

/** The stable key used to look up a location in a favorited-keys set. */
export function favoriteKey(type: LocationType, slug: string): string {
  return `${type}:${slug}`;
}

export function getStayById(id: string): Stay | undefined {
  return stays.find((s) => s.id === id);
}

export function getItineraryByPace(pace: string): Itinerary | undefined {
  return itineraries[pace as ItineraryPace];
}

export interface StayFilters {
  city?: string;
  priceMax?: number;
  propertyTypes?: PropertyType[];
  propertyRating?: number;
  userRatingMin?: number;
  amenities?: string[];
  locations?: string[];
}

export function filterStays(filters: StayFilters): Stay[] {
  return stays
    .filter((s) => (filters.city ? s.city === filters.city : true))
    .filter((s) => (filters.priceMax ? s.startingPrice <= filters.priceMax : true))
    .filter((s) =>
      filters.propertyTypes && filters.propertyTypes.length > 0
        ? filters.propertyTypes.includes(s.propertyType)
        : true
    )
    .filter((s) => (filters.propertyRating ? s.propertyRating === filters.propertyRating : true))
    .filter((s) => (filters.userRatingMin ? s.userRating >= filters.userRatingMin : true))
    .filter((s) =>
      filters.amenities && filters.amenities.length > 0
        ? filters.amenities.every((a) => s.amenities.includes(a))
        : true
    )
    .filter((s) =>
      filters.locations && filters.locations.length > 0 ? filters.locations.includes(s.location) : true
    )
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

