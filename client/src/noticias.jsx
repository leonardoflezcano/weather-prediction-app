import React, {useState} from 'react'
import Nav from './components/Navbar/Nav'
import Noticia from "./components/Noticias/NewsWidget"
import Footer from './footer';


function Noticias() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Nav onSearch={setSearchTerm} />
      <Noticia searchTerm={searchTerm} />
      <Footer></Footer>
    </div>
  );
}

export default Noticias