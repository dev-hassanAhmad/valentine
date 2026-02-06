#!/usr/bin/env node

/**
 * Helper script to generate encoded URLs for the Valentine Proposal Website
 * 
 * Usage: node generate-url.js "Name"
 * Example: node generate-url.js "Caron"
 * 
 * This will output the full URL with the encoded receiver parameter
 */

function encodeName(name) {
  try {
    // Use base64 encoding with URL-safe characters
    // In Node.js, use Buffer instead of btoa
    const encoded = Buffer.from(encodeURIComponent(name), 'utf8').toString('base64');
    return encoded
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch {
    return '';
  }
}

// Get name from command line arguments
const name = process.argv[2];

if (!name) {
  console.error('Usage: node generate-url.js "Name"');
  console.error('Example: node generate-url.js "Caron"');
  process.exit(1);
}

const encoded = encodeName(name);
const baseUrl = process.argv[3] || 'http://localhost:5173'; // Default to local dev server
const fullUrl = `${baseUrl}?receiver=${encoded}`;

console.log('\n✨ Valentine Proposal URL Generator ✨\n');
console.log(`Name: ${name}`);
console.log(`Encoded: ${encoded}`);
console.log(`\nFull URL:\n${fullUrl}\n`);
console.log('Copy this URL and share it with your Valentine! 💖\n');
