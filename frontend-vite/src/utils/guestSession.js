import { v4 as uuidv4 } from 'uuid';

export function getGuestSessionId() {
  let sessionId = localStorage.getItem('guestSessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('guestSessionId', sessionId);
  }
  return sessionId;
}

export function clearGuestSessionId() {
  localStorage.removeItem('guestSessionId');
}
