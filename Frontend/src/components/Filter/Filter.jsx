import React, { useState, useEffect } from "react";
import "./Filter.css";

const Filter = ({ theme, promoSelecte, setPromoSelecte }) => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/modules/get');
        const data = await response.json();
        
        if (data.success) {
          const uniqueMajors = [...new Set(data.modules.map(module => module.anne))];
          setPromos(uniqueMajors);
        }
      } catch (error) {
        console.error("Error fetching majors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  if (loading) return <div className="loading">promos loading...</div>;

  return (
    <div className="filter">
      <h1 className={`h1 ${theme}`}>Explore the Archive</h1>
      <div className="filter-list">
        {promos.map((major, index) => (
          <div 
            onClick={() => setPromoSelecte(prev => prev === major ? "" : major)} 
            key={index} 
            className="filter-items"
          >
            <h2 className={`${promoSelecte === major ? "active" : ""} ${theme}`}>
              {major}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;