# Temperature Converter

**OIBSIP · Web Development & Designing · Level 1 · Task 3**

An interactive web tool that converts a temperature between **Celsius,
Fahrenheit, and Kelvin** — showing all three units at once — with real-time
input validation and absolute-zero handling.

## 🎯 Objective
Build a converter that takes a value and an input unit, validates it, and
displays the equivalent in every unit with correct labels.

## ✅ Feature Checklist (all met)
- [x] Numeric input field that **rejects non-numeric input** with an error message
- [x] Input-unit selector (Celsius / Fahrenheit / Kelvin) as radio buttons
- [x] Shows **all output units simultaneously**, with clear unit labels
- [x] **Convert** button triggers the calculation
- [x] Result display area with the source unit highlighted
- [x] **Absolute-zero edge case** — friendly message for values below −273.15 °C (0 K)
- [x] Clean, centered UI layout with clear labels

## 🧮 Conversion Formulas
| From → To | Formula |
|-----------|---------|
| °C → °F | `°C × 9/5 + 32` |
| °F → °C | `(°F − 32) × 5/9` |
| °C → K  | `°C + 273.15` |
| K → °C  | `K − 273.15` |

All inputs are first converted to Celsius (a common base), then to the other units.

## 🛠 Tech Stack
- HTML5 · CSS3 (custom properties, Grid, responsive) · Vanilla JavaScript

## ▶️ How to Run
Open `index.html` in any modern browser. Enter a value, pick the input unit,
and press **Convert** (or hit Enter).

### Try these
- `36.6` in °C → body temperature in °F / K
- `-8.5` in °C → a valid sub-zero value
- `-300` in °C → triggers the absolute-zero warning
- `abc` → triggers the non-numeric validation error

## 📸 Screenshots
See the `screenshots/` folder.
