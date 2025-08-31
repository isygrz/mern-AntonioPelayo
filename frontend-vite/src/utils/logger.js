// Tiny logger with environment-gated levels for Vite/React apps.
// - debug/info are disabled in production builds
// - warn/error always remain enabled
// - once.* variants log only once per unique first-argument key
// - Optional override: set localStorage.LOG_LEVEL to one of "debug" | "info" | "warn" | "error"

const LEVELS = ['debug', 'info', 'warn', 'error'];
const ORDER = { debug: 0, info: 1, warn: 2, error: 3 };

const isProd = (() => {
  try {
    if (
      typeof import.meta !== 'undefined' &&
      import.meta.env &&
      'PROD' in import.meta.env
    ) {
      return !!import.meta.env.PROD;
    }
  } catch {
    /* ignore */
  }
  return false;
})();

function getForcedLevel() {
  try {
    const fromLS =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('LOG_LEVEL')
        : null;
    const fromSS =
      typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('LOG_LEVEL')
        : null;
    const fromWin = typeof window !== 'undefined' ? window.__LOG_LEVEL__ : null;
    const v = fromLS || fromSS || fromWin;
    return LEVELS.includes(v) ? v : null;
  } catch {
    /* ignore */
    return null;
  }
}

const forcedLevel = getForcedLevel();

function isEnabled(level) {
  if (forcedLevel) {
    return ORDER[level] >= ORDER[forcedLevel];
  }
  if (isProd) {
    return level === 'warn' || level === 'error';
  }
  return true;
}

const onceSeen = new Set();
const noop = () => {};
const ts = () => new Date().toISOString();

function mk(level, method) {
  return isEnabled(level) ? (...args) => method(`[${ts()}]`, ...args) : noop;
}

function mkOnce(level, method) {
  return isEnabled(level)
    ? (...args) => {
        const key = args.length ? String(args[0]) : level;
        if (onceSeen.has(key)) return;
        onceSeen.add(key);
        method(`[${ts()}]`, ...args);
      }
    : noop;
}

const log = {
  debug: mk('debug', console.debug.bind(console)),
  info: mk('info', console.info.bind(console)),
  warn: mk('warn', console.warn.bind(console)),
  error: mk('error', console.error.bind(console)),
  group: isEnabled('debug')
    ? console.groupCollapsed
      ? console.groupCollapsed.bind(console)
      : console.group.bind(console)
    : noop,
  groupEnd: isEnabled('debug') ? console.groupEnd.bind(console) : noop,
  once: {
    debug: mkOnce('debug', console.debug.bind(console)),
    info: mkOnce('info', console.info.bind(console)),
    warn: mkOnce('warn', console.warn.bind(console)),
    error: mkOnce('error', console.error.bind(console)),
  },
  setLevel(level) {
    try {
      if (LEVELS.includes(level)) {
        if (typeof localStorage !== 'undefined')
          localStorage.setItem('LOG_LEVEL', level);
        if (typeof window !== 'undefined') window.__LOG_LEVEL__ = level;
      }
    } catch {
      /* ignore */
    }
  },
  resetLevel() {
    try {
      if (typeof localStorage !== 'undefined')
        localStorage.removeItem('LOG_LEVEL');
      if (typeof window !== 'undefined') delete window.__LOG_LEVEL__;
    } catch {
      /* ignore */
    }
  },
  _isProd: isProd,
};

export default log;
