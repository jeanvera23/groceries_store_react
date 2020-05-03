import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import MDUIKit from 'md-uikit';
import UIkit from 'uikit';


// Actions
import UserActions from '../../providers/user/user.actions';

import settings from '../../settings.js';

const AccountOrderDetails = ({ props }) => {
  const [orderDetailsArray, setOrderDetailsArray] = useState([]);

  let { refNumber } = useParams();
  const user = UserActions();
  const history = useHistory();
  async function getOrders() {
    try {
      const req = {
        "refNumber": refNumber,
        "jwt": user.currentUser.token
      };
      console.log("getSchedules");
      console.log(req);
      const response = await fetch(`${settings.connectionString}/api/order_read_products_by_ref.php`, {
        /* headers: {
            'Content-Type': 'application/json'
        }, */
        method: 'POST',
        body: JSON.stringify(req)
      });
      if (response.status >= 400 && response.status < 500) {
        UIkit.notification('Information error.');
        throw "Error" + response.status;
      }
      if (response.status >= 500 && response.status < 600) {
        UIkit.notification('Error. Please try later.');
      }
      const res = await response.json();

      setOrderDetailsArray(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOrders();

  }, [])
  return (
    <div>
      <button className="md-btn md-btn-primary" onClick={() => history.goBack()}><i class="material-icons">
        keyboard_arrow_left
</i> Atras</button><h3 className="uk-text-left">Orden: {refNumber}</h3>
      <div className="uk-grid-small uk-grid-match" data-uk-grid>
        <div className='uk-width-1-1'>
          <div class="uk-card uk-card-default uk-card-body">
            <div class="uk-overflow-auto">
              <table className="uk-table">
                <thead>
                  <th>Nro</th>
                  <th></th>
                  <th>Nombre</th>
                  <th>Precio Unitario</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </thead>
                <tbody>
                  {orderDetailsArray.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td><img width='100px' src={`${settings.connectionString}/files/products/${item.image}`} alt="" /></td>
                      <td>{item.name}</td>
                      <td>S/. {item.price}</td>
                      <td>{item.quantity}</td>
                      <td width="100px">S/. {(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AccountOrderDetails;