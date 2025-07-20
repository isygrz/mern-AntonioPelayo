import express from 'express';

import Product from '../models/Product.js';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import Badge from '../models/Badge.js';
import Hero from '../models/Hero.js';
import Order from '../models/Order.js';
import Cms from '../models/Cms.js';

import seedProductData from '../seedProducts.js';
import seedUserData from '../seedUsers.js';
import seedBlogData from '../seedBlogs.js';
import seedBadgeData from '../seedBadges.js';
import seedHeroData from '../seedHeroes.js';
import seedOrderData from '../seedOrders.js';
import seedCmsData from '../seedCms.js';

const router = express.Router();

// 🔁 Master route: seed everything
router.get('/', async (req, res) => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Blog.deleteMany();
    await Badge.deleteMany();
    await Hero.deleteMany();
    await Order.deleteMany();
    await Cms.deleteMany();

    const products = await Product.insertMany(seedProductData.products);
    const users = await User.insertMany(seedUserData.users);
    const blogs = await Blog.insertMany(seedBlogData.blogs);
    const badges = await Badge.insertMany(seedBadgeData.badges);
    const heroes = await Hero.insertMany(seedHeroData.heroes);
    const orders = await Order.insertMany(seedOrderData.orders);
    const cms = await Cms.insertMany(seedCmsData.sections);

    res.status(201).json({
      message: 'Database seeded successfully',
      counts: {
        products: products.length,
        users: users.length,
        blogs: blogs.length,
        badges: badges.length,
        heroes: heroes.length,
        orders: orders.length,
        cmsSections: cms.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Seeding failed',
      error: error.message,
    });
  }
});

// Modular routes below
router.get('/products', async (req, res) => {
  try {
    await Product.deleteMany();
    const products = await Product.insertMany(seedProductData.products);
    res
      .status(201)
      .json({ message: 'Products seeded', count: products.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Product seeding failed', error: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    await User.deleteMany();
    const users = await User.insertMany(seedUserData.users);
    res.status(201).json({ message: 'Users seeded', count: users.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'User seeding failed', error: error.message });
  }
});

router.get('/blogs', async (req, res) => {
  try {
    await Blog.deleteMany();
    const blogs = await Blog.insertMany(seedBlogData.blogs);
    res.status(201).json({ message: 'Blogs seeded', count: blogs.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Blog seeding failed', error: error.message });
  }
});

router.get('/badges', async (req, res) => {
  try {
    await Badge.deleteMany();
    const badges = await Badge.insertMany(seedBadgeData.badges);
    res.status(201).json({ message: 'Badges seeded', count: badges.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Badge seeding failed', error: error.message });
  }
});

router.get('/heroes', async (req, res) => {
  try {
    await Hero.deleteMany();
    const heroes = await Hero.insertMany(seedHeroData.heroes);
    res.status(201).json({ message: 'Heroes seeded', count: heroes.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Hero seeding failed', error: error.message });
  }
});

router.get('/orders', async (req, res) => {
  try {
    await Order.deleteMany();
    const orders = await Order.insertMany(seedOrderData.orders);
    res.status(201).json({ message: 'Orders seeded', count: orders.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Order seeding failed', error: error.message });
  }
});

router.get('/cms', async (req, res) => {
  try {
    await Cms.deleteMany();
    const cms = await Cms.insertMany(seedCmsData.sections);
    res.status(201).json({ message: 'CMS layout seeded', count: cms.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'CMS seeding failed', error: error.message });
  }
});

export default router;
