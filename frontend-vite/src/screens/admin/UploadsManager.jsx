import { useState } from 'react';

/**
 * UploadsManager (placeholder)
 * Replace with your real uploader when ready.
 */
export default function UploadsManager() {
  const [files, setFiles] = useState([]);
  return (
    <div className="p-4 rounded-xl border bg-white">
      <h1 className="text-xl font-semibold mb-3">Uploads</h1>
      <p className="text-sm text-gray-600 mb-4">
        Placeholder screen. Drag files here or click to select (not wired yet).
      </p>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
        className="block"
      />
      {!!files.length && (
        <ul className="mt-4 list-disc pl-5 text-sm">
          {files.map((f) => (
            <li key={f.name}>
              {f.name} ({Math.round(f.size / 1024)} KB)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
