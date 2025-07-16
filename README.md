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
