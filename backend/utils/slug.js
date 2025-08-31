import slugify from 'slugify';

/**
 * createSlug(text)
 * Normalize a human-readable string to a URL-safe slug.
 * - lowercased
 * - strict (removes special characters)
 * - collapses spaces to dashes
 */
export const createSlug = (text = '') =>
  slugify(text || 'item', { lower: true, strict: true });

/**
 * ensureUniqueSlug(Model, baseSlug, ignoreId?)
 * Guarantees slug uniqueness for a given Mongoose Model.
 * - If a collision is found, appends -1, -2, ... until unique.
 * - Optional ignoreId excludes an existing document (useful on updates).
 * - Safety cap prevents infinite loops on pathological data.
 */
export const ensureUniqueSlug = async (Model, baseSlug, ignoreId = null) => {
  const MAX_ATTEMPTS = 1000;
  let candidate = baseSlug || 'item';
  let n = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const query = { slug: candidate };
    if (ignoreId) query._id = { $ne: ignoreId };

    const exists = await Model.exists(query);
    if (!exists) return candidate;

    n += 1;
    if (n > MAX_ATTEMPTS) {
      throw new Error(
        'ensureUniqueSlug: exceeded maximum attempts while generating a unique slug'
      );
    }
    candidate = `${baseSlug}-${n}`;
  }
};
