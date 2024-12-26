import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function WishList() {
    const [allProducts, setAllProducts] = useState([]);
    const [matchedItems, setMatchedItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    useEffect(() => {
        async function fetchWishlist() {
            let params = new URLSearchParams(window.location.search);
            let id = params.get("id");
            let token_key = params.get("login");
            let token = localStorage.getItem(token_key);

            try {
                // Fetch all products
                const allProductsResponse = await fetch("http://localhost:3000/AllProducts", {
                    method: "GET",
                });

                if (!allProductsResponse.ok) {
                    throw new Error("Failed to fetch all products");
                }

                const allProductsData = await allProductsResponse.json();
                const products = allProductsData?.data || []; // Fallback to empty array if data is undefined
                setAllProducts(products);

                // Fetch wishlist
                const wishlistResponse = await fetch(`http://localhost:3000/loadWishList/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                });

                if (!wishlistResponse.ok) {
                    throw new Error(`Failed to fetch wishlist. Status: ${wishlistResponse.status}`);
                }

                const wishlistData = await wishlistResponse.json();
                const wishlistItems = wishlistData?.data || []; // Fallback to empty array if data is undefined

                // Validate wishlist data
                if (!Array.isArray(wishlistItems)) {
                    throw new Error("Invalid wishlist data received.");
                }

                // Match products with wishlist
                const wishlistIds = wishlistItems.map((item) => item.productId);
                const matchedItems = products.filter((product) => wishlistIds.includes(product._id));
                console.log(matchedItems)

                if (matchedItems.length === 0) {
                    setErrorMessage("No items in your wishlist match available products.");
                } else {
                    setErrorMessage(""); // Clear error message if matches are found
                }

                setMatchedItems(matchedItems);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                setErrorMessage("Failed to load wishlist. Please try again later.");
                setMatchedItems([]); // Reset wishlist on error
            }
        }

        fetchWishlist();
    }, []);
    
    const removewishlist = async (productId) => {
      try {
          // Validate `id` and `productId`
          if (!id) {
              console.error("User ID is missing.");
              alert("Unable to remove item. User ID is missing.");
              return;
          }
          if (!productId) {
              console.error("Product ID is missing.");
              alert("Unable to remove item. Product ID is missing.");
              return;
          }
    
          // Make the API request to remove the item from the wishlist
          const response = await axios.delete(`http://localhost:3000/removeWishlist/${id}`, {
              data: { productId }, // Send the productId in the request body
          });
    
          // Check if the request was successful
          if (response.status === 200) {
              // Update the `matchedItems` state to reflect the change in the UI
              setMatchedItems((prevItems) =>
                  prevItems.filter((item) => item._id !== productId) // Use `_id` to filter out the removed item
              );
    
              alert("Item removed from wishlist successfully.");
          } else {
              console.error("Failed to remove item. Response:", response);
              alert("Failed to remove item. Please try again later.");
          }
      } catch (err) {
          console.error("Error removing item:", err);
          alert("Failed to remove item. Please try again later.");
      }
    

  };

  let SingleView = (productId) => {
    let params = new URLSearchParams(window.location.search);
    let token_key = params.get('login');
    let userId = params.get('id')
    let token = localStorage.getItem(token_key);


    navigate(`/SingleView/${productId}`, {
        state: {
            id: productId,
            userId,  // Pass the user ID here
            token
        }
    });
};

let handleSingleView = (productId) => {
    SingleView(productId);
};

    return (
        <div>
            <nav className="p-3 bg-white">
                <div className="d-flex justify-content-between align-items-center container-lg">
                    <div className="text-center line">
                        <span className="logo_sub1">NO</span>
                        <span className="logo_sub1">VA</span>
                    </div>
                    <div className="pt-4 d-flex justify-content-between align-items-center px-5">
                        <div className="px-3"><span>All Products</span></div>
                        <div className="px-3"><span>New Arrivals</span></div>
                        <div className="px-3"><span>Sunglasses</span></div>
                        <div className="px-3"><span>Eyeglasses</span></div>
                        <div className="px-3"><span>About</span></div>
                        <div className="px-3"><span>Gift Card</span></div>
                    </div>
                </div>
            </nav>
            <div className="flex">
                <div className="bg-zinc-100 w-1/4">
                {<div className="flex min-h-screen w-[250px] flex-col bg-gray-900 pt-10">
              <ul className="flex w-0  flex-col gap-0 px-3">
                <li onClick={() => Your_Account()} className="pt-4">
                  <span className=" flex items-center justify-start gap-2 rounded-full bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-200 ring-offset-2 ring-offset-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Your Orders
                  </span>
                </li>
                <li className="pt-4">
                  <span className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Login & Security
                  </span>
                </li>
                <li className="pt-4">
                  <span className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Seller Dashboard
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => AddPageClick()}
                  >
                    Add Products
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => AddressPageClick()}
                  >
                    Your Addresses
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => WishListPageClick()}
                  >
                    Your Wish List
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className=" flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => PaymentPageClick()}
                  >
                    Payment options
                  </span>
                </li>
                <li className="pt-4">
                  <span
                    className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  //   onClick={}
                  >
                    Contact Us
                  </span>
                </li>
              </ul>
              

            </div>}
                </div>
                <div className="w-full bg-slate-200">
                    <div className="p-5">
                        {errorMessage ? (
                            <p className="text-center text-red-500">{errorMessage}</p>
                        ) : (
                            <div className="flex flex-wrap " id="WishListCard">
                                {matchedItems.length > 0 ? (
                                    matchedItems.map((item, index) => (
                                        <div key={index} className="w-1/4 md:w-1/2 lg:w-1/3 px-4 pb-6 mb-6">
                                            <div className="relative flex flex-col rounded-xl bg-white shadow-md" onClick={() => handleSingleView(item._id)}>
                                                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                                                <img onClick={() => handleSingleView(item._id)}
                                                      src={item.images && item.images[0] ? `http://localhost:3000/${item.images[0]?.url}` : 'fallback_image_url'} 
                                                      alt={item.title || "Product"}
                                                      className="w-full h-full object-cover"
                                                  />


                                                </div>
                                                <div className="p-6">
                                                    <h5 className="mb-2 text-xl font-semibold text-gray-900">{item.title.slice(0,20) || "No Title"}</h5>

                                                    <div className="flex justify-between">
                                                      <p className="text-base font-light text-gray-700">Price: {item.price || "No Price"}</p>
                                                      <span onClick={() => removewishlist(item._id)}><img className="w-5" src="https://img.icons8.com/?size=100&id=67884&format=png&color=FA5252" alt="delte" /></span>
                                                      </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-red-500">{errorMessage || "Your wishlist is empty."}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WishList;
