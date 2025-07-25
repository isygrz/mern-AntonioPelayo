import { generateSecureId } from '../utils/generateSecureId';

export function getGuestSessionId() {
  let sessionId = localStorage.getItem('guestSessionId');
  if (!sessionId) {
    sessionId = generateSecureId();
    localStorage.setItem('guestSessionId', sessionId);
  }
  return sessionId;
}

export function clearGuestSessionId() {
  localStorage.removeItem('guestSessionId');
}
