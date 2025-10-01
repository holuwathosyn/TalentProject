import { useState } from "react";
import axios from "axios";

export default function Categories({ onCategoryAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Category name is required");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, {
        name,
        description,
      });

      const newCategory = res.data; // backend should return { category_id, name, description }

      setMessage("Category added successfully!");
      setName("");
      setDescription("");

      // Send the new category object back to parent
      if (onCategoryAdded) onCategoryAdded(newCategory);

    } catch (err) {
      console.error(err);
      setMessage("Failed to add category: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-2">
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1 w-full rounded"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-2 py-1 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add Category
      </button>
      {message && <p className="text-green-600 mt-1">{message}</p>}
    </form>
  );
}
