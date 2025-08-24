const isProd = process.env.NODE_ENV === 'production';

const logger = {
  debug: (...args) => {
    if (!isProd) console.debug('[DEBUG]', ...args);
  },
  info: (...args) => {
    if (!isProd) console.info('[INFO]', ...args);
  },
  warn: (...args) => console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
};

export default logger;
