
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../SellerProducts/SellerProducts.css";

// function SellerProducts() {
//   const [products, setProducts] = useState([]); // State for storing product data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     const fetchSellerData = async () => {
//       try {
//         let params = new URLSearchParams(window.location.search);
//         let id = params.get("id"); // Get the user ID
//         let token_key = params.get("login");
//         let token = localStorage.getItem(token_key);

//         const response = await axios.get(
//           `http://localhost:3000/MerchandiseHub/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setProducts(response.data.data); // Assuming API returns a `data` property
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching seller data:", err);
//         setError("Failed to load products. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchSellerData();
//   }, []);

//   const handleRemove = async (id) => {
//     try {
//       let params = new URLSearchParams(window.location.search);
//       let token_key = params.get("login");
//       let token = localStorage.getItem(token_key);

//       const response = await axios.delete(
//         `http://localhost:3000/DeleteProduct/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert(response.data.message); // Assuming the API sends a success message
//       setProducts((prevProducts) =>
//         prevProducts.filter((product) => product._id !== id)
//       ); // Remove the deleted product from the state
//     } catch (err) {
//       console.error("Error occurred while deleting the product:", err);
//       alert("Failed to delete the product. Please try again later.");
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full">
//       <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
//         <div className="flex items-center justify-between py-2 text-5x1">
//           <div className="font-bold text-blue-900 text-xl">
//             Seller<span className="text-orange-600">Panel</span>
//           </div>
//           <div className="flex items-center text-gray-500">
//             <div className="container">
//               <input
//                 type="text"
//                 name="text"
//                 className="input"
//                 required=""
//                 placeholder="Type to search..."
//               />
//             </div>
//             <span
//               className="material-icons-outlined p-2"
//               style={{ fontSize: 30 }}
//             >
//               notifications
//             </span>
//             <div
//               className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2"
//               style={{
//                 backgroundImage:
//                   "url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)",
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//       <div className="px-5 pt-36">
//         <div id="SellerView" className="flex gap-3 flex-wrap">
//           {products.map((product) => (
//             <div className="card1" key={product._id}>
//               <div className="card-img1">
//                 <img
//                   src={`http://localhost:3000/${product.images[0].url}`}
//                   alt={product.title}
//                   style={{ width: "100%", height: "25vh", borderRadius: "20px" }}
//                 />
//               </div>
//               <div className="card-info1">
//                 <p className="text-title">{product.title}</p>
//                 <p className="text-body">{product.description}</p>
//                 <span className="text-title">{product.price}</span>
//               </div>
//               <div className="card-footer1">
//                 <div className="card-button1" onClick={UpdateClick}>
//                   <svg
//                     className="svg-icon"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path d="M15.25 2.75l2 2c.292.292.292.768 0 1.06L6.31 16.75l-4.06.75.75-4.06L15.19 2.75c.292-.292.768-.292 1.06 0z" />
//                     <path d="M13 5l2 2" />
//                   </svg>
//                 </div>
//                 <div
//                   className="card-button1"
//                   onClick={() => handleRemove(product._id)}
//                 >
//                   <svg
//                     className="svg-icon"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="red"
//                     stroke="red"
//                     strokeWidth="3"
//                   >
//                     <path d="M3 6h18M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M10 11v6M14 11v6" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SellerProducts;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import axios from "axios";
import "../SellerProducts/SellerProducts.css";

function SellerProducts() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let token_key = params.get("login");
  let token = localStorage.getItem(token_key);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigating to the update page

  useEffect(() => {
   
    const fetchSellerData = async () => {
      try {
        let params = new URLSearchParams(window.location.search);
        let id = params.get("id");
        let token_key = params.get("login");
        let token = localStorage.getItem(token_key);

        const response = await axios.get(
          `http://localhost:3000/MerchandiseHub/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching seller data:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const handleRemove = async (id) => {
    try {
      let params = new URLSearchParams(window.location.search);
      let token_key = params.get("login");
      let token = localStorage.getItem(token_key);

      const response = await axios.delete(
        `http://localhost:3000/DeleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (err) {
      console.error("Error occurred while deleting the product:", err);
      alert("Failed to delete the product. Please try again later.");
    }
  };

  const UpdateClick = (productId) => {
    // Navigate to the update page with the product ID
    navigate(`/UpdateProduct?login=${token_key}&id=${id}&productId=${productId}`)
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full">
      <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
        <div className="flex items-center justify-between py-2 text-5x1">
          <div className="font-bold text-blue-900 text-xl">
            Seller<span className="text-orange-600">Panel</span>
          </div>
          <div className="flex items-center text-gray-500">
            <div className="container">
              <input
                type="text"
                name="text"
                className="input"
                required=""
                placeholder="Type to search..."
              />
            </div>
            <span
              className="material-icons-outlined p-2"
              style={{ fontSize: 30 }}
            >
              notifications
            </span>
            <div
              className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2"
              style={{
                backgroundImage:
                  "url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="px-5 pt-36">
        <div id="SellerView" className="flex gap-3 flex-wrap">
          {products.map((product) => (
            <div className="card1" key={product._id}>
              <div className="card-img1">
                <img
                  src={`http://localhost:3000/${product.images[0].url}`}
                  alt={product.title}
                  style={{ width: "100%", height: "25vh", borderRadius: "20px" }}
                />
              </div>
              <div className="card-info1">
                <p className="text-title">{product.title.slice(0,10)}</p>
                <p className="text-body">{product.description.slice(0,50)}</p>
                <span className="text-title">{product.price}</span>
              </div>
              <div className="card-footer1">
                <div className="card-button1" onClick={()=>UpdateClick(product._id)}>
                  <svg
                    className="svg-icon"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15.25 2.75l2 2c.292.292.292.768 0 1.06L6.31 16.75l-4.06.75.75-4.06L15.19 2.75c.292-.292.768-.292 1.06 0z" />
                    <path d="M13 5l2 2" />
                  </svg>
                </div>
                <div
                  className="card-button1"
                  onClick={() => handleRemove(product._id)}
                >
                  <svg
                    className="svg-icon"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    stroke="red"
                    strokeWidth="3"
                  >
                    <path d="M3 6h18M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M10 11v6M14 11v6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerProducts;
