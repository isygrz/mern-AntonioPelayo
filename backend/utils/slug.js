import slugify from 'slugify';

/**
 * createSlug
 * Normalize a human-readable string to a URL-safe slug.
 */
export const createSlug = (text = '') =>
  slugify(text || 'item', { lower: true, strict: true });

/**
 * ensureUniqueSlug
 * Guarantees slug uniqueness for a given Mongoose Model.
 * If a collision is found, appends -1, -2, ... until unique.
 * Optionally exclude a given _id (use when updating an existing doc).
 */
export const ensureUniqueSlug = async (Model, baseSlug, ignoreId = null) => {
  let candidate = baseSlug || 'item';
  let n = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const query = { slug: candidate };
    if (ignoreId) query._id = { $ne: ignoreId };

    const exists = await Model.exists(query);
    if (!exists) return candidate;

    n += 1;
    candidate = `${baseSlug}-${n}`;
  }
};
