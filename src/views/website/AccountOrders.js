import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import MDUIKit from 'md-uikit';
import UIkit from 'uikit';


// Actions
import UserActions from '../../providers/user/user.actions';

import settings from '../../settings.js';

const AccountOrders = ({ props }) => {
  const [ordersArray, setOrdersArray] = useState([]);

  const user = UserActions();
  const history = useHistory();
  async function getOrders() {
    try {
      const req = {
        "userId": user.currentUser.userId,
        "jwt": user.currentUser.token
      };
      console.log("getSchedules");
      console.log(req);
      const response = await fetch(`${settings.connectionString}/api/order_read_by_userId.php`, {
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

      setOrdersArray(res);
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
      <h3 className="uk-text-left">Ordenes</h3>
      <div className="uk-grid-small uk-grid-match" data-uk-grid>
        <div className='uk-width-1-1'>
          <div class="uk-card uk-card-default uk-card-body">
            <div class="uk-overflow-auto">
              <table className="uk-table">
                <thead>
                  <th>Nro</th>
                  <th>Codigo</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                </thead>
                <tbody>
                  {ordersArray.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td><Link to={`/account/orderdetails/${item.refNumber}`}>{item.refNumber}</Link></td>
                      <td>{item.created_date.substring(0,10)}</td>
                      <td>{item.stateName}</td>
                      <td>S/. {item.totalPrice}</td>
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
export default AccountOrders;