const rgbText = document.getElementById("rgb");
const hexText = document.getElementById("hex");

let isDragging = false;
let activeDot = null;

function toHex(v) {
  return v.toString(16).padStart(2, "0");
}

function updateColor(x, y) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const r = Math.floor((x / w) * 255);
  const g = Math.floor((y / h) * 255);
  const b = Math.floor((r + g) / 2);

  const rgb = `rgb(${r}, ${g}, ${b})`;
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  document.body.style.background = rgb;
  rgbText.textContent = `RGB ${r}, ${g}, ${b}`;
  hexText.textContent = `HEX ${hex}`;

  return hex;
}

function createDot(x, y, color) {
  if (!activeDot) {
    activeDot = document.createElement("div");
    activeDot.className = "dot";
    document.body.appendChild(activeDot);
  }

  activeDot.style.left = `${x}px`;
  activeDot.style.top = `${y}px`;
  activeDot.style.background = color;
}

document.addEventListener("mousedown", (e) => {
  isDragging = true;
  const color = updateColor(e.clientX, e.clientY);
  createDot(e.clientX, e.clientY, color);
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const color = updateColor(e.clientX, e.clientY);
  createDot(e.clientX, e.clientY, color);
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  if (activeDot) {
    setTimeout(() => {
      activeDot.remove();
      activeDot = null;
    }, 300);
  }
});

/* Mobile support */
document.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  isDragging = true;
  const color = updateColor(t.clientX, t.clientY);
  createDot(t.clientX, t.clientY, color);
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const t = e.touches[0];
  const color = updateColor(t.clientX, t.clientY);
  createDot(t.clientX, t.clientY, color);
});

document.addEventListener("touchend", () => {
  isDragging = false;
  if (activeDot) {
    activeDot.remove();
    activeDot = null;
  }
});
