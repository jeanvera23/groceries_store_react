import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// Images
import portada1 from '../../assets/img/banner1.webp';
import portada2 from '../../assets/img/banner2.webp';
import portada3 from '../../assets/img/banner3.webp';
import cat_abarrotes from '../../assets/img/cat_abarrotes.webp';
import cat_piqueos from '../../assets/img/cat_piqueos.webp';
import cat_licores from '../../assets/img/cat_licores.webp';
import cat_cuidado_personal from '../../assets/img/cat_cuidado_personal.webp';
import cat_limpieza_banio from '../../assets/img/cat_limpieza_banio.webp';
import cat_cocina from '../../assets/img/cat_cocina.webp';
import cat_cuidado_ropa from '../../assets/img/cat_cuidado_ropa.webp';
import cat_cuidado_hogar from '../../assets/img/cat_cuidado_hogar.webp';

import UIkit from 'uikit';
import settings from '../../settings.js';

const Home = () => {
  const [categoriesArray, setCategoriesArray] = useState([]);
  async function getCategories() {
    try {
      const response = await fetch(`${settings.connectionString}/api/category_read.php`, {
        method: 'POST'
      });
      if (response.status >= 400 && response.status < 500) {
        UIkit.notification('Information error.');
        throw "Error" + response.status;
      }
      if (response.status >= 500 && response.status < 600) {
        UIkit.notification('Error. Please try later.');
      }
      const res = await response.json();
      setCategoriesArray(res);
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategories();

  }, [])
  return (
    <div>
      <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slideshow="autoplay: true; max-height: 500;autoplay-interval: 8000;animation: pull">

        <ul className="uk-slideshow-items">
          {/* <li>
              <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                <img src={portada1} alt="" data-uk-cover />
              </div>
              <div className=" uk-animation-fade uk-position-center uk-position-small uk-overlay uk-overlay-primary uk-text-center">
                <h1 className='uk-margin-remove'>Descubre</h1>
                <p className='uk-margin-remove'>los nuevos inmuebles que tenemos para</p>
                <h2 className='uk-margin-remove-top'>TI</h2>
                <Link to={`/propiedades/0/0/1`} className="md-btn md-bg-amber-700 md-color-white md-btn-wave">ALQUILERES</Link>
                <Link to={`/propiedades/0/0/1`} className="md-btn md-bg-amber-700 md-color-white md-btn-wave">VENTAS</Link>
              </div>
            </li> */}
          <li>
            <img src={portada1} alt="" data-uk-cover />
          </li>
          <li>
            <img src={portada2} alt="" data-uk-cover />
          </li>
          <li>
            <img src={portada3} alt="" data-uk-cover />
          </li>
        </ul>

        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous data-uk-slideshow-item="previous"></a>
        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next data-uk-slideshow-item="next"></a>

      </div>
      <div className="uk-section uk-section-default">
        <div className="uk-container">

          <h4>Bienvenido!</h4>
          <p>Encuentra todo lo que quieras en nuestra web</p>
          <div className="uk-grid-match uk-child-width-1-2 uk-child-width-1-6@m" data-uk-grid>
            {categoriesArray.map((item, key) => (
              <div key={key}>
                <Link to={`/productos/${item.categoryId}`}>
                  <div className="uk-card uk-card-body md-bg-indigo-900 md-color-white">
                    <div className="uk-text-center">
                      {item.name}
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-card uk-card-body md-bg-white">
          <div className="uk-grid-small" data-uk-grid>
            <div className="uk-width-2-3">
              <h4>Abarrotes</h4>
            </div>
            <div className="uk-width-1-3 uk-text-right">
              <a><h4 className="md-color-indigo-900">Ver todo</h4></a>
            </div>
            <div className="uk-width-1-1">
              <Link to='/productos/4'><img src={cat_abarrotes} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-card uk-card-body md-bg-white">
          <div className="uk-grid-small" data-uk-grid>
            <div className="uk-width-2-3">
              <h4>Cuidado Personal</h4>
            </div>
            <div className="uk-width-1-3 uk-text-right">
              <a><h4 className="md-color-indigo-900">Ver todo</h4></a>
            </div>
            <div className="uk-width-1-1">
              <Link to='/productos/5'><img src={cat_cuidado_personal} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-card uk-card-body md-bg-white">
          <div className="uk-grid-small" data-uk-grid>
            <div className="uk-width-2-3">
              <h4>Limpieza</h4>
            </div>
            <div className="uk-width-1-3 uk-text-right">
              <a><h4 className="md-color-indigo-900">Ver todo</h4></a>
            </div>
            <div className="uk-width-1-1">
              <Link to='/productos/6'><img src={cat_cuidado_ropa} alt="" /></Link>
            </div>
            <div className="uk-width-1-2 uk-width-1-3@s">
              <Link to='/productos/6'><img src={cat_limpieza_banio} alt="" /></Link>
            </div>
            <div className="uk-width-1-2 uk-width-1-3@s">
              <Link to='/productos/6'> <img src={cat_cuidado_hogar} alt="" /></Link>
            </div>
            <div className="uk-width-1-2 uk-width-1-3@s">
              <Link to='/productos/6'><img src={cat_cocina} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-card uk-card-body md-bg-white">
          <div className="uk-grid-small" data-uk-grid>
            <div className="uk-width-2-3">
              <h4>Piqueos Y Licores</h4>
            </div>
            <div className="uk-width-1-3 uk-text-right">
              <a><h4 className="md-color-indigo-900">Ver todo</h4></a>
            </div>
            <div className="uk-width-1-2@s">
              <Link to='/productos/7'><img src={cat_licores} alt="" /></Link>
            </div>
            <div className="uk-width-1-2@s">
              <Link to='/productos/7'> <img src={cat_piqueos} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default Home;