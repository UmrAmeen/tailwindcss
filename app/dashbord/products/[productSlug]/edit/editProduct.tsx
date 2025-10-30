"use client";
import { UpdateProductForm } from "@/app/dashbord/productFormAction";
import { useActionState, useState } from "react";
import slugify from "slugify";

interface RowType {
  [key: string]: any;
}

export default function EditProductForm({ categoryRows, product }: any) {
  const [file, setFile] = useState<string | null>(null);
  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [editSlug, setEditSlug] = useState(false);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
    setSlug(slugify(e.target.value.trim(), "_"));
  };

  const handleChange = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSlugChange = (e: any) => {
    setSlug(e.target.value);
  };

  const [state, formAction, isPending] = useActionState(UpdateProductForm, {
    success: false,
    error: "",
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-green-800 rounded-lg shadow-md">
      {state.success ? (
        <div className="text-green-400 mb-4">Success</div>
      ) : (
        <div className="text-red-400 mb-4">{state.error}</div>
      )}
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" value={product.id} />

        <label className="block text-sm font-medium text-gray-300 mb-1">
          Name:
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={name}
            onChange={handleNameChange}
            className="block w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-300"
          />
        </label>

        <label className="block text-sm font-medium text-gray-300 mb-1">
          Slug:
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={slug}
              onChange={handleSlugChange}
              readOnly={!editSlug}
              className="block w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-300"
            />
            <button
              type="button"
              onClick={() => setEditSlug(!editSlug)}
              className="px-4 py-2 bg-blue-600 text-gray-300 rounded-md hover:bg-blue-700"
            >
              {editSlug ? "Save" : "Edit"}
            </button>
          </div>
        </label>

        <label className="block  text-sm font-medium text-gray-300 mb-1">
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block rounded-md  bg-gray-700 w-full text-gray-300 p-2"
          />
          {(file || product.base64Image) && (
            <img
              src={file || product.base64Image}
              alt="Image"
              className="w-32 h-32 object-cover mt-2 rounded-md"
            />
          )}
        </label>

        <label className="block text-sm font-medium text-gray-300 mb-1">
          Category:
          <select
            name="categoryId"
            defaultValue={product.categoryId}
            className="block w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-300"
          >
            {categoryRows.map((row: RowType) => (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-300 mb-1">
          Price:
          <input
            type="number"
            name="price"
            placeholder="Price"
            defaultValue={product.price}
            className="block w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-300"
          />
        </label>

        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description:
          <textarea
            rows={3}
            name="description"
            placeholder="Add description"
            defaultValue={product.description}
            className="block w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-300"
          />
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-gray-300 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
