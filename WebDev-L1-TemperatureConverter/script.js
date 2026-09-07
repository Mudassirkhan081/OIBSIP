/* ==========================================================================
   Temperature Converter — logic (vanilla JavaScript)
   Converts between Celsius, Fahrenheit and Kelvin.
   • Validates numeric input
   • Rejects values below absolute zero (−273.15 °C)
   • Shows all three units at once, highlighting the source unit
   ========================================================================== */

(function () {
  "use strict";

  const form     = document.getElementById("converterForm");
  const input    = document.getElementById("tempInput");
  const errorEl  = document.getElementById("error");
  const results  = document.getElementById("results");
  const outC     = document.getElementById("outC");
  const outF     = document.getElementById("outF");
  const outK     = document.getElementById("outK");

  const ABS_ZERO_C = -273.15; // lowest possible temperature in Celsius

  /* ---------- Conversions (via Celsius as the common base) ---------- */
  function toCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value - 32) * 5 / 9;
    if (unit === "K") return value - 273.15;
  }
  const cToF = function (c) { return c * 9 / 5 + 32; };
  const cToK = function (c) { return c + 273.15; };

  /* ---------- Formatting: max 2 decimals, no "-0", tidy output ---------- */
  function fmt(n) {
    const rounded = Math.round((n + Number.EPSILON) * 100) / 100;
    const clean = Object.is(rounded, -0) ? 0 : rounded;
    return String(clean);
  }

  /* ---------- Helpers ---------- */
  function getSelectedUnit() {
    return document.querySelector('input[name="unit"]:checked').value;
  }

  function showError(msg) {
    errorEl.textContent = msg;
    input.classList.add("invalid");
    results.hidden = true;
  }

  function clearError() {
    errorEl.textContent = "";
    input.classList.remove("invalid");
  }

  /* ---------- Main convert routine ---------- */
  function convert() {
    const raw = input.value.trim();

    // 1) Empty check
    if (raw === "") {
      showError("Please enter a temperature value.");
      return;
    }

    // 2) Numeric validation — reject anything that isn't a finite number
    const value = Number(raw);
    if (!Number.isFinite(value)) {
      showError('"' + raw + '" is not a valid number. Enter digits only (e.g. 25 or -8.5).');
      return;
    }

    const unit = getSelectedUnit();
    const celsius = toCelsius(value, unit);

    // 3) Absolute-zero edge case
    if (celsius < ABS_ZERO_C - 1e-9) {
      showError("🥶 That's below absolute zero! Nothing can be colder than −273.15 °C (0 K / −459.67 °F).");
      return;
    }

    // 4) Success — show all three units
    clearError();
    outC.textContent = fmt(celsius);
    outF.textContent = fmt(cToF(celsius));
    outK.textContent = fmt(cToK(celsius));

    // Highlight the card that matches the input unit
    document.querySelectorAll(".result").forEach(function (el) {
      el.classList.toggle("is-source", el.getAttribute("data-unit") === unit);
    });

    results.hidden = false;
  }

  /* ---------- Events ---------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    convert();
  });

  // Clear the error as soon as the user edits the value
  input.addEventListener("input", function () {
    if (errorEl.textContent) clearError();
  });

  // If results are already visible, re-convert instantly when the unit changes
  document.querySelectorAll('input[name="unit"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (!results.hidden || input.value.trim() !== "") convert();
    });
  });
})();
