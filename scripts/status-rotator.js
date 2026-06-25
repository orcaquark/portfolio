document.addEventListener("DOMContentLoaded", () => {
  const prism = document.getElementById("status-prism");
  if (!prism) return;

  const rotator = prism.parentElement;
  const faces = prism.querySelectorAll(".status-face");
  const FACE_ANGLE = 360 / faces.length; // 72deg for a pentagon
  const HOLD_MS = 2500;

  // Radius based on the full container height — each face is exactly
  // `rotator.offsetHeight` tall, so the inscribed-prism radius formula
  // (s / (2*tan(pi/n))) needs the real height, not a fraction of it.
  function setRadius() {
    const radius = (rotator.offsetHeight / 2) / Math.tan(Math.PI / faces.length);
    prism.style.setProperty("--prism-radius", `${radius}px`);
  }

  setRadius();
  window.addEventListener("resize", setRadius);

  let i = 0;
  setInterval(() => {
    i++;
    // Negative angle: rotating "forward" brings the next face up from below,
    // pushing the current one up and out of view.
    prism.style.transform = `rotateX(${i * FACE_ANGLE}deg)`;
  }, HOLD_MS);
});