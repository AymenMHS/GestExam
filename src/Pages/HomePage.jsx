import { useState, useMemo, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterButton from "../components/FilterButton";
import PostCard from "../components/PostCard";
import SplashScreen from "../components/SplashScreen";

// --- Données Statiques (Simule la base de données des posts) ---
const postsData = [
  // ... (Conserver ici le tableau postsData)
  {
    id: 1,
    category: "Examens",
    subCategory: "Master 1 - GL",
    time: "Il y a 5 heures",
    title: "Planning général des examens — Semeste 1",
    description:
      "Le planning officiel des examens (écrits) de la session du 10 au 25 janvier 2026.",
    fileName: "planning-exam.pdf",
  },
  {
    id: 2,
    category: "Examens",
    subCategory: "Master 1 - GL",
    time: "Il y a 5 heures",
    title: "Planning général des examens — Session Janvier 2026",
    description:
      "Le planning officiel des examens (écrits) de la session du 10 au 25 janvier 2026.",
    fileName: "planning-exam.pdf",
  },
  {
    id: 3,
    category: "Controle",
    subCategory: "Licence 2 - Info",
    time: "Il y a 1 jour",
    title: "Planning des contrôles continus — Semestre 1",
    description:
      "Dates des CC en programmation, architecture, algorithmes et réseaux.",
    fileName: "planning-cc.pdf",
  },
  {
    id: 5,
    category: "Annonce",
    subCategory: "Département",
    time: "Il y a 4 heures",
    title: "Prolongation de la date limite d’inscription",
    description: "Les étudiants peuvent s’inscrire jusqu’au 28 décembre 2025.",
    fileName: null,
  },
  {
    id: 7,
    category: "Annonce",
    subCategory: "Département",
    time: "Il y a 6 heures",
    title: "Décalage examens finaux",
    description:
      "Suite au récent événements, les examens seront decalé d'une semaine.",
    fileName: null,
  },
  // ... (Ajouter toutes les autres cartes de votre liste ici)
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  // Check if splash has been shown before
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasSeenSplash', 'true');
  };

  const categories = ["All", "Examens", "Controle", "Test Tp", "Annonce"];

  // Logique de Filtrage et de Recherche
  const filteredPosts = useMemo(() => {
    // La fonction de filtrage complète reste la même, utilisant selectedCategory et searchTerm
    return postsData.filter((post) => {
      const categoryMatch =
        selectedCategory === "All" || post.category.includes(selectedCategory);

      const lowerCaseSearch = searchTerm.toLowerCase();
      const searchMatch =
        post.title.toLowerCase().includes(lowerCaseSearch) ||
        post.description.toLowerCase().includes(lowerCaseSearch) ||
        (post.subCategory &&
          post.subCategory.toLowerCase().includes(lowerCaseSearch)) ||
        (post.fileName &&
          post.fileName.toLowerCase().includes(lowerCaseSearch));

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <>
      {/* Show splash screen on first load */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div className="w-full min-h-screen bg-[#e3f0ff]">
        <Header />

        <div className="p-8 mx-auto w-5/6">
          {/* Banner/Image de la plateforme */}
          <div>
            <img
              className="w-full mt-8"
              src="/src/assets/icons/banner.png"
              alt="Banner"
            />
          </div>

          {/* Navigation - Filtres et barre de recherche */}
          <nav className="flex gap-4 mx-2 mt-4">
            {/* Boutons de Filtre */}
            {categories.map((cat) => (
              <FilterButton
                key={cat}
                category={cat}
                selected={selectedCategory === cat}
                onClick={setSelectedCategory} // <-- Passe la fonction de mise à jour de l'état
              />
            ))}

            {/* Barre de recherche */}
            <div className="flex items-center relative bg-white h-13 rounded-2xl grow-3">
              <input
                className="appearance-none pl-13 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                id="search-input"
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // <-- Met à jour le terme de recherche
              />

              {/* Icône X (clear) à droite */}
              {searchTerm && (
                <div
                  className="absolute right-0 inset-y-0 flex items-center cursor-pointer"
                  onClick={() => setSearchTerm("")}
                >
                  {/* SVG for clear button */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-ml-1 mr-3 h-7 w-7 text-gray-700 hover:text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}

              {/* Icône loupe à gauche */}
              <div className="absolute left-0 inset-y-0 flex items-center">
                {/* SVG for search icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-3 text-gray-700 hover:text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </nav>

          {/* Section des cartes filtrées */}
          <div className="space-y-4 mt-5">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} /> // <-- Passe l'objet post complet
              ))
            ) : (
              <div className="text-center text-xl text-gray-500 py-10 border-2 border-dashed border-gray-300 rounded-2xl">
                🤷‍♂️ Aucun post trouvé pour la catégorie "{selectedCategory}" et
                le terme de recherche "{searchTerm}".
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
