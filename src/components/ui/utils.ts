import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Encodes a name to a URL-safe base64 string
 * @param name - The name to encode
 * @returns Encoded string
 */
export function encodeName(name: string): string {
  try {
    // Use base64 encoding with URL-safe characters
    return btoa(encodeURIComponent(name))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch {
    return '';
  }
}

/**
 * Decodes a URL-safe base64 string back to a name
 * @param encoded - The encoded string
 * @returns Decoded name or null if invalid
 */
export function decodeName(encoded: string): string | null {
  try {
    // Restore URL-safe base64 to standard base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    // Decode
    const decoded = decodeURIComponent(atob(base64));
    // Validate that it's a reasonable name (letters, spaces, hyphens, apostrophes)
    if (/^[a-zA-Z\s\-'\.]+$/.test(decoded) && decoded.trim().length > 0 && decoded.length <= 50) {
      return decoded.trim();
    }
    return null;
  } catch {
    return null;
  }
}
