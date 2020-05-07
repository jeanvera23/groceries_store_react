import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router";
import MDUIKit from 'md-uikit';
import UIkit from 'uikit';

//Components
import FrontHeader from './Header';
import FrontFooter from './Footer';
import Cart from './Cart';
import ProductCard from '../../components/product-card';

// Actions
import UserActions from '../../providers/user/user.actions';

import settings from '../../settings.js';

//Assets
import LoadingGIF from "../../assets/img/loading.gif";

const Products = ({ props }) => {
  let { categoryId } = useParams();
  const [productsArray, setProductsArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [order, setOrder] = useState("AZ");
  const user = UserActions();
  let history = useHistory();
  async function getCategories() {
    try {
      var modal = UIkit.modal.dialog('<div className=\'uk-modal-body\'><p>Cargando productos ...</p></div>', { 'bgClose': false, 'escClose': false });

      const response = await fetch(`${settings.connectionString}/api/category_read.php`, {
        method: 'POST'
      });
      if (response.status >= 400 && response.status < 500) {
        UIkit.notification('Information error.');
        modal.hide();
        throw "Error" + response.status;
      }
      if (response.status >= 500 && response.status < 600) {
        modal.hide();
        UIkit.notification('Error. Please try later.');
      }
      const res = await response.json();
      const selectedCategoryTmp = res.find(item => item.categoryId == categoryId)
      /* console.log("selectedCategoryTmp");
      console.log(selectedCategoryTmp); */
      modal.hide();
      setCategoriesArray(res);
      setSelectedCategory(selectedCategoryTmp);
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function getProducts() {
    var modal = UIkit.modal.dialog('<div className=\'uk-modal-body\'><p>Cargando productos ...</p></div>', { 'bgClose': false, 'escClose': false });

    try {
      const req = {
        "categoryId": categoryId
      };
      const response = await fetch(`${settings.connectionString}/api/category_product_read_by_category.php`, {
        method: 'POST',
        body: JSON.stringify(req)
      });
      if (response.status >= 400 && response.status < 500) {
        modal.hide();
        UIkit.notification('Information error.');
        throw "Error" + response.status;
      }
      if (response.status >= 500 && response.status < 600) {
        modal.hide();
        UIkit.notification('Error. Please try later.');
      }
      const res = await response.json();
      if (categoriesArray.length) {
        const selectedCategoryTmp = categoriesArray.find(item => item.categoryId == categoryId)
        setSelectedCategory(selectedCategoryTmp);
      }

      setProductsArray(res);
      modal.hide();
    } catch (error) {
      console.log(error);
      modal.hide();
    }
  }
  useEffect(() => {
    getCategories();

  }, [])
  useEffect(() => {
    getProducts();
  }, [categoryId])
  const changeCategory = (categoryId) => event => {
    event.preventDefault();
    UIkit.modal("#modal_categorias").hide();
    history.push('./' + categoryId);
  }
  const orderBy = (event) => {
    const { name, value } = event.target;
    let newObj;
    switch (value) {
      case "-+":
        newObj = productsArray.sort(compareValues('price'));
        setProductsArray(newObj);
        break;
      case "+-":
        newObj = productsArray.sort(compareValues('price', 'desc'));
        setProductsArray(newObj);
        break;
      case "AZ":
        newObj = productsArray.sort(compareValues('name'));
        setProductsArray(newObj);
        break;
      case "ZA":
        newObj = productsArray.sort(compareValues('name', 'desc'));
        setProductsArray(newObj);
        break;
      default:
        break;
    }
    setOrder(value);
  }
  function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  return (
    <div >
      <div className="md-bg-white uk-hidden@m" data-uk-sticky="offset: 64">
        <a className="uk-accordion-title" data-uk-toggle="target: #modal_categorias">Buscar Productos</a>
      </div>
      <div id="modal_categorias" data-uk-modal>
        <div className="uk-modal-dialog uk-margin-auto-vertical">
          <button className="uk-modal-close-default" type="button" data-uk-close></button>
          <div className="uk-modal-header">
            <h2 className="uk-modal-title">Buscar Productos</h2>
          </div>
          <div className="uk-modal-body">
            <ul className="uk-list">
              {categoriesArray.length && categoriesArray.map(item => (
                <li><a onClick={changeCategory(item.categoryId)}>{item.name}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="uk-grid-match" data-uk-grid data-uk-height-viewport="expand:true">
        <div className="uk-width-1-5@m uk-visible@m">
          <div className="uk-card uk-card-body md-bg-white">
            <h5>Nuestras Categorias</h5>
            <ul className="uk-list">
              {categoriesArray.length && categoriesArray.map(item => (
                selectedCategory.categoryId == item.categoryId ?
                  <li><Link to={`./${item.categoryId}`}> {"> " + item.name}</Link></li>
                  :
                  <li><Link to={`./${item.categoryId}`}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="uk-width-4-5@m">
          <div className="uk-padding-small">
            <h3 className="uk-text-left">{selectedCategory && selectedCategory.name}</h3>
            <div className="uk-grid-small uk-grid-match" data-uk-grid>
              <div className='uk-width-1-1'>
                <div className="uk-card uk-card-default uk-card-body">
                  <div className="uk-grid-small" data-uk-grid>
                    <div className="uk-text-left uk-width-1-2@s">
                      <p><strong>{productsArray.length}</strong> productos encontrados</p>
                    </div>
                    <div className="uk-text-right uk-width-1-2@s">
                      <p className="uk-margin-remove uk-text-left">Ordenar por:</p>
                      <div className="md-input-wrapper md-input-no-label md-input-dense">
                        <select className="md-input" onChange={orderBy} value={order}>
                          <option value="" disabled hidden selected></option>
                          <option value="AZ">A - Z (Nombre de producto)</option>
                          <option value="ZA">Z - A (Nombre de producto)</option>
                          <option value="new">Nuevo</option>
                          <option value="offer">En Oferta</option>
                          <option value="-+">Menor precio</option>
                          <option value="+-">Mayor Precio</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {productsArray.map(item => (
                <div className='uk-width-1-4@m uk-width-1-3@s'>
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Products;