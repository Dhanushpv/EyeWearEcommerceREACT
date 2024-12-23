


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SingleView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: productId, userId, token } = location.state || {};
    const [productDetails, setProductDetails] = useState(null);
    const [images, setImages] = useState([]);
    const [expandedImage, setExpandedImage] = useState('');
    const [expandedImageText, setExpandedImageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);  // Quantity state for the product
    const [totalPrice, setTotalPrice] = useState(0);  // Total price for the product

    // Fetch product and user details
    const fetchDetails = async () => {
        if (!productId || !userId) {
            setError('Product ID or User ID is missing.');
            return;
        }

        try {
            setLoading(true);

            // Fetch product details
            const productResponse = await fetch(`http://localhost:3000/SingleProductList/${productId}`);
            if (!productResponse.ok) {
                throw new Error('Failed to fetch product details');
            }

            const productData = await productResponse.json();
            const product = productData.data;
            console.log(product)
            setProductDetails(product);

            if (Array.isArray(product.images)) {
                setImages(product.images);
                setExpandedImage(`http://localhost:3000/${product.images[0]?.url.replace(/\\/g, '/')}`);
                setExpandedImageText(product.images[0]?.alt || 'Image');
            }

            // Set initial total price based on quantity and product price
            setTotalPrice(product.price * quantity);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Failed to load details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [productId, userId, token, quantity]);

    const handleImageClick = (imgElement) => {
        setExpandedImage(`http://localhost:3000/${imgElement.url.replace(/\\/g, '/')}`);
        setExpandedImageText(imgElement.alt);
    };

    const handleImageHover = (imgElement) => {
        setExpandedImage(`http://localhost:3000/${imgElement.url.replace(/\\/g, '/')}`);
        setExpandedImageText(imgElement.alt);
    };

    const handleQuantityChange = (increment) => {
        const newQuantity = quantity + increment;
        if (newQuantity < 1) return;  // Prevent negative quantities

        setQuantity(newQuantity);
        setTotalPrice(productDetails.price * newQuantity);

        // Update quantity in backend
        updateQuantityOnBackend(newQuantity);
    };

    const updateQuantityOnBackend = async (newQuantity) => {
        try {
            const response = await axios.post(`http://localhost:3000/updateCart/${userId}`, {
                product: productId,
                newQuantity: newQuantity,
            });

            if (response.status === 200) {
                console.log("Quantity updated successfully");
            } else {
                console.error("Failed to update quantity on the server:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const Checkout = (productDetails, totalPrice) => {
   

        // Encode the data
        const encodedCheckoutData = encodeURIComponent(JSON.stringify(productDetails));
        const encodedTotalPrice = encodeURIComponent(totalPrice);

        // Proceed with navigation
        navigate(`/SingleChekout?id=${encodeURIComponent(userId)}&checkoutData=${encodedCheckoutData}&totalPrice=${encodedTotalPrice}&quantity=${quantity}`);
    };

    return (
        <div>
            {/* Product View Section */}
            <div className="flex flex-nowrap w-full">
                <div className="w-full sm:w-32 ">
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        images.map((img, idx) => (
                            <div className='p-2' key={idx}>
                                <img
                                    src={`http://localhost:3000/${img.url.replace(/\\/g, '/')}`}
                                    className="cursor-pointer"
                                    onClick={() => handleImageClick(img)}
                                    onMouseEnter={() => handleImageHover(img)}
                                />
                            </div>
                        ))
                    )}
                </div>

                <div className="w-full sm:w-3/4 p-2">
                    <div className="image_container flex justify-center items-center">
                        <img
                            className="w-full h-auto object-contain"
                            src={expandedImage || 'placeholder.jpg'}
                            alt={expandedImageText || 'Expanded Product'}
                        />
                    </div>
                    <div id="imgtext" className="text-center">{expandedImageText}</div>
                </div>

                <div className="w-full sm:w-1/2 p-2">
                    {productDetails && (
                        <>
                            <div className="text-6xl font-semibold">{productDetails.title || 'Title not available'}</div>
                            <div className="pt-7 text-3xl">💲{productDetails.price}</div>
                            <div className="pt-7 text-xl text-gray-500 font-semibold">{productDetails.brand}</div>
                            <div className="w-full pt-5">{productDetails.description}</div>
                            <div className="pt-7 text-lg text-gray-500 font-semibold">⭐ /{productDetails.rating}</div>
                            <div className="pt-7 text-lg text-green-500 font-semibold underline underline-offset-8">Available offers</div>
                            {/* Offers display */}
                            <div className="pt-5">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition">
                                    Add to Cart
                                </button>
                                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition ml-2">
                                    Buy Now
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full sm:w-2/5 p-2">
                    <div className="p-4 max-w-xs mx-auto border border-gray-300">
                        <div className="text-sm text-blue-600 mt-2">
                            <a href="#" className="underline">FREE delivery</a> Tuesday, 17 December. Order within <span className="text-green-600">20 hrs 25 mins</span>. <a href="#" className="underline">Details</a>
                        </div>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <span>Deliver to Dhanush - Thrissur 680306</span>
                        </div>
                        
                        {/* Quantity Dropdown */}
                        <div className="mt-4 flex items-center">
                            <label htmlFor="quantity" className="mr-2 bg-white">Quantity:</label>

                            {/* Decrease Quantity Button */}
                            <button 
                                onClick={() => handleQuantityChange(-1)} 
                                className="px-4 py-2 border border-gray-300 rounded-l bg-white text-lg"
                            >
                                -
                            </button>

                            {/* Display Quantity */}
                            <span className="px-4 py-2 text-lg">{quantity}</span>

                            {/* Increase Quantity Button */}
                            <button 
                                onClick={() => handleQuantityChange(1)} 
                                className="px-4 py-2 border border-gray-300 rounded-r bg-white text-lg"
                            >
                                +
                            </button>
                        </div>

                        <div className="text-xl text-gray-800 mt-4 font-semibold">Total Price: ₹{totalPrice}</div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => Checkout(productDetails, totalPrice)}
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleView;
