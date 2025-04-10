import React from "react";
import "./Filter.css";
import data from '../../modules.json'

const Filter = ({theme,type,setType}) => {
  return (
    <div className="filter">
      <h1 className={`h1 ${theme}`}>Explore the Archive</h1>
      <div className="filter-list">
        {data.map((promo,index) => {
          return(
            <div onClick={() => setType(prev => prev ===promo.name ? "" :promo.name)} key={index} className="filter-items">
              <h2 className={`${type === promo.name ? "active" : "" } ${theme}` }>{promo.name} </h2>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Filter;
