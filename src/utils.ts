interface DarkenColor {
  color: string;
}

export function darkenColorForContrast(
  color: string,
  textColor: string,
  contrastRatio: number
) {
  // Helper function to calculate the contrast ratio between two colors
  function getContrastRatio(color1: string, color2: string) {
    // Convert color strings to RGB values
    function hexToRgb(color: string) {
      const hex = color.replace("#", "");
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    }

    // Calculate the relative luminance of a color
    function calculateRelativeLuminance(color: number[]) {
      const [r, g, b] = color;
      const sRGB = [r / 255, g / 255, b / 255];
      const rgb = sRGB.map((c) => {
        if (c <= 0.03928) {
          return c / 12.92;
        } else {
          return Math.pow((c + 0.055) / 1.055, 2.4);
        }
      });
      const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
      return luminance;
    }

    const color1Luminance = calculateRelativeLuminance(hexToRgb(color1));
    const color2Luminance = calculateRelativeLuminance(hexToRgb(color2));
    const contrastRatio =
      (Math.max(color1Luminance, color2Luminance) + 0.05) /
      (Math.min(color1Luminance, color2Luminance) + 0.05);
    return contrastRatio;
  }

  // Helper function to darken a color
  function darkenColor(color: string, amount: number) {
    const parseColor = (c: string) => parseInt(c, 16);
    const lighten = (c: string, amount: number) =>
      Math.round(Math.min(255, parseColor(c) + amount))
        .toString(16)
        .padStart(2, "0");

    return `#${lighten(color.slice(1, 3), amount)}${lighten(
      color.slice(3, 5),
      amount
    )}${lighten(color.slice(5, 7), amount)}`;
  }

  const currentContrastRatio = getContrastRatio(color, textColor);

  if (currentContrastRatio < contrastRatio) {
    // Calculate the amount by which the color needs to be darkened
    const luminanceDifference =
      (1 / contrastRatio - 1 / currentContrastRatio) * 100;
    const darkenAmount = Math.round(luminanceDifference);

    // Darken the color
    const darkenedColor = darkenColor(color, darkenAmount);
    return darkenedColor;
  }

  // Return the original color if the contrast ratio is already achieved
  return color;
}

export function rgbToHex(rgb: number[]) {
  // Validate the input
  if (rgb.length !== 3 || rgb.some((value) => value < 0 || value > 255)) {
    throw new Error(
      "Invalid RGB values. Values should be an array of three numbers between 0 and 255."
    );
  }

  // Convert each component to a hexadecimal string
  const hexR = rgb[0].toString(16).padStart(2, "0");
  const hexG = rgb[1].toString(16).padStart(2, "0");
  const hexB = rgb[2].toString(16).padStart(2, "0");

  // Concatenate the components and return the hex color code
  return `#${hexR}${hexG}${hexB}`;
}
export function hexToRGBA(hex: string, alpha: number) {
  // Remove the # symbol if present
  hex = hex.replace("#", "");

  // Check if the hex value is short (3 characters) or long (6 characters)
  const isShortHex = hex.length === 3;

  // Convert short hex to long hex
  if (isShortHex) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Parse the hex value to decimal
  const decimal = parseInt(hex, 16);

  // Extract the red, green, and blue components
  const red = (decimal >> 16) & 255;
  const green = (decimal >> 8) & 255;
  const blue = decimal & 255;

  // Calculate the alpha value (default to 1 if not provided)
  alpha = alpha === undefined ? 1 : alpha;

  // Create and return the RGBA color value
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
