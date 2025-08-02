export function logSeed(moduleName, action, count = null) {
  const symbols = {
    start: '🌱',
    success: '✅',
    error: '❌',
    skip: '⚠️',
  };

  const messages = {
    start: `[seed:${moduleName}] ${symbols.start} Starting ${moduleName} seeding...`,
    success: `[seed:${moduleName}] ${
      symbols.success
    } Successfully seeded ${count} ${moduleName.toLowerCase()} entries.`,
    error: `[seed:${moduleName}] ${symbols.error} Failed to seed ${moduleName}.`,
    skip: `[seed:${moduleName}] ${symbols.skip} Skipped seeding for ${moduleName}.`,
  };

  if (!messages[action]) {
    console.log(`[seed:${moduleName}] ⚠️ Unknown log action: ${action}`);
    return;
  }

  console.log(messages[action]);
}
