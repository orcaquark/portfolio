const username = "orcaquark";
const HEATMAP_DAYS = 320; // a full year, now that the heatmap has its own dedicated box

async function loadGithubActivity() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );
    const data = await res.json();

    const heatmap = document.getElementById("github-heatmap");
    const totalEl = document.getElementById("github-total");

    const allDays = data.contributions || [];

    if (!allDays.length) {
      console.warn("No contribution data parsed", data);
      totalEl.textContent = "0 contributions";
      return;
    }

    // keep only the most recent year of days
    const days = allDays.slice(-HEATMAP_DAYS);

    const total = days.reduce((sum, d) => sum + (d.count || 0), 0);
    totalEl.textContent = `${total} contributions`;

    const max = Math.max(...days.map(d => d.count || 0));

    function getLevel(count) {
      if (count === 0) return 0;
      const n = Math.log1p(count) / Math.log1p(max || 1);
      return Math.min(4, Math.floor(n * 4) + 1);
    }

    // group the flat array into weeks of 7 days each
    heatmap.innerHTML = "";
    for (let i = 0; i < days.length; i += 7) {
      const week = days.slice(i, i + 7);
      const col = document.createElement("div");
      col.className = "github-week";

      week.forEach(day => {
        const count = day.count || 0;
        const cell = document.createElement("div");
        cell.className = "github-cell level-" + getLevel(count);
        cell.title = `${day.date || ""}: ${count}`;
        col.appendChild(cell);
      });

      heatmap.appendChild(col);
    }

  } catch (err) {
    console.error("GitHub heatmap failed:", err);
  }
}

loadGithubActivity();