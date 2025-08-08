export function logSeed(moduleName, action, count = null) {
  const symbols = {
    start: '🌱',
    success: '✅',
    error: '❌',
    skip: '⚠️',
    info: '🔹',
    warn: '⚠️',
  };

  const actions = {
    start: `${symbols.start} Starting ${moduleName} seeding...`,
    success: `${symbols.success} Successfully seeded ${
      count ?? 'N/A'
    } ${moduleName.toLowerCase()} entries.`,
    error: `${symbols.error} Failed to seed ${moduleName}.`,
    skip: `${symbols.skip} Skipped seeding for ${moduleName}.`,
  };

  const message = actions[action] || `${symbols.info} ${action}`;
  console.log(`[seed:${moduleName}] ${message}`);
}
