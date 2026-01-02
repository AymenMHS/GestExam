// src/data/postsData.js
export const posts = [
  {
    id: 1,
    category: "Examens",          // affiché comme "Planning Examen" dans PostCard
    subCategory: "Semestre 1",
    time: "02/12/2025 09:00",
    title: "Planning des examens - Semestre 1",
    description: "Le planning officiel des examens du semestre 1 est publié.",
    fileName: "planning_exam_sem1.pdf",
  },
  {
    id: 2,
    category: "Annonce",
    time: "28/11/2025 12:00",
    title: "Fermeture exceptionnelle",
    description: "Université fermée le 01/12/2025 pour cause de maintenance.",
    fileName: null,
  },
  {
    id: 3,
    category: "Controle Continu",
    subCategory: "CC - Informatique",
    time: "25/11/2025 10:30",
    title: "CC - Algorithmique 1",
    description: "Les sujets du contrôle continu seront disponibles en salle des profs.",
    fileName: "cc_algorithmique.pdf",
  },
  {
    id: 4,
    category: "Remplacement",
    time: "20/11/2025 15:00",
    title: "Remplacement CC - Mathématiques",
    description: "Remplacement programmé pour le 22/11/2025.",
    fileName: "remplacement_math.pdf",
  },
  {
    id: 5,
    category: "Rattrapage",
    time: "30/11/2025 08:00",
    title: "Rattrapage - Systèmes d'exploitation",
    description: "Rattrapage prévu le 05/12/2025.",
    fileName: null,
  },
];
