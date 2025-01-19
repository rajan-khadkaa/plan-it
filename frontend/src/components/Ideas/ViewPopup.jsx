import React from "react";

function ViewPopup({ idea, onClose }) {
  if (!idea) return null;

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">View Idea</h3>
        <p className="text-gray-600 mb-2">Title: {idea.title}</p>
        <p className="text-gray-600 mb-2">Tags: {idea.tags.join(", ")}</p>
        <p className="text-gray-600 mb-2">Content: {idea.content}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewPopup;
