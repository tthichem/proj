import React, { useState, useEffect } from "react";
import {
  CalculerMoyenneDuSemestre,
  CalculerMoyenneGenerale,
} from "../CalculerMoyenne";
import "./Afficher.css";

const Afficher = ({ promoSelecte }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({});
  const [semestreActive, setSemestreActive] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/modules/get");
        const data = await response.json();
        if (data.success) setModules(data.modules);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const toggleSemester = (systeme, anne, specialite, semester) => {
    setSemestreActive((prev) => ({
      ...prev,
      [`${systeme}-${anne}-${specialite}-${semester}`]:
        !prev[`${systeme}-${anne}-${specialite}-${semester}`],
    }));
  };

  const handleNoteChange = (
    systeme,
    anne,
    specialite,
    semester,
    NomModule,
    field,
    value
  ) => {
    setNotes((prev) => {
      const ModuleCourrant =
        prev[`${systeme}-${anne}-${specialite}-${semester}`]?.[NomModule] || {};
      const CoefCourrant =
        ModuleCourrant.coefficient ||
        modules.find((m) => m.name === NomModule)?.coefficient ||
        1;

      return {
        ...prev,
        [`${systeme}-${anne}-${specialite}-${semester}`]: {
          ...prev[`${systeme}-${anne}-${specialite}-${semester}`],
          [NomModule]: {
            ...ModuleCourrant,
            [field]: value === "" ? null : parseFloat(value),
            coefficient:
              field === "coefficient" ? parseFloat(value) : CoefCourrant,
          },
        },
      };
    });
  };

  const MoyenneGenerales = (systeme, anne, specialite) => {
    const CléS1 = `${systeme}-${anne}-${specialite}-1`;
    const CléS2 = `${systeme}-${anne}-${specialite}-2`;

    const S1Moy = notes[CléS1]
      ? CalculerMoyenneDuSemestre(notes[CléS1]).moyenne
      : null;
    const S2Moy = notes[CléS2]
      ? CalculerMoyenneDuSemestre(notes[CléS2]).moyenne
      : null;

    return {
      moyenne: CalculerMoyenneGenerale(S1Moy, S2Moy),
      show: semestreActive[CléS1] || semestreActive[CléS2],
    };
  };

  const organizer = (modules) => {
    return modules.reduce((acc, module) => {
      if (promoSelecte && module.anne !== promoSelecte) return acc;

      const systeme = module.systeme || "Général";
      if (!acc[systeme]) acc[systeme] = {};

      if (!acc[systeme][module.anne]) acc[systeme][module.anne] = {};
      if (!acc[systeme][module.anne][module.specialité])
        acc[systeme][module.anne][module.specialité] = {};

      if (!acc[systeme][module.anne][module.specialité][module.semester]) {
        acc[systeme][module.anne][module.specialité][module.semester] = [];
      }

      acc[systeme][module.anne][module.specialité][module.semester].push({
        name: module.name,
        link: module.google_drive_link,
        coefficient: module.coefficient || 1,
      });

      return acc;
    }, {});
  };

  const dataOrganize = organizer(modules);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="afficher">
      {Object.entries(dataOrganize).map(([systeme, promos]) => (
        <div key={systeme} className="systeme-card">
          <h1 className="systeme-title">SYSTEM {systeme}</h1>
          <hr />
          {Object.entries(promos).map(([anne, specialites]) => (
            <div key={anne} className="major-card">
              <hr />
              <h2 className="major-title">{anne}</h2>

              <div className="specialite-side">
                {Object.entries(specialites).map(([specialite, semesters]) => {
                  const { moyenne: MoyenneG, show: AfficherMoyenneG } =
                    MoyenneGenerales(systeme, anne, specialite);

                  return (
                    <div key={specialite} className="speciality-box">
                      <div className="speciality-header">
                        <h3 className="speciality-title">
                          {specialite || "General"}
                        </h3>
                        {AfficherMoyenneG && MoyenneG !== null && (
                          <div className="anne-moyenne">
                            Moyenne Générale: <strong>{MoyenneG}</strong>
                          </div>
                        )}
                      </div>

                      <div className="semesters-container">
                        {Object.entries(semesters).map(
                          ([semester, modules]) => {
                            const CléSemestre = `${systeme}-${anne}-${specialite}-${semester}`;
                            const isActive = semestreActive[CléSemestre];
                            const NotesSemestre = notes[CléSemestre];
                            const MoyenneSemestre =
                              CalculerMoyenneDuSemestre(NotesSemestre);

                            return (
                              <div
                                key={semester}
                                className={`semester-box ${
                                  isActive ? "active" : ""
                                }`}
                              >
                                <div className="semester-header">
                                  <h4>Semester {semester}</h4>
                                  <button
                                    className="toggle-btn"
                                    onClick={() =>
                                      toggleSemester(
                                        systeme,
                                        anne,
                                        specialite,
                                        semester
                                      )
                                    }
                                  >
                                    {isActive ? "Hide Notes" : "Entrer Notes"}
                                  </button>
                                </div>
                                <hr />

                                {modules.map((module, i) => (
                                  <div key={i}>
                                    <a
                                      className="module-link"
                                      href={module.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {module.name}
                                    </a>

                                    {isActive && (
                                      <div className="note-inputs">
                                        <input
                                          type="number"
                                          min="0"
                                          max="20"
                                          placeholder="Cours"
                                          required
                                          onChange={(e) =>
                                            handleNoteChange(
                                              systeme,
                                              anne,
                                              specialite,
                                              semester,
                                              module.name,
                                              "cours",
                                              e.target.value
                                            )
                                          }
                                        />
                                        <input
                                          type="number"
                                          min="0"
                                          max="20"
                                          placeholder="TD"
                                          onChange={(e) =>
                                            handleNoteChange(
                                              systeme,
                                              anne,
                                              specialite,
                                              semester,
                                              module.name,
                                              "td",
                                              e.target.value
                                            )
                                          }
                                        />
                                        <input
                                          type="number"
                                          min="0"
                                          max="20"
                                          placeholder="TP"
                                          onChange={(e) =>
                                            handleNoteChange(
                                              systeme,
                                              anne,
                                              specialite,
                                              semester,
                                              module.name,
                                              "tp",
                                              e.target.value
                                            )
                                          }
                                        />
                                        <input
                                          type="number"
                                          min="1"
                                          max="10"
                                          step="1"
                                          placeholder="Coeff"
                                          defaultValue={module.coefficient || 1}
                                          onChange={(e) =>
                                            handleNoteChange(
                                              systeme,
                                              anne,
                                              specialite,
                                              semester,
                                              module.name,
                                              "coefficient",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}

                                {isActive &&
                                  MoyenneSemestre.moyenne !== null && (
                                    <div className="semester-moyenne">
                                      <strong>Semestre Moyenne:</strong>{" "}
                                      {MoyenneSemestre.moyenne}
                                    </div>
                                  )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Afficher;
