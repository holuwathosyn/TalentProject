// src/components/AskAI.jsx
import React, { useState } from "react";
import axios from "axios";

const AskAI = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return alert("Please enter a question");

    setLoading(true);
    try {
      // Use environment variable for backend URL
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/ask-ai`,
        { question }
      );
      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Failed to fetch AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ask Gemini AI</h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question..."
        rows={4}
        className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">AI Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskAI;
