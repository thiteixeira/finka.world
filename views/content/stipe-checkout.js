import React, { useState, useEffect } from "react";
import "./App.css";

// Stripe Checkout Display fnc
const ProductDisplay = () => (
  <section>
    // placeholder img
    <div className="product">
      <img src="https://i.imgur.com/EHyR2nP.png" alt="The cupboard is full" />
      <h3>Cupboard is Full</h3>
      <h5>$25</h5>
    </div>
    {/* redirect and checkout form/button */}
    <form action="/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    //test complete
    if (query.get("success")) {
      console.log("Order Placed!");
    }
    // test incomplete
    if (query.get("canceled")) {
      console.log("Order Canceled");
    }
  }, []);
}

// return message and Checkout
return message ? <Message message={message} /> : <ProductDisplay />;
