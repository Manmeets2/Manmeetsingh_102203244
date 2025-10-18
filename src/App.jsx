//this jsx is 
import React, { useState } from "react";
import { Plus, Minus, Move, Maximize, LayoutGrid, Download } from "lucide-react"; // ✅ Added Download icon

const defaultConfig = {
  typography: { family: "Inter", weight: 400, size: 16 },
  button: {
    radius: 10,
    shadow: "medium",
    align: "right",
    bg: "#cb5d4a",
    text: "#ffffff",
  },
  gallery: { align: "center", spacing: 12, radius: 10 },
  layout: { cardRadius: 12, padding: 18, sectionBg: "#ffffff" },
  stroke: { color: "#e5e7eb", weight: 1 },
  product: { tint: "#ffffff" },
};

const fontFamilies = ["Inter", "Roboto", "Poppins", "Arial", "Georgia"];
const shadows = {
  none: "none",
  small: "0 2px 6px rgba(0,0,0,0.08)",
  medium: "0 6px 18px rgba(0,0,0,0.12)",
  large: "0 12px 28px rgba(0,0,0,0.16)",
};

function App() {
  const [config, setConfig] = useState(defaultConfig);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [layoutMode, setLayoutMode] = useState("vertical");

  const galleryImages = [
    "/soff-removebg-preview.png",
    "/chair.png",
    "/tablee.png",
  ];

  const verticalPalette = [
    "#b0c4de",
    "#f5deb3",
    "#a0522d",
    "#556b2f",
    "#8b4513",
    "#708090",
    "#bc8f8f",
    "#4682b4",
    "#d2b48c",
    "#deb887",
  ];

  const horizontalPalette = [
    "#b0c4de",
    "#f5deb3",
    "#a0522d",
    "#556b2f",
    "#8b4513",
    "#708090",
    "#bc8f8f",
    "#4682b4",
    "#d2b48c",
    "#deb887",
    "#cd853f",
    "#8fbc8f",
    "#3cb371",
    "#90ee90",
    "#9370db",
    "#ff6347",
    "#e9967a",
    "#c0c0c0",
  ];

  const activePalette =
    layoutMode === "vertical" ? verticalPalette : horizontalPalette;

  function update(path, value) {
    setConfig((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  }

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 1.8));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.7));
  const rotateLeft = () => setRotation((r) => r - 15);
  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };
  const toggleLayout = () =>
    setLayoutMode((prev) => (prev === "vertical" ? "horizontal" : "vertical"));

  // ✅ ADDED: Function to export configuration as JSON file
  const exportConfig = () => {
    const exportData = {
      config,
      layoutMode,
      zoom,
      rotation,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ui_config_${layoutMode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      {/* ===== LEFT EDITOR PANEL ===== */}
      <div className="editor">
        <h3>Dynamic UI Editor</h3>

        {/* ✅ ADDED: Export Button */}
        <button
          onClick={exportConfig}
          style={{
            background: "#4b5563",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "8px 14px",
            cursor: "pointer",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Download size={16} />
          Export Config (JSON)
        </button>

        {/* Typography */}
        <h4>Typography</h4>
        <div className="row">
          <div className="label">Font Family</div>
          <select
            value={config.typography.family}
            onChange={(e) => update("typography.family", e.target.value)}
          >
            {fontFamilies.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="label">Font Weight</div>
          <select
            value={config.typography.weight}
            onChange={(e) =>
              update("typography.weight", Number(e.target.value))
            }
          >
            {[300, 400, 500, 600, 700].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="label">Font Size</div>
          <input
            type="range"
            min={12}
            max={48}
            value={config.typography.size}
            onChange={(e) => update("typography.size", Number(e.target.value))}
          />
          <div style={{ width: 40, textAlign: "right" }}>
            {config.typography.size}px
          </div>
        </div>

        <hr />

        {/* Layout Toggle Button */}
        <h4>Layout Mode</h4>
        <button
          onClick={toggleLayout}
          style={{
            background: "#cb5d4a",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "8px 14px",
            cursor: "pointer",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LayoutGrid size={16} />
          Switch to {layoutMode === "vertical" ? "Horizontal" : "Vertical"} Layout
        </button>

        <hr />

        {/* Product color palette */}
        <h4>Product Color</h4>
        <div className="row">
          <div className="label">
            Tint{" "}
            <span style={{ fontSize: "12px", color: "#888" }}>
              ({layoutMode === "vertical" ? "Default" : "Extended"} Palette)
            </span>
          </div>
          <div
            className="colors"
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, 28px)",
              gap: "6px",
            }}
          >
            {activePalette.map((c) => (
              <div
                key={c}
                className="color-swatch"
                style={{
                  background: c,
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => update("product.tint", c)}
              />
            ))}
          </div>
        </div>

        <hr />

        {/* Button */}
        <h4>Button</h4>
        <div className="row">
          <div className="label">Border Radius</div>
          <input
            type="range"
            min={0}
            max={30}
            value={config.button.radius}
            onChange={(e) => update("button.radius", Number(e.target.value))}
          />
        </div>

        <div className="row">
          <div className="label">Shadow</div>
          <select
            value={config.button.shadow}
            onChange={(e) => update("button.shadow", e.target.value)}
          >
            {Object.keys(shadows).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="label">Alignment</div>
          <select
            value={config.button.align}
            onChange={(e) => update("button.align", e.target.value)}
          >
            {["left", "center", "right"].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="label">BG Color</div>
          <input
            type="text"
            value={config.button.bg}
            onChange={(e) => update("button.bg", e.target.value)}
          />
        </div>
        <div className="row">
          <div className="label">Text Color</div>
          <input
            type="text"
            value={config.button.text}
            onChange={(e) => update("button.text", e.target.value)}
          />
        </div>

        <hr />

        {/* Gallery */}
        <h4>Gallery</h4>
        <div className="row">
          <div className="label">Alignment</div>
          <select
            value={config.gallery.align}
            onChange={(e) => update("gallery.align", e.target.value)}
          >
            {["left", "center", "right"].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <div className="label">Spacing</div>
          <input
            type="range"
            min={0}
            max={40}
            value={config.gallery.spacing}
            onChange={(e) =>
              update("gallery.spacing", Number(e.target.value))
            }
          />
        </div>
        <div className="row">
          <div className="label">Image Radius</div>
          <input
            type="range"
            min={0}
            max={30}
            value={config.gallery.radius}
            onChange={(e) =>
              update("gallery.radius", Number(e.target.value))
            }
          />
        </div>
      </div>

      {/* ===== RIGHT PREVIEW PANEL ===== */}
      <div className="preview">
        <h3 style={{ marginBottom: 10 }}>
          Preview <span className="small-muted">(Live)</span>
        </h3>

       <div
  className="card-shell"
  style={{
    borderRadius: config.layout.cardRadius,
    padding: config.layout.padding,
    background: config.layout.sectionBg,
    border: `${config.stroke.weight}px solid ${config.stroke.color}`,
    display: "flex",
    flexDirection:
      layoutMode === "horizontal" ? "column" : "column", // force column for both
    alignItems: "center",
    justifyContent: "center",
    gap: layoutMode === "horizontal" ? 28 : 20,
    width: layoutMode === "horizontal" ? "90%" : "60%",
    height: layoutMode === "horizontal" ? "650px" : "auto",
    margin: "0 auto",
    transition: "all 0.3s ease",
  }}
>

          {/* === 3D Sofa Viewer with Toolbar === */}
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={galleryImages[0]}
              alt="Sofa"
              style={{
                width: `${zoom * 65}%`,
                transform: `rotateY(${rotation}deg)`,
                transition: "all 0.4s ease",
                objectFit: "contain",
                filter: `drop-shadow(0 20px 25px rgba(0,0,0,0.25))`,
                mixBlendMode:
                  config.product.tint === "#ffffff" ? "normal" : "multiply",
              }}
            />

            {/* Tint overlay */}
            <div
              style={{
                position: "absolute",
                width: `${zoom * 65}%`,
                height: "75.4%",
                top: 0,
                left: "40%",
                transform: "translateX(-39%)",
                backgroundColor:
                  config.product.tint === "#ffffff"
                    ? "transparent"
                    : config.product.tint,
                mixBlendMode: "color",
                pointerEvents: "none",
                borderRadius: config.gallery.radius,
                transition: "all 0.5s ease",
              }}
            ></div>

            {/* Shadow */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "15%",
                width: "70%",
                height: "40px",
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)",
                filter: "blur(6px)",
                borderRadius: "80%",
              }}
            ></div>

            {/* Toolbar */}
            <div
              style={{
                position: "absolute",
                right: "16px",
                top: "45%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button
                className="toolbar-btn"
                onClick={rotateLeft}
                title="Rotate"
              >
                <Move size={18} />
              </button>
              <button
                className="toolbar-btn"
                onClick={resetView}
                title="Center"
              >
                <Maximize size={18} />
              </button>
              <button
                className="toolbar-btn"
                onClick={zoomIn}
                title="Zoom In"
              >
                <Plus size={18} />
              </button>
              <button
                className="toolbar-btn"
                onClick={zoomOut}
                title="Zoom Out"
              >
                <Minus size={18} />
              </button>
            </div>
          </div>

          {/* Gallery row */}
          <div
            style={{
              display: "flex",
              justifyContent: config.gallery.align,
              gap: config.gallery.spacing,
              flexWrap: layoutMode === "horizontal" ? "nowrap" : "wrap",
              overflowX: layoutMode === "horizontal" ? "auto" : "visible",
              width: "100%",
            }}
          >
            {galleryImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="gallery"
                style={{
                  width: 120,
                  height: 100,
                  borderRadius: config.gallery.radius,
                  objectFit: "cover",
                  border: `1px solid ${config.stroke.color}`,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Product Title + Button */}
          <div
            style={{
              display: "flex",
              justifyContent: config.button.align,
              alignItems: "center",
              width: "100%",
              gap: 12,
            }}
          >
            <h4
              style={{
                fontFamily: config.typography.family,
                fontWeight: config.typography.weight,
                fontSize: config.typography.size + 4,
              }}
            >
              Cozy Lounge Chair
            </h4>
            <button
              style={{
                borderRadius: config.button.radius,
                padding: "10px 16px",
                background: config.button.bg,
                color: config.button.text,
                border: "none",
                boxShadow: shadows[config.button.shadow],
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


