
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderItems() {
    let params = new URLSearchParams(window.location.search);
    let userId = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
    const [orders, setOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from the server
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/orderItems/${userId}`);
                setOrders(response.data.orders);
                const filteredOrdersData = response.data.orders.products; // Initialize filtered orders
                setFilteredOrders(filteredOrdersData);
                console.log("responsefilteredOrdersData", filteredOrdersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        // Fetch all products from the allProducts API
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/allProducts');
                setAllProducts(response.data.data); // Assuming 'data' contains the list of products
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };

        fetchOrders();
        fetchAllProducts();
    }, [userId]);



    const getProductDetails = (productId) => {
        // Find the matching product from allProducts based on the productId
        return allProducts.find(product => product._id === productId);
    };
    


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
<div className="max-w-4xl mx-auto h-full">
    
            {/* <div className="flex items-center mb-4">
                <input
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                    placeholder="Search your orders here"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Search Orders
                </button>
            </div> */}

            {filteredOrders.map((order) => {
                const productDetails = getProductDetails(order.productId);
                if (!productDetails) return null; // Skip if no matching product

                return (
                    <div key={order.id} className="bg-white p-4 rounded-md shadow-md mb-4 flex items-center">
                        {/* Fallback if no image is available */}
                        <img
                            alt={productDetails.title || "Product image"}  // Fallback alt text
                            className="w-20 h-20 object-cover"  // Adjust the width and height as needed
                            height={100}
                            src={`http://localhost:3000/${productDetails.images[0]?.url || ""}`}
                            width={100}
                        />
                        <div className="ml-4 flex-grow">
                            <h2 className="text-lg font-semibold">{productDetails.title}</h2>
                            {/* <p className="text-gray-600">Color: {productDetails.color}</p> */}
                            {productDetails.size && <p className="text-gray-600">Size: {productDetails.size}</p>}
                        </div>
                        <div className="text-right">
                            {/* Extracting purchaseDate, status, and message from the order */}
                            <p className="text-lg font-semibold">{productDetails.price}</p>
                            <p
                                className={order.status === "Delivered" ? "text-green-600" : "text-green-600"}
                            >
                                ● {order.status} on {new Date(order.purchaseDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">{order.message}</p>
                            {order.reviewable && (
                                <a className="text-blue-600" href="#review">
                                    <i className="fas fa-star"></i> Rate &amp; Review Product
                                </a>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
        
        </>
    );
   
}

export default OrderItems;
