
// Reçoit la catégorie (texte), si elle est sélectionnée (bool) et la fonction de clic
const FilterButton = ({ category, selected, onClick }) => {
    return (
        <li
            className={`list-none w-30 h-13 rounded-2xl ${
                selected ? "bg-[#051f61] text-white" : "bg-white text-gray-700"
            } grow-1.5 flex items-center justify-center text-xl font-semibold cursor-pointer transition-colors`}
            onClick={() => onClick(category)} // Déclenche la mise à jour de l'état dans HomePage
        >
            <a className="px-4 py-2 block">{category}</a>
        </li>
    );
};

export default FilterButton;