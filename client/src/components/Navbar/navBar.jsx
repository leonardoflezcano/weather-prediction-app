import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Perfil_modal from "../perfil/modal_perfil";
import { Visibilidad_nav } from './visibilidad_nav';
import "../../stilos/Plantilla_slider/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stilos/Plantilla_slider/css/responsive.css";
import "../../stilos/Plantilla_slider/css/bootstrap.css";
import { Search } from "../Serch/Search";
import "../../stilos/search.css";
import { fetchUserInfo } from "../Function/infoToken.tsx";
import { Cpu } from "lucide-react"; // Importación del icono de CPU

export const NavBar = ({ onSearch }) => {
  const { isVisible, handleToggle } = Visibilidad_nav();
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token)
        .then(data => setUserData(data))
        .catch(error => console.error(error.message));
    } else {
      setUserData(null); // Set default state if no token
    }
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    onSearch(term);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina el token, cierra sesión y recarga la página
        localStorage.removeItem('token');
        setUserData(null);
        Swal.fire('Se ha cerrado sesión correctamente', '', 'success').then(() => {
          window.location.reload(); // Recarga la página después de cerrar sesión
        });
      }
    });
  };

  return (
    <div id="heroArea" className="hero_area">
      <header className="header_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8">
              <nav className="navbar navbar-expand-xl custom_nav-container">
                <a className="navbar-brand" href="index.html">
                  <img src="../../../src/images/logo-cifor.png" alt="logo" className="logo" />
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={handleToggle}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                {isVisible && (
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex flex-column flex-xl-row align-items-center">
                      <ul className="navbar-nav">
                        <li className="nav-item active">
                          <Link className="nav-link" to="/home">
                            <i className="bi bi-house"></i> Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/about">
                            <i className="bi bi-person"></i> About
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/Weather">
                            <i className="bi bi-cloud-sun"></i> Weather
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/mapa">
                            <i className="bi bi-geo-alt"></i> Map
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/noticias">
                            <i className="bi bi-newspaper"></i> News
                          </Link>
                        </li>

                        {isModalOpen && <Perfil_modal onClose={closeModal} />}
                     
                        {userData ? (
                          <div className="d-flex align-items-center ml-auto">
                            {/* Botón CPU */}
                            <li className="nav-item" style={{ margin: '0' }}>
                              <Link
                                className="nav-link"
                                to="/modelo_prediccion"
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column', // Stack icon and text vertically
                                  alignItems: 'center',
                                }}
                              >
                                <Cpu style={{ marginBottom: '5px' }} /> {/* Add some margin to the bottom of the icon */}
                                CIFORIA
                              </Link>
                            </li>

                            {/* Botón Sign Out */}
                            <li className="nav-item" style={{ margin: '0' }}>
                              <button className="nav-link logout-button" id="nav-item-left" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
                                <i className="bi bi-box-arrow-right" style={{ marginRight: '5px' }}></i>
                                <div className="logout-text">
                                  <span>sign</span>
                                  <span>out</span>
                                </div>
                              </button>
                            </li>

                            {/* Icono de perfil */}
                            <a className="navbar-brand" href="javascript:void(0)" onClick={openModal}>
                              <img
                                src={userData?.fotoUser || "../../../src/images/usuario.jpg"}
                                alt="perfil"
                                className="foto_perfil"
                              />
                            </a>
                          </div>
                        ) : (
                          <li className="nav-item">
                            <Link className="nav-link" to="/cuenta" id="nav-item-left">
                              <i className="bi bi-person"></i> Cuenta
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
