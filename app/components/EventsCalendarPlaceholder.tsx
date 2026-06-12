import {
  buildMonthGrid,
  eventsForMonth,
  getWeekdayLabels,
  type CalendarEvent,
} from "@/app/lib/events";

type EventsCalendarPlaceholderProps = {
  year: number;
  month: number;
  monthLabel: string;
  events: CalendarEvent[];
};

export function EventsCalendarPlaceholder({
  year,
  month,
  monthLabel,
  events,
}: EventsCalendarPlaceholderProps) {
  const grid = buildMonthGrid(year, month, events);
  const monthEvents = eventsForMonth(events, year, month);
  const weekdays = getWeekdayLabels();

  return (
    <div className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--forest-green)]">
            Community calendar
          </p>
          <h2 className="brand-heading mt-2 text-3xl font-bold text-[var(--earth-brown)]">
            {monthLabel}
          </h2>
        </div>
        <p className="rounded-full border border-[var(--stone)] bg-[var(--cream)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--charcoal)]/75">
          Placeholder · dynamic calendar coming soon
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[320px]">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold uppercase tracking-wide text-[var(--forest-green)]">
            {weekdays.map((label) => (
              <div key={label} className="py-2">
                {label}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {grid.map((cell, index) => {
              const hasEvents = cell.events.length > 0;

              return (
                <div
                  key={cell.dateKey ?? `empty-${index}`}
                  className={`min-h-16 rounded-md border p-1.5 text-left sm:min-h-20 sm:p-2 ${
                    cell.day === null
                      ? "border-transparent bg-transparent"
                      : hasEvents
                        ? "border-[var(--forest-green)]/35 bg-[var(--sage)]/45"
                        : "border-[var(--stone)] bg-[var(--cream)]/60"
                  }`}
                >
                  {cell.day !== null ? (
                    <>
                      <span className="text-sm font-semibold text-[var(--earth-brown)]">
                        {cell.day}
                      </span>
                      {hasEvents ? (
                        <ul className="mt-1 space-y-0.5">
                          {cell.events.map((event) => (
                            <li
                              key={event.id}
                              className="truncate text-[10px] font-medium leading-tight text-[var(--forest-green)] sm:text-[11px]"
                              title={event.title}
                            >
                              {event.title}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {monthEvents.length > 0 ? (
        <div className="mt-8 border-t border-[var(--stone)] pt-6">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--mist-blue)]">
            Upcoming this month
          </p>
          <ul className="mt-4 space-y-3">
            {monthEvents.map((event) => (
              <li
                key={event.id}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-[var(--radius)] bg-[var(--cream)] px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-[var(--earth-brown)]">
                    {event.title}
                  </p>
                  {event.location ? (
                    <p className="mt-1 text-[var(--charcoal)]/80">
                      {event.location}
                    </p>
                  ) : null}
                </div>
                <p className="font-medium text-[var(--forest-green)]">
                  {formatEventDate(event.date)}
                  {event.time ? ` · ${event.time}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function formatEventDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
