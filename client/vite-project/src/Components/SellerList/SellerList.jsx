


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function SellerList() {
//     const navigate = useNavigate();
//     let params = new URLSearchParams(window.location.search);
//     let token_key = params.get('login');
//     let token = localStorage.getItem(token_key);

//     const [sellers, setSellers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSellerDetails = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get("http://localhost:3000/sellerDetails");
//                 let details = response.data.totalSeller;
//                 setSellers(details);
//             } catch (error) {
//                 console.error("Error fetching seller details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSellerDetails();
//     }, []);

//     const productDetails = (id) => {
//         navigate(`/SingleSellerProducts?login=${token_key}&id=${id}`);
//     };

//     const toggleBlockStatus = async (id, isBlocked) => {
//         try {
//             const response = await axios.put(`http://localhost:3000/toggleBlockSeller/${id}`, {
//                 isBlocked: !isBlocked,
//             });
//             if (response.status === 200) {
//                 setSellers((prevSellers) =>
//                     prevSellers.map((seller) =>
//                         seller._id === id ? { ...seller, isBlocked: !isBlocked } : seller
//                     )
//                 );
//             }
//         } catch (error) {
//             console.error("Error updating block status:", error);
//         }
//     };

//     return (
//         <>
//             <div className="flex">
//                 <div className="w-64 bg-white h-screen shadow-md">
//                     <div className="p-6">
//                         <img
//                             alt="Pixel Commerce Logo"
//                             className="mb-6"
//                             height={50}
//                             src="https://storage.googleapis.com/a1aa/image/FTv75SVGCfViUazyfYtFQterwca1vlMNPIc9emwB5p2fFaOfE.jpg"
//                             width={100}
//                         />
//                         <ul>
//                             <li className="mb-4">
//                                 <a className="flex items-center text-teal-500" href="#">
//                                     <i className="fas fa-home mr-3"></i>
//                                     <span>Dashboard</span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 <div className="container mx-auto p-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h1 className="text-2xl font-bold">All Positions</h1>
//                         <button className="bg-black text-white px-4 py-2 rounded">ADD NEW</button>
//                     </div>
//                     <table className="min-w-full bg-white">
//                         <thead>
//                             <tr className="w-full bg-gray-800 text-white">
//                                 <th className="py-2 px-4 text-left">Name</th>
//                                 <th className="py-2 px-4 text-left">Email</th>
//                                 <th className="py-2 px-4 text-left">Phone</th>
//                                 <th className="py-2 px-4 text-left">Status</th>
//                                 <th className="py-2 px-4 text-left">Total Purchased Amount</th>
//                                 <th className="py-2 px-4 text-left">Seller Products</th>
//                                 <th className="py-2 px-4 text-left">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="7" className="text-center py-4">
//                                         Loading...
//                                     </td>
//                                 </tr>
//                             ) : sellers.length > 0 ? (
//                                 sellers.map((seller, index) => (
//                                     <tr key={index} className="border-b">
//                                         <td className="py-2 px-4">{seller.name}</td>
//                                         <td className="py-2 px-4">{seller.email}</td>
//                                         <td className="py-2 px-4">{seller.placements}</td>
//                                         <td className="py-2 px-4">{seller.status}</td>
//                                         <td className="py-2 px-4">${seller.buyNow.totalPrice || "--"}</td>
//                                         <td className="py-2 px-4" onClick={() => productDetails(seller._id)}>
//                                             {seller.dateUpdated || "See Products"}
//                                         </td>
//                                         <td className="py-2 px-4">
//                                             <button
//                                                 onClick={() => toggleBlockStatus(seller._id, seller.isBlocked)}
//                                                 className={`px-4 py-2 rounded ${
//                                                     seller.isBlocked
//                                                         ? "bg-red-500 text-white"
//                                                         : "bg-green-500 text-white"
//                                                 }`}
//                                             >
//                                                 {seller.isBlocked ? "Unblock" : "Block"}
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="7" className="text-center py-4">
//                                         No sellers found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default SellerList;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerList() {
    const navigate = useNavigate();
    let params = new URLSearchParams(window.location.search);
    let token_key = params.get("login");
    let token = localStorage.getItem(token_key);

    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [blockReason, setBlockReason] = useState("");

    useEffect(() => {
        const fetchSellerDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/sellerDetails");
                let details = response.data.totalSeller;
                setSellers(details);
            } catch (error) {
                console.error("Error fetching seller details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSellerDetails();
    }, []);

    const productDetails = (id) => {
        navigate(`/SingleSellerProducts?login=${token_key}&id=${id}`);
    };

    const handleBlockSeller = async () => {
        if (!selectedSeller) return;

        try {
            const response = await axios.put(`http://localhost:3000/toggleBlockSeller/${selectedSeller._id}`, {
                isBlocked: !selectedSeller.isBlocked,
                reason: blockReason,
            });
            if (response.status === 200) {
                setSellers((prevSellers) =>
                    prevSellers.map((seller) =>
                        seller._id === selectedSeller._id ? { ...seller, isBlocked: !selectedSeller.isBlocked } : seller
                    )
                );
            }
        } catch (error) {
            console.error("Error updating block status:", error);
        } finally {
            setShowModal(false);
            setBlockReason("");
            setSelectedSeller(null);
        }
    };

    const openBlockModal = (seller) => {
        setSelectedSeller(seller);
        setShowModal(true);
    };

    return (
        <>
            <div className="flex">
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
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">All Positions</h1>
                        <button className="bg-black text-white px-4 py-2 rounded">ADD NEW</button>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="w-full bg-gray-800 text-white">
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Phone</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">Total Purchased Amount</th>
                                <th className="py-2 px-4 text-left">Seller Products</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : sellers.length > 0 ? (
                                sellers.map((seller, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-4">{seller.name}</td>
                                        <td className="py-2 px-4">{seller.email}</td>
                                        <td className="py-2 px-4">{seller.placements}</td>
                                        <td className="py-2 px-4">{seller.status}</td>
                                        <td className="py-2 px-4">${seller.buyNow.totalPrice || "--"}</td>
                                        <td className="py-2 px-4" onClick={() => productDetails(seller._id)}>
                                            {seller.dateUpdated || "See Products"}
                                        </td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => openBlockModal(seller)}
                                                className={`px-4 py-2 rounded ${
                                                    seller.isBlocked
                                                        ? "bg-red-500 text-white"
                                                        : "bg-green-500 text-white"
                                                }`}
                                            >
                                                {seller.isBlocked ? "Unblock" : "Block"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        No sellers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Block Seller</h2>
                        <p className="mb-4">Please provide a reason for blocking the user:</p>
                        <textarea
                            className="w-full p-2 border rounded mb-4"
                            rows="4"
                            value={blockReason}
                            onChange={(e) => setBlockReason(e.target.value)}
                            placeholder="Enter reason here..."
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleBlockSeller}
                            >
                                Confirm Block
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SellerList;
