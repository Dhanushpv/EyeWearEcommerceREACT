import { useNavigate } from "react-router-dom";


function SellerDashboard() {
    const navigate = useNavigate();
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);

        const AddProductPage = () =>{
            navigate (`/AddProductPage?login=${token_key}&id=${id}`)
        }
        const ViewPageClick = () =>{
            navigate (`/SellerProducts?login=${token_key}&id=${id}`)
        }
    return (
        <div className="bg-gray-300 min-h-screen">
            <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
                <div className="flex items-center justify-between py-2 text-5x1">
                    <div className="font-bold text-blue-900 text-xl">
                        Seller<span className="text-orange-600">Panel</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <span className="">
                            <div className="container">
                                <input
                                    type="text"
                                    name="text"
                                    className="input"
                                    required=""
                                    placeholder="Type to search..."
                                />
                                
                            </div>
                        </span>
                        <span className="material-icons-outlined p-2" style={{ fontSize: 30 }}>
                            notifications
                        </span>
                        <div
                            className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2"
                            style={{
                                backgroundImage:
                                    "url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)"
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row pt-24 px-10 pb-4">
                <div className="w-2/12 mr-6">
                    <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
                        <a
                            href=""
                            className="inline-block text-gray-600 hover:text-black my-4 w-full"
                        >
                            <span className="flex items-center">
                                <span>
                                    <img
                                        className=""
                                        style={{ width: 30, height: 30 }}
                                        src="https://img.icons8.com/?size=100&id=o8yF6jjz5RHn&format=png&color=000000"
                                        alt=""
                                    />
                                </span>
                                <span className="px-2">Home</span>
                            </span>
                        </a>
                        <a
                            href=""
                            className="inline-block text-gray-600 hover:text-black my-4 w-full"
                        >
                            <span className="flex items-center">
                                <span>
                                    <img
                                        className=""
                                        style={{ width: 25, height: 25 }}
                                        src="https://img.icons8.com/?size=100&id=61035&format=png&color=000000"
                                        alt=""
                                    />
                                </span>
                                <span className="px-2">Some menu item</span>
                            </span>
                        </a>
                        <a
                            href=""
                            className="inline-block text-gray-600 hover:text-black my-4 w-full"
                        >
                            <span className="flex items-center">
                                <span>
                                    <img
                                        className=""
                                        style={{ width: 25, height: 25 }}
                                        src="https://img.icons8.com/?size=100&id=121807&format=png&color=000000"
                                        alt=""
                                    />
                                </span>
                                <span className="px-2">Another menu item</span>
                            </span>
                        </a>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
                        <a
                            href=""
                            className="inline-block text-gray-600 hover:text-black my-4 w-full"
                        >
                            <span className="flex items-center">
                                <span>
                                    <img
                                        className=""
                                        style={{ width: 45, height: 45 }}
                                        src="https://img.icons8.com/?size=100&id=kZNsJ6pzYD2J&format=png&color=000000"
                                        alt=""
                                    />
                                </span>
                                <span className="px-2">Profile</span>
                            </span>
                        </a>
                        <a
                            href=""
                            className="inline-block text-gray-600 hover:text-black my-4 w-full"
                        >
                            <span className="flex items-center">
                                <span>
                                    <img
                                        className=""
                                        style={{ width: 25, height: 25 }}
                                        src="https://img.icons8.com/?size=100&id=RJlXmbcFpqdB&format=png&color=000000"
                                        alt=""
                                    />
                                </span>
                                <span className="px-2">Settings</span>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="w-10/12">
                    <div className="flex flex-row">
                        <div 
                            className="bg-no-repeat bg-red-200 border border-red-300 rounded-xl w-7/12 mr-2 p-6"
                            style={{
                                backgroundImage:
                                    "url(https://previews.dropbox.com/p/thumb/AAvyFru8elv-S19NMGkQcztLLpDd6Y6VVVMqKhwISfNEpqV59iR5sJaPD4VTrz8ExV7WU9ryYPIUW8Gk2JmEm03OLBE2zAeQ3i7sjFx80O-7skVlsmlm0qRT0n7z9t07jU_E9KafA9l4rz68MsaZPazbDKBdcvEEEQPPc3TmZDsIhes1U-Z0YsH0uc2RSqEb0b83A1GNRo86e-8TbEoNqyX0gxBG-14Tawn0sZWLo5Iv96X-x10kVauME-Mc9HGS5G4h_26P2oHhiZ3SEgj6jW0KlEnsh2H_yTego0grbhdcN1Yjd_rLpyHUt5XhXHJwoqyJ_ylwvZD9-dRLgi_fM_7j/p.png?fv_content=true&size_mode=5)",
                                backgroundPosition: "90% center"
                            }}
                        >
                            <p className="text-5xl text-indigo-900">
                                Welcome <br />
                                <strong>Seller Name</strong>
                            </p>
                            <span className="bg-red-300 text-xl text-white inline-block rounded-full mt-12 px-8 py-2">
                                <strong>01:51</strong>
                            </span>
                        </div>
                        <div
                            className="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-5/12 ml-2 p-6"
                            style={{
                                backgroundImage:
                                    "url(https://previews.dropbox.com/p/thumb/AAuwpqWfUgs9aC5lRoM_f-yi7OPV4txbpW1makBEj5l21sDbEGYsrC9sb6bwUFXTSsekeka5xb7_IHCdyM4p9XCUaoUjpaTSlKK99S_k4L5PIspjqKkiWoaUYiAeQIdnaUvZJlgAGVUEJoy-1PA9i6Jj0GHQTrF_h9MVEnCyPQ-kg4_p7kZ8Yk0TMTL7XDx4jGJFkz75geOdOklKT3GqY9U9JtxxvRRyo1Un8hOObbWQBS1eYE-MowAI5rNqHCE_e-44yXKY6AKJocLPXz_U4xp87K4mVGehFKC6dgk_i5Ur7gspuD7gRBDvd0sanJ9Ybr_6s2hZhrpad-2WFwWqSNkh/p.png?fv_content=true&size_mode=5)",
                                backgroundPosition: "100% 40%"
                            }}
                        >
                            <p className="text-5xl text-indigo-900">
                                Reviews <br />
                                <strong>23</strong>
                            </p>
                            <a
                                href=""
                                className="bg-orange-300 text-xl text-white underline hover:no-underline inline-block rounded-full mt-12 px-8 py-2"
                            >
                                <strong>See messages</strong>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row h-64 mt-6">
                        <div onClick={AddProductPage}
                            className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12"
                            onclick="AddPageClick()"
                        >
                            <div className="w-[70px] h-[70px] flex rounded-2xl mb-8">
                                <img
                                    src="https://img.icons8.com/?size=100&id=37839&format=png&color=000000"
                                    alt="Seller Dashboard"
                                />
                            </div>
                            <h4 className="font-semibold text-xl text-dark mb-3">Add Products</h4>
                            <p className="text-body-color">
                                Add products, boost sales, simplify management
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg mx-6 px-6 py-4 w-4/12" onClick={ViewPageClick}>
                            <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                <img
                                    src="https://img.icons8.com/?size=100&id=QuLqCsMnbDg6&format=png&color=000000"
                                    alt=""
                                />
                            </div>
                            <h4 className="font-semibold text-xl text-dark mb-3">
                                View Products
                            </h4>
                            <p className="text-body-color">
                                Explore and view products effortlessly.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">

                        <div className="w-[70px] h-[70px] flex  rounded-2xl mb-8">
                                <img
                                    src="https://img.icons8.com/?size=100&id=QaM8Y9VT9Fzp&format=png&color=000000"
                                    alt=""
                                />
                            </div>
                            <h4 className="font-semibold text-xl text-dark mb-3">
                            Revenue
                            </h4>
                            <p className="text-body-color">
                            Track and analyze revenue seamlessly
                            </p>
                        
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SellerDashboard