import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SingleChekout() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let quantity= params.get('quantity')
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkoutData, setCheckoutData] = useState([]); // Initialize with an empty array
    const [selectedAddress, setSelectedAddress] = useState('');

    const products1 = checkoutData.map(item => item._id);
    console.log("products1", products1);

    let datapp=[{productId : products1,quantity:quantity}]

    // Load addresses from the server
    const addressLoad = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/addAddressLoad/${id}`);
            setAddresses(response.data.data); // Set the fetched addresses
            setLoading(false);
        } catch (error) {
            setError('Error fetching addresses');
            setLoading(false);
        }
    };

    // Proceed to buy when the user clicks the button
    const proceedToBuy = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address before proceeding.');
            return;
        }

        if (!checkoutData || checkoutData.length === 0) {
            alert('Missing checkout data. Please try again.');
            return;
        }

        const products = checkoutData.map(item => item._id);
        console.log(products) // Extract product IDs

        try {
            // Fetch all products from the 'AllProducts' endpoint
            const allProductsResponse = await axios.get('http://localhost:3000/AllProducts');
            let allProducts = allProductsResponse.data;
            let data = allProducts.data;

            // Validate the format of the response
            if (!Array.isArray(data)) {
                if (data.products && Array.isArray(data.products)) {
                    data = data.products; // Adjust for nested structure if needed
                } else {
                    throw new Error('Invalid response format: Unable to extract products array');
                }
            }
            const showToast = (message, type) => {
                if (type === 'success') {
                    toast.success(message);
                } else if (type === 'error') {
                    toast.error(message);
                } else {
                    toast(message);
                }
            };

            const validProducts = products.filter(products =>
                data.some(apiProduct => apiProduct._id === products)
            );

            console.log('Valid products:', validProducts);

            if (validProducts.length === 0) {
                console.error('No valid products found:', validProducts);
                alert('None of the products in your cart are valid or available.');
                return;
            }


            // Proceed with the order if all products are valid
            const response = await axios.post(`http://localhost:3000/orderCart/${id}`, { products: datapp });
            showToast('Order placed successfully!', 'success');
            console.log("response",response)
        } catch (error) {
            console.error('Error proceeding to buy:', error.message || error);
            alert('Error while placing the order. Please try again.');
        }
    };

    // Load checkout data from the URL and ensure it's an array
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let checkoutDataParam = params.get('checkoutData');

        if (checkoutDataParam) {
            try {
                const decodedData = decodeURIComponent(checkoutDataParam);
                const data = JSON.parse(decodedData);
                console.log("data",data)

                if (Array.isArray(data)) {
                    setCheckoutData(data);
                } else {
                    setCheckoutData([data]); // Wrap the object in an array
                }
            } catch (error) {
                console.error('Error parsing checkout data:', error);
            }
        }

        addressLoad();
        
        // Cleanup function if the component unmounts during the async operation
        return () => {
            setLoading(false); // Prevent setting state on an unmounted component
        };
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        
        <div className="max-w-5xl mx-auto p-4">
            <ToastContainer />
            <header className="flex items-center justify-between py-4">
                <div className="flex items-center">
                    <div className="text-center">
                        <span className="logo_sub1">NO</span>
                        <span className="logo_sub1">VA</span>
                    </div>
                    <span className="text-sm text-gray-600">.in</span>
                </div>
                <h1 className="text-2xl font-semibold">Checkout</h1>
            </header>

            <main className="bg-white p-6 rounded-lg shadow-md">
                <section>
                    <h2 className="text-lg font-semibold text-orange-600">
                        1. Select a Delivery Address
                    </h2>
                    <div className="mt-4">
                        <h3 className="text-md font-semibold">Your Addresses</h3>
                        <div className="mt-2">
                            {addresses.length === 0 ? (
                                <p className="text-gray-500">No addresses found. Add a new address!</p>
                            ) : (
                                addresses.map((address) => (
                                    <div key={address._id} className="border rounded-lg p-4 mb-4">
                                        <label className="flex items-start">
                                            <input
                                                className="mt-1 mr-2"
                                                name="address"
                                                type="radio"
                                                value={address._id}
                                                onChange={() => setSelectedAddress(address._id)}
                                            />
                                            <div>
                                                <span className="font-semibold">{address.firstName}</span>
                                                <div>
                                                    {address.flatDetails}, {address.landmark}, {address.city},{' '}
                                                    {address.state}, {address.pincode}, India
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-lg font-semibold text-orange-600">2. Payment Method</h2>
                    <div className="mt-4">
                        <p className="text-gray-500">Payment methods will be implemented here.</p>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-lg font-semibold text-orange-600">3. Items and Delivery</h2>
                    <div className="mt-4">
                        <ul>
                            {Array.isArray(checkoutData) && checkoutData.length > 0 ? (
                                checkoutData.map((item) => (
                                    <li key={item._id}>
                                        {item.title} - ₹{item.price} x {item.quantity} = ₹{' '}
                                        {item.price * item.quantity}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No items added yet.</p>
                            )}
                        </ul>
                    </div>
                </section>
            </main>

            <aside className="mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <button
                        className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg w-full"
                        onClick={proceedToBuy}
                    >
                        Proceed to Buy
                    </button>
                    <div className="mt-4" id="OrderSummary">
                        <h3 className="text-md font-semibold">Order Summary</h3>
                        <ul>
                            {checkoutData.length === 0 ? (
                                <li className="text-gray-500">No items added yet.</li>
                            ) : (
                                checkoutData.map((item) => (
                                    <li key={item._id}>
                                        {item.title} - ₹{item.price} x {item.quantity} = ₹{' '}
                                        {item.price * item.quantity}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </aside>

            <footer className="mt-8 text-center text-sm text-gray-600">
                <p>
                    Need help? Check our{' '}
                    <a className="text-blue-600" href="#">
                        help pages
                    </a>{' '}
                    or{' '}
                    <a className="text-blue-600" href="#">
                        contact us
                    </a>
                    .
                </p>
            </footer>
        </div>
    );
}

export default SingleChekout;
