import React, {useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Filter from '../../components/Filter/Filter'
import Search from '../../components/Search/Search'
import Afficher from '../../components/Afficher/Afficher'



const Home = ({theme}) => {
  
  const [type,setType] = useState("");

  return (
    <div className={`home ${theme}`}>

        <Header/>
        <Filter type={type} setType={setType} theme={theme}/>
        <hr />
        <Afficher type={type}/>
    </div>
  )
}

export default Home