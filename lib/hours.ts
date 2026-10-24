// Opening hours are evaluated in India time regardless of the visitor's clock.
// Mon–Sat 9:30 AM–1 PM and 5–9 PM; Sunday closed. Wording matches the design.

export type OpenStatus = { open: boolean; text: string };

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  let day = 1;
  let mins = 600;
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    mins = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
  } catch {}

  if (day === 0) return { open: false, text: "Closed today (Sunday) · Opens Monday 9:30 AM" };
  if (mins < 570) return { open: false, text: "Closed now · Opens today at 9:30 AM" };
  if (mins < 780) return { open: true, text: "Open now · Until 1:00 PM" };
  if (mins < 1020) return { open: false, text: "Closed now · Reopens today at 5:00 PM" };
  if (mins < 1260) return { open: true, text: "Open now · Until 9:00 PM" };
  return {
    open: false,
    text: day === 6 ? "Closed now · Opens Monday 9:30 AM" : "Closed now · Opens tomorrow at 9:30 AM",
  };
}
