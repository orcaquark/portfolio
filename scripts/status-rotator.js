document.addEventListener("DOMContentLoaded", () => {
  const prism = document.getElementById("status-prism");
  if (!prism) return;

  const rotator = prism.parentElement;
  const faces = prism.querySelectorAll(".status-face");
  const FACE_ANGLE = 360 / faces.length; // 72deg for a pentagon
  const HOLD_MS = 2500;

  // Radius based on height now, since faces stack vertically.
  function setRadius() {
    const effectiveHeight = rotator.offsetHeight * 0.75;
    const radius = (effectiveHeight / 2) / Math.tan(Math.PI / faces.length);
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