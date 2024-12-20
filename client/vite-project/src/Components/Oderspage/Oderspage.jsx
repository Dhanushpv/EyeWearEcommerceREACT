

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function OrderItems() {
//     let params = new URLSearchParams(window.location.search);
//     let userId = params.get('id');
//     let token_key = params.get('login');
//     let token = localStorage.getItem(token_key);
//     const [orders, setOrders] = useState([]);
//     const [allProducts, setAllProducts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredOrders, setFilteredOrders] = useState([]);

//     useEffect(() => {
//         // Fetch orders from the server
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/orderItems/${userId}`);
//                 setOrders(response.data.orders);
//                 const filteredOrdersData = response.data.orders.products; // Initialize filtered orders
//                 setFilteredOrders(filteredOrdersData);
//                 console.log("response", filteredOrdersData);
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//             }
//         };

//         // Fetch all products from the allProducts API
//         const fetchAllProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/allProducts');
//                 setAllProducts(response.data.data); // Assuming 'data' contains the list of products
//             } catch (error) {
//                 console.error("Error fetching all products:", error);
//             }
//         };

//         fetchOrders();
//         fetchAllProducts();
//     }, [userId]);

//     const handleSearch = () => {
//         const filtered = orders.filter((order) =>
//             order.title.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         console.log("filtered orders", filtered);
//         setFilteredOrders(filtered);
//     };

//     const getProductDetails = (productId) => {
//         // Find the matching product from allProducts based on the productId
//         return allProducts.find(product => product._id === productId);
//     };

//     return (
//         <div className="max-w-4xl mx-auto h-screen">
//             <div className="flex items-center mb-4">
//                 <input
//                     className="flex-grow p-2 border border-gray-300 rounded-md"
//                     placeholder="Search your orders here"
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button
//                     onClick={handleSearch}
//                     className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
//                 >
//                     Search Orders
//                 </button>
//             </div>

//             {filteredOrders.map((order) => {
//                 const productDetails = getProductDetails(order.productId); // Match the product with the productId from the order
//                 if (!productDetails) return null; // Skip if no matching product
//                 console.log("productDetails", productDetails);
//                 const imageUrl = productDetails.images[0];
//                 console.log(imageUrl)

//                 return (
//                     <div key={order.id} className="bg-white p-4 rounded-md shadow-md mb-4 flex items-center">
//                         {/* Fallback if no image is available */}
//                         <img
//                             alt={productDetails.title || "Product image"}  // Fallback alt text
//                             className="w-20 h-20 object-cover"  // Adjust the width and height as needed
//                             height={100}
//                             src={`http://localhost:3000/${productDetails.images[0].url}`}
//                             width={100}
//                         />
//                         <div className="ml-4 flex-grow">
//                             <h2 className="text-lg font-semibold">{productDetails.title}</h2>
//                             <p className="text-gray-600">Color: {productDetails.color}</p>
//                             {productDetails.size && <p className="text-gray-600">Size: {productDetails.size}</p>}
//                         </div>
//                         <div className="text-right">
//                             <p className="text-lg font-semibold">{productDetails.price}</p>
//                             <p
//                                 className={order.status === "Delivered" ? "text-green-600" : "text-red-600"}
//                             >
//                                 ● {order.status} on {order.date}
//                             </p>
//                             <p className="text-gray-600">{order.message}</p>
//                             {order.reviewable && (
//                                 <a className="text-blue-600" href="#">
//                                     <i className="fas fa-star"></i> Rate &amp; Review Product
//                                 </a>
//                             )}
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default OrderItems;
import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderItems() {
    let params = new URLSearchParams(window.location.search);
    let userId = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
    const [orders, setOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from the server
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/orderItems/${userId}`);
                setOrders(response.data.orders);
                const filteredOrdersData = response.data.orders.products; // Initialize filtered orders
                setFilteredOrders(filteredOrdersData);
                console.log("responsefilteredOrdersData", filteredOrdersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        // Fetch all products from the allProducts API
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/allProducts');
                setAllProducts(response.data.data); // Assuming 'data' contains the list of products
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };

        fetchOrders();
        fetchAllProducts();
    }, [userId]);

    const handleSearch = () => {
        const filtered = filteredOrders.filter((order) =>
            order.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log("filtered orders", filtered);
        setFilteredOrders(filtered);
    };

    const getProductDetails = (productId) => {
        // Find the matching product from allProducts based on the productId
        return allProducts.find(product => product._id === productId);
    };
    

    return (
        <div className="max-w-4xl mx-auto h-screen">
            <div className="flex items-center mb-4">
                <input
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                    placeholder="Search your orders here"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Search Orders
                </button>
            </div>

            {filteredOrders.map((order) => {
                const productDetails = getProductDetails(order.productId);
                if (!productDetails) return null; // Skip if no matching product

                return (
                    <div key={order.id} className="bg-white p-4 rounded-md shadow-md mb-4 flex items-center">
                        {/* Fallback if no image is available */}
                        <img
                            alt={productDetails.title || "Product image"}  // Fallback alt text
                            className="w-20 h-20 object-cover"  // Adjust the width and height as needed
                            height={100}
                            src={`http://localhost:3000/${productDetails.images[0]?.url || ""}`}
                            width={100}
                        />
                        <div className="ml-4 flex-grow">
                            <h2 className="text-lg font-semibold">{productDetails.title}</h2>
                            {/* <p className="text-gray-600">Color: {productDetails.color}</p> */}
                            {productDetails.size && <p className="text-gray-600">Size: {productDetails.size}</p>}
                        </div>
                        <div className="text-right">
                            {/* Extracting purchaseDate, status, and message from the order */}
                            <p className="text-lg font-semibold">{productDetails.price}</p>
                            <p
                                className={order.status === "Delivered" ? "text-green-600" : "text-green-600"}
                            >
                                ● {order.status} on {new Date(order.purchaseDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">{order.message}</p>
                            {order.reviewable && (
                                <a className="text-blue-600" href="#review">
                                    <i className="fas fa-star"></i> Rate &amp; Review Product
                                </a>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default OrderItems;
