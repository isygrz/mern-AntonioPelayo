export function generateSecureId() {
  const array = new Uint8Array(16); // 128-bit token
  window.crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}
