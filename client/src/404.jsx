import React from 'react';
import { Link } from 'react-router-dom';
import "../src/stilos/404.css"


function Pag_404() {
  return (
    <section className="pag404">
      <div className="pag404__clouds">
        <div className="pag404__cloud pag404__cloud--x1"></div>
        <div className="pag404__cloud pag404__cloud--x1_5"></div>
        <div className="pag404__cloud pag404__cloud--x2"></div>
        <div className="pag404__cloud pag404__cloud--x3"></div>
        <div className="pag404__cloud pag404__cloud--x4"></div>
        <div className="pag404__cloud pag404__cloud--x5"></div>
      </div>
      <div className="pag404__content">
        <div className="pag404__404">404</div>
        <div className="pag404__text pag404__text--1">THE PAGE</div>
        <div className="pag404__text pag404__text--2">WAS NOT FOUND</div>
        <Link className="pag404__btn" to="/home">Home</Link>
      </div>
    </section>
  );
}

export default Pag_404;
