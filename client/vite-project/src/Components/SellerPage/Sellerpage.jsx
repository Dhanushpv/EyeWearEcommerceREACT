import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Seller() {
    // State to store user details and product list
    const [user, setUser] = useState(null);
    const [productList, setProductList] = useState([]);  // Ensure it's an empty array by default
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user details and product list on component mount
    useEffect(() => {
        async function fetchUserDetails() {
            let params = new URLSearchParams(window.location.search);
            let id = params.get('id');
            let token_key = params.get('login');
            let token = localStorage.getItem(token_key);

            try {
                const response = await axios.get(`http://localhost:3000/individualUser/${id}`, {
                    headers: {
                        "Authorization": token, // Send the token in the Authorization header
                    },
                });

                // Set user data to state
                const userData = response.data.data;
                setUser(userData);

                // Fetch product list
                const productResponse = await axios.get('http://localhost:3000/fullProductList');
                setProductList(productResponse.data.data || []);  // Ensure product list is an empty array if no data

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load user details or product list.");
                setLoading(false);
            }
        }

        fetchUserDetails();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div>
                <nav className="pb-3">
                    <div className="bg-gray-800 text-white text-center font-light">
                        FREE SHIPPING ON ORDERS OVER $75
                    </div>
                    <div className="flex justify-evenly items-center pt-3">
                        <div className="text-center">
                            <span className="logo_sub1">NO</span>
                            <span className="logo_sub1">VA</span>
                        </div>
                        <div className="flex w-full md:w-auto items-center px-5">
                            <div className="px-3 relative">
                                <span className="hover:underline cursor-pointer">Eyeglasses</span>
                                <div className="offcanvas-menu">
                                    <div id="gender_category">asdfgh</div>
                                </div>
                            </div>
                            <div className="px-3 relative">
                                <span className="hover:underline cursor-pointer">Screen Glasses</span>
                                <div className="offcanvas-menu">All Products Submenu</div>
                            </div>
                            <div className="px-3 relative">
                                <span className="hover:underline cursor-pointer">Kids Glasses</span>
                                <div className="offcanvas-menu">New Arrivals Submenu</div>
                            </div>
                            <div className="px-3 relative">
                                <span className="hover:underline cursor-pointer">Contact Lenses</span>
                                <div className="offcanvas-menu">Sunglasses Submenu</div>
                            </div>
                            <div className="px-3 relative">
                                <span className="hover:underline cursor-pointer">Sunglasses</span>
                                <div className="offcanvas-menu">Eyeglasses Submenu</div>
                            </div>
                            <div className="px-3 relative">
                                <span className="hover:underline cursor-pointer">About</span>
                                <div className="offcanvas-menu">About Submenu</div>
                            </div>
                            <div className="px-3 relative">
                                <span className="hover:underline cursor-pointer">Gift Card</span>
                                <div className="offcanvas-menu">Gift Card Submenu</div>
                            </div>
                        </div>
                        {user && (
                           <div className="profile">
                           <div className="text-center dropdown">
                               <button className="dropbtn" aria-haspopup="true" role="button">
                                   <span className="text-break"><strong>Hello,</strong> {user.name}</span><br />
                                   <span><strong>Account & Lists</strong></span>
                               </button>
                               <div className="dropdown-content">
                                   <span onClick={() => alert('Your Account clicked')} className="dropdown-item">
                                       Your Account
                                   </span>
                                   <span onClick={() => alert('Your Orders clicked')} className="dropdown-item">
                                       Your Orders
                                   </span>
                                   <span onClick={() => alert('Your Wish List clicked')} className="dropdown-item">
                                       Your Wish List
                                   </span>
                                   <span onClick={() => alert('Your Seller Account clicked')} className="dropdown-item">
                                       Your Seller Account
                                   </span>
                                   <span onClick={() => alert('Memberships clicked')} className="dropdown-item">
                                       Memberships & Subscriptions
                                   </span>
                               </div>
                           </div>
                       </div>
                        )}
                        <div className="pt-2">
                            <img className="w-10 h-10" src="https://img.icons8.com/?size=100&id=106886&format=png&color=000000"
                                alt="" />
                        </div>
                        <div className="pt-4 loginSection" />
                    </div>
                </nav>

                {/* Carousel Section */}
                <div>
                    <div id="carouselExampleControls" className="relative" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src="https://static1.lenskart.com/media/desktop/img/Jan23/sunglasses/Sun-Banner-web.gif"
                                    className="block w-full"
                                    alt="..."
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
                                console.log(firstImageUrl)
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
                                                            <div>
                                                                <h3 className="card__title">{product.title}</h3>
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
                            <p>No products available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Seller;
