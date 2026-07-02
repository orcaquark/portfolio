(async () => {
  const USER_ID = "710219153604345907"; // paste your ID here
  const el = document.getElementById("discord-status");
  if (!el) return;

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
    if (!res.ok) return; // silently fail, keep fallback text

    const { data } = await res.json();

    // type 4 = custom status activity
    const custom = data.activities?.find(a => a.type === 4);
    const text = custom?.state?.trim();

    if (text) el.textContent = text;
    // if no custom status set, fallback text stays as-is

  } catch {
    // network error — fallback text stays as-is
  }
})();