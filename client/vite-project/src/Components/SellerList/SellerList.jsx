


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerList() {
    const navigate = useNavigate();
    let params = new URLSearchParams(window.location.search);
    // let id = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
    // State to store seller details
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch seller details on component mount
    useEffect(() => {
        const fetchSellerDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/sellerDetails"); // Make API call
                
                console.log("response",response)
                let data = response.data
                console.log("data",data)


                let details =data.totalSeller
                console.log("details",details)





                setSellers(details);
                
            } catch (error) {
                console.error("Error fetching seller details:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };


        fetchSellerDetails();
    }, []);
    const productDetails = (id) => {
        navigate (`/SingleSellerProducts?login=${token_key}&id=${id}`)
    };

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white h-screen shadow-md">
                    <div className="p-6">
                        <img
                            alt="Pixel Commerce Logo"
                            className="mb-6"
                            height={50}
                            src="https://storage.googleapis.com/a1aa/image/FTv75SVGCfViUazyfYtFQterwca1vlMNPIc9emwB5p2fFaOfE.jpg"
                            width={100}
                        />
                        <ul>
                            <li className="mb-4">
                                <a className="flex items-center text-teal-500" href="#">
                                    <i className="fas fa-home mr-3"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="flex items-center text-gray-600" href="#">
                                    <i className="fas fa-chart-line mr-3"></i>
                                    <span>Analytics</span>
                                </a>
                            </li>
                            {/* Other sidebar items */}
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">All Positions</h1>
                        <button className="bg-black text-white px-4 py-2 rounded">ADD NEW</button>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <button className="text-black font-semibold border-b-2 border-black">
                            Active
                        </button>
                        <button className="text-gray-500">Inactive</button>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-4">
                            <button className="text-gray-500">
                                Name <i className="fas fa-chevron-down" />
                            </button>
                            <button className="text-gray-500">
                                Client <i className="fas fa-chevron-down" />
                            </button>
                            {/* Other filter buttons */}
                        </div>
                        <button className="text-blue-500">X Remove filters</button>
                    </div>

                    {/* Table */}
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="w-full bg-gray-800 text-white">
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Phone</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">total putchased amount</th>
                                <th className="py-2 px-4 text-left">Seller products</th>
                                
                                <th className="py-2 px-4 text-left">Details</th>
                                <th className="py-2 px-4 text-left">Block</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : sellers.length > 0 ? (
                                sellers.map((seller, index) => (
                                    <tr key={index} className="border-b" >
                                        <td className="py-2 px-4">{seller.name}</td>
                                        <td className="py-2 px-4">{seller.email
                                        }</td>
                                        <td className="py-2 px-4">{seller.placements}</td>
                                        <td className="py-2 px-4">{seller.status}</td>
                                        <td className="py-2 px-4">${seller.buyNow.totalPrice || "--"
                                        }</td>
                                        <td className="py-2 px-4" onClick={()=>productDetails(seller._id)}>{seller.dateUpdated||"See Products"}</td>
                                        <td className="py-2 px-4 text-blue-500">Delete</td>
                                        <td className="py-2 px-4">
                                            <span>block</span>
                                            <span>Unblock</span>
                                          
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">
                                        No sellers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default SellerList;
