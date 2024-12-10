import { useNavigate } from "react-router-dom";


function AcountPage() {
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
    return (
        <>
            <nav className="p-3 /* bg-white not found */">
                {/* <div class="bg-dark text-white text-center fw-light ">FREE SHIPPING ON ORDERS OVER $75</div> */}
                <div className="flex justify-between /* align-item-center not found */ /* container-lg not found */">
                    <div className="text-center /* line not found */">
                        <span className="/* logo_sub1 not found */">NO</span>
                        <span className="/* logo_sub1 not found */">VA</span>
                    </div>
                    <div className="pt-7 flex justify-between /* align-item-center not found */ px-5">
                        <div className="px-3">
                            <span className="">All Products</span>
                        </div>
                        <div className="px-3">
                            <span className="">New Arrivals</span>
                        </div>
                        <div className="px-3">
                            <span className="">Sunglasses</span>
                        </div>
                        <div className="px-3">
                            <span className="">Eyeglasses</span>
                        </div>
                        <div className="px-3">
                            <span className="">About</span>
                        </div>
                        <div className="px-3">
                            <span className="">Gift Card</span>
                        </div>
                    </div>
                    {/* <div id="" class="pt-2 profile"></div>
              <div id="" class="pt-4 loginSection"></div> */}
                </div>
            </nav>
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
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
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
                            {/* Card 3 */}
                            <div
                                id="dashboard"
                                className="w-full md:w-1/2 lg:w-1/3 px-4"
                                onClick={SellerDashboardPageClick}
                            >
                                <div className="p-10 md:px-7 xl:px-10 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8">
                                    <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=88300&format=png&color=000000"
                                            alt="Seller Dashboard"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-xl text-dark mb-3">
                                        Seller Dashboard
                                    </h4>
                                    <p className="text-body-color">
                                        Manage sales, track performance effortlessly.
                                    </p>
                                </div>
                            </div>
                            {/* Card 4 */}
                            {/* <div id="dashboard" class="w-full md:w-1/2 lg:w-1/3 px-4" onClick="AddPageClick()">
                  <div class="p-10 md:px-7 xl:px-10 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8">
                      <div class="w-[70px] h-[70px] flex items-center justify-center rounded-2xl mb-8">
                          <img src="https://img.icons8.com/?size=100&id=37839&format=png&color=000000"
                              alt="Seller Dashboard">
                      </div>
                      <h4 class="font-semibold text-xl text-dark mb-3">Add Products</h4>
                      <p class="text-body-color">Add products, boost sales, simplify management</p>
                  </div>
              </div> */}
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
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4" >
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
                                        Contact our customer service via phone or chat
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
export default AcountPage