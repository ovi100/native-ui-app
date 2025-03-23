import { generateElevations } from './utils';

const sizes = {
  small: { space: 10, fontSize: 14, iconSize: 16 },
  medium: { space: 14, fontSize: 16, iconSize: 20 },
  large: { space: 18, fontSize: 18, iconSize: 24 },
};

let variants = {
  default: { bg: '#d1d5db', text: '#1f2937', iconColor: 'black' },
  brand: { bg: '#4f46e5', text: 'white', iconColor: 'white' },
  primary: { bg: '#3b82f6', text: 'white', iconColor: 'white' },
  secondary: { bg: '#a855f7', text: 'white', iconColor: 'white' },
  danger: { bg: '#ef4444', text: 'white', iconColor: 'white' },
  success: { bg: '#22c55e', text: 'white', iconColor: 'white' },
  warn: { bg: '#fb923c', text: 'white', iconColor: 'white' },
  cancel: { bg: '#e5e7eb', text: '#374151', iconColor: 'white' },
  action: { bg: '#bae6fd', text: '#1d4ed8', iconColor: 'white' },
  text: { bg: 'transparent', text: '#1d4ed8', iconColor: 'black' },
};

const lighten = (hex, percent = 30) => {
  // Remove '#' and parse RGB values
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Lighten each channel by the given percentage
  const light = value => Math.min(255, value + (255 - value) * (percent / 100));

  // Convert back to hex
  return `#${[r, g, b]
    .map(light)
    .map(v => Math.round(v).toString(16).padStart(2, '0'))
    .join('')}`;
};

const elevations = generateElevations();

export { elevations, sizes, variants, lighten };
