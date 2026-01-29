"use client";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface RowType {
  id: string;
  url: string;
}

export default function ImageSelector({ Images }: { Images: RowType[] }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"file" | "db">("file");
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const fileURL = URL.createObjectURL(uploadedFile);
      setFilePreview(fileURL);
      setSelectedImageId(null);
      setSelectedImageUrl(null);
    }
  };

  const handleImageSelect = (img: RowType) => {
    setSelectedImageId(img.id);
    setSelectedImageUrl(img.url);
    setFilePreview(null);
    setFile(null);
  };

  const confirmImageSelection = () => {
    if (filePreview) {
      setFile(filePreview);
      setSelectedImageId(null);
      setSelectedImageUrl(null);
    } else if (selectedImageId && selectedImageUrl) {
      setFile(null);
    }

    setOpen(false);
  };

  return (
    <div className="p-1">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        type="button"
      >
        Add Image
      </button>

      {file && (
        <img
          className="mt-2 w-32 h-32 object-cover"
          src={file}
          alt="Uploaded preview"
        />
      )}

      {!file && selectedImageUrl && (
        <img
          className="mt-2 w-32 h-32 object-cover"
          src={selectedImageUrl}
          alt="Selected DB preview"
        />
      )}

      <input
        type="file"
        name="image"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <input
        type="hidden"
        name="selectedImageId"
        value={selectedImageId ?? ""}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50" />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-3xl mx-auto bg-white rounded shadow-lg overflow-hidden flex">
            <div className="w-48 bg-gray-100 p-4 flex flex-col space-y-4 border-r">
              <button
                onClick={() => setActiveTab("file")}
                className={`py-2 px-4 rounded text-left ${
                  activeTab === "file"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                Add File Image
              </button>
              <button
                onClick={() => setActiveTab("db")}
                className={`py-2 px-4 rounded text-left ${
                  activeTab === "db"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                Add DB Image
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto relative">
              <DialogTitle className="text-xl font-semibold mb-4">
                {activeTab === "file"
                  ? "Upload Image from Device"
                  : "Select Image from Database"}
              </DialogTitle>

              {activeTab === "file" && (
                <div>
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white w-full mb-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload from Device
                  </button>
                </div>
              )}
              {(filePreview || selectedImageUrl) && (
                <div className="flex justify-center mt-4">
                  <img
                    src={filePreview ?? selectedImageUrl!}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}

              {activeTab === "db" && (
                <div className="max-h-80 overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Images.map((img) => (
                      <label
                        key={img.id}
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <img
                          src={img.url}
                          alt="db"
                          className="w-24 h-24 object-cover rounded border"
                        />
                        <input
                          type="radio"
                          name="selectedImageId"
                          value={img.id}
                          checked={selectedImageId === img.id}
                          onChange={() => handleImageSelect(img)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setOpen(false);
                    setSelectedImageUrl(null);
                    setSelectedImageId(null);
                    setFilePreview(null);
                  }}
                  className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmImageSelection}
                  className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={!filePreview && !selectedImageId}
                >
                  OK
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
