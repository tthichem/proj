import React, { useState, useEffect } from "react";
import "./Afficher.css";

const Afficher = ({ promoSelecte }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/modules/get');
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

  const organizer = (modules) => {
    return modules.reduce((acc, module) => {
      // ki tedrok 3la promo yakhdem filter
      if (promoSelecte && module.anne !== promoSelecte) return acc;

      // ida y exixti systeme yaffichih, ida la ycréer wahed general
      const systeme = module.systeme || "Général";
      if(!acc[systeme]) acc[systeme] = {};

      //drwk y checki ida kayen des promo w des specialites wsemestre fsysteme
      if(!acc[systeme] [module.anne]) acc[systeme] [module.anne] = {};
      if (!acc[systeme][module.anne][module.specialité]) acc[systeme][module.anne][module.specialité] = {};


      if (!acc[systeme][module.anne][module.specialité][module.semester]) {
        acc[systeme][module.anne][module.specialité][module.semester] = [];
      }
      
      acc[systeme][module.anne][module.specialité][module.semester].push({
        name: module.name,
        link: module.google_drive_link
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
            {Object.entries(specialites).map(([specialite, semesters]) => (
              <div key={specialite} className="speciality-box">
                <h3 className="speciality-title">{specialite || 'General'}</h3>
                
                <div className="semesters-container">
                  {Object.entries(semesters).map(([semester, modules]) => (
                    <div key={semester} className="semester-box">
                      <h4>Semester {semester}</h4>
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
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
      ))}
      
    </div>
  );
};

export default Afficher;