import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function BuyerAccount() {
    const navigate = useNavigate();
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);

    const SellerDashboardPageClick = () => {
        navigate (`/SellerDashboard?login=${token_key}&id=${id}`)
    };
    const AdressPageClick = () => {
        navigate (`/AddressPage?login=${token_key}&id=${id}`)
    };
    const ContactPageClick = () => {
        navigate (`/ContactPage?login=${token_key}&id=${id}`)
    };
    const WishList = () => {
        navigate (`/WishList?login=${token_key}&id=${id}`)
    };

    const orederItemsPageClick = () => {
        navigate (`/OrderItems?login=${token_key}&id=${id}`)
    };
    let MyAcount = () => {
        navigate(`/AcountPage?login=${token_key}&id=${id}`);
    };

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
            <div className="bg-slate-200">
                <section className=" lg:pt-[70px] pb-12 lg:pb-[10px]">
                    <div style={{ marginLeft: "4.5rem", marginRight: "6.5rem" }}>
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4">
                                <div className="   lg:mb-10 max-w-[510px]">
                                    <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                                        Your Account
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-0 -mx-4 ">
                            {/* Card 1 */}
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4" onClick={orederItemsPageClick}>
                                <div className="p-10 md:px-7 xl:px-10 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8">
                                    <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=56426&format=png&color=000000"
                                            alt="Your Orders"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-xl text-dark mb-3">
                                        Your Orders
                                    </h4>
                                    <p className="text-body-color">
                                        Track, return, or buy things again.
                                    </p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                                <div className="p-10 md:px-7 xl:px-10 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8">
                                    <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=7WsDfqzSXCIP&format=png&color=000000"
                                            alt="Login & Security"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-xl text-dark mb-3">
                                        Login &amp; Security
                                    </h4>
                                    <p className="text-body-color">
                                        Edit login, name, and mobile number.
                                    </p>
                                </div>
                            </div>

                            {/* Card 5 */}
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-4"
                                onClick={AdressPageClick}
                            >
                                <div className="p-10 md:px-7 xl:px-10 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8">
                                    <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=yW7lE4dXAhXK&format=png&color=000000"
                                            alt="Your Addresses"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-xl text-dark mb-3">
                                        Your Addresses
                                    </h4>
                                    <p className="text-body-color">
                                        Edit addresses for orders and gifts.
                                    </p>
                                </div>
                            </div>
                            {/* Card 6 */}
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4" onClick={WishList} >
                                <div className="p-10 md:px-7 xl:px-10 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8">
                                    <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=85038&format=png&color=FA5252"
                                            alt="Your Addresses"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-xl text-dark mb-3">
                                        Your Wish List
                                    </h4>
                                    <p className="text-body-color">
                                        Shop your wishlist, fulfill your desires
                                    </p>
                                </div>
                            </div>
                            {/* Card 7 */}
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-4"
                                // onClick={PaymentPageClick}
                            >
                                <div className="p-10 md:px-7 xl:px-10 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8">
                                    <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=22128&format=png&color=000000"
                                            alt="Your Addresses"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-xl text-dark mb-3">
                                        Payment options
                                    </h4>
                                    <p className="text-body-color">Edit or add payment methods</p>
                                </div>
                            </div>
                            {/* Card 8 */}
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-4"
                                onClick={ContactPageClick}
                            >
                                <div className="p-10 md:px-7 xl:px-10 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8">
                                    <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=Yuy5afbK3Pn9&format=png&color=000000"
                                            alt="Your Addresses"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-xl text-dark mb-3">
                                        Contact Us
                                    </h4>
                                    <p className="text-body-color">
                                        Customer service via phone or chat
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}
export default BuyerAccount