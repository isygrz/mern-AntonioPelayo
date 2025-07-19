export const updateCmsLayout = async (req, res) => {
  const { route } = req.params;
  const { sections } = req.body;

  if (!Array.isArray(sections)) {
    return res.status(400).json({ message: 'Invalid sections payload' });
  }

  try {
    const doc = await CMS.findOneAndUpdate(
      { route },
      { $set: { sections } },
      { new: true, upsert: false }
    );

    if (!doc) {
      return res
        .status(404)
        .json({ message: `CMS config for ${route} not found` });
    }

    res.status(200).json(doc);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error updating CMS layout', error: err.message });
  }
};
