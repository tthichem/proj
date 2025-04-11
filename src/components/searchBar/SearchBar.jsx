import { useState, useRef, useEffect } from "react";
import data from "../../modules.json";
import "./SearchBar.css";

const SearchBar = ({ theme }) => {
  const [Recherche, setRecherche] = useState("");
  const [Rsultat, setRsultat] = useState(false);
  const detect = useRef(null);

  useEffect(() => {
    const clickBara = (e) => {
      if (detect.current && !detect.current.contains(e.target)) {
        setRsultat(false);
      }
    };
    document.addEventListener("mousedown", clickBara);
    return () => document.removeEventListener("mousedown", clickBara);
  }, []);

  const modules = data.flatMap((major) => {
    const majorName = major.name;
    const hasSpecialties =
      Array.isArray(major.specialites) && major.specialites.length > 0;

    if (hasSpecialties) {
      return major.specialites.flatMap((spec) => {
        const specialiteName = spec.name;
        return spec.semestres.flatMap((semestre) =>
          semestre.modules.map((mod) => ({
            label: `${majorName}/${specialiteName} - ${mod.name}`,
            link: mod.link,
          }))
        );
      });
    } else {
      return (
        major.semestres?.flatMap((semestre) =>
          semestre.modules.map((mod) => ({
            label: `${majorName} - ${mod.name}`,
            link: mod.link,
          }))
        ) || []
      );
    }
  });

  const filteredModules = modules.filter((mod) =>
    mod.label.toLowerCase().includes(Recherche.toLowerCase())
  );

  return (
    <div className="recherche-container" ref={detect}>
      <input
        type="text"
        placeholder="Ex: L3/ISIL - Génie Logiciel"
        value={Recherche}
        onChange={(e) => {
          setRecherche(e.target.value);
          setRsultat(true);
        }}
        className={`recherche-input ${theme}`}
      />

      {Recherche && Rsultat && (
        <ul className={`resultat-list ${theme}`}>
          {filteredModules.slice(0, 6).map((mod, index) => (
            <li key={index} className="resultat-item">
              <a
                href={mod.link}
                target="_blank"
                rel="noopener noreferrer"
                className="resultat-link"
              >
                {mod.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
