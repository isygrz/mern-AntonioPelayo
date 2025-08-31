/**
 * Replaces console.* with log.* and inserts:
 *   import log from '@/utils/logger'
 * Adjust LOGGER_IMPORT if you don't use '@' alias.
 *
 * Default mapping:
 *   log  -> debug
 *   info -> info
 *   warn -> warn  (left as-is by ESLint; codemod can migrate too)
 *   error-> error (left as-is by ESLint; codemod can migrate too)
 *   group/groupCollapsed -> group
 *   groupEnd -> groupEnd
 *
 * Skips the logger module itself.
 */
const LOGGER_IMPORT = '@/utils/logger';

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Skip the logger module itself
  if (file.path.endsWith('/src/utils/logger.js')) return file.source;

  // Detect existing logger import/require
  const hasLoggerImport =
    root
      .find(j.ImportDeclaration, { source: { value: LOGGER_IMPORT } })
      .size() > 0 ||
    root
      .find(j.VariableDeclarator, {
        init: {
          callee: { name: 'require' },
          arguments: [{ value: LOGGER_IMPORT }],
        },
      })
      .size() > 0;

  // Map console methods to logger methods
  const map = {
    log: 'debug',
    info: 'info',
    // To migrate these too, uncomment:
    // warn: 'warn',
    // error: 'error',
    group: 'group',
    groupCollapsed: 'group',
    groupEnd: 'groupEnd',
    debug: 'debug',
  };

  let changed = false;

  // Replace console.* calls
  root
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { type: 'Identifier', name: 'console' },
        property: { type: 'Identifier' },
      },
    })
    .forEach((path) => {
      const prop = path.node.callee.property.name;
      const target = map[prop];
      if (!target) return;
      path.node.callee = j.memberExpression(
        j.identifier('log'),
        j.identifier(target)
      );
      changed = true;
    });

  // Insert import if we made changes and no existing import
  if (changed && !hasLoggerImport) {
    const importDecl = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier('log'))],
      j.literal(LOGGER_IMPORT)
    );
    // place at top, after any "use strict" or shebangs
    const body = root.get().node.program.body;
    body.unshift(importDecl);
  }

  return changed ? root.toSource({ quote: 'single' }) : file.source;
};
