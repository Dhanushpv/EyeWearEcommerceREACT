


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SingleView() {
    
    const location = useLocation();
    const navigate = useNavigate();
    const { id: productId, userId, token } = location.state || {};
    const [productDetails, setProductDetails] = useState(null);
    const [images, setImages] = useState([]);
    const [expandedImage, setExpandedImage] = useState('');
    const [expandedImageText, setExpandedImageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);  // Quantity state for the product
    const [totalPrice, setTotalPrice] = useState(0);  // Total price for the product

    // Fetch product and user details
    const fetchDetails = async () => {
        if (!productId || !userId) {
            setError('Product ID or User ID is missing.');
            return;
        }

        try {
            setLoading(true);

            // Fetch product details
            const productResponse = await fetch(`http://localhost:3000/SingleProductList/${productId}`);
            if (!productResponse.ok) {
                throw new Error('Failed to fetch product details');
            }

            const productData = await productResponse.json();
            const product = productData.data;
            console.log(product)
            setProductDetails(product);

            if (Array.isArray(product.images)) {
                setImages(product.images);
                setExpandedImage(`http://localhost:3000/${product.images[0]?.url.replace(/\\/g, '/')}`);
                setExpandedImageText(product.images[0]?.alt || 'Image');
            }

            // Set initial total price based on quantity and product price
            setTotalPrice(product.price * quantity);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Failed to load details');
        } finally {
            setLoading(false);
        }
    };
    const fetchUserDetails=async()=> {
       
        try {
            const response = await axios.get(`http://localhost:3000/individualUser/${userId}`, {
                headers: {
                    "Authorization": token,
                },
            });

            const userData = response.data.data;
            setUser(userData);

            const productResponse = await axios.get(`http://localhost:3000/fullProductList/${userId}`);
            setProductList(productResponse.data.data || []);
            setFilteredProducts(productResponse.data.data); 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load user details or product list.");
            setLoading(false);
        }
    }

   
    
    useEffect(() => {
        fetchUserDetails();
        fetchDetails();
        
    }, [productId, userId, token, quantity]);

    const handleImageClick = (imgElement) => {
        setExpandedImage(`http://localhost:3000/${imgElement.url.replace(/\\/g, '/')}`);
        setExpandedImageText(imgElement.alt);
    };

    const handleImageHover = (imgElement) => {
        setExpandedImage(`http://localhost:3000/${imgElement.url.replace(/\\/g, '/')}`);
        setExpandedImageText(imgElement.alt);
    };

    const handleQuantityChange = (increment) => {
        const newQuantity = quantity + increment;
        if (newQuantity < 1) return;  // Prevent negative quantities

        setQuantity(newQuantity);
        setTotalPrice(productDetails.price * newQuantity);

        // Update quantity in backend
        updateQuantityOnBackend(newQuantity);
    };

    const updateQuantityOnBackend = async (newQuantity) => {
        try {
            const response = await axios.post(`http://localhost:3000/updateCart/${userId}`, {
                product: productId,
                newQuantity: newQuantity,
            });

            if (response.status === 200) {
                console.log("Quantity updated successfully");
            } else {
                console.error("Failed to update quantity on the server:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const Checkout = (productDetails, totalPrice) => {
   

        // Encode the data
        const encodedCheckoutData = encodeURIComponent(JSON.stringify(productDetails));
        const encodedTotalPrice = encodeURIComponent(totalPrice);

        // Proceed with navigation
        navigate(`/SingleChekout?id=${encodeURIComponent(userId)}&checkoutData=${encodedCheckoutData}&totalPrice=${encodedTotalPrice}&quantity=${quantity}`);
    };

    let AddtoCart = (productId, price, quantity) => {
       
        navigate(`/AddtoCartPage?productId=${productId}&userId=${userId}&price=${price}&quantity=${quantity}`);
    };

    let MyAcount = () => {
        navigate(`/AcountPage?login=${token_key}&id=${id}`);
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

 const [user, setUser] = useState(null);
    const [productList, setProductList] = useState([]);


    const [filteredProducts, setFilteredProducts] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
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
    
    let AddtoCartpage = () => {
        // console.log("productId", productId);
        navigate(`/AddtoCartPage`);
    };
    

    return (
       <>
       
       <div>
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
                                   
                                   
                                    <span  className="dropdown-item">
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
    </div>
       
       <div>
            {/* Product View Section */}
            <div className="flex flex-nowrap w-full">
                <div className="w-full sm:w-32 ">
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        images.map((img, idx) => (
                            <div className='p-2' key={idx}>
                                <img
                                    src={`http://localhost:3000/${img.url.replace(/\\/g, '/')}`}
                                    className="cursor-pointer"
                                    onClick={() => handleImageClick(img)}
                                    onMouseEnter={() => handleImageHover(img)}
                                />
                            </div>
                        ))
                    )}
                </div>

                <div className="w-full sm:w-3/4 p-2">
                    <div className="image_container flex justify-center items-center">
                        <img
                            className="w-full h-auto object-contain"
                            src={expandedImage || 'placeholder.jpg'}
                            alt={expandedImageText || 'Expanded Product'}
                        />
                    </div>
                    <div id="imgtext" className="text-center">{expandedImageText}</div>
                </div>

                <div className="w-full sm:w-1/2 p-2">
                    {productDetails && (
                        <>
                            <div className="text-6xl font-semibold">{productDetails.title || 'Title not available'}</div>
                            <div className="pt-7 text-3xl">💲{productDetails.price}</div>
                            <div className="pt-7 text-xl text-gray-500 font-semibold">{productDetails.brand}</div>
                            <div className="w-full pt-5">{productDetails.description}</div>
                            <div className="pt-7 text-lg text-gray-500 font-semibold">⭐ /{productDetails.rating}</div>
                            <div className="pt-7 text-lg text-green-500 font-semibold underline underline-offset-8">Available offers</div>
                            {/* Offers display */}
                            {/* <div className="pt-5" onClick={() => AddtoCart(productDetails._id, productDetails.price, 1)}>
                                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition">
                                    Add to Cart
                                </button>
                                
                            </div> */}
                        </>
                    )}
                </div>

                <div className="w-full sm:w-2/5 p-2">
                    <div className="p-4 max-w-xs mx-auto border border-gray-300">
                        <div className="text-sm text-blue-600 mt-2">
                            <a href="#" className="underline">FREE delivery</a> Tuesday, 17 December. Order within <span className="text-green-600">20 hrs 25 mins</span>. <a href="#" className="underline">Details</a>
                        </div>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <span>Deliver to Dhanush - Thrissur 680306</span>
                        </div>
                        
                        {/* Quantity Dropdown */}
                        <div className="mt-4 flex items-center">
                            <label htmlFor="quantity" className="mr-2 bg-white">Quantity:</label>

                            {/* Decrease Quantity Button */}
                            <button 
                                onClick={() => handleQuantityChange(-1)} 
                                className="px-4 py-2 border border-gray-300 rounded-l bg-white text-lg"
                            >
                                -
                            </button>

                            {/* Display Quantity */}
                            <span className="px-4 py-2 text-lg">{quantity}</span>

                            {/* Increase Quantity Button */}
                            <button 
                                onClick={() => handleQuantityChange(1)} 
                                className="px-4 py-2 border border-gray-300 rounded-r bg-white text-lg"
                            >
                                +
                            </button>
                        </div>

                        <div className="text-xl text-gray-800 mt-4 font-semibold">Total Price: ₹{totalPrice}</div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => Checkout(productDetails, totalPrice)}
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                    {productDetails && (
                        <div className="pt-2" onClick={() => AddtoCart(productDetails._id, productDetails.price, 1)}>
                        <button className=" w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition">
                            Add to Cart
                        </button>
                        
                    </div>
                    )}
                    
                </div>
            </div>
        </div>
       
       
       </>
    );
}

export default SingleView;
