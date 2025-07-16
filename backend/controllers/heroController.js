import Hero from '../models/Hero.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getHeroes = asyncHandler(async (req, res) => {
  const heroes = await Hero.find({});
  res.json(heroes);
});

export const createHero = asyncHandler(async (req, res) => {
  const hero = new Hero({ heading: 'New Hero Section' });
  const created = await hero.save();
  res.status(201).json(created);
});

export const updateHero = asyncHandler(async (req, res) => {
  const hero = await Hero.findById(req.params.id);
  if (!hero) throw new Error('Hero section not found');

  Object.assign(hero, req.body);
  const updated = await hero.save();
  res.json(updated);
});

export const deleteHero = asyncHandler(async (req, res) => {
  const hero = await Hero.findById(req.params.id);
  if (!hero) throw new Error('Hero section not found');

  await hero.deleteOne();
  res.json({ message: 'Hero section deleted' });
});
