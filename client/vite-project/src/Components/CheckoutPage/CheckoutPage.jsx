import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CheckoutPage() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkoutData, setCheckoutData] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    console.log("userid ", id)

    // Load addresses from the server
    const addressLoad = async () => {

        ;

        try {
            const response = await axios.get(`http://localhost:3000/addAddressLoad/${id}`);
            setAddresses(response.data.data); // Set the fetched addresses
            setLoading(false);
        } catch (error) {
            setError('Error fetching addresses');
            setLoading(false);
        }
    };

    // Proceed to buy products
    // const proceedToBuy = async () => {

    //     if (!selectedAddress) {
    //         alert('Please select a delivery address before proceeding.');
    //         return;
    //     }

    //     if (!checkoutData || checkoutData.length === 0) {
    //         alert('Missing checkout data. Please try again.');
    //         return;
    //     }

    //     const products = checkoutData.map(item => ({
    //         productId: item._id,
    //         quantity: item.quantity,
    //     }));
    //     console.log("products", products)

    //     try {
    //         // React code (CheckoutPage)
    //         const response = await axios.post(`http://localhost:3000/orderCart/${id}`, { products: products });


    //         console.log('Order result:', response.data);
    //         alert('Order placed successfully!');
    //     } catch (error) {
    //         console.error('Error proceeding to buy:', error);
    //         alert('Error while placing the order. Please try again.');
    //     }
    // };

    const proceedToBuy = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address before proceeding.');
            return;
        }
    
        if (!checkoutData || checkoutData.length === 0) {
            alert('Missing checkout data. Please try again.');
            return;
        }
    
        const products = checkoutData.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
        console.log("products", products);
    
        try {
            // Fetch all products from the 'AllProducts' endpoint
            const allProductsResponse = await axios.get('http://localhost:3000/AllProducts');
            console.log('API response:', allProductsResponse);
    
            let allProducts = allProductsResponse.data;
            console.log("allProducts", allProducts);
    
            // Access the product list from the response
            let data = allProducts.data;
            console.log("Product list from API:", data);
    
            // Validate the format of the response
            if (!Array.isArray(data)) {
                if (data.products && Array.isArray(data.products)) {
                    data = data.products; // Adjust for nested structure if needed
                } else {
                    throw new Error('Invalid response format: Unable to extract products array');
                }
            }
    
            // Match the product IDs in the cart with the API data
            const invalidProducts = products.filter(item =>
                !data.some(product => product._id === item.productId)
            );
    
            if (invalidProducts.length > 0) {
                console.error('Invalid products:', invalidProducts);
                alert('Some products are invalid or no longer available.');
                return;
            }
    
            // Proceed with the order if all products are valid
            const response = await axios.post(`http://localhost:3000/orderCart/${id}`, { products: products });
    
            console.log('Order result:', response.data);
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error proceeding to buy:', error.message || error);
            alert('Error while placing the order. Please try again.');
        }
    };
    
    
    

    // Load checkout data from the URL
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let checkoutDataParam = params.get('checkoutData');

        if (checkoutDataParam) {
            try {
                const data = JSON.parse(decodeURIComponent(checkoutDataParam));
                setCheckoutData(data);
            } catch (error) {
                console.error('Error parsing checkout data:', error);
            }
        }

        addressLoad();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="max-w-5xl mx-auto p-4">
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
                            <p className="text-gray-500">Item list and delivery details will be displayed here.</p>
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
                                            {item.name} - ₹{item.price} x {item.quantity} = ₹{' '}
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
        </>
    );
}

export default CheckoutPage;
