
// Component displays a styled card for individual posts
const PostCard = ({ post }) => {
  // Transforms 'Examens' category to display text 'Planning Examen'
  // Otherwise uses the category name as-is
  const categoryText =
    post.category === "Examens" ? "Planning Examen" : post.category;

  // Shows subCategory badge only if it exists AND category is not 'Annonce'
  const hasSubCategory = post.subCategory && post.category !== "Annonce";

  return (
    
    <div className="bg-white rounded-2xl p-6 shadow-md">
      {/* HEADER SECTION - Category badges and timestamp */}
      <div className="flex items-center gap-3 mb-4">
        {/* Primary category badge (dark blue) */}
        <span className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-semibold">
          {categoryText}
        </span>

        {/* Optional secondary category badge (light blue) - shown only if hasSubCategory is true */}
        {hasSubCategory && (
          <span className="bg-[#b8d4e8] text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold">
            {post.subCategory}
          </span>
        )}

        {/* Timestamp aligned to the right using ml-auto (margin-left: auto) */}
        <span className="ml-auto text-gray-500 text-sm">{post.time}</span>
      </div>

      {/* CONTENT SECTION - Post title and description */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.description}</p>

      {/* FILE DOWNLOAD SECTION - Only renders if post.fileName exists */}
      {post.fileName && (
        <div className="flex items-center justify-between bg-[#e8f2f7] rounded-xl p-4 border-2 border-[#003366]">
          {/* Left side: PDF icon and file info */}
          <div className="flex items-center gap-3">
            {/* PDF icon container */}
            <div className="bg-white p-3 rounded-lg">
              <img
                className="h-8 w-9"
                src="/src/assets/icons/fichier-pdf_1.png"
                alt="PDF icon"
              />
            </div>

            {/* File name and simulated file size */}
            <div>
              <p className="font-semibold text-gray-800">{post.fileName}</p>
              <p className="text-sm text-gray-500">
                {/* File size is simulated based on keywords in filename
                                    This is a temporary solution - ideally use actual file metadata */}
                {post.fileName.includes("exam")
                  ? "20 ko"
                  : post.fileName.includes("cc")
                  ? "32 ko"
                  : post.fileName.includes("tp")
                  ? "28 ko"
                  : post.fileName.includes("resultats")
                  ? "47 ko"
                  : "XX ko"}
              </p>
            </div>
          </div>

          {/* Download button with icon and hover effect */}
          <button className="bg-[#003366] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#004080] transition-colors cursor-pointer">
            {/* Download arrow SVG icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Télécharger
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
