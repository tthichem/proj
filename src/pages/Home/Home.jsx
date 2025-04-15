import React, {useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Filter from '../../components/Filter/Filter'
import Afficher from '../../components/Afficher/Afficher'
import About from '../../components/About/About'
import Footer from '../../components/Footer/Footer'


const Home = ({theme}) => {
  
  const [promoSelecte, setPromoSelecte] = useState("");

  
  return (
    <div className={`home ${theme}`}>
        
        <Header/>
        <Filter promoSelecte={promoSelecte} setPromoSelecte={setPromoSelecte} theme={theme}/>
        <hr />
        <Afficher promoSelecte={promoSelecte}/>
        <About />
        <Footer />

    </div>
  )
}

export default Home