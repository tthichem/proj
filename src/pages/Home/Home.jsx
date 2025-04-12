import React, {useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Filter from '../../components/Filter/Filter'
import Afficher from '../../components/Afficher/Afficher'



const Home = ({theme}) => {
  
  const [promoSelecte, setPromoSelecte] = useState("");

  return (
    <div className={`home ${theme}`}>

        <Header/>
        <Filter promoSelecte={promoSelecte} setPromoSelecte={setPromoSelecte} theme={theme}/>
        <hr />
        <Afficher promoSelecte={promoSelecte}/>
    </div>
  )
}

export default Home