// src/components/publications/PublicationsPage.jsx
import React from "react";
import PostCard from "../PostCard";
import { posts } from "../../data/postsData";

/**
 * PublicationsPage
 * Props:
 *  - category: string (ex: "Examens", "Controle Continu", "Remplacement", "Rattrapage", "Annonce")
 *  - subCategory (optional): string to further filter
 *
 * Usage examples:
 *  <PublicationsPage category="Examens" />
 *  <PublicationsPage category="Controle Continu" />
 */

const PublicationsPage = ({ category, subCategory }) => {
  // filtre principal : category (si fourni). si pas fourni, affiche tout.
  const filtered = posts.filter((p) => {
    if (category && p.category !== category) return false;
    if (subCategory && p.subCategory !== subCategory) return false;
    return true;
  });

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-[8px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[20px] font-bold font-nunito">
              {category ? (category === "Examens" ? "Planning examen" : category) : "Publications"}
            </h2>
            <p className="text-[13px] text-[#8b96a6] mt-1">{filtered.length} publication(s)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Aucune publication.</div>
          ) : (
            filtered.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;
