import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BuyerPage() {
    const navigate = useNavigate();

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
    let token = localStorage.getItem(token_key) || ""; // Ensure token is not null
    
    try {
        // Fetch user details if logged in
        if (id && token) {
            const response = await fetch(`http://localhost:3000/individualUser/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user details");
            }

            const user = await response.json();
            let data = user.data;

            // Update user profile section
            document.querySelector(".buyerProfile").innerHTML = `
                <div class="text-center dropdown">
                    <button class="dropbtn" aria-haspopup="true" role="button">
                        <span class="text-break"><strong>Hello,</strong> ${data.name}</span><br>
                        <span><strong>Account & Lists</strong></span>
                    </button>
                    <div class="dropdown-content pt-3" role="menu" style="text-align: left;">
                        <span onClick="Your_Account()" class="dropdown-item  pt-3" tabindex="0">Your Account</span>
                        <span class="dropdown-item  pt-3" tabindex="0">Your Orders</span>
                        <span onClick="WishListPageClick()" class="dropdown-item  pt-3" tabindex="0">Your Wish List</span>
                        <span onClick="Memberships()" class="dropdown-item  pt-3 pb-3" tabindex="0">Memberships & Subscriptions</span>
                    </div>
                </div>
            `;
        }

        // Fetch and display product list for all users
        const productResponse = await fetch("http://localhost:3000/fullProductList", { method: "GET" });
        const productData = await productResponse.json();

        let getAllProducts = document.getElementById("buyerproductListContainer");
        let rows = productData.data.map((product) => {
                // let firstImageUrl = product.images[3]?.url?.replace(/\\/g, "/") || "default-image-url.jpg";
                let firstImageAlt = product.images[0]?.alt || "Product Image";
                const firstImageUrl = `http://localhost:3000/${product.images[3]?.url}`;
                console.log(firstImageUrl)
                return `
                    <ul class="cards">
                        <li>
                            <div class="card">
                                <div class="card__image relative h-32 w-32"
                                    style="backgroundImage: url(${firstImageUrl})
                                            background-position: center; 
                                            background-repeat: no-repeat; 
                                            background-size: cover;
                                            width: 100%; 
                                            height: 80vh"
                                    title="${firstImageAlt}">
                                    <div class="absolute top-0 right-0 h-16 w-16 px-3 pt-3" onClick="wishList('${product._id}')">
                                        <label class="ui-like p-2">
                                            <input type="checkbox">
                                            <div class="like">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path></svg>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div class="card__overlay">
                                    <div class="card__header d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3 class="card__title" onClick="Product_Detail_View('${product._id}')">${product.title}</h3>
                                            <div class="card__status fs-5" onClick="Product_Detail_View('${product._id}')">₹${product.price}</div>
                                        </div>
                                        <button type="button" class="btn btn-primary" onClick="CartClick('${product._id}',${product.price})">Add to Cart</button>
                                    </div>
                                    <p class="card__description" onClick="Product_Detail_View('${product._id}')">
                                        ${product.description.slice(0, 200)}...
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                `;
            })
            .join("");

        getAllProducts.innerHTML = rows;
    } catch (error) {
        console.error("Error fetching product details:", error);
        document.getElementById("buyerproductListContainer").innerHTML =
            "<p>Unable to load product details. Please try again later.</p>";
    }
};



    return (
        <>
            <>
                <div className="">
                    <nav className="pb-3 ">
                        <div className="bg-gray-800 /* text-white not found */ text-center /* fw-light not found */">
                            FREE SHIPPING ON ORDERS OVER $75
                        </div>
                        <div className="flex justify-between items-center container pt-3">
                            <div className="text-center /* line not found */">
                                <span className="/* logo_sub1 not found */">NO</span>
                                <span className="/* logo_sub1 not found */">VA</span>
                            </div>
                            <div className="flex justify-between items-center container  px-5">
                                <div className="flex  items-center w-full md:w-auto px-5">
                                <div className="px-3 relative">
                                    <span className="/* hov not found */">Eyeglasses</span>
                                    {/* <div class="category_hover offcanvas-menu"> */}
                                    <div className="/* offcanvas-menu not found */">
                                        <div id="gender_category" className="">
                                            asdfgh
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </div>
                                <div className=" relative">
                                    <span className="/* hov not found */">Screen Glasses</span>
                                    <div className="/* offcanvas-menu not found */">
                                        All Products Submenu
                                    </div>
                                </div>
                                <div className="px-3 relative">
                                    <span className="/* hov not found */">Kids Glasses</span>
                                    <div className="/* offcanvas-menu not found */">
                                        New Arrivals Submenu
                                    </div>
                                </div>
                                <div className="px-3 relative">
                                    <span className="/* hov not found */">Contact Lenses</span>
                                    <div className="/* offcanvas-menu not found */">
                                        Sunglasses Submenu
                                    </div>
                                </div>
                                <div className="px-3 relative">
                                    <span className="/* hov not found */">Sunglasses</span>
                                    <div className="/* offcanvas-menu not found */">
                                        Eyeglasses Submenu
                                    </div>
                                </div>
                                <div className="px-3 relative">
                                    <span className="/* hov not found */">About</span>
                                    <div className="/* offcanvas-menu not found */">About Submenu</div>
                                </div>
                                <div className="px-3 relative">
                                    <span className="/* hov not found */">Gift Card</span>
                                    <div className="/* offcanvas-menu not found */">
                                        Gift Card Submenu
                                    </div>
                                </div>
                                </div>
                                  <div id="" className="pt-2 /* buyerProfile not found */" />
                                <div className="loginSection "></div>
                            </div>
                          
                           
                               
                        
                        </div>
                    </nav>
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
                    <div className="pt-5 container mx-auto">
                        <div className="flex">
                            <div className="">
                                <span className="/* fs-1 not found */ /* fw-bolder not found */">
                                    New
                                </span>
                                <br className="" />
                                <span className="/* fs-3 not found */" style={{ letterSpacing: 15 }}>
                                    Arrivals
                                </span>
                                <br className="" />
                                <span className="">Shop Now</span>
                            </div>
                            <div className="flex">
                                <div className="/* hov not found */ p-3">
                                    <div className="/* imahov not found */" />
                                </div>
                                <div className="/* hov1 not found */ p-3">
                                    <div className="/* imahov1 not found */" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div id="buyerproductListContainer" className="/* buyerproductListContainer not found */"
                    />
                </div>

            </>

        </>
    );
}

export default BuyerPage;

