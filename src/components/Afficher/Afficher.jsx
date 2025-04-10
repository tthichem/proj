import React from "react";
import "./Afficher.css";
import Data from "../../modules.json";
import { useState } from "react";

const Afficher = ({type}) => {


  const filteredData = type
    ? Data.filter((data) => data.name === type)
    : Data;

  return (
    <div className="afficher">
      {filteredData &&
        filteredData.map((data) => {
          return (
            <div className="major-card" key={data.name}>
              <hr />
              <h2 className="major-title major-card">{data.name}</h2>
              
                
              
              
                
              
              {data.semestres && (
                <div className="semesters-container">
                  {data.semestres.map((semestre) => (
                    <div  key={semestre.name} className="semester-box">
                      <h3>{semestre.name}</h3>
                      <hr />

                      {semestre.modules &&
                        semestre.modules.map((module) => (
                          <div key={module.name}>
                            <a
                              className="module-link"
                              target="_blank"
                              href={module.link}
                              rel="noopener noreferrer"
                            >
                              {module.name}
                            </a>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
              <div className="specialite-side">
                {data.specialites &&
                  data.specialites.map((spec, i) => (
                    <div className="speciality-box" key={i}>
                      <h3 className="speciality-title">{spec.name}</h3>
                      
                        
                      
                      
                        
                      

                      <div className="semesters-container">
                        {spec.semestres &&
                          spec.semestres.map((sem) => (
                            <div key={sem.name} className="semester-box" >
                              <h4>{sem.name}</h4>
                              <hr />

                              {sem.modules &&
                                sem.modules.map((mod, k) => (
                                  <div key={k}>
                                    <a
                                      className="module-link"
                                      target="_blank"
                                      href={mod.link}
                                      rel="noopener noreferrer"
                                    >
                                      {mod.name}
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
          );
        })}
    </div>
  );
};

export default Afficher;
