
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

function Seller() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
    const nav = NavBar()

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

    let AddtoCart = (productId, price, quantity) => {
        console.log("productId", productId);
        navigate(`/AddtoCartPage?productId=${productId}&userId=${id}&price=${price}&quantity=${quantity}`);
    };


    let isRequestInProgress = false; // Global variable to prevent multiple simultaneous API calls

    async function wishList(productId, title, price) {
        if (isRequestInProgress) return; // Prevent multiple API calls
        isRequestInProgress = true;
    
        try {
            console.log("Toggling wishlist:", productId, title, price);
    
            // Extract userId and token_key from the query parameters
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
            console.log('Checking wishlist status...');
            const statusResponse = await axios.get('http://localhost:3000/status', {
                params: {
                    userId,
                    productId,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            // Handle response based on wishlist status
            const isInWishlist = statusResponse.data.isInWishlist ?? false; // Default to false if undefined
            console.log('Current wishlist status:', isInWishlist);
    
            // Make the API call to either add or remove the product from the wishlist
            const action = isInWishlist ? 'remove' : 'add';
            console.log(`Sending request to ${action} item to/from wishlist...`);
            const actionResponse = await axios.post(
                'http://localhost:3000/addtowishlist',
                {
                    productId,
                    title,
                    price,
                    userId,
                    action,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include token
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
                    console.log(`Updated icon color to: ${icon.style.color}`);
                } else {
                    console.error(`Wishlist icon not found for product: ${productId}`);
                }
            } else {
                alert(actionResponse.data.message || 'Failed to update wishlist. Please try again.');
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            alert(error.response?.data?.message || 'An error occurred while updating the wishlist.');
        } finally {
            isRequestInProgress = false; // Allow new API calls
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
    
    const CartClick = ()=>{
        navigate(`/GoToCart?login=${token_key}&id=${id}`)
    }

    



    return (
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
                            <div onClick={CartClick} className="px-3"><img className="w-24 h-24" style={{ width: "30px", height:"30px" }} src="https://img.icons8.com/?size=100&id=NUcpUMIcTSZ3&format=png&color=000000" alt="" /></div>
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
           

            {/* Carousel Section */}
            <div>
                <div id="carouselExampleControls" className="relative" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://static1.lenskart.com/media/desktop/img/Jan23/sunglasses/Sun-Banner-web.gif" className="block w-full" alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://static1.lenskart.com/media/desktop/img/Aug24/VCIndoor/IndoorGlasses-WebBanner.jpg"
                                className="block w-full"
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://static1.lenskart.com/media/desktop/img/republic/hustlr-ace/Hustlr_Ace_Desktop_Banner.gif"
                                className="block w-full"
                                alt="..."
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </button>
                </div>
            </div>

            {/* Display Product List */}
            <div>
                <div id="productListContainer" className="productCardList">
                    {productList.length > 0 ? (
                        productList.map((product) => {
                            let firstImageUrl = product.images[3]?.url?.replace(/\\/g, '/');
                            let firstImageAlt = product.images[0]?.alt || "Product Image";

                            return (
                                <ul className="cards" key={product._id}>
                                    <li>
                                        <div className="card">
                                            <div
                                                className="card__image relative h-32 w-32"
                                                style={{
                                                    backgroundImage: `url(http://localhost:3000/${firstImageUrl})`,
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: 'cover',
                                                    width: '100%',
                                                    height: '80vh',
                                                }}
                                                title={firstImageAlt}
                                            >
                                                <div
                                                    className="absolute top-0 right-0 h-16 w-16 px-3 pt-3"
                                                    onClick={() => wishList(product._id, product.title, product.price)}
                                                    id={`wishlist-btn-${product._id}`}
                                                >
                                                    <label className="ui-like p-2">
                                                        <input type="checkbox" />
                                                        <div className="like">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="">
                                                                <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" />
                                                            </svg>
                                                        </div>
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="card__overlay">
                                                <div className="card__header d-flex justify-content-between align-items-center">
                                                    <div className="card__header-text">
                                                        <div>
                                                            <h3 className="card__title" onClick={() => handleSingleView(product._id)}>{product.title.slice(0, 27)}</h3>
                                                            <div className="card__status fs-5" onClick={() => handleSingleView(product._id)}>₹{product.price}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => AddtoCart(product._id, product.price, 1)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="card__description">{product.description.slice(0, 200)}...</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            );
                        })
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Seller;
