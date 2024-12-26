

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function GoToCart() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting 'login' and 'id' from query params using useLocation
  const params = new URLSearchParams(location.search);
  const token_key = params.get("login");
  const userId = params.get("id");
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
  }, [cartItems]);

  const CartLoad = async () => {
    try {
      // Fetch the cart items for the specific user
      const cartResponse = await axios.get(`http://localhost:3000/gotoCart/${userId}`);
      const updatedCartItems = cartResponse.data.cartItems || [];

      console.log("cartResponse", updatedCartItems);

      setProducts(updatedCartItems);
      setCartItems(updatedCartItems);
      calculateSubtotal(updatedCartItems);
    } catch (err) {
      console.error("Error loading cart:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const calculateSubtotal = (cartItems) => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    setTotalSubtotal(subtotal);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/removeFromCart/${userId}`, {
        data: { productId }, // Pass the productId in the request body
      });

      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item.");
    }
  };

  const handleQuantityChange = async (item, increment) => {
    const newQuantity = item.quantity + increment;

    if (newQuantity <= 0) return; // Prevent negative quantities

    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.productId === item.productId ? { ...cartItem, quantity: newQuantity } : cartItem
    );

    setCartItems(updatedCartItems);
    setTotalSubtotal(updatedCartItems.reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0));

    try {
      const response = await axios.post(`http://localhost:3000/updateCart/${userId}`, {
        productId: item.productId,
        newQuantity,
      });

      if (response.status !== 200) {
        console.error("Failed to update quantity on the server:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
    console.log("Item ID:", item.productId);
    
  };



  const updateTotal = () => {
    let tax = totalSubtotal * 0.05; // Assuming 5% tax
    let shipping = 5.0; // Fixed shipping cost
    let total = totalSubtotal + tax + shipping;

    console.log(`Total Subtotal: ${totalSubtotal}, Tax: ${tax}, Shipping: ${shipping}, Total: ${total}`);
  };

  const Checkout = (checkoutData, totalPrice) => {
    const encodedCheckoutData = encodeURIComponent(JSON.stringify(checkoutData));
    const encodedTotalPrice = encodeURIComponent(totalPrice);

    navigate(
      `/CheckoutPage?id=${encodeURIComponent(userId)}&checkoutData=${encodedCheckoutData}&totalPrice=${encodedTotalPrice}`
    );
  };

  const handleSingleView = (productId) => {
    navigate(`/SingleView/${productId}`, {
      state: {
        id: productId,
        userId,
        token,
      },
    });
  };

 
const [buyerProfile, setBuyerProfile] = useState(null);
const [productList, setProductList] = useState([]);
const [mensGlasses, setMensGlasses] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [isCanvasOpen, setIsCanvasOpen] = useState(false);



useEffect(() => {
  const loginSection = document.querySelector(".loginSection");
  if (!loginSection) {
      console.error("Error: loginSection element not found in the DOM.");
      return;
  }

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");
  console.log("isLoggedIn",isLoggedIn)
  console.log("userType",userType)


  if (isLoggedIn) {
      if (userType === "Buyer" || userType === "Seller" || userType === "Admin") {
          loginSection.innerHTML = `
              <button id="logoutButton" style="margin-left: 10px;">Logout</button>
          `;
          const logoutButton = document.getElementById("logoutButton");
          if (logoutButton) {
              logoutButton.addEventListener("click", logout);
          }
      } else {
          console.error("Error: Unknown user type.");
      }
  } else {
      loginSection.innerHTML = `
          <button id="loginButton" style="margin-right: 10px;">Login</button>/
          <button id="signUpButton">Sign Up</button>
      `;
      const loginButton = document.getElementById("loginButton");
      const signUpButton = document.getElementById("signUpButton");

      if (loginButton) loginButton.addEventListener("click", login);
      if (signUpButton) signUpButton.addEventListener("click", signUp);
  }

  // Fetch buyer section details and populate the UI
  buyerSection();
  mensglass();
}, []);

const signUp = () => {
  navigate("/Signin");
};

const login = () => {
  navigate("/Login");
};

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
  navigate("/"); // Redirect to the first page
};

const buyerSection = async () => {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let token_key = params.get("login");
  let token = localStorage.getItem(token_key) || "";

  try {
      if (id && token) {
          const response = await axios.get(`http://localhost:3000/individualUser/${id}`, {
              headers: {
                  Authorization: token,
              },
          });
          setBuyerProfile(response.data.data);
      }

      const productResponse = await axios.get("http://localhost:3000/allProducts");
      setProductList(productResponse.data.data); // Store all products
      setFilteredProducts(productResponse.data.data);         } catch (err) {
      setError("Unable to load product details. Please try again later.");
      console.error("Error fetching product details:", err);
  }
};
let SingleView = (productId) => {
  let params = new URLSearchParams(window.location.search);
  let token_key = params.get('login');
  let userId = params.get('id')
  let token = localStorage.getItem(token_key);


  navigate(`/SingleView/${productId}`, {
      state: {
          id: productId,
          userId,  // Pass the user ID here
          token
      }
  });
};



const mensglass = async () => {
  try {
      const response = await axios.get("http://localhost:3000/fetchMensglass");
      setMensGlasses(response.data.data);
  } catch (err) {
      console.error("Error fetching men's glasses:", err);
      setError("Unable to load men's glasses. Please try again later.");
  }
};

let AddtoCart = (productId, price, quantity) => {
  let params = new URLSearchParams(window.location.search);
  let token_key = params.get('login');
  let userId = params.get('id')
  let token = localStorage.getItem(token_key);
  console.log("productId", productId);
  navigate(`/AddtoCartPage?productId=${productId}&userId=${userId}&price=${price}&quantity=${quantity}`);
};

const handleMouseEnter = async () => {
  try {
      const response = await axios.get("http://localhost:3000/fetchMensglass");
      const lastThreeGlasses = response.data.data.slice(-3); // Get the last three items

      // Update the screenglasses container dynamically
      const screenglassesContainer = document.getElementById("screenglasses");

      screenglassesContainer.innerHTML = ""; // Clear previous content

      lastThreeGlasses.forEach((glass) => {
          const glassElement = document.createElement("div");
          glassElement.className = "flex items-center gap-3 mb-3";

          const imageUrl = glass.images[2]?.url?.replace(/\\/g, "/");
          glassElement.innerHTML = `
          
              <img
                  src="http://localhost:3000/${imageUrl}"
                  alt="${glass.images[0]?.alt || "Glass"}"
                  class="h-25 w-25 rounded-md"
              />
              <div >
                  <h4 class="font-semibold" >${glass.title}</h4>
                  <p class="text-sm text-gray-500">₹${glass.price}</p>
              </div>
          `;
          screenglassesContainer.appendChild(glassElement);
      });
  } catch (err) {
      console.error("Error fetching last added glasses:", err);
  }


  try {
      const response = await axios.get("http://localhost:3000/fetchMensglass");
      const lastThreeGlasses = response.data.data.slice(-3); // Get the last three items

      // Update the screenglasses container dynamically
      const screenglassesContainer = document.getElementById("kidsGlasses");

      screenglassesContainer.innerHTML = ""; // Clear previous content

      lastThreeGlasses.forEach((glass) => {
          const glassElement = document.createElement("div");
          glassElement.className = "flex items-center gap-3 mb-3";

          const imageUrl = glass.images[2]?.url?.replace(/\\/g, "/");
          glassElement.innerHTML = `
          
              <img
                  src="http://localhost:3000/${imageUrl}"
                  alt="${glass.images[0]?.alt || "Glass"}"
                  class="h-25 w-25 rounded-md"
              />
              <div >
                  <h4 class="font-semibold" >${glass.title}</h4>
                  <p class="text-sm text-gray-500">₹${glass.price}</p>
              </div>
          `;
          screenglassesContainer.appendChild(glassElement);
      });
  } catch (err) {
      console.error("Error fetching last added glasses:", err);
  }

  try {
      const response = await axios.get("http://localhost:3000/fetchMensglass");
      const lastThreeGlasses = response.data.data.slice(-3); // Get the last three items

      // Update the screenglasses container dynamically
      const screenglassesContainer = document.getElementById("ContactLenses");

      screenglassesContainer.innerHTML = ""; // Clear previous content

      lastThreeGlasses.forEach((glass) => {
          const glassElement = document.createElement("div");
          glassElement.className = "flex items-center gap-3 mb-3";

          const imageUrl = glass.images[2]?.url?.replace(/\\/g, "/");
          glassElement.innerHTML = `
          
              <img
                  src="http://localhost:3000/${imageUrl}"
                  alt="${glass.images[0]?.alt || "Glass"}"
                  class="h-25 w-25 rounded-md"
              />
              <div >
                  <h4 class="font-semibold" >${glass.title}</h4>
                  <p class="text-sm text-gray-500">₹${glass.price}</p>
              </div>
          `;
          screenglassesContainer.appendChild(glassElement);
      });
  } catch (err) {
      console.error("Error fetching last added glasses:", err);
  }

  try {
      const response = await axios.get("http://localhost:3000/fetchMensglass");
      const lastThreeGlasses = response.data.data.slice(-3); // Get the last three items

      // Update the screenglasses container dynamically
      const screenglassesContainer = document.getElementById("Sunglasses");

      screenglassesContainer.innerHTML = ""; // Clear previous content

      lastThreeGlasses.forEach((glass) => {
          const glassElement = document.createElement("div");
          glassElement.className = "flex items-center gap-3 mb-3";

          const imageUrl = glass.images[2]?.url?.replace(/\\/g, "/");
          glassElement.innerHTML = `
          
              <img
                  src="http://localhost:3000/${imageUrl}"
                  alt="${glass.images[0]?.alt || "Glass"}"
                  class="h-25 w-25 rounded-md"
              />
              <div >
                  <h4 class="font-semibold" >${glass.title}</h4>
                  <p class="text-sm text-gray-500">₹${glass.price}</p>
              </div>
          `;
          screenglassesContainer.appendChild(glassElement);
      });
  } catch (err) {
      console.error("Error fetching last added glasses:", err);
  }
  try {
      const response = await axios.get("http://localhost:3000/fetchMensglass");
      const lastThreeGlasses = response.data.data.slice(-3); // Get the last three items

      // Update the screenglasses container dynamically
      const screenglassesContainer = document.getElementById("Eyeglasses");

      screenglassesContainer.innerHTML = ""; // Clear previous content

      lastThreeGlasses.forEach((glass) => {
          const glassElement = document.createElement("div");
          glassElement.className = "flex items-center gap-3 mb-3";

          const imageUrl = glass.images[2]?.url?.replace(/\\/g, "/");
          glassElement.innerHTML = `
          
              <img
                  src="http://localhost:3000/${imageUrl}"
                  alt="${glass.images[0]?.alt || "Glass"}"
                  class="h-25 w-25 rounded-md"
              />
              <div >
                  <h4 class="font-semibold" >${glass.title}</h4>
                  <p class="text-sm text-gray-500">₹${glass.price}</p>
              </div>
          `;
          screenglassesContainer.appendChild(glassElement);
      });
  } catch (err) {
      console.error("Error fetching last added glasses:", err);
  }

};
const handleMouseLeave = () => {
  setIsHovering(false);
};


const handleSearchChange = async (event) => {
  const query = event.target.value.trim(); // Trim spaces
  setSearchQuery(query); // Update the state

  if (query === "") {
      setFilteredProducts(productList); // Reset if the query is empty
      return;
  }

  try {
      const response = await axios.get(`http://localhost:3000/search/${encodeURIComponent(query)}`); // Encode query
      ; // Update filtered products

      console.log("response",response)
      let data = response.data
      console.log("data",data)
      setFilteredProducts(data)

  } catch (error) {
      console.error("Error searching products:", error);
      setFilteredProducts([]); // Clear results on error
  }
};


const handleClickAcoount = ()=>{
  navigate(`/BuyerAccount?login=${token_key}&id=${userId}`)
}

const handleClickMebership = ()=>{
  navigate(`/Mebership?login=${token_key}&id=${userId}`)
}
let isRequestInProgress = false;
async function wishList(productId, title, price) {
  if (isRequestInProgress) return; // Prevent multiple API calls
  isRequestInProgress = true;

  try {
      console.log("Toggling wishlist:", productId, title, price);

      // Extract userId and token from the query parameters
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('id');
      const token_key = params.get('login');

      // Validate required parameters
      if (!userId || !token_key) {
          alert('User not logged in. Please log in to add items to the wishlist.');
          return;
      }

      // Retrieve token from localStorage
      const token = localStorage.getItem(token_key);
      if (!token) {
          alert('Authorization token not found. Please log in again.');
          return;
      }

      // Check the current status of the product in the wishlist
      const statusResponse = await axios.get(
          'http://localhost:3000/status',
          {
              params: {
                  userId,
                  productId,
              },
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          }
      );

      // Handle response based on wishlist status
      const isInWishlist = statusResponse.data.isInWishlist;

      // Make the API call to either add or remove the product from wishlist
      const actionResponse = await axios.post(
          'http://localhost:3000/addtowishlist',
          {
              productId,
              title,
              price,
              userId,
              action: isInWishlist ? 'remove' : 'add', // Determine whether to add or remove
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`, // Include token
              },
          }
      );

      // Handle successful response
      if (actionResponse.data.success) {
          alert(isInWishlist ? 'Item removed from the wishlist!' : 'Item successfully added to the wishlist!');
          console.log('Wishlist action response:', actionResponse.data);

          // Update the icon's color based on whether the item is in the wishlist
          const icon = document.querySelector(`#wishlist-icon-${productId}`);
          if (icon) {
              icon.style.color = isInWishlist ? 'initial' : 'red'; // Red if added to wishlist
              icon.title = isInWishlist ? 'Add to Wishlist' : 'Added to Wishlist'; // Tooltip
          }
      }
  } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert(error.response?.data?.message || 'Error toggling item in wishlist.');
  } finally {
      isRequestInProgress = false;
  }
}



const CartClick = ()=>{
  navigate(`/GoToCart?login=${token_key}&id=${userId}`)
}


  return (
    <>
                <nav className="pb-3">
                    <div className="bg-gray-800 text-center">
                        FREE SHIPPING ON ORDERS OVER $75
                    </div>
                    <div className="flex  items-center container pt-3">
                        <div className="text-center">
                            <span className="logo_sub1">NO</span>
                            <span className="logo_sub1">VA</span>
                        </div>
                        <div className="flex  items-center">
                            <div className="flex w-full md:w-auto items-center px-2">

                            <div className="relative group px-3" >
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange} // Update query
                            onFocus={() => setIsCanvasOpen(true)} // Show canvas on focus
                            onBlur={() => setIsCanvasOpen(false)} // Optional: Hide on blur
                            className="p-2 border bg-white border-gray-300 rounded-md"
                        />
                    </div>

                            <div className="relative group px-2 b"onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <span className=" cursor-pointer  border-blue-500">Eyeglasses</span>
                            <div id="Eyeglasses"
                                className="absolute hidden z-40 group-hover:block bg-slate-200 p-3 shadow-md w-3/4  border-green-500 rounded-lg"
                                style={{ top: '100%', left: 0 , width: "50vw "}}

                            >
                                
                                All Products Submenu
                            </div>
                            </div>
                            
                            <div className="relative group px-2 b"onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <span className=" cursor-pointer  border-blue-500">Screen Glasses</span>
                            <div id="screenglasses"
                                className="absolute hidden z-40 group-hover:block bg-slate-200 p-3 shadow-md w-3/4  border-green-500 rounded-lg"
                                style={{ top: '100%', left: -96 , width: "50vw "}}

                            >
                                
                                All Products Submenu
                            </div>
                            </div>

                            

                            <div className="relative group px-2 b" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <span className=" cursor-pointer  border-blue-500">Kids Glasses</span>
                            <div id="kidsGlasses"
                                className="absolute hidden z-40 group-hover:block bg-slate-200 p-3 shadow-md w-3/4  border-green-500 rounded-lg"
                                style={{ top: '100%', left: -218 , width: "50vw "}}

                            >
                               New Arrivals Submenu
                            </div>
                            </div>


                            <div className="relative group px-2 b" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <span className=" cursor-pointer  border-blue-500">Contact Lenses</span>
                            <div id="ContactLenses"
                                className="absolute hidden z-40 group-hover:block bg-slate-200 p-3 shadow-md w-3/4  border-green-500 rounded-lg"
                                style={{ top: '100%', left: -326 , width: "50vw "}}

                            >
                               New Arrivals Submenu
                            </div>
                            </div>


                            <div className="relative group px-2 b" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <span className=" cursor-pointer  border-blue-500">Sunglasses</span>
                            <div id="Sunglasses"
                                className="absolute hidden z-40 group-hover:block bg-slate-200 p-3 shadow-md w-3/4  border-green-500 rounded-lg"
                                style={{ top: '100%', left: -454 , width: "50vw "}}

                            >
                               New Arrivals Submenu
                            </div>
                            </div>

                                <div className="px-2 relative">
                                    <span className="hover:underline cursor-pointer">About</span>
                                    <div className="offcanvas-menu">About Submenu</div>
                                </div>
                                <div className="px-2 relative">
                                    <span className="hover:underline cursor-pointer">Gift Card</span>
                                    <div className="offcanvas-menu">Gift Card Submenu</div>
                                </div>
                            </div>
                            <div className="pt-2">
                            {buyerProfile ? (
                                <div className="text-center dropdown">
                                    <button className="dropbtn" aria-haspopup="true" role="button">
                                        <span className="text-break">
                                            <strong>Hello,</strong> {buyerProfile.name}
                                        </span>
                                        <br />
                                        <span>
                                            <strong>Account & Lists</strong>
                                        </span>
                                    </button>
                                    <div className="dropdown-content pt-3" role="menu" style={{ textAlign: "left" }}>
                                        <span onClick={handleClickAcoount} className="dropdown-item pt-3" tabIndex="0">
                                            Your Account
                                        </span>

                                        <span onClick={handleClickMebership} className="dropdown-item pt-3 pb-3" tabIndex="0">Memberships & Subscriptions</span>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                            <div className="loginSection"> <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                // Clear the token from localStorage
                                                let params = new URLSearchParams(window.location.search);
                                                let token_key = params.get('login');
                                                localStorage.removeItem(token_key);

                                                // Navigate to the login page
                                                navigate('/');
                                            }}
                                        >
                                            Logout
                                        </button>
                            </div>
                            <div onClick={CartClick} className="px-3"><img className="w-24 h-24" style={{ width: "30px", height:"30px" }} src="https://img.icons8.com/?size=100&id=NUcpUMIcTSZ3&format=png&color=000000" alt="" /></div>
                        </div>
                    </div>
                </nav>

                <div
        className="z-40 "
        style={{
            position: "fixed",
            left: 0,
            width: "500px",
            height: "100%",
            backgroundColor: "white",
            boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            transform: isCanvasOpen ? "translateX(0)" : "translateX(-100%)", // Slide in/out from left
            transition: "transform 0.3s ease-in-out",
        }}
        
    >
        <h2>Search Results</h2>
        <ul>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <li key={product._id} className="mb-3">
                        <div onClick={() => handleSingleView(product._id)} className="cursor-pointer flex items-center gap-3">
                            <img
                                src={`http://localhost:3000/${product.images[2]?.url?.replace(/\\/g, "/")}`}
                                alt={product.title}
                                className="h-20 w-20 rounded-md"
                            />
                            <div>
                                <h4 className="font-semibold">{product.title}</h4>
                                <p className="text-sm text-gray-500">₹{product.price}</p>
                            </div>
                        </div>
                    </li>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </ul>
    </div>
      <div id="Cart_Container">
        <div id="cart-items">
          {cartItems.map((item) => {
            const imageUrl = `${IMAGE_BASE_URL}${item.productId.images?.[3]?.url || "placeholder.jpg"}`;
            console.log("item.productId",item.productId)
            return (
              <div key={item.productId} className="cart-item">
                <div className="container mx-auto px-4">
                  <section id="cart">
                    <article className="product">
                      <header>
                        <img src={imageUrl} alt={item.productId.title} onClick={() => handleSingleView(item.productId)} />
                      </header>
                      <div className="content">
                        <h1>{item.productId.title}</h1>
                        <h3>{item.productId.description?.slice(0, 200)}...</h3>
                      </div>
                      <footer className="content">
                        <div className="quantity-controls">
                          <button className="qt-minus" onClick={() => handleQuantityChange(item, -1)}>
                            -
                          </button>
                          <span className="qt">{item.quantity}</span>
                          <button className="qt-plus" onClick={() => handleQuantityChange(item, 1)}>
                            +
                          </button>
                        </div>
                        <span className="remove-text" onClick={() => removeFromCart(item.productId.productId)}>
                          Remove
                        </span>
                        <h2 className="full-price">${(item.price * item.quantity).toFixed(2)}</h2>
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
            <button
              className="btn1"
              onClick={() => Checkout(cartItems, (totalSubtotal * 1.05 + 5).toFixed(2))}
            >
              Checkout
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default GoToCart;
