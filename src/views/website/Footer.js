import React, { Component } from 'react';

// Images
/* import AiSurLogo from '../../../assets/img/aisur.jpg'; */

class Nosotros extends Component {

  render() {
    return (
      <div id="footer" className="uk-section-secondary uk-light">
        <div className="uk-padding-small">
          <div className='uk-grid'>
            <div className='uk-width-1-2@s uk-width-3-4@m'>
              <div className="uk-child-width-1-2@m" data-uk-grid>
                <div align='center'>
                  <p>2020 Todos los derechos reservados </p>
                 </div>
                {/*<div align='center'>
                  <a href=""><i className='material-icons'>mail</i><br /><span>soporte@bodeguitamovil.com</span></a>
                </div>
                
                <div align='center'>
                  <a href="https://www.facebook.com/CorretajeBienesRaicesMonicaTejadaD"><i className='fab fa-facebook-f'></i><span>Whatsapp: </span></a><br />
                  <a href="https://wa.me/51959672804/?text=Hola,%20te%20escribo%20desde%20la%20web"><i className='fab fa-whatsapp'></i> <span> 9592313204 - 9592313204</span></a>
                </div> */}
              </div>
            </div>
            <div className='uk-width-1-2@s uk-width-1-4@m'>
              <div align='center'><br />
               {/*  <img width='90px' src={AiSurLogo} alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Nosotros;