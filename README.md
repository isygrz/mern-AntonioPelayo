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

40. Product Editing Modal + Image Upload Integration

- Introduced full product editing capability via EditProductModal.jsx, allowing admin users to modify product name, slug, badge, pricing, description, and image
  → Built using TailwindCSS + Headless UI modal component with accessibility and transitions
- Invoked from ProductManager.jsx:
  → Clicking "Edit" opens modal with prefilled product data
  → "Save" dispatches updateProduct to Redux and backend
- Integrated ImageUploader.jsx into modal to support image uploads
  → Displays uploaded image preview and emits URL to parent

41. Image Upload Backend API (Multer + Static Hosting)

- Added Express POST route:
  → POST /api/uploads — accepts raw image files via multipart/form-data
  → Files saved to local /uploads/ directory using multer
- Implemented storage strategy in uploadRoutes.js:
  → Uses multer.diskStorage()
  → Filenames timestamped for uniqueness
  → Response returns { imageUrl } used in frontend
- Public static file serving enabled:
  → /uploads/<filename> accessible in browser
  → Configured using express.static() with path.resolve()
- Files added:
  → backend/routes/uploadRoutes.js
  → backend/uploads/ directory (must exist)
- server.js updates:
  → Added route registration app.use('/api/uploads', uploadRoutes)
  → Added static file serving for /uploads

42. React Image Upload Integration (via ImageUploader)

- Updated ImageUploader.jsx to:
  → Send FormData with raw image file to /api/uploads
  → Receive imageUrl and set it in product state
  → Allow preview and reuse of image within edit modal
- Integrated seamlessly into EditProductModal.jsx form state
- Raw file upload approach used:
  → Smaller payload than base64
  → Better long-term performance
  → Aligns with industry best practices

43. Admin Product Filtering and Sorting

- Added UI filters to ProductManager.jsx for easier product management:
  → Search input (name-based, case-insensitive)
  → Badge dropdown filter (new, sale, limited, all)
  → Sort menu by name (A-Z, Z-A) or price (low-high, high-low)
- All filtering/sorting is client-side and applied in real-time using React state
- Improves scalability and admin usability as product count grows

44. Admin Product Pagination

- Added full client-side pagination to ProductManager.jsx
  → 6 items per page
  → Page indicator + Prev/Next buttons
  → Fully responsive with Tailwind CSS
- Pagination applies after filtering and sorting, ensuring that the admin always sees the correct subset of data
- Includes edge-state handling (disabled buttons, active page highlight)

45. Admin Product Editing Modal Integration

- Integrated EditProductModal.jsx into ProductManager.jsx
  → Clicking “Edit” opens a modal with the selected product prefilled
  → Changes to name, slug, badge, image, pricing, and description can be made
- Saving the form:
  → Dispatches updateProduct(updatedProduct) to Redux
  → Updates live MongoDB entry via Express API
  → Automatically reflects in product grid
- Modal built with @headlessui/react and TailwindCSS
  → Accessible and responsive
  → Uses ImageUploader to preview/upload product image

46. Blog CMS Backend Integration (Phase 1)

- Introduced full backend support for blog management:
- Route Method Description
  → /api/blogs GET Fetch all blog posts
  → /api/blogs/slug/:slug GET Fetch single post by slug
  → /api/blogs POST Create a new blog (admin only)
  → /api/blogs/:id PUT Update blog by ID (admin only)
  → /api/blogs/:id DELETE Delete blog by ID (admin only)
- Added:
  → Blog.js model
  → blogController.js for CRUD handlers
  → blogRoutes.js for route wiring
  → Mounted to Express server
- Ready for full Redux and CMS frontend connection in BlogManager.jsx

47. Blog CMS Redux Integration (Phase 2)

- Converted blog management from static blogData.js to full Redux + API connectivity
- Created blogSlice.js with createAsyncThunk to manage:
  → fetchBlogs, createBlog, updateBlog, deleteBlog
- Refactored BlogManager.jsx to use Redux state instead of hardcoded data
- Blog CRUD actions now persist to MongoDB via backend /api/blogs
- Blog CMS is now live — ready for content management by admins

48. Admin Product Modal Editing & Pagination Integration

- Enhanced the ProductManager admin screen to include:
- Live Product Editing via modal:
  → Uses EditProductModal.jsx to allow editing name, slug, badge, pricing, image, and description
  → Modal opens with prefilled values and updates Redux + MongoDB on save
- Create + Edit Flow:
  → Clicking "+ Create Product" dispatches createProduct(), inserts into database, then opens the edit modal
  → Admin can immediately fill out and save new product details
- Pagination Controls:
  → Displays 6 products per page
  → Includes Prev/Next buttons and direct page number buttons
  → Automatically resets to page 1 on filter/search changes
- Filtering and Sorting:
  → Search by product name (case-insensitive)
  → Filter by badge (new, limited, sale)
  → Sort by name or price (asc/desc)
- All interactions update Redux state and MongoDB in real-time via createProduct, updateProduct, and deleteProduct async thunks

49. CMS Backend Integration for Blog, Badge, and Hero Sections

- Fully implemented MongoDB + Express backend support for admin-managed content sections:
- Blog
  → Created Blog.js model with fields: title, slug, image, content, author, published
  → Built blogController.js with CRUD handlers (getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog)
  → Mounted via blogRoutes.js at /api/blogs (public GET, admin-protected POST/PUT/DELETE)
  → Supports Markdown or HTML content in content field
- Badge
  → Created Badge.js model with fields: name, color, description
  → Added badgeController.js with standard CRUD
  → Routes mounted at /api/badges with full admin control
  → Ready for dynamic assignment of product badges via admin interface
- Hero
  → Created Hero.js model with fields: heading, subheading, image, ctaText, ctaLink, active
  → Set up heroController.js with full CRUD logic
  → Routes live at /api/heroes for editing homepage visual content sections
  → Supports multiple active/inactive heroes for homepage CMS flexibility
- All CMS routes are protected with authMiddleware.js (protect, admin) and support secure session-based auth
- Backend now ready for Redux + admin UI integration (BlogManager, BadgeManager, HeroManager)

50. BlogManager.jsx Integration with Full Redux + ReactQuill WYSIWYG Editor

- Implemented full CRUD functionality for Blog CMS using Redux Toolkit and ReactQuill
- Features include:
- Redux Integration
  → Added blogSlice.js with fetchBlogs, createBlog, updateBlog, and deleteBlog async thunks
  → Wired into Redux store under blogs key
- BlogManager.jsx Admin Screen
  → Displays all blog posts with title, author, content preview, and status (Published/Draft)
  → Supports inline creation, editing, and deletion
- Editing state opens a rich form with inputs for:
  → Title, Slug, Author
  → AuthorImage (via ImageUploader)
  → Content (via ReactQuill WYSIWYG)
  → Publish toggle
- Editor Choice
  → Replaced MarkdownEditor.jsx with ReactQuill for a modern, intuitive admin editing experience
  → MarkdownEditor has been deprecated and removed for clarity

  51. BadgeManager.jsx Admin Screen with Redux Integration

- Implemented full admin UI and backend integration for managing product badges
- Redux: badgeSlice.js
- CRUD operations wired via async thunks:
  → fetchBadges, createBadge, updateBadge, deleteBadge
  → Automatically updates state and syncs with MongoDB
  → Slice registered in Redux store under badges
- BadgeManager.jsx
  → Displays all badges in a responsive grid layout
- Each badge shows:
  → Name
  → Color swatch (dynamic background)
  → Short description
  → Clicking a badge enables inline editing
- Admin can:
  → Update name, color, and description
  → Delete badge
  → Create new badge (adds to top of list)
  → Changes are saved to MongoDB and reflected in real-time in Redux
- Notes
  → Color accepts any valid CSS color (hex code or named)
  → Designed to manage visual metadata for filtering, highlighting, and promotions

52. HeroManager.jsx Admin UI with Redux + MongoDB Integration

- Integrated full-featured admin screen for managing homepage hero sections
- Redux: heroSlice.js
  → CRUD thunks: fetchHeroes, createHero, updateHero, deleteHero
  → Registered in Redux store under heroes
  → State updates and MongoDB sync in real-time
- HeroManager.jsx
  → Replaced mock local data with Redux-powered dynamic hero section list
- Grid layout preview of all hero blocks with:
  → Image thumbnail
  → Title and subtitle
  → Placement info
  → Activation status (Active/Inactive)
- Inline Admin Features
  → `+ New Section` creates a blank MongoDB entry and opens the editor
- Admin can edit:
  → Title / Subtitle
  → Placement
  → CTA Text / Link
  → isActive toggle
  → Hero Image (via ImageUploader)
  → Changes saved instantly to Redux and MongoDB
  → Uses reusable SectionEditor modal
- Homepage hero sections are now fully CMS-managed and dynamic
- Ready to render on frontend via /api/heroes or placement-based logic

53. Refactored CMS Backend: Badge & Hero Sections

- Completed backend implementation for dynamic Badge and Hero homepage sections, enabling full admin-side management via secure API
- Badge CMS Integration (Model: Badge.js)
  → Fields:
  → name — string (required)
  → color — CSS color string (default: #000000)
  → description — short optional description
- Controller: badgeController.js
  → CRUD handlers:
  → getBadges() — returns all badges
  → createBadge() — creates a default badge
  → updateBadge(id) — modifies name, color, or description
  → deleteBadge(id) — removes badge by \_id
- Routes: badgeRoutes.js
  → Mounted at /api/badges
  → All POST, PUT, DELETE methods are protected with:
  → protect — requires login
  → admin — requires admin flag
- Badge CRUD is now fully wired to MongoDB and Express for use in:
  → Product labeling
  → Admin filtering
  → Homepage highlights and callouts
- Hero CMS Integration (Model: Hero.js)
  → Fields:
  → heading — title (required)
  → subheading — subtitle (optional)
  → image — image path or URL
  → ctaText / ctaLink — optional call-to-action
  → active — boolean toggle (default: true)
- Controller: heroController.js
  → CRUD handlers:
  → getHeroes() — fetch all hero entries
  → createHero() — adds blank/default hero
  → updateHero(id) — saves updates to hero section
  → deleteHero(id) — removes hero from DB
- Routes: heroRoutes.js
  → Mounted at /api/heroes
  → Admin-only routes protected by protect and admin middleware
- Hero sections now fully managed in MongoDB and accessible via secure CMS endpoints
  → Ready to dynamically render homepage banners
  → Multiple heroes can be active/inactive for layout flexibility
- Security & Middleware (Applied to all admin endpoints)
  → protect — JWT-based session auth
  → admin — requires isAdmin flag on user
- Mounted in server.js:
  → /api/badges
  → /api/heroes
- File-based structure aligns with blog CMS conventions and is frontend-ready

53. Redux Integration for Badge & Hero CMS

- Both `BadgeManager.jsx` and `HeroManager.jsx` are now fully wired to the backend using Redux Toolkit async thunks and MongoDB.
- `badgeSlice.js`
  → Handles `fetchBadges`, `createBadge`, `updateBadge`, `deleteBadge`
  → Registered under `badges` in Redux store
  → Automatically syncs UI and MongoDB data
- `heroSlice.js`
  → Handles `fetchHeroes`, `createHero`, `updateHero`, `deleteHero`
  → Registered under `heroes` in Redux store
  → Enables real-time CMS editing of homepage hero sections
- BadgeManager.jsx
  → Displays badges in a responsive grid
  → Supports inline editing, color previews, and full CRUD
  → Live changes update both Redux and MongoDB
- HeroManager.jsx
  → Renders CMS-defined hero sections
  → Supports creation and editing with `SectionEditor` and `ImageUploader`
  → Visual previews and full state sync on all CRUD operations
- Result: Admins can now manage homepage visual branding and marketing tags dynamically with full database persistence and no manual refresh needed.

54. CMS Seeding System (Badges & Heroes)

- The project now includes a full-featured seeding system for CMS collections such as badges and heroes. This allows flexible data initialization using either CLI flags or dedicated scripts
- Seeding Entry Points
  → seed.js | Bulk or targeted seeding via flags | node seed.js --all
  → seedBadges.js | Only seed badges | node seedBadges.js
  → seedHeroes.js | Only seed heroes | node seedHeroes.js
- CLI-Based seed.js Workflow
- The seed.js script now supports command line flags for granular control:
  → node seed.js --all (# Default behavior — seeds everything)
  → node seed.js --products (# Only seeds product data)
  → node seed.js --badges (# Only seeds badge data)
  → node seed.js --heroes (# Only seeds hero section data)
- This enables faster iteration without wiping or reloading unrelated collections.
- Badge Sample Data
- Badges represent product tags or visual labels (e.g. “New”, “Sale”). Sample entries include:
  → { "name": "New", "color": "#10B981", "description": "Just added to our collection!" }
  → These are seeded into the badges collection.
- Hero Sample Data
- Heroes are CMS-managed homepage banners with text, image, and CTA. Example structure:
  → { "heading": "Summer Ceramic Drop", "subheading": "Explore bold colors and hand-fired texture.", "image": "/uploads/promo-hero1.jpg", "ctaText": "Browse New Arrivals", "ctaLink": "/products", "active": true, "placement": "homepage" }
  → These are seeded into the heroes collection.
- File Locations
- All seed files live in the backend/ directory:
  → backend/
  → seed.js | # CLI-powered seeder
  → seedBadges.js | # Standalone badge seeder
  → seedHeroes.js | # Standalone hero seeder
- Developer Use Cases
  → First-time full DB setup node seed.js or node seed.js --all
  → Only updating badge visuals node seedBadges.js
  → Testing new homepage heroes node seedHeroes.js
  → Avoid wiping unrelated data Use targeted seeding with flags
- This seeding architecture supports safe, fast, and isolated development across multiple CMS collections, and is future-proofed for automation and deployment

55. Modular Seeding System for CMS Collections

- Expanded backend data seeding system to support blogs, users, and orders, in addition to existing badges and heroes.
- Seeding options:
  → seed.js — Bulk seeding with optional CLI flags for selective data insertion
- Individual seeders:
  → seedBadges.js — seeds badges collection
  → seedHeroes.js — seeds hero sections
  → seedBlogs.js — seeds blog content
  → seedUsers.js — seeds mock admin/user accounts
  → seedOrders.js — seeds mock guest or user order data
- All seeder scripts connect to MongoDB securely via .env and support async/await
- CLI Flag Support for seed.js:
  → Example: node seed.js --badges --heroes
  → Available flags: --badges, --heroes, --blogs, --users, --orders, --products
- Seed Workflow Options:
  → node seed.js | Seed all supported collections (products, badges, heroes, blogs, users, orders)
  → node seed.js --badges | Seed only badges collection
  → node seedBlogs.js | Seed blogs via isolated script
  → node seedUsers.js | Seed mock admin and guest users
  → node seedOrders.js | Seed mock guest checkout order

56. Selective Collection Deletion Utility (clear.js)

- Introduced clear.js script to wipe specific MongoDB collections without affecting others
- Accepts CLI arguments for fine-grained control
- Built-in safeguards: No action is taken unless a valid flag is passed
- Flags supported:
  → --products, --badges, --heroes, --blogs, --users, --orders
- Clear Workflow Example:
  → node clear.js --badges --heroes | Deletes only badges and hero CMS collections
  → node clear.js | Displays help message if no valid flags provided
- This modular structure supports fast iteration and clean resets during development, especially for solo or small team workflows.

57. Header/Footer Modularization

- Extracted header markup from `App.jsx` into new `Header.jsx` component
  → Located in `src/components/Header.jsx`
  → Includes logo and "View Cart" button
  → Removed Blog button (now available via footer under "Resources")
- Footer remains in `Footer.jsx` and renders globally
- Both `Header` and `Footer` now imported and used inside `App.jsx`
- Benefits:
  → Improved file organization
  → Simplified global layout management
  → Paves way for future header expansion (search bar, auth buttons, etc.)

58. CMS Slice Integration + Visual Section Rendering Setup

- Implemented Redux state slice for CMS sections:
  → Created cmsSlice.js under src/redux/slices/
  → Includes fetchCmsByRoute async thunk to GET CMS data via /api/cms?route=/
  → Stores cmsSections in Redux and exposes loading/error state
- Connected CMS sections to HomeScreen.jsx:
  → Added useEffect to dispatch fetchCmsByRoute('/')
  → Uses SectionRenderer.jsx to map through CMS sections and render matching components dynamically (e.g. HeroSection, BlogPreviewSection)
- Created placeholder CMS components for dynamic rendering:
  → HeroSection.jsx, PromoGridSection.jsx, and BlogPreviewSection.jsx under src/components/
  → BlogPreviewSection fetches latest blog posts from Redux and displays a grid preview
- Updated SectionRenderer.jsx to conditionally render each component by section.type
  → Prevents breaking if unknown section type is encountered
  → Keeps logic modular and easy to extend
- CMS backend routing:
  → Created cmsRoutes.js and mounted on /api/cms in server.js
  → Supports GET /api/cms?route=/ to fetch sections assigned to a given route
  → Pulls from CMS model in MongoDB seeded via seedCms.js
- Seeding support added to seed.js:
  → Use node seed.js --cms to seed CMS data only
  → cmsSeed.js defines default homepage sections (hero, promoGrid, blog)
- Benefits:
  → Enables dynamic visual section rendering based on CMS config
  → Establishes full stack flow for admin-controlled homepage layout
  → Sets up future extensibility for CMS tools and layouts

59. CMS Section Renderer Integration & Enum Type Consistency

- Resolved Issues:
  → CMS section data seeded with camelCase type values (e.g., promoGrid, blogPreview) was not rendering on the frontend
  → SectionRenderer.jsx expected lowercase strings ('promogrid', 'blogpreview'), causing mismatches and silent rendering failures
  → CMS schema validation error (is not a valid enum value for path type) occurred when lowercased values were seeded from the backend
- Standardized CMS type values to camelCase enums (hero, promoGrid, blogPreview) across:
  → Backend seeding script (seed.js)
  → CMS Mongoose schema enum validation (CMS.js)
  → Frontend logic (SectionRenderer.jsx)
- Refactored SectionRenderer.jsx to:
  → Use a safe default fallback for missing or unknown sections
  → Add console.info('🧩 Rendering section type:', type) for better traceability
  → Clean up the switch block to match camelCase types directly (no .toLowerCase() needed)
- Verified:
  → Redux DevTools logs confirm CMS sections are fetched and rendered in order
  → Network tab shows successful /cms?route=/ and /products fetches
  → Hero, PromoGrid, and BlogPreview now appear correctly on the homepage
- Outcome:
  → Eliminated silent frontend render failures from enum mismatches
  → Ensured CMS sections can be reliably seeded and rendered without manual mapping
  → Ready to support dynamic visual blocks configured in MongoDB and displayed in React

60. PromoGridSection Component + CMS Integration

- Added `<PromoGridSection />` component to render promotional tile grids on the homepage
- CMS-driven: renders when CMS contains `type: 'promoGrid'`
- Component includes:
  → Grid layout with images, titles, and optional descriptions
  → Hardcoded demo tiles; backend CMS integration planned
- Verified in SectionRenderer:
  → Matches 'promoGrid' via updated camelCase switch block
- CMS Seeding:
  → Added `promoGrid` to homepage sections via `seedCms.js`
  → Order = 2 (after hero, before blogPreview)
- Outcome:
  → PromoGrid now part of modular CMS layout system
  → Sets foundation for dynamic merchandising tiles

61. CMS Layout Editor Save & Sync (Multi-Route)

- Created frontend updateCms thunk in cmsSlice.js to persist CMS layout changes via:
  → PATCH /api/cms with { route, sections }
- Refactored SettingsManager.jsx to:
  → Include "Save Layout" button
  → Use Redux to dispatch updated CMS layout
  → Handle backend response status (success, error)
  → Enforce a maximum of 6 sections per route
- Drag-and-drop and reorder buttons update local and Redux section order
- Auto-fetches correct CMS layout when admin selects a different route
- Synced with backend via cmsRoutes.js:
  → PATCH request saves updated section order for each route
- Fully supports multi-route CMS management:
  → Admin can edit visual section layout for /, /products, /blog, /about, /contact
- Ready for future expansion: new section types, per-route customization, layout preview

62. Add/Edit CMS Section Modal

- Introduced <AddEditSectionModal /> using Headless UI’s <Dialog> to provide admin users with the ability to edit individual CMS section configurations
- Modal appears upon clicking ✏️ Edit in <SectionRow /> and renders dynamically based on the section.type
- Field values are initialized from the current section.settings object and written back upon save

63. CMS Schema-Driven Config Engine

- Added cmsSchema.js to centralize editable field configurations per CMS section type
- Schema allows each section type to define editable fields like:
  → text, textarea, toggle, select
- Used by <AddEditSectionModal /> to dynamically render field inputs

64. SectionRow Integration (Edit, Toggle, Reorder, Preview)

- Updated SectionRow.jsx to support:
  → Enable/Disable toggle
  → Edit button (opens modal)
  → Remove button
  → Reorder support wired via onReorder(fromIndex, toIndex)
- Each section now renders a real-time preview using <SectionRenderer />

65. SectionRenderer Component

- Refactored <SectionRenderer /> to dynamically render any supported CMS section based on its type
- Each section receives settings props populated by its section.settings config
- Renders a matching visual section stub (e.g., <PromoGridSection />, <QuoteBlockSection />, etc.)

66. Visual Section Component Stubs

- All 18 CMS section components scaffolded as placeholders for preview/rendering
  → Includes: PromoGridSection.jsx, QuoteBlockSection.jsx, CarouselSection.jsx, etc.
- Each stub accepts settings as a prop (for future visual and data binding)

67. Toast Notification Integration

- Installed and configured react-hot-toast
- Added <Toaster /> to global UI in App.jsx
- Used toast.success() and toast.error() in:
  → SettingsManager.jsx → layout save success/failure
  → AddEditSectionModal.jsx → config save confirmation

68. Modularized Seed Data Files

- Replaced legacy `data.js` with fully modular seed scripts:
  → `/backend/seedProducts.js`
  → `/backend/seedUsers.js`
  → `/backend/seedBlogs.js`
  → `/backend/seedBadges.js`
  → `/backend/seedHeroes.js`
  → `/backend/seedOrders.js`
  → `/backend/seedCms.js`
- Updated `seedRoutes.js` to use ES module imports from these files
  → Ensures consistent data structure and separation of concerns
  → Avoids single-point failure and enables targeted seeding
- All seed files now use `export const` instead of `export default` for named export consistency

69. Model Safety Refactor (Prevent OverwriteModelError)

- Added Mongoose model safety guards to all model files to prevent `OverwriteModelError`
  → const CMS = mongoose.models.CMS || mongoose.model("CMS", cmsSchema);
- Affected model files:
  → `/models/CMS.js`
  → `/models/Product.js`
  → `/models/User.js`
  → `/models/Order.js`
  → `/models/Badge.js`
  → `/models/Blog.js`
  → `/models/Footer.js`
  → `/models/Hero.js`

70. Controller Review and Standardization

- All controller files reviewed and aligned with new seed/model logic
- Ensured each controller:
  → Uses async/await with proper error handling
  → Validates Mongoose data using `.validate()` where needed
  → References correct model instance (e.g., CMS vs Cms)
- Reviewed controllers:
  → `productController.js`
  → `userController.js`
  → `orderController.js`
  → `blogController.js`
  → `badgeController.js`
  → `footerController.js`
  → `heroController.js`
  → `cmsController.js`

71. `clear.js` Script Update for Case-Safe Imports

- Adjusted imports in `/backend/clear.js` to resolve casing issues on Windows
- Ensured all model imports match exact filename casing (e.g., `CMS.js`, not `Cms.js`)
- Avoids TS error 1149 (file included with different casing)
- Confirmed `clear.js` supports selective MongoDB collection wiping with CLI prompts

72. Added Optional `seedTest.js` Script

- Introduced `/backend/seedTest.js` to support partial seeding during development
  → Allows seeding only key collections like products, CMS, and users
  → Useful for test environments or sandbox resets
- Can be extended or parameterized in future for CI/CD scenarios

73. Placeholder Previews for CMS Sections

- Added scaffolded React component placeholders for all CMS section types
- Rendered with unique colors and labels (e.g., `<HeroSection /> Placeholder`)
- Ensures that:
  → CMS visual layout displays even if config is empty
  → Admin preview of section ordering and existence is enabled
- Example section types scaffolded:
  → HeroSection, PromoGridSection, BlogPreviewSection, TestimonialSection, NewsletterSignupSection, etc.

74. `/settings` CMS Editor Preview Improvements

- Dynamic placeholder components now render live previews in the admin layout manager
- Each section preview styled with Tailwind and conditionally rendered based on `section.type`
- Color-coded blocks make UI section hierarchy easy to audit
- Supports full visual preview and admin drag/sort flow

75. Project Integrity Verified Post-Refactor

- MongoDB reconnected and fully functional with new seed structure
- Vite frontend confirms preview rendering and CMS API routing success
- Backend startup validated via `nodemon server.js` with no model overwrite errors

76. Redux Product Details State + ProductScreen Slug Fetching

- Created productDetailsSlice.js with Redux Toolkit:
  → Handles async thunk fetchProductBySlug(slug)
  → Populates Redux state under productDetails.product
- Updated ProductScreen.jsx:
  → Extracts slug from URL params
  → Dispatches fetchProductBySlug(slug) on mount
  → Selects and renders productDetails.product from Redux state
- Registered productDetailsReducer in store.js

77. API Endpoint: GET /api/products/slug/:slug

- Added Express route: GET /api/products/slug/:slug
- Updated productRoutes.js to include:
  → router.get('/slug/:slug', getProductBySlug);
- Added getProductBySlug to productController.js:
  → Uses Product.findOne({ slug })
  → Returns 404 if not found
  → Returns product object otherwise
- Ensures alignment between frontend slug logic and MongoDB queries

78. Redux DevTools Integration + Debug Setup

- Exposed Redux store and thunks via window.**APP**:
  → Implemented in main.jsx
  → Enables running thunks like window.**APP**.dispatch(fetchAllProducts()) from browser

79. Redux Product Slice State Refactor

- Updated productSlice.js:
  → Ensured state shape follows { products: [], loading: false, error: null }
  → Renamed/reorganized internal state.products to better match fulfilled payload shape
  → Avoided accidental shadowing with top-level slice name
- Updated HomeScreen.jsx:
  → Uses useSelector((state) => state.products.products) to access correct level
  → Conditional loading logic based on loading and error values

80. Redux Null State Debug Fixes

- Resolved bug where Redux state showed null for productDetails.product
  → Confirmed productDetailsSlice.js initial state
  → Confirmed payload from backend is fully hydrated
- Verified final working state with DevTools snapshot and frontend display

81. Eliminated Duplicate MongoDB Connection Logs

- Diagnosed repeated MONGODB_URI + ✅ MongoDB connected log messages:
  → Cause: connectDB() called in every seed script
- Solution:
  → Refactored all seed files to avoid implicit connectDB() duplication

82. Modular Seeding Script Refactors

- All seed scripts now follow a consistent pattern:
- Uses if (import.meta.url === ...) to support CLI use
- Each seed file:
  → Connects to DB once
  → Deletes existing collection entries
  → Inserts fresh mock data
  → Logs count seeded
- List of refactored scripts:
  Optional: Cleanup Later
  → seedUsers.js
  → seedProducts.js
  → seedOrders.js
  → seedBadges.js
  → seedBlogs.js
  → seedHeroes.js
  → seedFooter.js
  → seedCms.js

83. Central seed.js Delegation

- Rewrote seed.js to call individual seed scripts directly:
  → await seedUsers();
  → await seedProducts();
- Removed legacy bulk deleteMany() / insertMany() in favor of modular design
- Outcome:
  → Cleaner CLI control
  → Eliminates duplicate DB connects
  → Easier to maintain and isolate bugs

84. Centralized CMS Schema System (`cmsSchema.js`)

- Created `frontend-vite/src/config/cmsSchema.js` to serve as the centralized field registry per section `type`
  → Defines which fields each CMS section (e.g. `hero`, `faqAccordion`, etc.) should include in its `config` object
- This registry powers:
  → Auto-population of section config defaults
  → Dynamic config field rendering in admin modals
  → Cleaner decoupled logic across admin CMS tools

85. Auto-Populate Section Config in Add/Edit Modal

- Enhanced `AddEditSectionModal.jsx` to auto-fill `config` fields when a user selects a section `type`
- Upon changing the `<select>` input for section type, the modal:
  → Clears any existing config
  → Generates an object from `cmsFieldConfig` with empty string values for each field
  → Enables dynamic editing without requiring manual typing of keys
- Benefits:
  → Reduces user errors
  → Accelerates admin workflow
  → Keeps backend configs uniform across section types

86. SettingsManager.jsx Dynamic `route` Refactor + Feedback UX

- Removed legacy `selectedRoute` state
- Injected dynamic route targeting via:
  → `const { pathname: route } = useLocation()`
- Updated all layout actions to use this value
- Updated:
  → `updateCms` → `updateCmsLayout` for naming clarity
  → `resetCmsStatus()` continues to handle toast lifecycle
- Benefit:
  → No stale state
  → UX-safe routing logic
  → ESLint clean

87. CMS Redux Slice Enhancements (`cmsSlice.js`)

- Renamed `updateCms` → `updateCmsLayout` for consistency with `fetchCmsByRoute`
- Added:
  → `resetCms()` reducer: clears CMS layout state (used on logout or admin switch)
  → `success = false` reset during `fetchCmsByRoute.pending` to prevent false-positive UI feedback
- All loading, success, and error states now managed cleanly
- Outcome:
  → Fully route-aware layout slice
  → Decoupled and production-safe

88. generateSecureId() Utility Abstraction + Token Overhaul

- Abstracted secure token generation into:
  → `generateSecureId.js`
- Implementation:
  → Uses frontend-safe Web Crypto API
- Refactored All Frontend Token Use:
  → Replaced all frontend `uuid` or `crypto.randomBytes()` calls with `generateSecureId()`
  → Ensures cross-browser compatibility without Node polyfills
- Affected files:
  - `SettingsManager.jsx`
  - `MobileSessionLauncher.jsx`
  - `guestSession.js` (if used in browser context)
- Outcome:
  → Secure and consistent token generation
  → One unified utility for frontend identity/session creation
  → No more Node-based crypto errors in Webpack/Vite

89. CMS Schema Scaffolding + Auto-Fill Config Behavior

- Implemented centralized field schema via:
  → `cmsSchema.js`
- Structure:
  → Maps each section `type` (e.g. `'hero'`, `'faqAccordion'`, `'ctaBanner'`) to an array of required config fields
- Integrated into `AddEditSectionModal.jsx` to enable:
  → Auto-generation of config fields when a section type is selected  
  → Empty string defaults for all fields  
  → Support for dynamic form rendering down the line
- Benefits:
  → Cleaner admin UX (no manual typing of keys)
  → Safer backend validation (consistent config structure)
  → Extensible for future types (just add to `cmsSchema.js`)
- Outcome:
  → The system now scaffolds CMS section config reliably on type selection
  → Admins can manage section blocks quickly without worrying about field shape

90. AddEditSectionModal.jsx Refactor for Schema-Aware Config

- Updated `<AddEditSectionModal />` to integrate with `cmsSchema.js`:
  → When selecting a section type, the modal auto-fills the config based on that type’s `defaultConfig` entry
  → Dynamically renders input fields for each config key using `fieldTypes` (e.g. `text`, `textarea`, `image`)
  → Falls back to string input for any unknown types
- Changes include:
  → Importing schema: `import { getDefaultConfig, getFieldTypes } from '../../config/cmsSchema';`
  → Resets config on type change with: `setSection({ ...section, type, config: getDefaultConfig(type) });`
  → Generates fields dynamically via mapped `fieldTypes[type]`
- Benefits:
  → Eliminates hardcoded config structures
  → Makes modal future-proof as new section types are added
  → Clean, DRY field generation for admin editing
- Outcome:
  → Modular, scalable modal for visual section editing
  → Consistent UX across all CMS section types

  91. MobileSessionLauncher.jsx Token Refactor (Frontend Crypto)

- Replaced legacy `uuid` import with secure frontend-compatible ID generator:
  → `generateSecureId()` from `generateSecureId.js`
- Applied to mobile QR session flow:
  → Guest session tokens, device identity, or temporary references now use 128-bit hex IDs from Web Crypto API
- Eliminated unsafe or Node-only code:
  → Removed `crypto.randomBytes()` and `uuid.v4()` usage
  → Ensured no Webpack errors for `crypto` in frontend builds
- Outcome:
  → Seamless secure session creation in frontend UI
  → Polyfill-free browser compatibility

92. guestSession.js Token Strategy Unification

- Replaced `uuid` with shared `generateSecureId()` in guest checkout utilities
- Ensured any anonymous/guest fallback session logic:
  → Creates consistent and cryptographically random tokens using Web Crypto
  → Matches backend session format (128-bit hex)
- Benefits:
  → Improved frontend token generation security
  → Full consistency across session-generating flows

93. CMS Feedback UX Support + Reset State

- Added and wired the following Redux states for CMS layout updates:
  → `cmsLayout.loading`
  → `cmsLayout.success`
  → `cmsLayout.error`
- In `SettingsManager.jsx`:
  → Used these to show toast feedback and conditional banners
  → Auto-cleared feedback via `resetCmsStatus()` after short delay
- In `cmsSlice.js`:
  → Added `resetCmsStatus` reducer to clear layout flags
  → Prevented stale UI by resetting `success` state on fetchCMS start
- Outcome:
  → Cleaner user feedback experience in admin
  → Prevents ghost success/error states across pages

94. ESLint Cleanup + Route Usage Reinstated

- Resolved unused variable warning for `route` in `SettingsManager.jsx`:
  → Reintroduced it as an active prop for layout PATCH requests
- Used dynamically from:
  → `const { pathname: route } = useLocation();`
- Benefit:
  → ESLint-clean and logically correct
  → Route-scoped CMS layout sync persists across all admin pages

95. Mobile Session Middleware Implementation (verifyMobileSessionMiddleware.js)

- Created verifyMobileSessionMiddleware.js in backend/middleware/:
  → Wraps async session validation via verifyMobileSession(token)
  → Extracts token from req.headers['x-mobile-session-token'] or req.query.token
  → Attaches session to req.mobileSession for downstream handlers
- Built on top of:
  → utils/verifyMobileSession.js (session token validation logic)
- Middleware improves:
  → Consistency in token validation across route files
  → Reusability for mobile-specific session workflows

96. Middleware Injection into Route Files

- Injected verifyMobileSessionMiddleware into key backend route files:
  → `mobileSessionRoutes.js` (entire route)
  → `orderRoutes.js` (mobile route group only)
  → `productRoutes.js` (for mobile session inventory ops)
  → `uploadRoutes.js` (potential future image logging or QR scans)
  → `userRoutes.js` (for mobile session profile handling)
- Ensures all mobile-authenticated operations validate tokens securely
- Outcome:
  → Mobile workflows now supported in backend APIs
  → Granular control over which endpoints require mobile auth

97. Node Crypto Usage Clarification (Backend Only)

- Confirmed backend uses Node's built-in crypto.randomBytes():
  → Used for generating secure mobile session tokens (128-bit hex)
  → No need to install crypto from npm
  → Deprecated npm install crypto was avoided

98. generateSecureId.js Token Utility Verification (Frontend)

- Audited generateSecureId.js to confirm:
  → Uses window.crypto.getRandomValues() correctly
  → Generates 128-bit (16-byte) token in lowercase hex format
- Output:
  → 32-character secure token: consistent with backend format
- Safe for all modern browsers — no polyfill or UUID needed
- Used in:
  → `SettingsManager.jsx`
  → `MobileSessionLauncher.jsx`
  → `guestSession.js`

99. Removed Legacy uuid Dependency from Frontend

- Frontend previously included unused uuid dependency:
  → Leftover from earlier token generation approaches
  → Cleaned up unused packages from node_modules
- Outcome:
  → Leaner dependency tree
  → No frontend crypto errors in Vite/Webpack

# Notes (84 to 99)

→ Integrated centralized CMS schema auto-fill system (cmsSchema.js) and modal config scaffolding
→ Refactored SettingsManager.jsx for dynamic route handling and layout syncing
→ Introduced generateSecureId.js utility (Web Crypto API) for secure frontend token generation
→ Replaced all uuid/crypto.randomBytes frontend calls with generateSecureId()
→ Implemented verifyMobileSessionMiddleware and injected into key backend routes
→ Confirmed secure Node crypto usage for backend session generation
→ Removed unused frontend uuid dependency and pruned node_modules
→ Added toast-based feedback UX for CMS layout actions via Redux state management

100. Smart Auth Flow: EmailCheckScreen Implementation

- Introduced new screen: `EmailCheckScreen.jsx`
  → Collects user email and POSTs to /api/users/check-email
- Backend logic: `userController.js`
  → New controller: checkEmailStatus
  → New route: POST /api/users/check-email in userRoutes.js
- Outcome:
  → Determines if user should proceed to login or registration
  → Pre-fills email field in redirected screens via query param

101. Backend: /check-email Endpoint

- Created checkEmailStatus controller:
  → Searches user DB for submitted email
  → Returns JSON with { exists, role, isApproved }
- Added route in `userRoutes.js`:
  → POST /api/users/check-email
  → Validates input with express-validator and returns 400 on bad payload
  → Used for conditional routing in `EmailCheckScreen.jsx`

102. Created `AccountTypeSelection.jsx`

- Role Selection:
  → Two buttons: "Continue as Personal" or "Continue as Vendor"
  → Stores selected role in Redux: authSlice.selectedRole
  → Redirects user to appropriate register route
- Design:
  → Clean UX with icons and layout polish
  → Uses useNavigate, useDispatch, and react-hot-toast

103. Redux Enhancements for Role Selection

- Updated authSlice.js:
  → Added selectedRole to state
  → Created reducer: setSelectedRole(role)
- Used in:
  → `AccountTypeSelection.jsx` to set selectedRole
  → Register screens to validate role before proceeding

104. Added Role-Based Redirect in Register Screens

- Updated both:
  → `VendorRegisterScreen.jsx`
  → `PersonalRegisterScreen.jsx`
- New logic:
  → If auth.selectedRole is not set, redirect to /register/account-type
  → Prevents bypassing role selection via direct URL
- Maintains consistent onboarding flow

105. Refactored MobileSessionLauncher.jsx with react-qr-code

- Removed qrcode.react dependency:
  → Caused ESM import issues with Vite
- Replaced with react-qr-code@2.0.7
  → Full ESM-compatible
  → Clean rendering, responsive sizing
- Updated import: import QRCode from 'react-qr-code';

106. Confirmed Secure Token Workflow with generateSecureId

- Utility `generateSecureId.js`:
  → Uses crypto.getRandomValues to generate 128-bit token
- Used in MobileSessionLauncher.jsx to launch mobile session
- Ensures frontend token generation matches backend expectations

107. Backend Fixes and Cleanup for ESM Exports

- Fixed named export errors:
  → getProducts in `productController.js`
  → seedCmsData in `seedCms.js`
  → getMobileSession in `mobileSessionController.js`
- Ensured:
  → Named exports match route imports
  → All controllers use export const instead of module.exports
- Prevented common ERR_MODULE_NOT_FOUND and SyntaxError: named export issues

108. Scaffolded LoginScreen.jsx

- New file LoginScreen.jsx:
  → Email and password fields
  → Pre-fills email from /login?email=...
  → Uses Redux action: loginUser({ email, password })
  → Redirects to /account if already logged in
- Fully styled and ready for integration

109. Folder Restructuring and Consolidation

- Moved `EmailCheckScreen.jsx` to:
  → src/screens/auth/EmailCheckScreen.jsx

110. Smart Auth Flow Migration (EmailCheck UX)

- Fully replaced legacy sign-in UX (/signin) with /check-email screen
- Introduced EmailCheckScreen.jsx:
  → Collects email and checks existence/status via POST /api/users/check-email
  → Redirects to sign-in or registration screen based on user state
- Updated `Header.jsx`:
  → “Sign In” button now routes to /check-email
- Deprecated `SignInScreen.jsx`:
  → Still exists as a soft fallback, but logic fully migrated
- Replaced manual axios.post logic with new Redux thunk: checkEmailStatus
- Updated `authSlice.js` to include:
  → checkEmailStatus thunk
  → Role-based state routing metadata: selectedRole, isApproved, etc.

111. Redux Store Integration for EmailCheck Flow

- Confirmed Redux setup for checkEmailStatus:
  → `store.js` includes authSlice from redux/slices/authSlice.js
  → `main.jsx` correctly provides <Provider store={store}>
- Fully removed unused loginUser thunk:
  → Purged from `authSlice.js`, `main.jsx`, and legacy screen `LoginScreen.jsx`
  → Cleaned `userRoutes.js` of any outdated references
- Resolved ESLint warnings for unused toast, checkStatus, error, role, and isApproved

112. White Screen Prevention + Fallback Strategy

- Prevented white screen errors during lazy loading or failed Suspense boundaries
- In `main.jsx`:
  → Wrapped <App /> in <Suspense fallback={<div>Loading...</div>}>
  → Fallback message may be upgraded to branded loader later
- Optional: consider React Error Boundaries (componentDidCatch) for uncaught runtime errors

113. 🪦 Legacy Route Deprecation

- Deprecated and removed /login route:
  → Fully migrated flow begins at /check-email
  → Removed import and usage of `LoginScreen.jsx`
- Removed unused loginUser references across project

114. Deprecated LoginScreen.jsx

- Deleted `LoginScreen.jsx` since it was a temporary redirect placeholder.
- All sign-in flows are now handled via `EmailCheckScreen.jsx` → `SignInScreen.jsx` and role-aware registration.
- Removed `/login` route entirely to reduce confusion

115. Refactored authSlice.js for Consistent Thunk Exports

- Replaced legacy exports like `registerUser`, `login`, and `logout` with standardized Redux Thunks:
  → `registerUser`
  → `loginUser`
  → `logoutUser`
- Updated action and slice logic to match modern Redux Toolkit structure
- Ensured compatibility with `EmailCheckScreen`, `PersonalRegisterScreen`, and `SignInScreenSmart`
- Verified all thunk exports to eliminate missing import errors across screens

116. Replaced SignInScreen.jsx with SignInScreenSmart.jsx

- Created new smart sign-in screen: `SignInScreenSmart.jsx`
  → Receives `email` via URL query param from `/check-email`
  → Uses `loginUser` from Redux
  → Redirects user based on successful login and user role
  → Displays errors via toast notifications
- Deleted old `SignInScreen.jsx` file to avoid duplicate routing/conflicts

117. Confirmed Email Check Route / Controller / Proxy Integration

- Verified existence of `/api/users/check-email` backend route in `userRoutes.js`
- Controller `checkEmailStatus` added to `userController.js`
  → Returns `{ exists, role, isApproved }` for given email
- Proxy rule added to `vite.config.js`:
  → Forwards `/api` to backend server on port 5000
- Ensured `EmailCheckScreen.jsx` submits to this route for smart flow routing

118. Cleaned Up `undefined` Log and db.js Import Errors

- Fixed improper logging of `undefined` in `server.js` startup logs
  → Cleaned up accidental `console.log(process.env.MONGODB_URI)` usage
- Relocated `db.js` from `backend/` to `backend/config/db.js` to resolve import error in ESM context
- Used `path.resolve()` consistently for ES module compatibility
- Verified MongoDB connection prints success message without side logs

119. Final Routing & UX Confirmations

- `/check-email` flow works correctly for seeded user: `admin@example.com`
  → Redirects to `SignInScreenSmart.jsx` with email pre-filled
- Removed legacy redirect messaging: “Deprecated screen, use Email Check Flow”
- Confirmed that Redux flow + API integration now functions with no `404` or thunk errors
- `favicon.ico` 404 ignored (non-critical), and WebSocket devtool messages are browser extension-related

120. Lucide Icon Integration for Smart Email Flow

- Installed lucide-react to enable consistent SVG icon usage across the UI
- Replaced placeholder image block in EmailCheckScreen.jsx with:
  → <MailCheck /> icon from Lucide
- Updated layout to align icon centrally and adjust spacing responsively

121. Smart Sign-In Screen Debugging + Error Diagnosis

- Fixed logic error in SignInScreenSmart.jsx where email was sometimes not passed via query params
  → Ensured email is extracted from URLSearchParams properly
- Updated toast messaging:
  → Displays correct Login failed notice on 401 responses
  → Prevents silent fails when API endpoint is unreachable

122. Axios Base URL Fix for Local Dev API Proxying

- Refactored axiosInstance.js:
  → Removed duplicate /api/api/ issue caused by nested base URLs
  → Final base URL logic now reads: baseURL: '/api' for proxy handling
- Verified both /users/login and /users/check-email return correct results in dev mode

123. API Proxy Path Errors: Resolved

- Investigated repeated (EM)Prompt_entry 404s tied to incorrect Axios routes
- Root Cause:
  → Misconfigured double /api/api/... calls due to base URL + route redundancy
- Resolution:
  → Updated authSlice.js thunks to remove manual /api prefix, now relying on axiosInstance base

124. Redux Auth Slice Cleanup

- Finalized consistent thunk pattern in authSlice.js:
  → loginUser, registerUser, logoutUser, checkEmailStatus
- Removed redundant extraReducers blocks
- Verified reducer keys in store.js for full compatibility with Smart Auth Flow

125. CMS Slice Audit & Middleware Readiness

- Refactored cmsSlice.js to:
  → Use consistent createAsyncThunk syntax
  → Avoid duplicate calls to malformed routes
- Added support for dynamic error toast dispatching on CMS fetch failures

126. FeaturedProductSection Component

- Introduced new CMS-compatible section: FeaturedProductSection.jsx
  → Location: `FeaturedProductSection.jsx`
  → Follows pattern: fetches Redux product state via useSelector(products)
  → Renders featured tiles from config.featuredProductIds passed by CMS layout
- Component logic:
  → Accepts CMS config with an array of \_ids
  → Filters Redux products.items for matching IDs
  → Renders basic info (image, name, price)
  → Optional: renders config.title (fallback = 'Featured Products')
- Integrated in SectionRenderer.jsx:
  → Added case 'featuredProduct' switch
  → Layout controllable via drag-and-drop in SettingsManager.jsx

127. Backend Patch: `cmsController.js` Hydration Logic

- Patched getCmsByRoute in `cmsController.js` to hydrate blogPreview and featuredProduct:
- Outcome:
  → CMS layout dynamically populated with fresh backend data
  → Reduces need for hardcoded content in config.items

128. Reseeded CMS Data for Blog + Product Sections

- Created `seedCmsData.js` to include seeded items arrays for:
  → blogPreview
  → featuredProduct
- Updated `seedCms.js` to import from `seedCmsData.js` for real data hydration
- Ran: node backend/seed.js --cms
- Result:
  → `/` CMS layout is seeded with dynamic blog and product content

129. Verified CMS Layout in MongoDB

- Confirmed CMS document for route `/` includes:
  → hero section
  → promoGrid section
  → featuredProduct section with hydrated products
  → blogPreview section with latest posts
- Verified via: http://localhost:5000/api/cms?route=/

130. Refactored `SectionRenderer.jsx` for Full Section Prop

- Changed visual section props
- From:
  → <SectionComponent {...section.config} />
- To:
  → <SectionComponent section={section} />
- Result:
  → Full section object now accessible
  → Components can access both type, order, and hydrated config.items

131. Updated FeaturedProductSection & BlogPreviewSection

- Adjusted both components to consume:
  → section.config.items
- Rendered hydrated arrays passed from backend
- UI Enhancements:
  → Responsive grid
  → Fallbacks for missing content
  → Section titles configurable from CMS

132. Redux Slice Verification for Blog + Product Data

- productSlice:
  → Populates products array from backend
- blogSlice:
  → Populates blogList array
- Verified:
  → Redux DevTools
  → network tab
  → Console logs

133. `HomeScreen.jsx` Defensive Defaults

- Prevented destructuring crashes during Redux hydration:
  → const { blogList = [] } = useSelector((state) => state.blog || {});
  → const { products = [] } = useSelector((state) => state.product || {});
- Result:
  → Reliable screen render on refresh or slow load

134. logSeed Utility & Emoji Logging Standardization

- Created reusable `logSeed.js` utility for consistent CLI output:
  → Location: `logSeed.js`
- Functions:
  → startSeed(label)
  → endSeed(label)
  → failSeed(label, error)
- Standardized log format across all seed\*.js files:
  → [seed:Badges] ✅ Seeded 5 badges
  → [seed:Orders] ❌ Error seeding orders: <error>
- Benefits:
  → Easier debugging via clearly labeled output
  → Consistent structure for logs and error handling

135. Seed Data Refactor into backend/data Folder

- Created central data payload directory:
  → backend/data/
  -Moved all seed arrays to separate modules:
  → `usersData.js`
  → `productsData.js`
  → `badgesData.js`
  → `blogsData.js`
  → `heroesData.js`
  → `footerData.js`
  → `ordersData.js`
  → `cmsData.js`
- Refactored each seed\*.js file to import payloads:
  → import users from `../data/usersData.js`;
  → import products from `../data/productsData.js`;
- Outcome:
  → Clear separation of logic (seeders) and content (data)
  → Simplified maintenance for growing or dynamic seed content

136. Refactored All seed\*.js Scripts for Best Practices

- Refactored all seed scripts to follow consistent structure:
  → Import model + payload
  → Use logSeed.js for logging
  → Async/await with proper try/catch
  → Use .deleteMany() before .insertMany() for clean state
- Affected files:
  → `seedUsers.js`
  → `seedProducts.js`
  → `seedOrders.js`
  → `seedBadges.js`
  → `seedBlogs.js`
  → `seedHeroes.js`
  → `seedFooter.js`
  → `seedCms.js`
- Each script runs standalone:
  → node `seedUsers.js`
- Can also be triggered via central `seed.js`

137. Patched `seed.js` to Support Selective Seeding

- Central `backend/seed.js` now includes:
- CLI flags for targeting:
  → `node seed.js --users`
  → `node seed.js --cms`
- Fallback to full-seed if no flag provided:
  → `node seed.js`
- Uses minimist for argument parsing
- Unified emoji logging across all modules via logSeed.js

138. Verified Full Reseed Functionality

- Ran:
  → `node backend/seed.js`
- Confirmed logs:
  → [seed:Users] ✅ Seeded 2 users
  → [seed:Products] ✅ Seeded 12 products
  → [seed:Orders] ✅ Seeded 3 orders
  → [seed:Badges] ✅ Seeded 5 badges
  ...
- Confirmed seeded data in:
  → MongoDB collections
  → CMS route / hydration

139. Dynamic CMS Layout Editor Integration

- Implemented visual CMS layout editor in SettingsManager.jsx
  → Allows admin to reorder, edit, and delete CMS sections
- Component features:
  → Add/edit section modal
  → Drag-and-drop ordering via `SectionRow.jsx`
  → Dynamic field types driven by schema
  → Real-time visual previews (for selected types)
- Redux cmsSlice wired to:
  → Fetch CMS layout per route
  → Update layout via updateCmsLayout thunk
- Outcome:
  → Admin users can fully configure homepage layout via UI
  → No backend intervention required for content/design changes

140. Configurable Section Schema Support

- Created centralized CMS config schema:
  → `cmsSchema.js`
- Each section type (e.g., hero, promoGrid, featuredProduct) defines:
  → Field types: text, textarea, image, toggle, select
  → Validation rules and default values
  → Labels and admin form hints
- Used by:
  → AddEditSectionModal.jsx
  → SettingsManager.jsx
- Outcome:
  → Rapid creation of new visual sections
  → Consistent field rendering and validation

141. CMS Section Rendering via SectionRenderer.jsx

- `SectionRenderer.jsx` now dynamically renders CMS layout based on:
  → section.type
  → section.config
- Integrated components:
  → HeroSection
  → PromoGridSection
  → FeaturedProductSection
  → BlogPreviewSection
  → Others as needed
- Fallback display for unknown section types with admin warning
- Supports runtime rendering of hydrated backend values (e.g., config.items)

142. CMS Hydration Logic in `cmsController.js`

- Implemented backend hydration for dynamic sections:
  → featuredProduct: Fetches top 6 products, injects into section.config.items
  → blogPreview: Fetches 3 latest blog posts, injects into section.config.items
- Ensures:
  → Real-time product/blog previews
  → CMS layout documents remain minimal (no embedded data)

143. Refactored All `seed*.js` Scripts for Named Imports

- Replaced outdated or default `import ... from '../data/*.js'` in:
  → `seedProducts.js`
  → `seedUsers.js`
  → `seedOrders.js`
  → `seedHeroes.js`
  → `seedBadges.js`
  → `seedBlogs.js`
  → `seedFooter.js`
  → `seedCms.js`
- Ensured use of structured named imports (e.g., `{ products }`) for clarity and consistency

144. Patched `seedOrders.js` to Use Real Mongo ObjectIds

- Removed invalid placeholders (`"seed_user_id_placeholder"`) in `orders.js`
- Injected real `_id` values from `User.findOne()` and `Product.findOne()` dynamically before seeding orders
- Deleted `orders.js` from `data/` since dynamic seeding is now schema-safe

145. Removed `orders.js` Import from `seedRoutes.js`

- Removed legacy `import { orders } from '../data/orders.js'` line from `seedRoutes.js`
- Eliminated invalid `Order.insertMany(orders)` logic to prevent reference errors
- Orders are now seeded solely via `seedOrders.js` using safe references

146. Fixed Schema Field Mapping in `heroes.js`

- Updated each hero object to use:
  → `heading` instead of `title`
  → `subheading` instead of `subtitle`
- Prevented Mongoose validation error: `Hero validation failed: heading is required`

147. Patched Typo in `seedFooter.js`

- Replaced undefined `footer` with correct `footerData` when calling `Footer.insertMany(...)`
- Restored seeding success for the footer entry

148. Patched Typo in `seedCms.js`

- Replaced undefined `cms` with correct `cmsSections` when calling `CMS.insertMany(...)`
- CMS seeding now completes without reference errors

149. Confirmed End-to-End Master Seed Success

- Ran `node seed.js` and confirmed clean output across all modules:
  → Users, Products, Orders, Badges, Heroes, Blogs, Footer, CMS
- Verified that each seed script runs independently or via the `seed.js` CLI with consistent `logSeed()` output

150. Patched `cms.js` Structure for Dynamic CMS Seeding

- Replaced the previous cmsLayout export with a cmsSections array of { route, sections[] } objects
- Ensured top-level route is defined ('/') for proper seed matching in `seedCms.js`
- Confirmed compatibility with sanitizeConfig() and `Cms.model.js` schema

151. Fully Refactored `seedCms.js` for Dynamic Content Injection

- Separated seeding logic into export async function seedCms() to allow clean CLI integration
- Dynamically injects data from heroes, blogs, products, and static promo tiles
- Populates sections[] using cmsSections.find(route === '/')
- Validates against `Cms.model.js` structure and logs outcome using logSeed()

152. Patched seed.js for CLI Flag --cms (re-enabled)

- Added --cms flag to main seed.js CLI runner
- Calls the named seedCms() function via dynamic import
- Ensures modular seeding for CMS only (node seed.js --cms)

153. Verified and Repaired `Cms.model.js` Schema

- Confirmed nested structure:
  → route → sections[] → { type, order, enabled, config }
- config allows flexible keys: items, title, subtitle, etc.
- Included full enum for supported section types (e.g. hero, blogPreview, etc.)

154. Implemented Runtime Population in getCmsByRoute()

- Backend controller (`cmsController.js`) injects blog/product data at request time
- Supports live rendering of featuredProduct and blogPreview sections from DB
- Safe fallback: if no route found, returns empty array

155. Refactored `logSeed.js` Utility for Generalized Messaging

- Replaced hardcoded messages with dynamic log builder:
  → Accepts moduleName, message, and optional type (start, success, error, etc.)
- Symbols mapped for consistency (🌱 ✅ ⚠️ ❌)
- Eliminates "Unknown log action" warnings and improves legibility

156. Verified HomeScreen Redux Integration and Visual Rendering

- Confirmed `HomeScreen.jsx` dispatches:
  → fetchCmsByRoute('/'), fetchAllBlogs(), and fetchAllProducts()
- Verified SectionRenderer receives sections, blogs, and products props

157. Patched All Visual CMS Sections to Handle Missing or Empty Configs

- Updated the following components:
  → `HeroSection.jsx`, `PromoGridSection.jsx`, `FeaturedProductSection.jsx`, `BlogPreviewSection.jsx`
- Each gracefully handles undefined or partial config (e.g. no items, missing title)
- Confirmed visual layout appears on / route without frontend or backend crashes

158. Diagnosed Blank Homepage Issue Despite Populated CMS

- Verified CMS API returned valid sections[] on GET /api/cms?route=/, including multiple section types (hero, promoGrid, etc.)
- Redux DevTools confirmed payload delivered correctly to frontend
- However, <SectionRenderer /> was rendering fallback "No CMS sections to display"
- Confirmed bug stemmed from a frontend-level block before .map() was invoked

159. Refactored SectionRenderer.jsx for Safe Conditional Rendering

- Refactored <SectionRenderer />:
  → Added defensive checks: Array.isArray(sections) and sections.length > 0
  → Inserted debug logging to confirm props actually passed from Redux
  → Verified mapped components appear when section type is recognized
- Confirmed fix resolved silent failure in rendering logic

160. Debugged Missing Blog and Product Data in CMS Sections

- CMS config.items for blogPreview and featuredProduct were empty
- Determined that `seedCms.js` did not populate items array correctly
- Verified products collection and blogs collection contained valid entries, including slug fields

161. Enhanced `Cms.model.js` Schema to Support referenceId

- Added optional referenceId field inside config schema:
  → `referenceId: String,`
- Enables fallback dynamic population of section data from related models (e.g., hero config from Hero.js by ID)

162. Regenerated CMS Controller with Auto-Fill Fallback Logic

- getCmsByRoute controller now dynamically populates:
  → `blogPreview.config.items` with latest 3 published blogs
  → featuredProduct.config.items with top 3 rated products
  → hero.config with matching Hero model (via referenceId) or fallback to Hero.findOne()
- Ensures visual sections render even when seedCMS config is incomplete

163. Regenerated and Patched seedCms.js for Realistic Sample Configs

- `seedCms.js` now:
  → Populates referenceId for hero from existing heroes
  → Auto-fills promoGrid.config.items with sample links
  → Leaves `featuredProduct.config.items` and `blogPreview.config.items` empty to test fallback
- This decouples seeding from hardcoding actual data while allowing runtime enrichment

164. Regenerated seedHeroes.js and Verified Hero Entries

- Ensured at least one valid Hero exists with:
  → title, subtitle, backgroundImage, ctaText, ctaLink
- Used `_id` of seeded hero as referenceId in CMS
- Verified correct linkage and rendering in HeroSection

165. Regenerated cmsController.js with updateCmsLayout Export

- Previous backend error:
  → `SyntaxError: The requested module '../controllers/cmsController.js' does not provide an export named 'updateCmsLayout'`
- Regenerated controller with named export for updateCmsLayout
- Matched import usage in `cmsRoutes.js`, resolving crash

166. Partial Rendering of CMS Sections on Homepage /

- After implementing:
  → Fallback injection for featuredProduct items (via top-rated products)
  → Reference-based hydration for hero config from Hero collection
  → Safe render checks for `SectionRenderer.jsx` and individual sections
- Outcome:
  → CMS layout is no longer blank
  → PromoGrid and FeaturedProduct sections appear structurally
  → Images are currently broken (image path or upload issue)
  → Hero and BlogPreview sections are still not rendering visually
- Markup loads but with broken or empty media, likely due to:
  → Missing or incorrect config data from controller
  → Path errors for /uploads/\*.jpg
  → Unpopulated blogs or reference mismatch

167. Backend CMS Controller: Filtering, Sorting, and Fallback Hydration

- Refactored getCmsByRoute to:
  → Only include enabled: true sections
  → Sort by order field to control visual stacking
  → Inject fallback content for: hero, featuredProduct, blogPreview
- Improved developer logs in backend with contextual markers,
- Added fallback logic for missing images using default upload path

168. Public Image Access from Uploads Directory

- Static uploads folder served from /uploads/ via Express
- Updated all image references in backend controllers to absolute URLs (e.g., http://localhost:5000/uploads/red.jpeg)
- Confirmed accessibility of direct image URLs from browser
- Validated images render properly in frontend using full URL references

169. CMS Admin Editor with Image Upload Support

- Implemented <FieldRenderer /> to support dynamic field types:
  → Text, textarea, select, toggle, and image uploads
- Integrated image picker/upload in <AddEditSectionModal />
- Extended `cmsSchema.js` to support { type: 'image' } fields (e.g., for hero.backgroundImage)
- Validated updated images sync correctly to Redux + backend

170. Upload Controller + Route for Admin Use

- Created `uploadController.js` with secure POST /api/upload endpoint
- Enabled multer-based file upload handling to /uploads
- Registered route via `uploadRoutes.js` and linked in `server.js`
- Implemented security guardrails to restrict uploads to authorized users (future-proofing for admin-only access)

171. CMS Overview CLI Tool: `printCmsOverview.js`

- Developed a CLI utility to audit current CMS layout data
- `node scripts/printCmsOverview.js` prints all CMS routes and visual section types with key config summary
- Used for internal auditing and debugging across layouts (e.g., /, /about, /products, etc.)

172. HomeScreen Fully Redux-Wired and Dynamic

- `HomeScreen.jsx` loads CMS layout via fetchCmsByRoute('/')
- Confirmed Redux cms.sections[] state is properly populated
- Connected <SectionRenderer /> to map and render each visual section dynamically based on its type

173. `SectionRenderer.jsx`: Expanded Support for CMS Section Types

- Updated to handle:
  → hero, promoGrid, featuredProduct, blogPreview
- Each type routes to a visual component (e.g., HeroSection, PromoGridSection)
- Safe fallback rendering when config is empty or undefined

174. 🛠 Verified Backend CMS Layout Data Integrity

- Added sort+filter logic in backend controller (enabled: true, sorted by order)
- Confirmed MongoDB CMS records are structured with proper:
  → route, type, order, enabled, and config
- Verified layout hydration and fallback logic triggers appropriately

175. Added Backend CMS Controller Filtering & Sorting

- Implemented getCmsByRoute update to ensure backend always:
  → Returns only sections with enabled: true
  → Sorts sections by order ascending before sending to client
- Benefit: Admin layout order in DB now directly determines homepage render order, avoiding frontend-only sort/filter reliance

176. Implemented Hydrated CMS CLI Overview Tool

- Created `printCmsOverview.js` in backend/scripts to list all CMS routes & sections
- Hydrates data to match API response:
  → Hero: pulls heading/subheading/image/cta from Hero collection
  → FeaturedProduct: auto-fills from top-rated products if empty
  → BlogPreview: auto-fills from latest blogs if empty
  → PromoGrid: normalizes all images with base URL
- Output mirrors /api/cms?route=… structure for admin/developer verification

177. Integrated CMS Overview into Seeder Script

- Updated `seed.js` to accept --cms:overview flag
- Allows running: `node seed.js --cms:overview`
  → Without reseeding data, purely for inspection
- Benefits: Centralizes CMS debugging into existing seed workflow

178. Verified API & CLI CMS Data Parity

- Cross-checked /api/cms?route=/ JSON with `node seed.js --cms:overview` CLI output
- Fixed mismatch where CLI was printing (no title) for hydrated fields
- CLI now matches live API results exactly, including hero titles, promoGrid item counts, and blog/product fallbacks

179. Logging Behavior Review for Production Readiness

- Observed repeated [cms] Hero image: logs in dev environment
- Cause: Multiple fetches due to React dev reload & image preloads
- Decision:
  → Keep log in dev for hydration debugging
  → Silence or downgrade to debug-level in production for cleaner logs

180. Patched CMS API to Serve Absolute Image URLs for All Section Types

- Updated `cmsController.js` to detect relative /uploads/... paths in config.items[].image and prepend the correct assetBaseUrl
- Applied to all CMS section types, including:
  → hero (backgroundImage)
  → promoGrid (items)
  → featuredProduct (items)
  → blogPreview (items)
- Verified /api/cms?route=/ JSON now returns fully qualified URLs for all images
- Result: Images load correctly from /uploads without relying on relative paths

181. Backend Health Check Endpoint Enhancement

- Added /api/health endpoint to return:
  → status, nodeEnv, assetBaseUrl, and frontendOrigin
- Confirmed correct asset base URL in development (http://localhost:5000)
- Used for quick validation of static file serving and API health

182. Fixed Product and Blog Routing from CMS Sections

- Investigated issue where featuredProduct and blogPreview CMS items linked to products/undefined or blog/undefined
- Root cause: Slug field missing in CMS config items
- Solution:
  → Verified product and blog fetch thunks use /api/products/slug/:slug and /api/blogs/slug/:slug
  → Ensured CMS seeding scripts (`seedProducts.js`, `seedBlogs.js`) correctly populate slug fields for all demo products and blogs
  → Updated CMS config in seed data to use proper slugs
- Verified clicking product/blog cards on `/` now routes to correct detail pages

183. Updated `productRoutes.js` and `blogRoutes.js` to Include Slug Endpoints

- Added GET /slug/:slug to both routes, using controllers to:
  → Find document by slug
  → Return 404 if not found
- Preserved all existing admin CRUD endpoints
- Verified via Postman:
  → /api/products/slug/talavera-azul returns correct product JSON
  → /api/blogs/slug/behind-the-craft returns correct blog JSON

184. Controller Adjustments for Slug Queries

- `productController.js` and `blogController.js` updated to include getProductBySlug and getBlogBySlug
- Each uses findOne({ slug }) for clean querying
- Returns consistent 404 JSON format when not found
- Logging refined for dev-only verbosity

185. Seed Data Alignment for CMS Routing

- `seedBlogs.js` adjusted to ensure seeded blogs:
  → Always have a valid slug
  → Contain image paths stored in /uploads
- Synced blog titles, slugs, and CMS config links to match each other
- Similar validation done for seeded products in `seedProducts.js`
- Verified /api/blogs and /api/products contain items matching /api/cms links

186. Confirmed End-to-End Routing for Featured Products and Blog Previews

- Visually verified `/` renders featuredProduct and blogPreview sections with clickable cards
- Clicking a product routes to /product/:slug with correct details rendered from Redux state
- Clicking a blog routes to /blog/:slug with correct post details
- No more undefined slugs or 404 errors for seeded demo content

187. Implemented Client-Only Search with Typeahead & Results Screen

- Added `SearchSuggest.jsx` for desktop header search with live typeahead
  → Pulls from Redux product state, filters client-side, and links directly to product pages
- Added mobile-friendly fallback search field in `Header.jsx`
- Created `SearchResultsScreen.jsx` for /search route
  → Filters all products in Redux by name, SKU, tags, or description
  → Shows results grid with images, titles, and prices
  → No-query state shows prompt, empty results shows “No results found.”
- Introduced optional `searchSlice.js` to store last query and result count for potential future UX features
- Patched `store.js` to register search slice reducer

188. Patched `Header.jsx` to Integrate Search

- Wired <SearchSuggest /> into the desktop header navigation
- Added controlled input + submit handler for mobile search, routing to /search?q=....
- On submit, dispatches setQuery() and navigates to results screen
- Preserved role-based account dropdown and existing cart button

189. Public & Authenticated Contact Form Support

- Created `ContactScreen.jsx` for guest users to send messages without authentication
  → Posts to new backend endpoint POST /api/inbox/public
  → Captures name, email, subject, message and displays success/error states
- Updated `InboxMessage.js` model:
  → Made fromUser optional
  → Added meta object (name, email, isGuest) for guest context
  → Extended source enum to include public and account
- Updated `inboxController.js`:
  → Added createPublicInboxMessage for guest submissions
  → Adjusted createInboxMessage to set source: 'account' and mark meta.isGuest = false
- Updated `inboxRoutes.js`:
  → Added /public endpoint (no auth)
  → Preserved / POST (protected) and GET (admin)

190. Added Backend Slug Utilities & Integrated into Product/Blog Controllers

- Created `slug.js` with:
  → createSlug(title) — normalized kebab-case slug from string
  → ensureUniqueSlug(Model, baseSlug, ignoreId?) — guarantees uniqueness in collection, appends -1, -2 if needed
- Refactored `productController.js`:
  → On create, generates unique slug from name (or provided slug)
  → On update, regenerates slug if name changes or slug missing; ensures uniqueness
- Refactored `blogController.js` similarly to product logic
- Verified both Product and Blog models already have slug unique constraints

191. Mounted Inbox Routes and Added Health Pings

Updated `server.js`:
→ Imported and mounted inboxRoutes at /api/inbox
→ Preserved existing CORS, JSON, cookie parsing, and static uploads config

- Added GET /api/inbox/health in `inboxRoutes.js` for quick service check (returns { ok: true, service: 'inbox', ts: ... })
- Confirmed /api/inbox/public and /api/inbox/ endpoints are now reachable in development

192. Footer Link Behavior Adjustment

- Updated `Footer.jsx`:
  → Internal links still use <Link> for SPA navigation
  → External links now open in same tab per requirement (removed target="\_blank")
  → Fallback slugify label if no URL provided

193. Unified Admin Tool Access Under /my-account

- Replaced routing logic that previously redirected admin menu tiles (Products, Blogs, Heroes, Badges, Settings, Uploads, User Approvals) to /admin/\* paths
- Updated sidebar and route handling so all admin-capable tools render inside /my-account/\* routes instead:
  → /my-account/products
  → /my-account/blogs
  → /my-account/heroes
  → /my-account/badges
  → /my-account/settings
  → /my-account/uploads
  → /my-account/approvals (admin approvals view)
- Ensured that components conditionally render based on user role/permissions, avoiding blank screens when a non-admin tries to access restricted tools

194. Sidebar Behavior Normalization Across Account Tools

- Refactored MyAccountDashboard.jsx sidebar rendering so the list of tiles dynamically adjusts based on permissions without switching to a separate "Admin Console" context
- Eliminated duplicate layouts:
  → Now a single consistent sidebar UI for all /my-account/\* pages
- Preserved existing tile ordering but grouped tools under "Admin — My Account" and "Admin — Site Console" headings for clarity

195. Permissions-Based Tile Visibility

- Integrated role checks into sidebar generation so only applicable tiles display:
  → Non-admin users: See personal tools only
  → Admin users: See both personal tools and site-wide console tools
- Avoided client-side blank render errors by only linking to routes where Redux store slices are available
- Added safety checks on useSelector calls in pages like Products, Blogs, Heroes, Badges to prevent crashes from undefined state

196. Prevented Redundant Dashboard Switching

- Removed logic that caused /my-account/dashboard to switch to an entirely different /admin/dashboard layout for admins
- All dashboard views now remain under /my-account/dashboard while still showing admin-specific widgets where applicable

197. UX Continuity for Admin Tools

- Clicking any admin tool tile from /my-account/dashboard keeps users in the /my-account context (no full-page reloads)
- Preserves SPA routing, improves perceived performance and task continuity

199. Health Endpoints for Ops Checks

- GET /api/health → { ok: true } confirms server boot and middleware pipeline
- GET /api/health/db → { db: { readyState, connected } } confirms active Mongo connection
- Use these in monitors or when debugging 500s/blank screens

200. Verbose, Awaited DB Connector

- `db.js` now uses mongoose.connect with serverSelectionTimeoutMS and logs:
  → Host, db name, and readyState on success
  → Clear error with exit(1) on failure
- `server.js` awaits connectDB() before mounting routes to prevent route handlers from queuing and timing out

201. Stable Route Mounting (Path-to-RegExp Safe)

- All routes mounted with static string paths only (e.g., /api/cms, /api/footer)
- No dynamic or full-URL mounts in app.use(); avoids path-to-regexp “Missing parameter name” crashes
- Centralized mounts in `server.js`, each route module exports router via express.Router()

202. CORS + Cookies Aligned

- cors({ origin: FRONTEND_ORIGIN, credentials: true, methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS' })
- Client axios instance sets withCredentials: true, ensuring cookie/JWT flows work consistently
- Added OPTIONS handling for smoother preflights

203. Footer API & Admin Screen

- GET /api/footer returns { links, updatedAt }
- PUT /api/footer (admin-only) persists new link arrays; Redux slice saveFooter() handles save state
- UI at /my-account/settings/footer enables add/remove/edit with validation and toasts

204. Auth Middleware: Cookie or Bearer

- authMiddleware.protect now accepts Authorization: Bearer <token> or Cookie: jwt=...
- Simplifies CLI smoke tests and programmatic admin tools

205. CMS Controller Hardened

- GET /api/cms?route=/ returns an array of sections; controller sanitizes route and guards missing docs
- Structured 200/404/500 responses with safeJson helper, improving client error handling

206. Axios Client Hardening

- `axiosInstance.js` centralizes baseURL, withCredentials, and 401 handling (optional refresh hook later)
- Prevents CORS regressions and standardizes headers

207. Network Diagnostics & Zero-Cache Option

- To avoid confusing 304s during debugging, dev server can add Cache-Control: no-store on certain endpoints
- For production, keep reasonable caching (or short TTL + ETag) for performance

208. Guarded Dynamic Mount Strategy (Docs)

- In case dynamic mounts are reintroduced, use a guard wrapper that rejects non-/api/<segment> paths and refuses full URLs
- This prevents path-to-regexp parsing errors and SSRF-like mount misuse

208. Health-First Triage Procedure (Docs)

- When the app “loads but shows nothing,” first hit /api/health and /api/health/db
- If DB not connected: check .env, Atlas IP allowlist, or local mongod
- If connected but API 404s: verify mounts in server.js

209. Verify My Account routes render (UI guards)

- Confirmed `/my-account/products|blogs|heroes|badges|settings|uploads|approvals` render non-blank screens
- Added loading/empty/error guards in AdminUserApprovalScreen and other admin views to prevent blank routes
- Ensured ErrorBoundary wraps app shell to catch render-time exceptions in account/admin areas

210. Slug utility is present and wired to controllers

- Verified `slug.js` exists
- Ensured `productController.js` and `blogController.js` import and use slug generator consistently for create/update
- Normalized slugs on title changes; preserved existing slugs when unchanged

211. Add health endpoints for CMS & Products

- Added `GET /api/cms/health` and `GET /api/products/health` returning `{ ok: true, ts }`
- Useful for uptime probes and the “Health-First Triage Procedure”

212. Products health wiring & route order safety

- Implemented `productController.health` and registered route early in `productRoutes.js` (before dynamic `/:id|:slug`)
- Prevents greedy param routes from shadowing `/health`

213. Tiny logger + gated logs in production (frontend)

- Added `logger.js` to centralize logging and avoid noisy `console.*` in production
- Levels: debug/info/warn/error; dev prints, prod no-ops except warn/error (configurable)

214. ESLint rule to ban raw console.\* and config integration

- Introduced an ESLint snippet to flag direct `console.log` so the team standardizes on the logger
- Integrated into `eslint.config.js` with safe overrides
- Added npm scripts: `lint`, and optional codemod helpers in `package.json`

215. Codemod: convert console._ → logger._ (safe AST)

- Provided `transform-console-to-logger.cjs` for `jscodeshift`
- Dry-run & apply commands documented (`npm run codemod:logger:dry`, `npm run codemod:logger`)
- Improves consistency and reduces future lint churn

216. Frontend fixes: env usage + hook ordering

- Replaced `process.env.*` with `import.meta.env.*` in components (e.g., MobileSessionLauncher.jsx)
- Fixed conditional hook ordering in `Header.jsx` (no hooks inside conditionals)
- Cleaned minor issues in `FooterSettingsScreen.jsx` (unused params removed, stable handlers)

217. ToastProvider split for Fast Refresh

- Split `ToastProvider.jsx` (default export component) from `useToast` hook and `toastContext` to satisfy `react-refresh/only-export-components`
- Updated imports (e.g., DebugPanel to `@/components/ui/useToast`)
- Wrapped app with `ToastProvider` in `main.jsx` via default import

218. Lint cleanup & stability fixes

- `ErrorBoundary.jsx`: swap `console.error` → `log.error`; dev-only stack preview
- `BlogPreviewSection.jsx` / `FeaturedProductSection.jsx`: use logger, remove unused disables
- `SearchResultsScreen.jsx`: stabilized memo deps (use frozen EMPTY) and optional product auto-fetch
- `authSlice.js`: remove unused `getStored`, replace empty catch blocks with comments

219. Offline snapshot cache infra (frontend)

- Added `snapshot.js` (localStorage-based) and `OfflineProvider.jsx` with `/api/cms/health` polling
- Introduced `OfflineBanner.jsx` for a slim offline/cached indicator
- Added `cmsApi.js` and refactored `footerApi.js` to use snapshot fallback
- Wrapped app in `OfflineProvider` and rendered `OfflineBanner` near the top

220. Footer: offline-aware via useFooter hook

- Created `useFooter.js` to fetch footer links with snapshot fallback and expose `stale`/`online`/`refresh`
- Refactored `Footer.jsx` to consume the hook and show a subtle “cached/offline” hint

221. Backend CMS footer endpoint

- `cmsController.js`: added `getFooter` (returns `{ links, updatedAt }`), dev `no-store`, prod `max-age=60`
- `cmsRoutes.js`: registered `GET /api/cms/footer` and kept `/api/cms/health` as-is
- Frontend now gets 200 vs 404 and snapshot-caches footer content

222. main.jsx: toast import fix

- Switched to default import for the provider: `import ToastProvider from '@/components/ui/ToastProvider.jsx'`
- Eliminates “does not provide an export named 'ToastProvider'” error
