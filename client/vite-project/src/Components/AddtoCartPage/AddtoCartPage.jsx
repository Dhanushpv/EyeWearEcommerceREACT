import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function AddtoCartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  
  // Extracting 'login' and 'id' from query params using useLocation
  const params = new URLSearchParams(location.search);
  const token_key = params.get("login"); 
  const id = params.get("id");          
  const userId = params.get("userId");  
  const token = localStorage.getItem(token_key);
  

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [error, setError] = useState(null);
 
  const IMAGE_BASE_URL = "http://localhost:3000/";

  useEffect(() => {
    CartLoad();
  }, []);

  useEffect(() => {
    updateTotal();
  }, [totalSubtotal, cartItems]);

  const CartLoad = async () => {
    const productId = params.get("productId");
    const userId = params.get("userId");  // Extract userId from URL
    const price = parseFloat(params.get("price"));
    const quantity = parseInt(params.get("quantity"), 10);

    if (!productId || !userId || isNaN(price) || isNaN(quantity) || quantity < 1) {
      alert("Invalid or missing product details.");
      return;
    }


    try {
      const cartResponse = await axios.get("http://localhost:3000/CartView");
      const existingCartItems = cartResponse.data.data || [];

      const cartData = {
        productId,
        userId,
        price,
        quantity:
          existingCartItems.find((item) => item.productId === productId)?.quantity || quantity,
      };

      const productResponse = await axios.get("http://localhost:3000/AllProducts");
      const updatedCartResponse = await axios.post("http://localhost:3000/addToCart", cartData);

      const updatedCartItems = updatedCartResponse.data.data.addCart.flatMap(
        (cart) => cart.items
      );
      const productList = productResponse.data.data;

      setProducts(productList);
      setCartItems(updatedCartItems);
      calculateSubtotal(updatedCartItems, productList);
    } catch (err) {
      console.error("Error loading cart:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const calculateSubtotal = (cartItems, productList) => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      const product = productList.find((p) => p._id === item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    });
    setTotalSubtotal(subtotal);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/removeFromCart/${productId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item.");
    }
  };

  const handleQuantityChange = async (item, product, increment) => {
    const newQuantity = item.quantity + increment;

    if (newQuantity < 0) return; // Prevent negative quantities

    // Optimistic UI update
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.productId === item.productId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    // Calculate new total subtotal
    const newTotalSubtotal = updatedCartItems.reduce(
      (sum, cartItem) => sum + cartItem.quantity * cartItem.price, 0
    );

    setCartItems(updatedCartItems);
    setTotalSubtotal(newTotalSubtotal);

    try {
      const response = await axios.post(`http://localhost:3000/updateCart/${userId}`, {
        productId: item.productId,  // Pass the productId correctly
        newQuantity: newQuantity,   // Use the new quantity
      });

      if (response.status === 200) {
        const updatedCart = response.data.data;
        // setCartItems(updatedCart.items);  // Update with the updated items
        // setTotalSubtotal(updatedCart.totalPrice);  // Update with the new total price
      } else {
        console.error("Failed to update quantity on the server:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const updateTotal = () => {

    let tax = totalSubtotal * 0.05; // Assuming 5% tax
    let shipping = 5.00; // Fixed shipping cost
    let total = totalSubtotal + tax + shipping;

    // Collect all product details for checkout
    const checkoutData = cartItems.map(item => ({
      productId: item.productId,
      userId: userId,
      quantity: item.quantity,
      price: products.find(product => product._id === item.productId)?.price || 0,
    }));

    console.log(`Total Subtotal: ${totalSubtotal}, Tax: ${tax}, Shipping: ${shipping}, Total: ${total}`);
    console.log("Checkout Data:", checkoutData);
  };

  const Checkout = (checkoutData, totalPrice) => {
    const params = new URLSearchParams(location.search);
    const id = params.get('userId');
    const token_key = params.get('login');
    const token = localStorage.getItem(token_key);
  
    // Encode the data
    const encodedCheckoutData = encodeURIComponent(JSON.stringify(checkoutData));
    const encodedTotalPrice = encodeURIComponent(totalPrice);
  
    // Proceed with navigation
    navigate(`/CheckoutPage?id=${encodeURIComponent(id)}&checkoutData=${encodedCheckoutData}&totalPrice=${encodedTotalPrice}`);
  };
  

  let SingleView = (productId) => {
    let params = new URLSearchParams(window.location.search);
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
    let userId = params.get('userId')

    navigate(`/SingleView/${productId}`, {
        state: {
            id: productId,
            userId,  // Pass the user ID here
            token
        }
    });
};

let handleSingleView = (productId) => {
    SingleView(productId);
};

  return (
    <>
    <nav className="p-3 /* bg-white not found */">
                {/* <div class="bg-dark text-white text-center fw-light ">FREE SHIPPING ON ORDERS OVER $75</div> */}
                <div className="flex justify-between /* align-item-center not found */ /* container-lg not found */">
                    <div className="text-center /* line not found */">
                        <span className="/* logo_sub1 not found */">NO</span>
                        <span className="/* logo_sub1 not found */">VA</span>
                    </div>
                    <div className="pt-7 flex justify-between /* align-item-center not found */ px-5">
                        <div className="px-3">
                            <span className="">All Products</span>
                        </div>
                        <div className="px-3">
                            <span className="">New Arrivals</span>
                        </div>
                        <div className="px-3">
                            <span className="">Sunglasses</span>
                        </div>
                        <div className="px-3">
                            <span className="">Eyeglasses</span>
                        </div>
                        <div className="px-3">
                            <span className="">About</span>
                        </div>
                        <div className="px-3">
                            <span className="">Gift Card</span>
                        </div>
                    </div>
                    {/* <div id="" class="pt-2 profile"></div>
              <div id="" class="pt-4 loginSection"></div> */}
                </div>
            </nav>
      <div id="Cart_Container">
        <div id="cart-items">
          {cartItems.map((item) => {
            const product = products.find((p) => p._id === item.productId);
            if (!product) return null;
            const imageUrl = `${IMAGE_BASE_URL}${product.images?.[3]?.url || "placeholder.jpg"}`;

            return (
              <div key={item.productId} className="cart-item">
                <div className="container mx-auto px-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
                  <section id="cart">
                    <article className="product">
                      <header>
                        <img src={imageUrl} alt={product.title} onClick={() => handleSingleView(product._id)}/>
                      </header>
                      <div className="content">
                        <h1>{product.title}</h1>
                        <h3>{product.description?.slice(0, 200)}...</h3>
                      </div>
                      <footer className="content">
                        <div className="quantity-controls">
                          <button className="qt-minus" onClick={() => handleQuantityChange(item, product, -1)}>-</button>
                          <span className="qt">{item.quantity}</span>
                          <button className="qt-plus" onClick={() => handleQuantityChange(item, product, 1)}>+</button>
                        </div>
                        <span className="remove-text" onClick={() => removeFromCart(item.productId)}>Remove</span>
                        <h2 className="full-price">${(product.price * item.quantity).toFixed(2)}</h2>
                      </footer>
                    </article>
                  </section>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <footer id="site-footer">
        <div className="container clearfix">
          <div className="left">
            <h2 className="subtotal">Subtotal: <span>{totalSubtotal.toFixed(2)}€</span></h2>
            <h3 className="tax">Taxes (5%): <span>{(totalSubtotal * 0.05).toFixed(2)}€</span></h3>
            <h3 className="shipping">Shipping: <span>5.00€</span></h3>
          </div>
          <div className="right">
            <h1 className="total">Total: <span>{(totalSubtotal * 1.05 + 5).toFixed(2)}€</span></h1>
            {/* Updated to pass checkoutData and totalPrice properly */}
            <button className="btn1" onClick={() => Checkout(cartItems, (totalSubtotal * 1.05 + 5).toFixed(2))}>
              Checkout
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AddtoCartPage;
