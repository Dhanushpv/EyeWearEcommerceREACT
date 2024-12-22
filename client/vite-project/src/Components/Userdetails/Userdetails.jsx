

import React, { useEffect, useState } from "react";

function Userdetails() {
  let params = new URLSearchParams(window.location.search);
  let token_key = params.get("login");
  let userId = params.get("id");
  let token = localStorage.getItem(token_key);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [buyNowItems, setBuyNowItems] = useState([]);
  const [addresses, setAddresses] = useState([]);

  // Fetch data from server
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartResponse = await fetch(`http://localhost:3000/singleuserCartitems/${userId}`);
        const cartData = await cartResponse.json();

        const productsResponse = await fetch('http://localhost:3000/Allproducts');
        const allProducts = await productsResponse.json();
        const productdata = allProducts.data;

        const cartItems = cartData.cartItems.flatMap(cartItem => cartItem.items);

        const matchedCartItems = cartItems.map(cartItem => {
          const product = productdata.find(p => p._id === cartItem.productId);
          return { ...cartItem, product };
        });

        setCartItems(matchedCartItems);
      } catch (error) {
        console.error('Error fetching cart items or products:', error);
      }
    };

    const fetchWishlistItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/singleuserwishlist/${userId}`);
        const wishlistdata = await response.json();
        // console.log("data",wishlistdata)
        let data = wishlistdata.wishlist;

        // Ensure the response is an array
        const matchedWishlistItems = Array.isArray(data) ? data : [];

        const productsResponse = await fetch('http://localhost:3000/Allproducts');
        const allProducts = await productsResponse.json();
        const productdata = allProducts.data;
        // console.log("productdata",productdata)


        const enrichedWishlistItems = matchedWishlistItems.map(item => {
          const product = productdata.find(p => p._id === item.productId);
          return {  product }; // Match with product data
        });

        setWishlistItems(enrichedWishlistItems);
        // console.log("enrichedWishlistItems",enrichedWishlistItems)

      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    const fetchBuyNowItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/singleuserbuyNow/${userId}`);
        const responsedata = await response.json();
        let data =responsedata.buyNow
        // console.log(data)



        // Ensure the response is an array
        const matchedBuyNowItems = Array.isArray(data.products) ? data.products        : [];
        // console.log(matchedBuyNowItems)


        const productsResponse = await fetch('http://localhost:3000/Allproducts');
        const allProducts = await productsResponse.json();
        const productdata = allProducts.data;


        const enrichedBuyNowItems = matchedBuyNowItems.map(item => {
          const product = productdata.find(p => p._id === item.productId);
          return { ...item, product };
        });

        setBuyNowItems(enrichedBuyNowItems);
        // console.log(enrichedBuyNowItems)


      } catch (error) {
        console.error('Error fetching buy now items:', error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/singleuseraddress/${userId}`);
        const data = await response.json();
        console.log(data)

        // Ensure the response is an array
        setAddresses(Array.isArray(data.address) ? data.address: []);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    // Call all functions concurrently
    fetchCartItems();
    fetchWishlistItems();
    fetchBuyNowItems();
    fetchAddresses();
  }, [userId, token_key]);

  return (
    <div className="bg-zinc-100 h-full">
      <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
        <div className="flex items-center justify-between py-2 text-5x1">
          <div className="font-bold text-blue-900 text-xl">
            Seller<span className="text-orange-600">Panel</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-36 container">
        {/* Cart Items */}
        <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
        <div className="flex gap-3 flex-wrap justify-center">
          {cartItems.map((item) => (
            <div className="card1" key={item.product._id}>
              <div className="card-img1">
                <img
                  src={`http://localhost:3000/${item.product.images[0].url}`}
                  alt={item.product.title}
                  style={{
                    width: "100%",
                    height: "25vh",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div className="card-info1">
                <p className="text-title">{item.product.title.slice(0, 20) + "..."}</p>
                <p className="text-body">{item.product.description.slice(0, 20) + "..."}</p>
                <span className="text-title">{item.product.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Items */}
        <h2 className="text-2xl font-bold mb-4 mt-10">Wishlist Items</h2>
        <div className="flex gap-3 flex-wrap justify-center">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <div className="card1" key={item._id}>
                <div className="card-img1">
                  <img
                    src={`http://localhost:3000/${item.product.images[0].url}`}
                    alt={item.product.title}
                    style={{
                      width: "100%",
                      height: "25vh",
                      borderRadius: "20px",
                    }}
                  />
                </div>
                <div className="card-info1">
                  <p className="text-title">{item.product.title.slice(0, 20) + "..."}</p>
                  <p className="text-body">{item.product.description.slice(0, 20) + "..."}</p>
                  <span className="text-title">{item.product.price}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No wishlist items available</p>
          )}
        </div>

        {/* Buy Now Items */}
        <h2 className="text-2xl font-bold mb-4 mt-10">Orders</h2>
        <div className="flex gap-3 flex-wrap justify-center">
          {buyNowItems.length > 0 ? (
            buyNowItems.map((item) => (
              <div className="card1" key={item._id}>
                <div className="card-img1">
                  <img
                    src={`http://localhost:3000/${item.product.images[0].url}`}
                    alt={item.product.title}
                    style={{
                      width: "100%",
                      height: "25vh",
                      borderRadius: "20px",
                    }}
                  />
                </div>
                <div className="card-info1">
                  <p className="text-title">{item.product.title.slice(0, 20) + "..."}</p>
                  <p className="text-body">{item.product.description.slice(0, 20) + "..."}</p>
                  <span className="text-title">{item.product.price}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No buy now items available</p>
          )}
        </div>

        {/* Address Section */}
        <h2 className="text-2xl font-bold mb-4 mt-10">Address</h2>
        <div>
          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <div className="flex  flex-row">
              <div key={index} className="mb-4">
                <p className="text-title">{address.firstName}</p>
                <p className="text-body">{address.flatDetails}</p>
                <p className="text-body">{address.streetDetails}</p>
                <p className="text-body">{address.landmark}</p>
                <p className="text-body">{address.city}</p>
              </div>
              </div>
              
            ))
          ) : (
            <p>No address data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Userdetails;
