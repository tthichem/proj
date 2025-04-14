import React, { useEffect, useState } from "react";
import "./Lister.css";
import axios from "axios";
import { toast } from "react-toastify";

const Lister = () => {
  const url = "http://localhost:5000";

  const [list, setList] = useState([]);
  const fetch = async () => {
    const reponse = await axios.get(`${url}/api/modules/get`);

    if (reponse.data.success) {
      setList(reponse.data.modules);
    } else {
      toast.error("Error");
    }
  };

  const supprimerModule = async (nomDeModule) => {
    const reponse = await axios.delete(
      `${url}/api/modules/delete/${nomDeModule}`
    );
    await fetch();
    if (reponse.data.success) {
      toast.success(reponse.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="list form add">
      <p>tous les modules</p>
      <div className="tableau">
        <div className="tableau-format titre">
          <b>Module</b>
          <b>System</b>
          <b>Promo</b>
          <b>Specialite</b>
          <b>Semestre</b>
          <b>drive link</b>
        </div>
        {list.map((mod, index) => {
          return (
            <div key={index} className="tableau-format">
              <p>{mod.name}</p>
              <p>{mod.systeme}</p>
              <p>{mod.anne}</p>
              <p>{mod.specialité}</p>
              <p>S{mod.semester}</p>
              <p className="drive-link">{mod.google_drive_link}</p>
              <p className="delete" onClick={() => supprimerModule(mod.name)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lister;
