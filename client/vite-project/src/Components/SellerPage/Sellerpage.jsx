
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function Seller() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    let isRequestInProgress = false;

    async function wishList(productId, title, price) {
        if (isRequestInProgress) return; // Prevent multiple API calls
        isRequestInProgress = true;

        try {
            console.log("Adding to wishlist:", productId, title, price);

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

            // Disable the button during the API call
            const button = document.querySelector(`#wishlist-btn-${productId}`);
            if (button) {
                button.disabled = true;
                button.textContent = "Adding...";
            }

            // Make the API call
            const response = await axios.post(
                'http://localhost:3000/addtowishlist',
                {
                    productId,
                    title,
                    price,
                    userId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token
                    },
                }
            );

            // Handle successful response
            alert('Item successfully added to the wishlist!');
            console.log('Wishlist response:', response.data);

            // Update the button's state to show success
            if (button) {
                button.style.backgroundColor = "green";
                button.textContent = "Added to Wishlist";
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert(error.response?.data?.message || 'Error adding item to wishlist.');
        } finally {
            isRequestInProgress = false;

            // Re-enable the button in case of an error
            const button = document.querySelector(`#wishlist-btn-${productId}`);
            if (button) {
                button.disabled = false;
                button.textContent = "Add to Wishlist";
            }
        }
    }



    return (
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
                    <div className="pt-2">
                        <img className="w-10 h-10" src="https://img.icons8.com/?size=100&id=106886&format=png&color=000000" alt="" />
                    </div>
                </div>
            </nav>

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
