import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/announcement`);
      setAnnouncements(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to load announcements");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (loading) return <p>Loading announcements...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Announcements</h2>
      <ul className="space-y-4">
        {announcements.map((a) => (
          <li key={a.id} className="border p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-lg">{a.title}</h4>
            <p className="text-gray-700">{a.content}</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(a.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicAnnouncements;
