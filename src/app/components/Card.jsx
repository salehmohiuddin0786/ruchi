"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Card({
  id,
  title,
  category,
  updated,
  createdAt,
  image,
  showImage,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const categoryStyles = {
    Quran: "bg-green-100 text-green-800 border-green-300",
    Literature: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Hadith: "bg-blue-100 text-blue-800 border-blue-300",
  };

  const formatDate = (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d)
      ? "Invalid Date"
      : d.toLocaleDateString("ur-PK", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  const onViewClick = () => {
    setLoading(true);
    // Use a small delay to ensure loading state updates before routing
    setTimeout(() => {
      router.push(`/notes/${id}`);
    }, 100);
  };

  return (
    <div
      onClick={onViewClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onViewClick();
        }
      }}
      aria-label={`Card for ${title}`}
      className={`
        group relative rounded-xl border p-6 shadow-md transition-transform duration-300
        hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden
        max-w-full sm:max-w-sm backdrop-blur
        ${showImage ? "text-white" : categoryStyles[category] || "bg-white text-gray-900 border-gray-300"}
      `}
      style={
        showImage && image
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {loading ? (
        // Show loading spinner or text when loading
        <div className="flex justify-center items-center h-40">
          <svg
            className="animate-spin h-8 w-8 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          {showImage && image && (
            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm rounded-xl pointer-events-none z-0" />
          )}

          <div className="relative z-10 flex flex-col gap-2">
            <span
              className={`
                self-start px-3 py-1 rounded-full text-xs font-semibold shadow-sm
                ${showImage ? "bg-black bg-opacity-40" : categoryStyles[category] || "bg-gray-200 text-gray-800"}
              `}
            >
              {category}
            </span>

            <h3
              dir="rtl"
              className="text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm urdu-font"
            >
              {title}
            </h3>

            {createdAt && (
              <p className={`text-sm font-medium ${showImage ? "text-gray-200" : "text-gray-600"}`}>
                Created: <time>{createdAt}</time>
              </p>
            )}

            {updated && !isNaN(new Date(updated)) && (
              <p className={`text-sm font-medium ${showImage ? "text-gray-200" : "text-gray-600"}`}>
                {/* Updated: <time>{formatDate(updated)}</time> */}
              </p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewClick();
            }}
            aria-label={`View details for ${title}`}
            className={`
              absolute top-4 right-4 bg-orange-500 hover:bg-orange-600
              text-white text-sm font-semibold rounded-full px-4 py-2 shadow-md transition
              focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2
              ${showImage ? "bg-opacity-90 hover:bg-opacity-100" : ""}
            `}
          >
            View →
          </button>
        </>
      )}
    </div>
  );
}
