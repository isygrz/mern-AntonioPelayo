import React from 'react';

const InventoryPanel = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">📦 Inventory Management</h2>

      <p className="mb-6 text-gray-600">
        This tool will allow you to scan, upload, and manage product inventory
        using mobile-friendly tools and admin workflows.
      </p>

      <div className="space-y-4">
        <div className="p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-medium mb-2">Coming Soon:</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>🔍 Scan product QR / barcode to add or update stock</li>
            <li>📱 Start authorized mobile session for scanning workflow</li>
            <li>🖼 Upload images from phone or cloud drive</li>
            <li>📥 Register new products into archive for admin review</li>
            <li>🧹 Remove or delete outdated inventory</li>
          </ul>
        </div>

        <p className="text-sm text-gray-400">
          These features will be enabled after mobile sync + scanner integration
          is complete.
        </p>
      </div>
    </div>
  );
};

export default InventoryPanel;
