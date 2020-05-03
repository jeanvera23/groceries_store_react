import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Link, useHistory } from "react-router-dom";

import MDUIKit from 'md-uikit';
import UIkit from 'uikit';

//Components
import HeaderCart from './HeaderCart';
import FrontFooter from './Footer';
import CartItem from '../../components/cart-item';
import GoogleMap from './GoogleMap.js';

// Context Actions
import CartActions from '../../providers/cart/cart.actions';
import UserActions from '../../providers/user/user.actions';
import settings from '../../settings.js';
//Assets
import DoneImg from "../../assets/img/done.png";

const Checkout = () => {
  const [deliveryFee, setDeliveryFee] = useState(7.00);
  // Totals
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  // Schedules
  const [schedulesArray, setSchedulesArray] = useState([]);
  const [datesArray, setDatesArray] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  // Address
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState([]);
  const [addressesArray, setAddressesArray] = useState([]);
  const [boolNewAddress, setBoolNewAddress] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [orderNotes, setOrderNotes] = useState("");

  const [Steps, setSteps] = useState([{
    step: 1,
    verified: false
  }, {
    step: 2,
    verified: false
  }, {
    step: 3,
    verified: false
  }]);
  const [boolPromoCode, setBoolPromoCode] = useState(false);

  const cart = CartActions();
  const user = UserActions();

  const history = useHistory();
  useEffect(() => {
    MDUIKit.components();
    getDate();
  }, [])
  useEffect(() => {
    setTotals();
    getAddresses();
  }, [cart.cartItems]);
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  function getDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todayFormated = formatDate(today)
    const tomorrowFormated = formatDate(tomorrow);
    setDatesArray([...datesArray, todayFormated, tomorrowFormated]);
  }
  const onClickDate = (date) => event => {
    event.preventDefault();
    getSchedules(date);
    setSelectedSchedule({ date: date });
  }
  const onClickHour = (schedule) => event => {
    event.preventDefault();
    setSelectedSchedule(schedule);
  }
  async function getSchedules(date) {
    try {
      const req = {
        "date": date,
        "jwt": user.currentUser.token
      };
      console.log("getSchedules");
      console.log(req);
      const response = await fetch(`${settings.connectionString}/api/schedule_read_by_date.php`, {
        /* headers: {
            'Content-Type': 'application/json'
        }, */
        method: 'POST',
        body: JSON.stringify(req)
      });
      if (response.status >= 400 && response.status < 500) {
        //UIkit.notification('Information error.');
        setSchedulesArray([]);
        throw "Error" + response.status;
      }
      if (response.status >= 500 && response.status < 600) {
        UIkit.notification('Error. Please try later.');
      }
      const res = await response.json();

      setSchedulesArray(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAddresses() {
    try {
      const req = {
        "userId": user.currentUser.userId,
        "jwt": user.currentUser.token
      };
      console.log("getAddresses");
      console.log(req);
      const response = await fetch(`${settings.connectionString}/api/address_read_by_user.php`, {
        /* headers: {
            'Content-Type': 'application/json'
        }, */
        method: 'POST',
        body: JSON.stringify(req)
      });
      if (response.status >= 400 && response.status < 500) {
        //UIkit.notification('Information error.');

        throw "Error" + response.status;
      }
      if (response.status >= 500 && response.status < 600) {
        UIkit.notification('Error. Please try later.');
      }
      const res = await response.json();

      setAddressesArray(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  function setTotals() {
    //console.log(cart.cartItems);
    let subTotal = 0;
    for (let index = 0; index < cart.cartItems.length; index++) {
      const element = cart.cartItems[index];
      var suma = (parseFloat(element.price) * element.quantity);
      subTotal += suma;
    }
    let total = deliveryFee + subTotal;
    setSubTotal(subTotal.toFixed(2));
    setTotal(total.toFixed(2));
  }
  async function createAddress() {
    try {
      const req = {
        "userId": user.currentUser.userId,
        "addressStreet": addressDetails.address,
        "addressStreetOpc": addressDetails.address_extra,
        "district": addressDetails.distrito,
        "latitude": user.location.lat,
        "longitude": user.location.lng,
        "jwt": user.currentUser.token
      };
      console.log("createAddress");
      console.log(req);
      const response = await fetch(`${settings.connectionString}/api/address_insert.php`, {
        /* headers: {
            'Content-Type': 'application/json'
        }, */
        method: 'POST',
        body: JSON.stringify(req)
      });
      if (response.status >= 400 && response.status < 500) {
        UIkit.notification('Information error.');
        setBoolNewAddress(true);
        throw "Error" + response.status;
      }
      if (response.status >= 500 && response.status < 600) {
        UIkit.notification('Error. Please try later.');
      }
      const res = await response.json();
      console.log(res);
      await getAddresses();
      /* setBoolNewAddress(false); */
      console.log("res.newAddressId");
      setSelectedAddress(res.newAddressId);
      const newObject = [...Steps];
      const selectedStep = newObject.find(item => item.step == 1);
      selectedStep.verified = true;
      setCurrentStep(2);
      setSteps(newObject);
    } catch (error) {
      console.log(error);
    }
  }
  async function createOrder(event) {
    try {
      const req = {
        "userId": user.currentUser.userId,
        "orderTypeId": 1, // Delivery Programado
        "addressId": selectedSchedule.scheduleId,
        "scheduleId": selectedSchedule.scheduleId,
        "stateId": 1, // Recibido
        "totalPrice": total,
        "deliveryFee": deliveryFee,
        "items": cart.cartItems,
        "comments": orderNotes,
        "jwt": user.currentUser.token
      };
      const button = event.target;
      button.innerHTML = 'Cargando...';
      button.disabled = true;
      console.log("createOrder");
      console.log(req);

      const response = await fetch(`${settings.connectionString}/api/order_insert.php`, {
        /* headers: {
            'Content-Type': 'application/json'
        }, */
        method: 'POST',
        body: JSON.stringify(req)
      });
      if (response.status >= 400 && response.status < 500) {
        UIkit.notification('Information error.');
        //setBoolNewAddress(true);
        button.innerHTML = 'Enviar Orden';
        button.disabled = false;
        throw "Error" + response.status;
      }
      if (response.status >= 500 && response.status < 600) {
        UIkit.notification('Error. Please try later.');
        button.innerHTML = 'Enviar Orden';
        button.disabled = false;
        throw "Error" + response.status;
      }
      const res = await response.json();
      console.log(res);
      UIkit.modal('#modal_final', { 'bgClose': false, 'escClose': false }).show();
      cart.setList([]);
    } catch (error) {
      console.log(error);
    }
  }
  const sendOrder = (event) => {
    console.log();
    createOrder(event);
  }
  const saveAddress = () => {
    if (addressDetails.distrito && addressDetails.address) {

      createAddress()
    } else {
      UIkit.notification("Ingrese una direccion para continuar.");
    }
    console.log();
  }
  const saveStep1 = () => {
    if (selectedAddress.length) {
      const newObject = [...Steps];
      const selectedStep = newObject.find(item => item.step == 1);
      selectedStep.verified = true;
      setCurrentStep(2);
      setSteps(newObject);
    } else {
      UIkit.notification("Seleccione una direccion para continuar.");
    }
    console.log();
  }
  const saveStep2 = () => {
    if (selectedSchedule.date && selectedSchedule.hourGroup) {
      const newObject = [...Steps];
      const selectedStep = newObject.find(item => item.step == 2);
      selectedStep.verified = true;
      setCurrentStep(3);
      setSteps(newObject);
    } else {
      UIkit.notification("Escoja una fecha y hora de entrega.");
    }
    console.log();
  }
  const saveStep3 = () => {
    const newObject = [...Steps];
    const selectedStep = newObject.find(item => item.step == 3);
    selectedStep.verified = true;
    setCurrentStep(4);
    setSteps(newObject);
  }
  const handleChange = event => {
    const { value, name } = event.target;
    setAddressDetails({ ...addressDetails, [name]: value })
  }
  const handleSelectedAddress = event => {
    const { value, name } = event.target;
    setSelectedAddress(value);
  }
  const handleOrderNotes = event => {
    const { value, name } = event.target;
    setOrderNotes(value)
  }

  function renderPrice(item) {

    var total = (parseFloat(item.price) * item.quantity).toFixed(2).toString();
    var cents = total.substring(total.length - 2);
    var units = total.substring(0, total.length - 3);
    return (
      <div className='price md-color-blue-grey-900'>
        <span className="currency">S/</span>
        <span className='unit'>{units}</span>
        <span className='cents'>.{cents}</span>
      </div>
    )
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        user.setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }.bind(this), function () {
        console.log('Error para localizacion');
      }.bind(this));
    }
  }
  const goToAccount = (event) => {
    event.preventDefault();
    UIkit.modal("#modal_final").hide();
    history.push('/account/orders');
  }
  return (
    <div>
      <HeaderCart />
      <div className="uk-container uk-padding uk-text-center">
        <div data-uk-grid>
          <div className="uk-width-3-5@s">
            <div className="uk-grid-small" data-uk-grid>
              <div className="uk-width-1-1">
                <div className="uk-card md-bg-white">
                  <div className="uk-card-header border-bottom">
                    <h3 className="uk-card-title uk-margin-remove-bottom uk-text-left">1. Donde desea recibir sus productos?</h3>
                  </div>
                  <div className="uk-card-body">
                    {currentStep == 1 ? (
                      <div className="">
                        {(boolNewAddress || addressesArray.length == 0) ? (
                          <>
                            <div className='uk-grid-small' data-uk-grid>
                              <div className='uk-width-1-1'>
                                <p class="uk-margin-remove uk-text-left">Dirección</p>
                                <div className="md-input-wrapper md-input-no-label md-input-dense">
                                  <input type="text" className="md-input" name="address" onChange={handleChange} required value={addressDetails.address} />
                                </div>
                              </div>
                              <div className='uk-width-1-1'>
                                <p class="uk-margin-remove uk-text-left">Unidad/Departamento</p>
                                <div className="md-input-wrapper md-input-no-label md-input-dense">
                                  <input type="text" className="md-input" name="address_extra" onChange={handleChange} required value={addressDetails.address_extra} />
                                </div>
                              </div>
                              <div className='uk-width-1-1'>
                                <p class="uk-margin-remove uk-text-left">Distrito</p>
                                <div className="md-input-wrapper md-input-no-label md-input-dense">
                                  <select className="md-input" onChange={handleChange} required name="distrito" value={addressDetails.distrito}>
                                    <option value="" disabled="" selected hidden></option>
                                    <option value="Cayma">Cayma</option>
                                    <option value="Cercado">Cercado</option>
                                    <option value="JLByR">JLByR</option>
                                    <option value="Sachaca">Sachaca</option>
                                    <option value="Yanahuara">Yanahuara</option>
                                  </select>
                                </div>
                              </div>
                              <div className='uk-card uk-card-body'>
                                <div className='uk-text-right'> <button onClick={getLocation} className="md-btn md-color-white md-bg-blue-grey-800 md-btn-wave uk-margin-bottom"><i className="material-icons">gps_fixed</i> Encontrar mi direccion</button></div>
                                <GoogleMap />

                                <p>¿Está bien el mapa? puedes ajustar la ubicación arrastrando el marcador rojo.</p>

                              </div>
                              {addressesArray.length > 0 &&
                                <p><a onClick={() => setBoolNewAddress(false)} >{"< Mis direcciones"}</a></p>
                              }
                            </div>
                            <p className='uk-text-right'>
                              <button onClick={saveAddress} className="md-btn md-color-white md-btn-primary">Guardar Dirección</button>
                            </p>
                          </>
                        ) : (
                            <>
                              <div className='uk-width-1-1'>
                                <p class="uk-margin-remove uk-text-left">Seleccionar una dirección</p>
                                <div className="md-input-wrapper md-input-no-label md-input-dense">
                                  <select className="md-input" onChange={handleSelectedAddress} required value={selectedAddress}>
                                    <option value="" disabled="" selected hidden></option>
                                    {addressesArray && addressesArray.map(item =>
                                      <option value={item.addressId}>{item.addressStreetOpc + " - " + item.addressStreet}</option>
                                    )}
                                  </select>
                                </div>
                              </div>
                              <p> <a onClick={() => setBoolNewAddress(true)} >Agregar una dirección</a></p>
                              <p className='uk-text-right'>
                                {Steps[0].verified == true &&
                                  <button onClick={() => setCurrentStep(2)} className="md-btn">Cancelar</button>
                                }
                                <button onClick={saveStep1} className="md-btn md-color-white md-btn-primary">Siguiente</button>
                              </p>
                            </>
                          )
                        }

                      </div>
                    ) : (
                        Steps[0].verified == true && (
                          <>
                            <h5>Direccion seleccionada:</h5>
                            <div className="md-input-wrapper md-input-no-label md-input-dense" >
                              <select className="md-input" onChange={handleSelectedAddress} disabled value={selectedAddress}>
                                <option value="" disabled="" selected hidden></option>
                                {addressesArray && addressesArray.map(item =>
                                  <option value={item.addressId}>{item.addressStreetOpc + " - " + item.addressStreet}</option>
                                )}
                              </select>
                            </div>
                            <p><a onClick={() => setCurrentStep(1)} >{"Editar Información"}</a></p>
                          </>
                        )
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="uk-card md-bg-white">
                  <div className="uk-card-header border-bottom">
                    <h3 className="uk-card-title uk-margin-remove-bottom uk-text-left">2. En que horario?</h3>
                  </div>
                  <div className="uk-card-body">
                    {currentStep == 2 ? (
                      <>
                        <h5>Seleccione dia y hora</h5>
                        <div className=' uk-grid-small' data-uk-grid>
                          <div className="uk-width-1-1@s">
                            <div className='uk-card uk-card-body md-bg-grey-50'>
                              <div className=' uk-grid-small' data-uk-grid>
                                {datesArray.length && datesArray.map(item => (
                                  (selectedSchedule.date == item) ? (
                                    <div className="uk-width-1-2@s">
                                      <a onClick={onClickDate(item)}><div className='uk-card uk-card-body md-color-white md-bg-indigo-800'><p>{item}</p></div></a>
                                    </div>
                                  ) : (
                                      <div className="uk-width-1-2@s">
                                        <a onClick={onClickDate(item)}><div className='uk-card uk-card-body md-bg-white'><p>{item}</p></div></a>
                                      </div>
                                    )
                                ))}
                              </div>
                            </div>

                          </div>
                          {schedulesArray.length > 0 ? (
                            <div className="uk-width-1-1@s">
                              <div className='uk-card uk-card-body md-bg-grey-50'>
                                <div className=' uk-grid-small' data-uk-grid>
                                  {schedulesArray.map(item => (
                                    (selectedSchedule.hourGroup == item.hourGroup && selectedSchedule.date == item.date) ? (
                                      <div className="uk-width-1-1@s">
                                        <a onClick={onClickHour(item)}><div className='uk-card uk-card-body md-color-white md-bg-indigo-800'><p>{item.dayGroup + ": " + item.hourGroup}</p></div></a>
                                      </div>
                                    ) : (
                                        <div className="uk-width-1-1@s">
                                          <a onClick={onClickHour(item)}><div className='uk-card uk-card-body md-bg-white'><p>{item.dayGroup + ": " + item.hourGroup}</p></div></a>
                                        </div>
                                      )
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                              selectedSchedule.date &&
                              <div className="uk-width-1-1@s">
                                <div className='uk-card uk-card-body md-bg-grey-50'>
                                  <h5> No hay horarios de entrega para este dia</h5>
                                </div>
                              </div>
                            )
                          }
                        </div>
                        <h5>Notas para el repartidor</h5>
                        <div className="uk-width-1-1">
                          <div className=" md-input-wrapper md-input-textarea md-input-no-label">
                            <textarea className="md-input" placeholder="Ej. Tocar el timbre solo una vez." onChange={handleOrderNotes} value={orderNotes} />
                          </div>
                        </div>
                        <p className='uk-text-right'>
                          <button onClick={saveStep2} className="md-btn md-color-white md-btn-primary">Guardar Detalles</button>
                        </p>
                      </>
                    ) : (
                        Steps[1].verified == true && (
                          <p><a onClick={() => setCurrentStep(2)} >{"Editar Información"}</a></p>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="uk-card md-bg-white">
                  <div className="uk-card-header border-bottom">
                    <h3 className="uk-card-title uk-margin-remove-bottom uk-text-left">3. Revision de pedido</h3>
                  </div>
                  <div className="uk-card-body">
                    {currentStep == 3 ? (
                      <>
                        {cart.cartItems ?
                          <div class="uk-overflow-auto">
                            <table width="100%" className="uk-table">
                              <tbody>
                                {cart.cartItems.map(item => (
                                  <tr>
                                    <td ><img width='100px' src={`${settings.connectionString}/files/products/test1.webp`} alt="" /></td>
                                    <td><p >{item.name}</p></td>
                                    <td width='100px'><h5>S/. {(parseFloat(item.price) * item.quantity).toFixed(2).toString()}</h5></td>
                                    <td>
                                      {item && item.quantity > 0 ? (
                                        <div className='md-bg-grey-200 card-button'>
                                          <span><button onClick={() => cart.removeItem(item.productId)} className="md-btn md-btn-primary md-btn-wave-light card-button-left">-</button></span>
                                          <span className='card-button-center md-color-blue-grey-900'>{item.quantity}</span>
                                          <span><button onClick={() => cart.addItem(item)} className="md-btn md-btn-primary md-btn-wave-light card-button-right">+</button></span>
                                        </div>
                                      ) : (
                                          <a onClick={() => cart.addItem(item)} className="md-btn md-btn-primary md-btn-wave-light"><i className='material-icons'>shopping_cart</i> Agregar</a>
                                        )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          :
                          "No hay produtos en el carrito."
                        }
                        <p className='uk-text-right'>
                          <button onClick={saveStep3} className="md-btn md-color-white md-btn-primary">Guardar Detalles</button>
                        </p>
                      </>
                    ) : (
                        Steps[2].verified == true && (
                          <p><a onClick={() => setCurrentStep(3)} >{"Editar Información"}</a></p>
                        )
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-width-2-5@s" >
            <div className="uk-card md-bg-white" data-uk-sticky="offset: 10; bottom: #top">
              <div className="uk-card-header border-bottom md-bg-indigo-900">
                <h3 className="uk-card-title uk-margin-remove-bottom uk-text-left">
                  <div className="uk-clearfix">
                    <div className="uk-float-left">
                      <h3 className="md-color-white">Tu orden:</h3>
                    </div>
                    <div className="uk-float-right">
                      <small className="md-color-white">Total</small>
                      <h4 className='uk-margin-remove md-color-white uk-text-bold'>S/. {total}</h4>
                    </div>
                  </div>
                </h3>
              </div>
              <div className="uk-card-body">
                <div className='uk-card md-bg-white'>

                  <div className="uk-card-header border-bottom">
                    <div class="uk-clearfix">
                      <div class="uk-float-right">
                        <i onClick={() => setBoolPromoCode(!boolPromoCode)} class="md-icon material-icons md-fab-wave">keyboard_arrow_down</i>
                      </div>
                      <div class="uk-float-left">
                        <h6 className="uk-margin-remove-bottom uk-text-left">Agregar un codigo de promoción</h6>
                      </div>
                    </div>
                  </div>
                  {boolPromoCode &&
                    <div className='uk-card-body '>
                      <div className='uk-width-1-1'>
                        <div class="uk-clearfix">
                          <div class="uk-float-left">
                            <div className="md-input-wrapper md-input-no-label md-input-dense">
                              <input type="text" className="md-input" name="promo_code" placeholder="Ingrese un codigo" />
                            </div>
                          </div>
                          <div class="uk-float-right">
                            <button className="md-btn md-color-white md-btn-primary">Agregar</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <table width="100%" className="uk-table ">
                  <tbody>
                    <tr>
                      <td className='uk-text-left'>Subtotal</td>
                      <td className='uk-text-right'><h5 className="md-color-blue-grey-900 uk-margin-remove">S/. {subTotal}</h5></td>
                    </tr>
                    <tr>
                      <td className='uk-text-left'>Cargo por delivery</td>
                      <td className='uk-text-right'>S/. {deliveryFee.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className='uk-text-left' ><h5>TOTAL</h5>  </td>
                      <td className='uk-text-right' ><h5>S/. {total}</h5></td>
                    </tr>
                  </tbody>
                </table>
                {currentStep == 4 ?
                  <button onClick={sendOrder} className="md-btn md-color-white md-btn-primary md-btn-block">Enviar Orden</button>
                  :
                  <button className="md-btn disabled" disabled>Enviar Orden</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modal_final" data-uk-modal>
        <div className="uk-modal-dialog uk-margin-auto-vertical">
          <div className="uk-modal-header">
            <h2 className="uk-modal-title">Listo!</h2>
          </div>
          <div className="uk-modal-body uk-text-center">
            <img width='50px' src={DoneImg} alt="" />
            <p>Hemos recibido tu pedido.</p>
            <p>Puedes verificar el estado de tu orden desde tu cuenta.</p>
            <a onClick={goToAccount} class="md-btn md-btn-outlined md-btn-primary md-btn-wave-light uk-margin-right"><i className='material-icons md-icon'>person</i>Ir a mi cuenta</a>
          </div>
          <div className="uk-modal-footer uk-text-right">
          </div>
        </div>
      </div>
      <FrontFooter />
    </div >
  )
}
export default Checkout;