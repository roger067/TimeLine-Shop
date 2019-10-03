import React, { useState, useEffect } from "react";
import api from "../service/api";
import TimeLine from "./TimeLine";
import "../assets/style.css";

const App = props => {
  const [shopState, setShopState] = useState({ shop: [] });

  const formatProduct = product => {
    let productFormatted = {};
    productFormatted.name =
      product[product.findIndex(x => x.key === "product_name")].value;
    productFormatted.price =
      product[product.findIndex(x => x.key === "product_price")].value;
    return productFormatted;
  };
  useEffect(async () => {
    const response = await api.get();
    console.log(response);
    let arrayCorrigido = [];
    response.data.events.forEach(event => {
      const transactionIdIndex = event.custom_data.findIndex(
        x => x.key === "transaction_id"
      );
      const transaction_id = event.custom_data[transactionIdIndex].value;
      const arrayIndex = arrayCorrigido.findIndex(
        x => x.transaction_id === transaction_id
      );

      let store_name, product;

      if (event.custom_data.findIndex(x => x.key === "store_name") === -1) {
        product = formatProduct(event.custom_data);
      } else {
        store_name =
          event.custom_data[
            event.custom_data.findIndex(x => x.key === "store_name")
          ].value;
      }
      if (arrayIndex === -1) {
        let products = [];
        if (product !== undefined && product != null && product !== {}) {
          products.push(product);
        }
        store_name && store_name.length
          ? arrayCorrigido.push({
              created_on: event.timestamp,
              total_price: event.revenue,
              transaction_id,
              products,
              store_name
            })
          : arrayCorrigido.push({
              created_on: event.timestamp,
              total_price: event.revenue,
              transaction_id,
              products
            });
      } else {
        let productListing = arrayCorrigido[arrayIndex];
        if (product !== undefined && product != null && product !== {}) {
          productListing.products.push(product);
        }
        if (!productListing.store_name && store_name && store_name.length) {
          productListing.store_name = store_name;
        }
        if (!productListing.total_price && event.revenue) {
          productListing.total_price = event.revenue;
        }
        arrayCorrigido[arrayIndex] = productListing;
      }
    });
    setShopState({ shop: arrayCorrigido.reverse(shopState) });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <TimeLine data={shopState.shop} />
        </div>
      </div>
    </div>
  );
};

export default App;
