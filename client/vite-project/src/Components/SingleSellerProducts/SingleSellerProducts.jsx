

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import axios from "axios";
import '../SingleSellerProducts/SingleSellerProducts.css'


function SingleSellerProducts() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let token_key = params.get("login");
  let token = localStorage.getItem(token_key);
  const [data, setProducts] = useState([]);
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
          `http://localhost:3000/SingleSellerproducts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)

        let data = response.data.products
        console.log("data",data)


        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching seller data:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);



  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-zinc-100 h-full">
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
      <div className="px-5 pt-36 container">
      <div id="SellerView" className="flex gap-3 flex-wrap justify-center">
        {data.map((product) => (
          <div className="card1" key={product._id}>
            <div className="card-img1">
              <img
                src={`http://localhost:3000/${product.images[0].url}`}
                alt={product.title}
                style={{ width: "100%", height: "25vh", borderRadius: "20px" }}
              />
            </div>
            <div className="card-info1">
              <p className="text-title">{product.title.slice(0, 10)}</p>
              <p className="text-body">{product.description.slice(0, 50)}</p>
              <span className="text-title">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
}

export default SingleSellerProducts;
