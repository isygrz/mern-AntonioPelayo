# MERN JALISCOTILE

# Tech Stack

1. MongoDB Atlas/Compass — Cloud database for storing products, users, orders, blogs, and homepage CMS data
2. Mongoose — ODM (Object Data Modeling) layer for defining and validating backend schemas
3. Express.js — RESTful API framework for backend logic (auth, orders, products)
4. Node.js — Runtime environment for executing backend code
5. dotenv — Loads environment variables securely from .env file
6. cookie-parser — Parses and sets secure HTTP-only cookies for auth sessions
7. jsonwebtoken (JWT) — Secure session management using signed tokens
8. bcryptjs — Hashing library used for password encryption
9. uuid — Used for anonymous guest session ID generation
10. React.js 18 — Modern frontend UI library (hook-based components)
11. Vite — Lightning-fast build tool and development server for React
12. React Router v6 — Handles frontend route declarations and navigation
13. Redux Toolkit — Predictable state management (auth, cart, orders, products)
14. Redux Thunks — Async API calls wrapped in createAsyncThunk
15. Tailwind CSS — Utility-first CSS framework for styling
16. PostCSS — CSS processor used alongside Tailwind for build integration
17. react-quill — WYSIWYG rich text editor for blog CMS
18. prop-types — Runtime type-checking for React component props
19. Axios — HTTP client with axiosInstance.js wrapper for unified API calls
20. Local JSON-based mock data — Used during development to simulate product/blog data
21. Vite Environment Variables — Used to switch between local/production APIs
22. ES Modules (import/export) — Full ESM syntax used across backend and frontend
23. Frontend Session Persistence — Guest session and auth state retained across tabs using localStorage
24. Secure HTTP Cookies — Auth tokens stored as httpOnly secure cookies to prevent XSS

# STEPS

1. Introduction

- Initial setup for a MERN-based e-commerce platform focused on tile sales for JaliscoTile

2. Install Tools

- Node.js & npm
- Vite (`npm create vite@latest`)
- Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer`)
- React Router (`npm install react-router-dom`)

3. Create React App

- Project scaffolded using Vite
- Tailwind CSS initialized via `tailwind.config.js` and `postcss.config.js`
- App shell created with routing (`main.jsx`, `App.jsx`)

4. Create Git Repository

- Project committed to Git for version control

5. Cleanup & Final Adjustments (project was migrated from Create React App to Vite)

- Legacy CRA-specific files were removed:
  → reportWebVitals.js, setupTests.js, App.test.js, CRA-style index.css, and default App.js boilerplate
- Unused test/config/dependency files were also purged:
  → postcss.config.js, tailwind.config.js, and package-lock.json regenerated
- Key dependencies retained and upgraded:
  → react, react-dom, react-router-dom, and Vite plugins like @vitejs/plugin-react
- Tailwind and PostCSS remain active with Vite-native support
- Scripts simplified:
  → Uses vite, vite build, and vite preview instead of react-scripts

6. Add Routing (powered by react-router-dom in App.jsx)

- BrowserRouter is used via the project’s entry point (main.jsx)
- The main routing logic lives inside App.jsx:
  → Home route / renders HomeScreen.jsx, which lists products
  → Dynamic route /product/:slug renders ProductScreen.jsx based on URL param
- Components are imported at the top:
  → import { Routes, Route, Link } from 'react-router-dom';
- All <a> tags were replaced with <Link> to enable client-side routing
  → Example: <Link to={/product/${product.slug}}>
- This clean separation supports future scalability for cart, login, and admin routes

7. List Products

- Local `data.js` file contains mock product listings
- Display products dynamically using `map()` inside `HomeScreen.jsx`

8. Responsive Product Card Layout

- Displays a clean, interactive product tile with image, title, price, and sample button
  → product.imageGallery, product.name, product.pricePerBox, onToggleSample
- Styled with Tailwind classes for structure and clarity
  → flex flex-col, border, rounded-lg, shadow, overflow-hidden
- Image area uses aspect-[4/3] and object-cover for consistent visual height and crop
- Mobile-optimized with text-base, text-sm, and proper spacing via gap-2, p-4
- Hover effects include scale, ring, and shadow transitions
  → hover:scale-[1.02], hover:ring-2, hover:shadow-xl
- Sample toggle button updates dynamically via props and uses conditional styling
- "Stock" badge overlays image using absolute positioning with styled label

9. Add Sample to Cart Toggle

- Label (dynamic button) changes based on inSampleCart prop:
  → 'Add Sample to Cart' vs. 'Sample in Cart'
- Visual feedback provided through conditional Tailwind styling:
  → Scarlet red for active state, Periwinkle blue for default
- State updated via callback:
  → onClick={() => onToggleSample(product.slug)} delegates control to parent
- Button styling includes:
  → w-full, py-2, rounded, text-sm, font-semibold, transition-colors
- Encourages user interaction without full page reload or redirect
- Note: This approach ensures stateless, reusable UI where product sample status is lifted and managed externally (likely in Redux or component state)

10. Price Display Format

- Value rendered (JSX and Tailwind) from product.pricePerBox.toFixed(2) to ensure two decimal places
- Uses semantic HTML:
  → main price in <div className="text-sm font-slab">
  → per-unit label in nested <span className="text-xs text-slate-veil">/box</span>
- Typography sizing ensures legibility and hierarchy between value and unit
- Aligned visually with product title and button using flex-col layout

11. Image Consistency (utility-first layout rules)

- Wrapper uses aspect-[4/3] to enforce consistent width-to-height ratio across all cards
- <img> element styled with w-full h-full object-cover to fill container without distortion
- Smooth hover effect enhances UI feedback:
  → transition-transform hover:scale-105
- Container uses overflow-hidden to clip overflow and maintain clean edges

12. React 18 Migration & Redux Toolkit Preparation

- As part of stabilizing the development environment and aligning with Redux Toolkit best practices, we performed the following adjustments:
  → downgraded React 19 → React 18
  → locked versions to stable React 18 releases: "react": "18.2.0"; "react-dom": "18.2.0"; "react-router-dom": "6.23.1"

13. Product Feature Refactor (Redux + Routing)

- Refactored product rendering to use Redux Toolkit rather than static data import. Slug-based dynamic routing is preserved, UI is untouched.
  → replaced `data.js` usage in `HomeScreen` and `ProductScreen` with `productSlice` Redux state
  → used `useSelector()` to retrieve product array from store
  → preserved all sample toggle logic, styling, and routing with `<Link to={`/product/${slug}`}>`
- Files Modified
  → `src/screens/HomeScreen.jsx` — product data now pulled from Redux store
  → `src/screens/ProductScreen.jsx` — uses Redux to fetch product by slug
  → `src/components/ProductCard.jsx` — no changes needed
- Products will later be connected to backend API calls.

14. CMS Foundation (Phase 1)

- Implemented `<AdminLayout />` with nested routing
- Built admin dashboard accessible at `/admin`
- Sidebar routes: `/admin/heroes`, `/admin/blogs`, `/admin/badges`, `/admin/settings`

15. Hero Section Manager (Phase 2)

- Visual section CRUD interface (title, subtitle, image, CTA, placement)
- Hero rendering on `/` via `SectionRenderer`
- Modular structure with:
  → `HeroManager.jsx`, `SectionEditor.jsx`, `ImagePicker.jsx`

16. Blog Manager (Phase 3)

- Admin blog editor using `react-quill` (WYSIWYG)
- Fields: title, slug, image, content
- Data synced with `blogData.js`
- Public blog viewer:
  → `/blog` → blog list
  → `/blog/:slug` → blog post

17. Badge Manager (Phase 4)

- Create/edit badge labels and colors (stored in `badgeData.js`)
- Live color previews via color picker
- Future integration: product tags, banners, promos

18. Cart System (Redux Toolkit)

- Full cart state managed with `cartSlice.js`
- Cart page `/cart`: update qty, remove item, subtotal, CTA
- Add-to-cart button on `/product/:slug`

19. Product Manager

- Admin CRUD UI for products with:
  → Image, name, description, price, badge
- Connected to `data.js` for product list display
- Uses `ImageUploader` component for previews

20. Homepage CMS SectionRenderer

- `SectionRenderer.jsx` renders all CMS-defined sections by:
  → `isActive`, `placement`, and `order`
- Supported visual types: `hero`, `promogrid`, `blogpreview`
- Integrates into `/` via `HomeScreen.jsx`

21. CMS Layout Editor (SettingsManager)

- Add/reorder/disable visual sections across routes
- Section types: hero, promoGrid, blogPreview
- Component tree:
  → `SettingsManager.jsx`
  → `SectionRow.jsx`

22. Image Uploader Utility

- Used in product/blog/hero editors
- Preview image or enter remote URL
- Emits base64 or path to parent component

23. Key Routes
    | Route | Description |
    |-------|-------------|
    | `/` | Homepage with CMS-rendered visual sections + product grid |
    | `/product/:slug` | Product detail + add-to-cart |
    | `/cart` | Cart screen with Redux integration |
    | `/blog`, `/blog/:slug` | Public blog list + post viewer |
    | `/admin` | Admin dashboard layout |
    | `/admin/heroes` | Hero visual section manager |
    | `/admin/blogs` | Blog CMS manager |
    | `/admin/badges` | Badge CRUD interface |
    | `/admin/products` | Product CRUD interface |
    | `/admin/settings` | Homepage visual section configurator |

> Built to scale: All admin features are backend-ready with state and structure prepared for database integration.

24. Bug Fixes: Key Prop Warning & Price Field Crash

- Addressed React development warning and runtime crash introduced during Redux Toolkit integration and CMS refactor
- Fixes Applied
  → HomeScreen.jsx
  → added unique key to each product card container using product.id || product.slug || product.name to suppress React's list rendering warning
- Preserved layout and responsive styling with w-[23%] min-w-[200px]
  → ProductCard.jsx
  → Implemented defensive logic for rendering price:
  → Checks both product.pricePerBox and product.price before using .toFixed(2)
  → Displays 'Price Unavailable' if neither is defined
- Allowed fallback for image source (product.imageGallery || product.image)
- Logged product shape in development for debugging:
  → console.log("🧪 ProductCard received:", product);
- Result
  → Eliminated Cannot read properties of undefined (reading 'toFixed') runtime error.
  → Removed React dev warning: Each child in a list should have a unique "key" prop.
  → Strengthened component fault tolerance ahead of backend product API integration.

25. Static Product Seeding via data.js (Redux Dev Mode)

- Introduced static product data file `src/data.js` to simulate API data for development
- Refactored `productSlice.js` to import and seed Redux initialState directly from this file:
- Ensures consistent product rendering during development without needing a live backend
- Path was corrected to avoid Vite resolution errors:
  → Relative path from src/redux/slices/productSlice.js to src/data.js is ../../data.js
- Future-proofing:
  → Replace this logic with createAsyncThunk and backend API once ready
  → Can optionally add a dev-mode toggle for conditional static loading

26. Backend & Product Schema Integration

- Modularized Backend Codebase:
  → Created `db.js` for MongoDB connection logic
  → Isolates `mongoose.connect(...)` from `server.js`
- Centralized API endpoints in `/routes/productRoutes.js`
  → Separates route logic from server configuration
- This separation improves scalability, testability, and team collaboration
- MongoDB + Mongoose Integration:
- Used `mongoose` to define a strict product schema
- Connected to MongoDB Atlas using `.env` for secure credential management
- `.env` loaded via `dotenv` to keep secrets out of source code
- Refactored Product Schema:
- Introduced `pricing` as a **subdocument**:
  → pricing: { perBox: { type: Number, required: true }, perSqFt: { type: Number }, sample: { type: Number } }
- Updated `data.js` to align with new schema
- Seeding Database:
  → Used `seed.js` to wipe and repopulate MongoDB with mock product data
  → Confirmed schema validation and insertion integrity
- Installed Packages:
  → npm install mongoose dotenv

27. User Authentication & Guest Sessions

- Added full user registration and login flow:
  → /api/users/register (POST) — registers personal/pro user
  → /api/users/login (POST) — logs in and sets JWT cookie
  → /api/users/profile (GET) — loads session
- Protected routes via JWT token and cookie
- Frontend authSlice handles login, registration, hydration, and logout

28. Guest Session Logic

- Fallback guest session created via UUID stored in localStorage
- Redux detects absence of login and persists guestSessionId across tabs
- All orders and carts can be stored with this ID

29. Order Schema & Checkout Integration

- Order model supports:
  → user (optional)
  → guestSessionId (optional)
  → shippingAddress, cartItems, total, payment method
- POST /api/orders accepts either user or guest session order
- Scaffolded orderSlice.js handles createOrder from frontend
- CheckoutScreen placeholder added for UI form

30. New and Refactored Redux Architecture

- `/src/redux/slices/productSlice.js`
- **Created** a Redux slice to manage products state.
  → Uses `createAsyncThunk` to asynchronously fetch products from backend: `/api/products`
  → Stores response in `state.items`, sets `loading` and `error` appropriately
- `store.js`
  → Refactored to include `productSlice` as `products` in the global Redux store

31. API Connection Refactor

- `/src/utils/axiosInstance.js`
  → Centralized Axios instance for consistent API handling.

32. Backend Adjustments

- `/controllers/productController.js`
- `getAllProducts` now sends raw array response (`res.json(products)`)
- `/routes/productRoutes.js`
- Added route:
  → router.get('/', getAllProducts); // returns JSON array
- `/models/Product.js`
  → Product schema defines a clean shape with nested `pricing` and `imageGallery`

33. HomeScreen Product Rendering

- `/src/screens/HomeScreen.jsx`
- **Fully refactored** to pull products from Redux state via `useSelector`
- Uses Tailwind `grid grid-cols-4` responsive layout to render product cards in 4-column layout

34. ProductCard Component

- `/src/components/ProductCard.jsx`
- **No major changes** required
- Already supports reusable props structure with fallback rendering
- Styling enforced using Tailwind
- Added fallback logic:
  → const price = product?.pricing?.perBox ?? product?.pricePerBox;

35. Error Resolution

- Bug: `products.map is not a function`
- Root cause: backend returned an HTML page (likely due to incorrect baseURL or Vite dev server proxy misrouting)
- Fix: ensured `axiosInstance` uses correct baseURL and `/api/products` returns proper JSON from backend
- Fix Summary:
  → `fetchAllProducts` is used consistently
  → Products response checked with `Array.isArray()` before mapping
  → React key prop added using: `product._id`

36. Styling Fixes

- HomeScreen layout restructured with Tailwind grid classes
- Centered title, added spacing (`mb-6`, `px-4`) for clean UI
- Images rendered with consistent aspect ratio using `aspect-[4/3]`

37. Developer Tools + Logging

- Debug logging added in HomeScreen:
  → Logged response shape from backend to verify array response
  → Improved error handling using `rejectWithValue` in `createAsyncThunk`

38. Recommended Environment Setup

- `.env`
  → VITE_API_BASE
  → MONGODB_URI

39. `vite.config.js`

- resolve: { alias: { '@': path.resolve(\_\_dirname, 'src'), }, },
