// Debug helper: logs and neutralizes accidental usage of full URLs
// (e.g., 'http://localhost:5173') as the first argument to app.use()/router.use().
// Remove this once you fix the offending call sites.

function wrapUse(name, useFn) {
  return function (first, ...rest) {
    try {
      if (typeof first === 'string' && /^https?:\/\//i.test(first)) {
        const msg = `[mountGuard] ${name}.use() received a URL as path: ${first}`;
        console.warn(msg);
        // Show a trimmed stack to point to the caller
        const err = new Error(msg);
        if (err.stack) {
          const lines = err.stack.split('\n').slice(2, 8).join('\n');
          console.warn(lines);
        }
        // Call original without the URL so server doesn't crash
        return useFn.call(this, ...rest);
      }
      return useFn.call(this, first, ...rest);
    } catch (e) {
      console.warn(
        `[mountGuard] ${name}.use() wrapper failed:`,
        e?.message || e
      );
      return useFn.call(this, first, ...rest);
    }
  };
}

export function installMountGuard(app, express) {
  if (!app || !express) return;
  if (app.__mountGuardInstalled) return;
  app.__mountGuardInstalled = true;

  // Patch app.use
  if (typeof app.use === 'function') {
    app.use = wrapUse('app', app.use.bind(app));
  }
  // Patch Router.prototype.use
  try {
    const proto =
      express?.Router?.().constructor?.prototype || express.Router?.prototype;
    if (proto && typeof proto.use === 'function') {
      proto.use = wrapUse('router', proto.use);
    }
  } catch (_) {}
}
