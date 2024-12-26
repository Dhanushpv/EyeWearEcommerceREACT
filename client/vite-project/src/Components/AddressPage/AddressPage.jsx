
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function AddressPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    flatDetails: "",
    streetDetails: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [addresses, setAddresses] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddAddressClick = () => {
    setShowForm(!showForm);
    setMessage("");
  };

  const hideForm = () => {
    setShowForm(false);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addAddress();
      setMessage("Address added successfully!");
      setFormData({
        fullName: "",
        flatDetails: "",
        streetDetails: "",
        landmark: "",
        city: "",
        pincode: "",
        state: "",
      });
      setShowForm(false);
    } catch (error) {
      setMessage("Failed to add address. Please try again.");
      console.error("Error adding address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function addAddress() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let token_key = params.get("login");
    let token = localStorage.getItem(token_key);

    if (!id) {
      alert("User ID is missing!");
      return;
    }

    try {
      let data = {
        firstName: formData.fullName,
        flatDetails: formData.flatDetails,
        streetDetails: formData.streetDetails,
        landmark: formData.landmark,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
      };

      let response = await fetch(`http://localhost:3000/addAddress/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      let parsed_Response = await response.json();

      if (response.ok) {
        alert("Address successfully added");
        hideForm();
        addressLoad(); // Reload addresses after adding a new one
      } else {
        alert(parsed_Response.message || "Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("An error occurred while adding the address.");
    }
  }

  async function addressLoad() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let token_key = params.get("login");
    let token = localStorage.getItem(token_key);

    try {
      let AddressFetch = await fetch(`http://localhost:3000/addAddressLoad/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const parsed_data = await AddressFetch.json();
      setAddresses(parsed_data.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  }

  useEffect(() => {
    addressLoad();
  }, []);


  let params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  let token_key = params.get('login');
  let token = localStorage.getItem(token_key);


  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [buyerProfile, setBuyerProfile] = useState(null);

  const [error, setError] = useState("");
  const [mensGlasses, setMensGlasses] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  useEffect(() => {
      async function fetchUserDetails() {
          let params = new URLSearchParams(window.location.search);
          let id = params.get('id');
          let token_key = params.get('login');
          let token = localStorage.getItem(token_key);

          try {
              const response = await axios.get(`http://localhost:3000/individualUser/${id}`, {
                  headers: {
                      "Authorization": token,
                  },
              });

              const userData = response.data.data;
              setUser(userData);

              const productResponse = await axios.get(`http://localhost:3000/fullProductList/${id}`);
              setProductList(productResponse.data.data || []);
              setFilteredProducts(productResponse.data.data); 
              setLoading(false);
          } catch (error) {
              console.error("Error fetching data:", error);
              setError("Failed to load user details or product list.");
              setLoading(false);
          }
      }

      fetchUserDetails();
  }, []);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>{error}</div>;
  }

  // Function to navigate to SingleView page with necessary data
  let SingleView = (productId) => {
      let params = new URLSearchParams(window.location.search);
      let token_key = params.get('login');
      let token = localStorage.getItem(token_key);
      

      navigate(`/SingleView/${productId}`, {
          state: {
              id: productId,
              userId: user._id,  // Pass the user ID here
              token
          }
      });
  };

  let handleSingleView = (productId) => {
      SingleView(productId);
  };
  let MyAcount = () => {
      navigate(`/AcountPage?login=${token_key}&id=${id}`);
  };

  let AddtoCartpage = (productId, price, quantity) => {
      console.log("productId", productId);
      navigate(`/AddtoCartPage?productId=${productId}&userId=${id}&price=${price}&quantity=${quantity}`);
  };

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

  return (
    <>
    <div className="bg-gray-800 text-center">
                        FREE SHIPPING ON ORDERS OVER $75
                    </div>
            <nav className="pb-3 flex justify-center items-center">
                   
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
                            {user && (
                        <div className="profile">
                            <div className="dropdown">
                                <button className="dropbtn" aria-haspopup="true" role="button">
                                    <span className="text-break"><strong>Hello,</strong> {user.name}</span><br />
                                    <span><strong>Account & Lists</strong></span>
                                </button>
                                <div className="dropdown-content text-left">
                                    <span onClick={MyAcount} className="dropdown-item">
                                        Your Account
                                    </span>
                                    <span onClick={() => alert('Your Orders clicked')} className="dropdown-item">
                                        Your Orders
                                    </span>
                                    <span onClick={() => alert('Your Wish List clicked')} className="dropdown-item">
                                        Your Wish List
                                    </span>
                                    <span onClick={() => alert('Your Seller Account clicked')} className="dropdown-item">
                                        Your Seller Account                                    </span>
                                    <span onClick={() => alert('Memberships clicked')} className="dropdown-item">
                                        Memberships & Subscriptions
                                    </span>

                                    <div className="p-3 loginSection">
                                        <button
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
                                </div>
                            </div>
                        </div>
                    )}
                    
                            </div>
                            <div className="loginSection"></div>
                            <div className="pt-2">
                            <div onClick={AddtoCartpage} className="px-3"><img className="w-24 h-24" style={{ width: "30px", height:"30px" }} src="https://img.icons8.com/?size=100&id=NUcpUMIcTSZ3&format=png&color=000000" alt="" /></div>
                    </div>
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
      <div>

        <div className="flex">
          <div className="bg-zinc-100 w-1/4">
            {<div className="flex min-h-screen w-[250px] flex-col bg-gray-900 pt-10">
              <ul className="flex w-0  flex-col gap-0 px-3">
                <li onClick={() => Your_Account()} className="pt-4">
                  <span className=" flex items-center justify-start gap-2 rounded-full bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-200 ring-offset-2 ring-offset-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Your Orders
                  </span>
                </li>
                <li className="pt-4">
                  <span className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Login & Security
                  </span>
                </li>
                <li className="pt-4">
                  <span className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Seller Dashboard
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => AddPageClick()}
                  >
                    Add Products
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => AddressPageClick()}
                  >
                    Your Addresses
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => WishListPageClick()}
                  >
                    Your Wish List
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => PaymentPageClick()}
                  >
                    Payment options
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  //   onClick={}
                  >
                    Contact Us
                  </span>
                </li>
              </ul>
             

            </div>}
          </div>
          <div className="w-full bg-slate-200">
            <div className="px-10 pt-10 flex gap-5">
              {!showForm ? (
                <div
                  className="bg-white box-content border-dashed h-auto w-52 p-4 border-3 rounded-lg border-neutral-700 place-items-center"
                  onClick={handleAddAddressClick}
                >
                  <div className="py-56 flex  items-center justify-center place-items-center">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>
                    <div className="text-xl">Add Address</div>
                  </div>
                </div>
              ) : (
                <div className="container mx-auto">
                  <button className=" top-0 right-0 m-3 text-lg" onClick={hideForm}>
                    &times;
                  </button>
                  <h2 className="text-center mb-4">Add New Address</h2>
                  <form
                    className="p-4 border rounded bg-gray-200 shadow-sm w-full"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="flatDetails" className="form-label">
                        Flat Details
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="flatDetails"
                        value={formData.flatDetails}
                        onChange={handleInputChange}
                        placeholder="Flat Details"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="streetDetails" className="form-label">
                        Street Details
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="streetDetails"
                        value={formData.streetDetails}
                        onChange={handleInputChange}
                        placeholder="Street Details"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="landmark" className="form-label">
                        Landmark
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        placeholder="Landmark"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded-md"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Add Address"}
                    </button>
                  </form>
                </div>
              )}

              {/* Addresses Section */}
              {!showForm && (
                <div id="loadAddresspage" className="flex flex-wrap gap-5">
                  {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <div
                        key={index}
                        className="bg-white border-dashed h-auto w-full md:w-1/3 lg:w-1/4 p-4 border-3 rounded-lg border-neutral-700 shadow-md"
                      >
                        <div className="text-base text-cyan-400 text-center bg-cyan-700 p-2 rounded-md">
                          {address.firstName}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          FlatDetails: {address.flatDetails}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          Landmark: {address.landmark}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          City: {address.city}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          State: {address.state}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          Pincode: {address.pincode}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No addresses found.</p>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressPage;
