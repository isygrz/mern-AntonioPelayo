import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4 text-sm">
          <NavLink to="/admin" end className="hover:underline">
            Dashboard
          </NavLink>
          <NavLink to="/admin/heroes" className="hover:underline">
            Hero Manager
          </NavLink>
          <NavLink to="/admin/blogs" className="hover:underline">
            Blog Manager
          </NavLink>
          <NavLink to="/admin/badges" className="hover:underline">
            Badge Manager
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
