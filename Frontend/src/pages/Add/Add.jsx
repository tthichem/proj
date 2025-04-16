import React, {  useState } from 'react'
import './Add.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';

const Add = () => {

    const url = "http://localhost:5000";
    const [data,setData] = useState({
        name: "",
        systeme: "",
        anne: "",
        specialité: "",
        semester: "",
        google_drive_link: ""
    });


    const onchange =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const submit = async (event) =>{
        event.preventDefault();
        const formData =new FormData();
        formData.append("name",data.name)
        formData.append("systeme",data.systeme)
        formData.append("anne",data.anne)
        formData.append("specialité",data.specialité)
        formData.append("semester",Number(data.semester))
        formData.append("google_drive_link",data.google_drive_link)
        const reponse = await axios.post(`${url}/api/modules/add`,data,{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        if(reponse.data.success){
            setData({
                name: "",
                systeme: "",
                anne: "",
                specialité: "",
                semester: "",
                google_drive_link: ""
            })
            toast.success(reponse.data.message)

        }
        else{
            toast.error(reponse.data.message)
        }
    }

console.log("hello");


  return (
    <>

    
    <div className='add'>
        <form className='form' onSubmit={submit} >
            <div className="ajouter-nom form">
                <p>Nom de module</p>
                
            </div><input onChange={onchange} value={data.name} type="text" name='name' placeholder='ecrire ici' required/>
            <div className='select-boxes'>
            <div className="specialite form">
                <p>Selectioner la Specialité</p>
                <select onChange={onchange} value={data.specialité} name="specialité">
                    <option value=""></option>
                    <option value="Systèmes Informatiques">Systèmes Informatiques</option>
                    <option value="ISIL">ISIL</option>
                    <option value="Réseau">Réseau</option>
                    <option value="IA">IA</option>
                    <option value="RSSI">RSSI</option>
                    <option value="ISI">ISI</option>
                    <option value="WIC">WIC</option>
                </select>
            </div>
            <div className="promo form" required>
                <p>Selectioner la promotion</p>
                <select onChange={onchange} value={data.anne} name="anne" required>
                    <option value=""></option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="I1">I1</option>
                    <option value="I2">I2</option>
                    <option value="I3">I3</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                </select>
            </div>
            <div className='semestre form' required>
                <p>Selectioner semestre</p>
                <select onChange={onchange} value={data.semester} name="semester" required>
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div className='system form'>
                <p>Selectioner systeme </p>
                <select onChange={onchange} value={data.systeme} name="systeme" required>
                    <option value=""></option>
                    <option value="LMD">LMD</option>
                    <option value="INGENIEUR">INGENIEUR</option>
                </select>
            </div>
            
            </div>
            <div className="drive-link form">
                <p>Google drive link</p>
                <input onChange={onchange} value={data.google_drive_link} type="text" name='google_drive_link' placeholder='entrer drive link' required/>
            </div>
            <button type='submit' className='add-button'>AJOUTER</button>
        </form>
    </div>
    </>
  )
}

export default Add