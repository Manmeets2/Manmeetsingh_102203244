# 🎨 Dynamic UI Editor

A fully interactive React-based UI customization tool that allows users to dynamically modify design components — including typography, buttons, color palettes, gallery layout, and product previews — all in real-time.

Built with React, Lucide Icons, and a focus on user-centered design and live preview interactions.
Includes advanced controls such as  Zoom & Rotate tools, and Layout switching (Vertical ↔ Horizontal).

🚀 Features Overview

🎨 Live Preview Customization — Real-time updates to UI components

🪄 Typography Controls — Font family, size, and weight adjustments

🎛️ Button Editor — Change color, radius, alignment, and shadow depth

🖼️ Product Gallery Customization — Spacing, alignment, and tint selection

🔄 Zoom, Rotate, and Reset Controls for 3D-style product visualization

🧭 Layout Toggle — Seamless transition between vertical and horizontal orientations

🧰 Tech Stack

Category	Tools / Frameworks
Frontend	React (Vite)
UI Icons	Lucide-react
Language	JavaScript (ES6)
Styling	Inline CSS + Variables
Build Tool	Vite
Version Control	Git + GitHub

🧩 Project Structure
src/
├── App.jsx           # Main component (UI logic + state management)
├── assets/           # Product images (chair, sofa, table)
├── App.css           # Root styles and responsive layout
└── index.js          # ReactDOM entry point

⚙️ Setup & Installation
Clone the repository

Navigate to project directory
cd dynamic-ui-editor

Install dependencies
npm install

Run locally
npm run dev


Then open http://localhost:5173/
 in your browser.

🧩 Component API and Configurable Props

The editor is fully modular, with all UI attributes controlled by a central state object (config).
Each property in config corresponds to a customizable UI parameter.

1️⃣ Typography Props

Prop	Type	Default	Description
family	string	"Inter"	Font family for product title
weight	number	400	Font weight
size	number	16	Font size in pixels

2️⃣ Button Props
Prop	Type	Default	Description
radius	number	10	Button corner radius
shadow	string	"medium"	Shadow depth
align	string	"right"	Button alignment
bg	string	"#cb5d4a"	Background color
text	string	"#ffffff"	Text color

3️⃣ Gallery Props
Prop	Type	Default	Description
align	string	"center"	Alignment of images
spacing	number	12	Gap between gallery images
radius	number	10	Corner radius of gallery items

4️⃣ Layout Props
Prop	Type	Default	Description
cardRadius	number	12	Outer card container radius
padding	number	18	Padding for main content card
sectionBg	string	"#ffffff"	Section background color

5️⃣ Product Props
Prop	Type	Default	Description
tint	string	"#ffffff"	Product overlay tint color

🧠 How the Editor Works

The Dynamic UI Editor operates through reactive state management and real-time re-rendering.

Each user control (slider, color picker, dropdown) triggers the update(path, value) function.

The function recursively updates the config object using the specified property path.

function update(path, value) {
  const keys = path.split(".");
  let newConfig = { ...config };
  let current = newConfig;
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  setConfig(newConfig);
}


React re-renders the preview dynamically with the updated config values.

The live preview panel immediately reflects the visual changes without reloading or rebuilding.

This system allows for a highly modular UI, where each component (typography, button, gallery) is reactive, independent, and easy to extend.

🧠 Decisions on Customizations & UX Improvements

Implemented for better usability and accessibility.

Uses simple theme switching with useState and conditional styling.

🧭 2. Layout Responsiveness

“Vertical” layout emphasizes text + product hierarchy.

“Horizontal” layout prioritizes the product image and gallery below.

🪟 3. Scrollable Gallery in Horizontal Layout

Prevents overflow and clutter by allowing horizontal scrolling when images exceed screen width.

💫 4. Real-Time Tinting

Overlay tint applies color filter dynamically using mix-blend-mode: color, maintaining the original shading of the object.

🧩 5. Extended Color Palette

Horizontal layout includes an extended palette for richer product customization.

💡 6. Human-Centered UI Design

Clean typography and clear section separation.

Intuitive sliders and dropdowns.

Visual feedback via transitions and smooth animations.


👨‍💻 Author

Manmeet Singh
📧 manmeetsinghs187@gmail.com


✅ Summary

This project combines React state management, dynamic preview rendering, and customizable component APIs to demonstrate modular front-end UI design.
It is an ideal example for portfolio demonstration, UI/UX internships, and React component engineering.

📁 Recommended Next Steps

Integrate localStorage to persist last-edited state

Add color picker UI instead of hard-coded palettes

Allow uploading custom product images