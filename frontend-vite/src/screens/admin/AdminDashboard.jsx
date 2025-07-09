const AdminDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome, Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Visual Sections</p>
          <h2 className="text-xl font-semibold">5</h2>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Blog Posts</p>
          <h2 className="text-xl font-semibold">12</h2>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Badges</p>
          <h2 className="text-xl font-semibold">7</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
