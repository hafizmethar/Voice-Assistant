// --- Human-friendly time helpers ---

// Parse phrases like:
// "at 7 am", "at 7:30 pm", "19:20", "in 5 minutes", "in 2 hours"
export function parseAlarmTextToDate(input) {
  const now = new Date();
  const txt = (input || "").toLowerCase().trim().replace(/^at\s+/, "");

  // "in X minute(s)/hour(s)"
  const relMin = txt.match(/in\s+(\d+)\s+minute/);
  if (relMin) {
    const d = new Date(now.getTime() + parseInt(relMin[1], 10) * 60 * 1000);
    d.setSeconds(0, 0);
    return d;
  }
  const relHr = txt.match(/in\s+(\d+)\s+hour/);
  if (relHr) {
    const d = new Date(now.getTime() + parseInt(relHr[1], 10) * 60 * 60 * 1000);
    d.setSeconds(0, 0);
    return d;
  }

  // "7 am" | "7:30 pm"
  const m12 = txt.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (m12) {
    let hr = parseInt(m12[1], 10);
    const min = m12[2] ? parseInt(m12[2], 10) : 0;
    const ampm = m12[3];
    if (ampm === "pm" && hr !== 12) hr += 12;
    if (ampm === "am" && hr === 12) hr = 0;
    const d = new Date(now);
    d.setSeconds(0, 0);
    d.setHours(hr, min, 0, 0);
    if (d <= now) d.setDate(d.getDate() + 1);
    return d;
  }

  // "19:45"
  const m24 = txt.match(/^(\d{1,2}):(\d{2})$/);
  if (m24) {
    const hr = parseInt(m24[1], 10);
    const min = parseInt(m24[2], 10);
    const d = new Date(now);
    d.setSeconds(0, 0);
    d.setHours(hr, min, 0, 0);
    if (d <= now) d.setDate(d.getDate() + 1);
    return d;
  }

  // "7" -> next 7:00
  const onlyHr = txt.match(/^(\d{1,2})$/);
  if (onlyHr) {
    const hr = parseInt(onlyHr[1], 10);
    const d = new Date(now);
    d.setSeconds(0, 0);
    d.setHours(hr, 0, 0, 0);
    if (d <= now) d.setDate(d.getDate() + 1);
    return d;
  }

  return null;
}

export function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDateTime(date) {
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

export function getCurrentTime() {
  return formatTime(new Date());
}

export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning!";
  if (h < 18) return "Good afternoon!";
  return "Good evening!";
}
