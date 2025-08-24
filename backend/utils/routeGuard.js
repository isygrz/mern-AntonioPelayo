// Debug helper: warns if any router or app registers a route whose first path
// argument looks like a full URL (http:// or https://). Remove after fixing.

const METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
  'all',
];

function wrapMethod(name, orig) {
  return function (first, ...rest) {
    try {
      if (typeof first === 'string' && /^https?:\/\//i.test(first)) {
        const msg = `[routeGuard] ${name}() received a URL path: ${first}`;
        console.warn(msg);
        const err = new Error(msg);
        if (err.stack) {
          const lines = err.stack.split('\n').slice(2, 8).join('\n');
          console.warn(lines);
        }
        // Call with '/' instead to keep server alive while debugging
        return orig.call(this, '/', ...rest);
      }
    } catch (_) {}
    return orig.call(this, first, ...rest);
  };
}

export function installRouteGuard(app, express) {
  if (!app || !express) return;
  if (app.__routeGuardInstalled) return;
  app.__routeGuardInstalled = true;

  // Patch app-level methods
  for (const m of METHODS) {
    if (typeof app[m] === 'function') {
      app[m] = wrapMethod(`app.${m}`, app[m].bind(app));
    }
  }

  // Patch Router prototype methods
  try {
    const proto =
      express?.Router?.().constructor?.prototype || express.Router?.prototype;
    if (proto) {
      for (const m of METHODS) {
        if (typeof proto[m] === 'function') {
          proto[m] = wrapMethod(`router.${m}`, proto[m]);
        }
      }
    }
  } catch (_) {}
}
