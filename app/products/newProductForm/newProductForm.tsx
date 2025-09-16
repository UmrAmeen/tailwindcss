"use client";
import { useActionState, useState } from "react";
import slugify from "slugify";
import ImageSelector from "./tabImageUplode";
import CreateProductForm from "@/app/productFormAction";

export default function NewProductForm({ categoryRows, Images }: any) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editSlug, setEditSlug] = useState(false);
  const [state, formAction, isPending] = useActionState(CreateProductForm, {
    success: false,
    error: "",
  });
  const handleNameChange = (e: any) => {
    setName(e.target.value);
    setSlug(slugify(e.target.value.trim(), { replacement: "_", lower: true }));
  };

  const handleSlugChange = (e: any) => {
    setSlug(e.target.value);
  };

  return (
    <div>
      {" "}
      {state.success ? <div> Success</div> : <div>{state.error}</div>}
      <form
        action={formAction}
        className="space-y-6   mx-auto p-6 bg-gray-500 rounded-lg "
      >
        <label className="block text-lg font-bold text-gray-900 mb-1">
          Name
          <input
            name="name"
            value={name}
            onChange={handleNameChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </label>

        <label className="block text-lg font-bold text-gray-900 mb-1">
          Slug
          <div className="flex gap-2 items-center">
            <input
              name="slug"
              value={slug}
              onChange={handleSlugChange}
              readOnly={!editSlug}
              className={`flex-1 px-4 py-2 border ${
                editSlug ? "border-blue-400" : "border-gray-300"
              } rounded-md focus:ring focus:ring-blue-200`}
            />
            <button
              type="button"
              onClick={() => setEditSlug(!editSlug)}
              className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editSlug ? "Save" : "Edit"}
            </button>
          </div>
        </label>

        <label className="block text-lg font-bold text-gray-900 mb-1">
          Image
          <ImageSelector Images={Images} />
        </label>

        <label className="block text-lg font-bold text-gray-900 mb-1">
          Category
          <select
            name="categoryId"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            {categoryRows?.map((row: any) => (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-lg font-bold text-gray-900 mb-1">
          Price
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </label>

        <label className="block text-lg font-bold text-gray-900 mb-1">
          Description
          <textarea
            rows={3}
            name="description"
            placeholder="Add description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </label>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
