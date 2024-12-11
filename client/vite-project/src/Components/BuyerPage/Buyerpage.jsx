
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import '../BuyerPage/Buyerpage.css'

function BuyerPage() {

    const [buyerProfile, setBuyerProfile] = useState(null);
    const [productList, setProductList] = useState([]);
    const [error, setError] = useState("");
    const [mensGlasses, setMensGlasses] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();
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

        if (isLoggedIn) {
            if (userType === "Buyer" || userType === "Seller") {
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

    let handleSingleView = (productId) => {
        SingleView(productId);
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
            setFilteredProducts(response.data); // Update filtered products

            console.log("response",response)
        } catch (error) {
            console.error("Error searching products:", error);
            setFilteredProducts([]); // Clear results on error
        }
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

                            <div className="relative group px-3">
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
                                    <div
                                        className="text-center dropdown"
                                        dangerouslySetInnerHTML={{
                                            __html: `
                                                <button class="dropbtn" aria-haspopup="true" role="button">
                                                    <span class="text-break"><strong>Hello,</strong> ${buyerProfile.name}</span><br>
                                                    <span><strong>Account & Lists</strong></span>
                                                </button>
                                                <div class="dropdown-content pt-3" role="menu" style="text-align: left;">
                                                    <span class="dropdown-item pt-3" tabindex="0">Your Account</span>
                                                    <span class="dropdown-item pt-3" tabindex="0">Your Orders</span>
                                                    <span class="dropdown-item pt-3" tabindex="0">Your Wish List</span>
                                                    <span class="dropdown-item pt-3 pb-3" tabindex="0">Memberships & Subscriptions</span>
                                                </div>
                                            `,
                                        }}
                                    />
                                ) : null}
                            </div>
                            <div className="loginSection"></div>
                        </div>
                    </div>
                </nav>

                <div
        className={`offcanvas ${isCanvasOpen ? "open" : ""}`}
        style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "300px",
            height: "100%",
            backgroundColor: "white",
            boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            transform: isCanvasOpen ? "translateX(0)" : "translateX(100%)",
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

         

                <div className="flex">
                    <div className="relative">
                        <img
                            src="https://static.wixstatic.com/media/c837a6_44b4a1f3e3694fe7830f37ac6d3880da~mv2.jpg/v1/fill/w_950,h_715,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/HeaderLeft.jpg"
                            alt=""
                            className="/* img not found */"
                        />
                        <span className="absolute bottom-0 /* start-0 not found */ /* text-container not found */">
                            <span className="/* main_text not found text-white */">
                                Handmade
                                <br className="text-white" />
                                Premium Eyewear
                            </span>
                            <br className="" />
                            <span className="text-white">Shop now</span>
                        </span>
                    </div>
                    <div className="">
                        <img
                            src="https://static.wixstatic.com/media/c837a6_b64fc73a00df4838a8900e7d6eb1012c~mv2.jpg/v1/fill/w_950,h_715,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/HeaderRight.jpg"
                            alt=""
                            className="/* img not found */"
                        />
                    </div>
                </div>



                <div className="pt-5  mx-auto  " >
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <div id="buyerproductListContainer " className="productCardList">
                            {productList.length > 0 ? (
                                productList.map((product) => {
                                    let firstImageUrl = product.images[2]?.url?.replace(/\\/g, '/');
                                    let firstImageAlt = product.images[0]?.alt || "Product Image";
                                    // console.log(firstImageUrl)
                                    return (
                                        <ul className="cards" key={product._id}>
                                            <li>
                                                <div className="card">
                                                    <div
                                                        className="card__image relative h-32 w-32" onClick={() => handleSingleView(product._id)}
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
                                                        <div className="absolute top-0 right-0 h-16 w-16 px-3 pt-3">
                                                            <label className="ui-like p-2 ">
                                                                <input type="checkbox" />
                                                                <div className="like">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="">
                                                                        <g strokeWidth={100} id="SVGRepo_bgCarrier" />
                                                                        <g
                                                                            strokeLinejoin="round"
                                                                            strokeLinecap="round"
                                                                            id="SVGRepo_tracerCarrier"
                                                                        />
                                                                        <g id="SVGRepo_iconCarrier">
                                                                            <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" />
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                            </label>

                                                        </div>
                                                    </div>
                                                    <div className="card__overlay">
                                                        <div className="card__header d-flex justify-content-between align-items-center">
                                                            <div className="card__header-text">
                                                                <div onClick={() => handleSingleView(product._id)}>
                                                                    <h3 className="card__title">{product.title.slice(0, 27)}</h3>
                                                                    <div className="card__status fs-5">₹{product.price}</div>
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
                    )}
                </div>
                <div className="w-full"style={{
                                                backgroundImage: `url(https://toplineoptical.com/wp-content/uploads/2024/01/eye-glasses-banner-1.jpg)`,
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                width: '100%',
                                                height: '50vh',
                                            }}>
                <span className="text-5xl font-serif px-5 underline" ></span></div>
                <div onLoad={mensglass}>

                    <div className=" ">
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            <div id="mensGlassesListContainer" className="productCardList">
                                {mensGlasses.length > 0 ? (
                                    mensGlasses.map((product) => {
                                        let firstImageUrl = product.images[2]?.url?.replace(/\\/g, '/');
                                        let firstImageAlt = product.images[0]?.alt || "Product Image";
                                        return (
                                            <ul className="cards" key={product._id}>
                                                <li>
                                                    <div className="card">
                                                        <div
                                                            className="card__image relative h-32 w-32"
                                                            onClick={() => handleSingleView(product._id)}
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
                                                            <div className="absolute top-0 right-0 h-16 w-16 px-3 pt-3">
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
                                                                    <div onClick={() => handleSingleView(product._id)}>
                                                                        <h3 className="card__title">{product.title.slice(0, 27)}</h3>
                                                                        <div className="card__status fs-5">₹{product.price}</div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        onClick={() => alert(`Adding ${product.title} to cart`)}
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
                                    <p>No men's glasses available.</p>
                                )}
                            </div>
                        )}
                    </div>

                </div>




            </div>
        </>
    );
}

export default BuyerPage;
