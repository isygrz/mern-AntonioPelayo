import express from 'express';

import Product from '../models/Product.js';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import Badge from '../models/Badge.js';
import Hero from '../models/Hero.js';
import Order from '../models/Order.js';
import Cms from '../models/Cms.model.js';

import { products } from '../data/products.js';
import { users } from '../data/users.js';
import { blogs } from '../data/blogs.js';
import { badges } from '../data/badges.js';
import { heroes } from '../data/heroes.js';
import cmsData from '../seedCmsData.js';

const router = express.Router();

// 🔁 Master route: seed everything (excluding orders)
router.get('/', async (req, res) => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Blog.deleteMany();
    await Badge.deleteMany();
    await Hero.deleteMany();
    await Order.deleteMany(); // still clear orders
    await Cms.deleteMany();

    const p = await Product.insertMany(products);
    const u = await User.insertMany(users);
    const b = await Blog.insertMany(blogs);
    const g = await Badge.insertMany(badges);
    const h = await Hero.insertMany(heroes);
    const c = await Cms.insertMany(cmsData.sections || []);

    res.status(201).json({
      message: 'Database seeded successfully',
      counts: {
        products: p.length,
        users: u.length,
        blogs: b.length,
        badges: g.length,
        heroes: h.length,
        orders: 0, // skipped in this route
        cmsSections: c.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Seeding failed',
      error: error.message,
    });
  }
});

export default router;
