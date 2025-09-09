import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// RTK thunks (RBAC-aligned) — adjust import if your alias differs
import {
  listProductsAdmin,
  createProduct as thunkCreate,
  updateProduct as thunkUpdate,
  deleteProduct as thunkDelete,
} from '@/redux/slices/productSlice';

// Local modal for create/edit
import EditProductModal from './EditProductModal.jsx';

/**
 * InventoryPanel
 * - Replaces the placeholder panel with a functional admin/vendor tool
 * - Lists products with pagination-ready state
 * - Supports create/edit/delete with toasts and live refresh
 */
export default function InventoryPanel() {
  const dispatch = useDispatch();
  const { admin, loading, error } = useSelector((s) => s.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(listProductsAdmin({}));
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(String(error));
  }, [error]);

  const onNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const onEdit = (p) => {
    setEditing(p);
    setModalOpen(true);
  };

  const onSubmit = async (payload) => {
    setSaving(true);
    try {
      if (editing?._id) {
        await dispatch(
          thunkUpdate({ id: editing._id, updatedProduct: payload })
        ).unwrap();
        toast.success('Product updated');
      } else {
        await dispatch(thunkCreate(payload)).unwrap();
        toast.success('Product created');
      }
      setModalOpen(false);
      // refresh current page
      dispatch(
        listProductsAdmin({ page: admin.page, pageSize: admin.pageSize })
      );
      // Notify other widgets they may refresh
      document.dispatchEvent(new CustomEvent('inventory:changed'));
    } catch (e) {
      toast.error(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (p) => {
    if (!confirm('Delete this product?')) return;
    try {
      await dispatch(thunkDelete(p._id)).unwrap();
      toast.success('Product deleted');
    } catch (e) {
      toast.error(e?.message || 'Delete failed');
    }
  };

  const rows = useMemo(() => admin?.items || [], [admin]);
  const total = Number(admin?.total || 0);
  const page = Number(admin?.page || 1);
  const pageSize = Number(admin?.pageSize || 20);
  const canPrev = page > 1;
  const canNext = page * pageSize < total;

  const go = (nextPage) => {
    dispatch(listProductsAdmin({ page: nextPage, pageSize }));
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold">📦 Inventory Management</h2>
        <button
          onClick={onNew}
          className="px-3 py-2 rounded bg-black text-white"
        >
          New Product
        </button>
      </div>

      <p className="mb-4 text-gray-600">
        Create, edit, and remove products. Changes are gated by role
        (admin/vendor).
      </p>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Price</th>
              <th className="text-left px-3 py-2">Slug</th>
              <th className="text-left px-3 py-2">Status</th>
              <th className="text-right px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">
                  ${p.price?.toFixed?.(2) ?? p.price}
                </td>
                <td className="px-3 py-2">{p.slug}</td>
                <td className="px-3 py-2">{p.status || 'active'}</td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-blue-600 underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="text-red-600 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
        <div>Total: {total}</div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => go(page - 1)}
            disabled={!canPrev || loading}
          >
            Prev
          </button>
          <span className="px-2">Page {page}</span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => go(page + 1)}
            disabled={!canNext || loading}
          >
            Next
          </button>
        </div>
      </div>

      <EditProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editing}
        onSubmit={onSubmit}
        saving={saving}
      />
    </div>
  );
}
