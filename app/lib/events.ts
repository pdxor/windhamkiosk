export type EventGalleryItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  time?: string;
  location?: string;
};

export type PotluckInfo = {
  title: string;
  schedule: string;
  location: string;
  description: string;
  whatToBring: string[];
};

export const PLACEHOLDER_CALENDAR_MONTH = {
  year: 2026,
  month: 6,
  label: "June 2026",
};

export const eventGallery: EventGalleryItem[] = [
  {
    id: "gallery-potluck",
    title: "Monthly community potluck",
    description:
      "Neighbors gather with a dish to share, stories to swap, and room at the table for everyone.",
    imageSrc: "/windham-kiosk-hero.png",
    imageAlt: "Windham KIOSK community gathering",
  },
  {
    id: "gallery-main-street",
    title: "Main street meet-ups",
    description:
      "Local visibility events, vendor tables, and friendly face-to-face connection in town.",
    imageSrc: "/hero-americana-main-street.png",
    imageAlt: "Americana main street community scene",
  },
  {
    id: "gallery-landscape",
    title: "Seasonal celebrations",
    description:
      "Movie nights, karaoke, raffles, and family-friendly gatherings across the mountain towns.",
    imageSrc: "/kiosk-landscape-hero.png",
    imageAlt: "Mountain landscape near Windham",
  },
];

export const monthlyPotluck: PotluckInfo = {
  title: "Monthly KIOSK potluck",
  schedule: "Third Saturday of each month · 5:00–7:30 PM",
  location: "Windham community gathering space (details shared with RSVP)",
  description:
    "Our monthly potluck is a simple way to meet neighbors, welcome newcomers, and keep small-town connection visible. Everyone is welcome — bring a dish if you can, or just bring yourself.",
  whatToBring: [
    "A favorite dish, side, or dessert to share",
    "Your own plate and utensils if you prefer",
    "A friend, neighbor, or new homeowner you'd like to introduce",
  ],
};

/** Static placeholder events until a dynamic calendar is wired up. */
export const placeholderCalendarEvents: CalendarEvent[] = [
  {
    id: "cal-potluck-jun",
    date: "2026-06-21",
    title: "Monthly community potluck",
    time: "5:00 PM",
    location: "Windham",
  },
  {
    id: "cal-vendor-jun",
    date: "2026-06-28",
    title: "Vendor fair & neighbor meet-up",
    time: "11:00 AM",
    location: "Main street",
  },
  {
    id: "cal-movie-jul",
    date: "2026-07-11",
    title: "Family movie night",
    time: "7:00 PM",
    location: "Community hall",
  },
  {
    id: "cal-karaoke-jul",
    date: "2026-07-25",
    title: "Karaoke & community stories",
    time: "6:30 PM",
    location: "Local venue TBA",
  },
];

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type CalendarDayCell = {
  day: number | null;
  dateKey: string | null;
  events: CalendarEvent[];
};

export function getWeekdayLabels(): readonly string[] {
  return WEEKDAY_LABELS;
}

export function buildMonthGrid(
  year: number,
  month: number,
  events: CalendarEvent[],
): CalendarDayCell[] {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const eventsByDate = new Map<string, CalendarEvent[]>();

  for (const event of events) {
    const list = eventsByDate.get(event.date) ?? [];
    list.push(event);
    eventsByDate.set(event.date, list);
  }

  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ day: null, dateKey: null, events: [] });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({
      day,
      dateKey,
      events: eventsByDate.get(dateKey) ?? [],
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: null, dateKey: null, events: [] });
  }

  return cells;
}

export function eventsForMonth(
  events: CalendarEvent[],
  year: number,
  month: number,
): CalendarEvent[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}-`;
  return events
    .filter((event) => event.date.startsWith(prefix))
    .sort((a, b) => a.date.localeCompare(b.date));
}
