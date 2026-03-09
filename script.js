const titleInput = document.getElementById("titleInput");
const channelInput = document.getElementById("channelInput");
const durationInput = document.getElementById("durationInput");
const safeZoneToggle = document.getElementById("safeZoneToggle");
const darkModeToggle = document.getElementById("darkModeToggle");
const thumbnailInput = document.getElementById("thumbnailInput");
const uploadTrigger = document.getElementById("uploadTrigger");
const fileName = document.getElementById("fileName");
const exportButton = document.getElementById("exportButton");
const previewsPanel = document.querySelector(".previews");

const titleTargets = document.querySelectorAll("[data-title]");
const channelTargets = document.querySelectorAll("[data-channel]");
const durationTargets = document.querySelectorAll("[data-duration]");
const previewImages = document.querySelectorAll(".thumb-canvas img");
const safeZones = document.querySelectorAll(".safe-zone");

const defaultState = {
  title: "How to Make Better YouTube Thumbnails That Still Look Clear on Mobile",
  channel: "Creator Studio Lab",
  duration: "12:48",
  image: createSampleThumbnail(),
};

let currentImage = defaultState.image;

function createSampleThumbnail() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ef4444" />
          <stop offset="45%" stop-color="#b91c1c" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)" />
      <circle cx="935" cy="240" r="170" fill="rgba(255,255,255,0.13)" />
      <circle cx="1035" cy="135" r="58" fill="rgba(255,255,255,0.18)" />
      <rect x="70" y="86" width="620" height="70" rx="20" fill="rgba(255,255,255,0.14)" />
      <text x="84" y="133" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#fff">YOUTUBE THUMBNAIL CHECK</text>
      <text x="80" y="318" font-family="Arial, sans-serif" font-size="86" font-weight="900" fill="#fff">SAFE ZONE</text>
      <text x="80" y="412" font-family="Arial, sans-serif" font-size="86" font-weight="900" fill="#fde68a">MOBILE TEST</text>
      <text x="84" y="494" font-family="Arial, sans-serif" font-size="30" font-weight="600" fill="rgba(255,255,255,0.82)">Preview text size before you publish</text>
      <rect x="80" y="546" width="364" height="84" rx="22" fill="#fff" />
      <text x="126" y="599" font-family="Arial, sans-serif" font-size="34" font-weight="900" fill="#b91c1c">FREE TOOL</text>
      <rect x="866" y="408" width="252" height="230" rx="32" fill="rgba(255,255,255,0.1)" />
      <circle cx="992" cy="286" r="118" fill="#f8fafc" />
      <circle cx="992" cy="256" r="56" fill="#cbd5e1" />
      <path d="M905 394c20-47 67-78 122-78 54 0 101 31 121 78" fill="#cbd5e1" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function clampDuration(value) {
  const trimmed = value.trim();
  return trimmed || "12:48";
}

function clampChannel(value) {
  const trimmed = value.trim();
  return trimmed || "Your Channel";
}

function clampTitle(value) {
  const trimmed = value.trim();
  return trimmed || defaultState.title;
}

function updatePreviewText() {
  const title = clampTitle(titleInput.value);
  const channel = clampChannel(channelInput.value);
  const duration = clampDuration(durationInput.value);

  titleTargets.forEach((node) => {
    node.textContent = title;
  });

  channelTargets.forEach((node) => {
    node.textContent = channel;
  });

  durationTargets.forEach((node) => {
    node.textContent = duration;
  });
}

function updateImages(src) {
  previewImages.forEach((image) => {
    image.src = src;
  });
}

function toggleSafeZones() {
  const hidden = !safeZoneToggle.checked;
  safeZones.forEach((zone) => {
    zone.classList.toggle("is-hidden", hidden);
  });
}

function toggleDarkMode() {
  const enabled = darkModeToggle.checked;
  previewsPanel.classList.toggle("is-dark", enabled);
  const label = darkModeToggle.parentElement.querySelector(".switch__label");
  label.textContent = enabled ? "On" : "Off";
}

function loadLocalImage(file) {
  if (!file) {
    return;
  }

  const isSupported = ["image/png", "image/jpeg"].includes(file.type);
  if (!isSupported) {
    fileName.textContent = "Unsupported file. Please choose a PNG or JPG image.";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    currentImage = reader.result;
    updateImages(currentImage);
    fileName.textContent = `Loaded: ${file.name}`;
  };
  reader.readAsDataURL(file);
}

function drawRoundedRect(ctx, x, y, width, height, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

function drawMultilineText(ctx, text, x, y, maxWidth, lineHeight, maxLines, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line) {
    lines.push(line);
  }

  lines.slice(0, maxLines).forEach((content, index) => {
    const isLastVisibleLine = index === maxLines - 1 && lines.length > maxLines;
    const safeText = isLastVisibleLine ? `${content.replace(/[.,;:!?-]?$/, "")}…` : content;
    ctx.fillText(safeText, x, y + index * lineHeight);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function exportPreviewBoard() {
  exportButton.disabled = true;
  exportButton.textContent = "Preparing export...";

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1500;
    const ctx = canvas.getContext("2d");
    const image = await loadImage(currentImage);
    const title = clampTitle(titleInput.value);
    const channel = clampChannel(channelInput.value);
    const duration = clampDuration(durationInput.value);
    const showSafeZone = safeZoneToggle.checked;

    ctx.fillStyle = "#f5f7fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRoundedRect(ctx, 40, 40, 1520, 140, 28, "#ffffff");
    ctx.fillStyle = "#dc2626";
    ctx.font = "700 24px Arial";
    ctx.fillText("YouTube Thumbnail Preview Board", 86, 105);
    ctx.fillStyle = "#0f172a";
    ctx.font = "700 44px Arial";
    ctx.fillText("Desktop, Mobile, and Sidebar Thumbnail Check", 84, 154);

    function drawThumbCard({ x, y, width, titleLabel, layout }) {
      const height = layout === "sidebar" ? 320 : 410;
      drawRoundedRect(ctx, x, y, width, height, 24, "#ffffff");
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);

      ctx.fillStyle = "#0f172a";
      ctx.font = "700 26px Arial";
      ctx.fillText(titleLabel, x + 26, y + 42);
      ctx.fillStyle = "#64748b";
      ctx.font = "400 18px Arial";
      ctx.fillText(layout === "mobile" ? "Smaller feed layout" : layout === "sidebar" ? "Suggested video slot" : "Desktop home feed", x + 26, y + 72);

      const thumbX = x + 26;
      const thumbY = y + 96;
      const thumbW = layout === "sidebar" ? 230 : width - 52;
      const thumbH = Math.round((thumbW * 9) / 16);

      ctx.save();
      ctx.beginPath();
      drawRoundedRect(ctx, thumbX, thumbY, thumbW, thumbH, 18, "#dbeafe");
      ctx.clip();
      ctx.drawImage(image, thumbX, thumbY, thumbW, thumbH);
      ctx.restore();

      if (showSafeZone) {
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 8]);
        ctx.strokeRect(thumbX + thumbW * 0.08, thumbY + thumbH * 0.08, thumbW * 0.84, thumbH * 0.84);
        ctx.setLineDash([]);
        drawRoundedRect(
          ctx,
          thumbX + thumbW * 0.74,
          thumbY + thumbH * 0.74,
          thumbW * 0.2,
          thumbH * 0.18,
          8,
          "rgba(220,38,38,0.35)"
        );
      }

      drawRoundedRect(ctx, thumbX + thumbW - 82, thumbY + thumbH - 38, 72, 28, 8, "rgba(15,23,42,0.88)");
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 16px Arial";
      ctx.fillText(duration, thumbX + thumbW - 71, thumbY + thumbH - 19);

      const metaX = layout === "sidebar" ? thumbX + thumbW + 22 : x + 26;
      const metaY = layout === "sidebar" ? thumbY + 10 : thumbY + thumbH + 40;
      const metaW = layout === "sidebar" ? width - (thumbW + 74) : width - 52;

      if (layout === "desktop") {
        ctx.beginPath();
        ctx.fillStyle = "#fecaca";
        ctx.arc(metaX + 18, metaY + 18, 18, 0, Math.PI * 2);
        ctx.fill();
        drawMultilineText(ctx, title, metaX + 48, metaY + 8, metaW - 48, 28, 2, "#0f172a", "700 24px Arial");
        ctx.fillStyle = "#64748b";
        ctx.font = "400 18px Arial";
        ctx.fillText(`${channel}  -  124K views  -  2 days ago`, metaX + 48, metaY + 78);
      } else if (layout === "mobile") {
        drawMultilineText(ctx, title, metaX, metaY, metaW, 28, 2, "#0f172a", "700 24px Arial");
        ctx.fillStyle = "#64748b";
        ctx.font = "400 18px Arial";
        ctx.fillText(`${channel}  -  124K views`, metaX, metaY + 76);
      } else {
        drawMultilineText(ctx, title, metaX, metaY, metaW, 24, 2, "#0f172a", "700 20px Arial");
        ctx.fillStyle = "#64748b";
        ctx.font = "400 16px Arial";
        ctx.fillText(channel, metaX, metaY + 68);
        ctx.fillText("124K views", metaX, metaY + 94);
      }
    }

    drawThumbCard({ x: 40, y: 220, width: 1520, titleLabel: "Desktop Home Preview", layout: "desktop" });
    drawThumbCard({ x: 40, y: 670, width: 740, titleLabel: "Mobile Feed Preview", layout: "mobile" });
    drawThumbCard({ x: 820, y: 670, width: 740, titleLabel: "Sidebar Suggested Preview", layout: "sidebar" });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "youtube-thumbnail-preview-board.png";
    link.click();
  } catch (error) {
    console.error(error);
    fileName.textContent = "Export failed in this browser. Try another image or refresh and retry.";
  } finally {
    exportButton.disabled = false;
    exportButton.textContent = "Export Preview Board";
  }
}

titleInput.addEventListener("input", updatePreviewText);
channelInput.addEventListener("input", updatePreviewText);
durationInput.addEventListener("input", updatePreviewText);
safeZoneToggle.addEventListener("change", toggleSafeZones);
darkModeToggle.addEventListener("change", toggleDarkMode);

uploadTrigger.addEventListener("click", () => {
  thumbnailInput.click();
});

thumbnailInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  loadLocalImage(file);
});

exportButton.addEventListener("click", exportPreviewBoard);

updatePreviewText();
updateImages(currentImage);
toggleSafeZones();
toggleDarkMode();
