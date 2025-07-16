import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

export default function EditProductModal({ isOpen, onClose, product, onSave }) {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    badge: '',
    description: '',
    image: '',
    pricing: {
      perBox: 0,
      sample: 0,
    },
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        slug: product.slug || '',
        badge: product.badge || '',
        description: product.description || '',
        image: product.image || '',
        pricing: {
          perBox: product.pricing?.perBox ?? 0,
          sample: product.pricing?.sample ?? 0,
        },
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('pricing.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        pricing: { ...prev.pricing, [key]: parseFloat(value) },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (form.name && form.slug) {
      onSave({ ...product, ...form });
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold text-slate-800">
                  Edit Product
                </Dialog.Title>

                <div className="mt-4 grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Product name"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="Slug"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="badge"
                    value={form.badge}
                    onChange={handleChange}
                    placeholder="Badge"
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="pricing.perBox"
                    value={form.pricing.perBox}
                    onChange={handleChange}
                    placeholder="Price per box"
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="pricing.sample"
                    value={form.pricing.sample}
                    onChange={handleChange}
                    placeholder="Sample price"
                    className="border p-2 rounded"
                  />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded h-20"
                  />
                  <ImageUploader
                    imageUrl={form.image}
                    onUploadSuccess={(url) =>
                      setForm((prev) => ({ ...prev, image: url }))
                    }
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
