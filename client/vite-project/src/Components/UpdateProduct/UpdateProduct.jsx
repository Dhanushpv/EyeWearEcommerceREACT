


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function UpdateProduct() {
//   // Get URL query params
//   let params = new URLSearchParams(window.location.search);
//   let productIdFromParams = params.get("productId");
//   let token_key = params.get("login");
//   let token = localStorage.getItem(token_key); // Assuming a token for authorization (e.g., JWT)

//   // State to store product details
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     brand: "",
//     price: "",
//     stock: "",
//     rating: "",
//     category: "",
//     gender: "",
//     images: [],
//   });
  

//   // State for categories and genders
//   const [categories, setCategories] = useState([]);
//   const [genders, setGenders] = useState([]);

//   // State for file input
//   const [selectedImages, setSelectedImages] = useState([]);

//   const [isLoading, setIsLoading] = useState(true); // For loading state
//   const [error, setError] = useState(null); // For handling errors
//   const navigate = useNavigate(); // To navigate after the update (React Router v6)

//   // Fetch the product details from the backend using the productId from URL params
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       if (!productIdFromParams) {
//         setError("Product ID is missing in URL parameters.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         // Fetch the product using the productId from the query params
//         const response = await axios.get(`http://localhost:3000/SingleProductList/${productIdFromParams}`);
//         if (response.status === 200) {
//           setProduct(response.data.data); // Set the product data to state
//           setIsLoading(false);
//         } else {
//           setError("Product not found.");
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching product data", error);
//         setError("Failed to fetch product data");
//         setIsLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [productIdFromParams]); // Only re-fetch when productIdFromParams changes

//   // Fetch categories and genders using the Addpage function
//   useEffect(() => {
//     const Addpage = async () => {
//       try {
//         // Fetch categories
//         let categoryResponse = await fetch("http://localhost:3000/fetchCategory", {
//           method: "GET",
//         });
//         let categoryData = await categoryResponse.json();
//         setCategories(categoryData.data); 
//         console.log("setcategories",categoryData.data)

//         // Fetch genders
//         let genderResponse = await fetch("http://localhost:3000/fetchGender", {
//           method: "GET",
//         });
//         let genderData = await genderResponse.json();
//         setGenders(genderData.data); // Set genders in state

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     Addpage();
//   }, []); // Run once when the component mounts

//   // Handle image file selection
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files); // Get selected files
//     setSelectedImages(files); // Update the state with the selected images
//   };

//   // Handle form submission to update the product
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     // Append other product fields to formData
//     formData.append("title", product.title);
//     formData.append("description", product.description);
//     formData.append("brand", product.brand);
//     formData.append("price", product.price);
//     formData.append("stock", product.stock);
//     formData.append("rating", product.rating);
//     formData.append("category", product.category);
//     formData.append("gender", product.gender);

//     // Append images to formData
//     selectedImages.forEach((image, index) => {
//       formData.append(`images[${index}]`, image);
//     });

//     try {
//       // Make PUT request to update the product
//       const response = await axios.put(`http://localhost:3000/productupdation/${productIdFromParams}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Set the content type for file uploads
//           Authorization: `Bearer ${token}`, // Send token if required
//         },
//       });

//       if (response.status === 200) {
//         alert("Product updated successfully!");
//         navigate("/products"); // Redirect to the product list page using navigate
//       } else {
//         alert("Failed to update product");
//       }
//     } catch (error) {
//       console.error("Error updating product", error);
//       alert("Failed to update product");
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error state
//   }

//   return (
//     <>
//       <div className="h-screen">
//         <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
//           <div className="flex items-center justify-between py-2 text-5x1">
//             <div className="font-bold text-blue-900 text-xl">
//               Seller<span className="text-orange-600">Panel</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex h-full pt-5 pb- bg-slate-200">
//           <div className="w-full bg-slate-200 h-full">
//             <h1 className="form-title px-5 fs-1 fw-bolder pt-5 place-self-center underline underline-offset-8">
//               Update Product
//             </h1>
//             <form className="product-form w-full" onSubmit={handleSubmit}>
//               <div className="d-flex w-full">
//                 <div className="container px-4 pt-4">
//                   <span className="d-flex flex-column bg-white border-1 border-gray-600 px-2 pt-2 pb-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl">
//                     <div className="p-2 d-flex flex-column">
//                       <label htmlFor="title">Product Title</label>
//                       <input
//                         className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                         type="text"
//                         name="title"
//                         id="title"
//                         placeholder="Product Title"
//                         value={product.title}
//                         onChange={(e) => setProduct({ ...product, title: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div className="p-2 d-flex flex-column">
//                       <label htmlFor="description">Product Description</label>
//                       <input
//                         className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                         type="text"
//                         name="description"
//                         id="description"
//                         placeholder="Product Description"
//                         value={product.description}
//                         onChange={(e) => setProduct({ ...product, description: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div className="p-2 d-flex flex-column">
//                       <label htmlFor="brand">Product Brand</label>
//                       <input
//                         className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                         type="text"
//                         name="brand"
//                         id="brand"
//                         placeholder="Brand"
//                         value={product.brand}
//                         onChange={(e) => setProduct({ ...product, brand: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </span>
//                   <div className="pt-4">
//                     <div className="bg-white border-1 border-gray-600 px-2 pt-2 pb-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl">
//                       <div className="d-flex">
//                         <div className="w-full p-2">
//                           <label htmlFor="price">Price</label>
//                           <input
//                             className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                             type="number"
//                             name="price"
//                             id="price"
//                             placeholder="Price"
//                             value={product.price}
//                             onChange={(e) => setProduct({ ...product, price: e.target.value })}
//                             required
//                           />
//                         </div>
//                         <div className="w-full p-2">
//                           <label htmlFor="stock">Stock</label>
//                           <input
//                             className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                             type="number"
//                             name="stock"
//                             id="stock"
//                             placeholder="Stock"
//                             value={product.stock}
//                             onChange={(e) => setProduct({ ...product, stock: e.target.value })}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="p-2">
//                         <label htmlFor="rating">Rating</label>
//                         <input
//                           className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                           type="number"
//                           name="rating"
//                           id="rating"
//                           placeholder="Rating"
//                           value={product.rating}
//                           onChange={(e) => setProduct({ ...product, rating: e.target.value })}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Category and Gender Dropdowns */}
//                 <div className="container px-4 pt-4">
//                   <div className="pt-3">
//                     <div className="bg-white border-1 border-gray-600 px-2 pt-2 pb-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl">
//                       <div className="p-2">
//                         <label htmlFor="category">Category</label>
//                         <select
//                           className="form-input_category bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                           name="category"
//                           id="category"
//                           value={product.category}
//                           onChange={(e) => setProduct({ ...product, category: e.target.value })}
//                           required
//                         >
//                           <option value="">Select Category</option>
//                           {categories.map((category) => (
//                             <option key={category.category} value={category.category}>
//                               {category.category}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div className="p-2">
//                         <label htmlFor="gender">Gender</label>
//                         <select
//                           className="form-input_gender bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                           name="gender"
//                           id="gender"
//                           value={product.gender}
//                           onChange={(e) => setProduct({ ...product, gender: e.target.value })}
//                           required
//                         >
//                           <option value="">Select Gender</option>
//                           {genders.map((gender) => (
//                             <option key={gender.gender} value={gender.gender}>
//                               {gender.gender}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Image Upload */}
//                   {/* <div className="p-2">
//                     <label htmlFor="images">Product Images</label>
//                     <input
//                       type="file"
//                       id="images"
//                       name="images"
//                       accept="image/*"
//                       multiple
//                       onChange={handleImageChange}
//                     />
//                     <div className="pt-2">
//                       <p>Selected Images:</p>
//                       {selectedImages.length > 0 && selectedImages.map((image, index) => (
//                         <p key={index}>{image.name}</p>
//                       ))}
//                     </div>
//                   </div> */}
//                   <div className="pt-4">
//                   <div className="container1 place-items-center w-full h-auto  bg-white   pt-4 rounded-lg border-neutral-700">
//                     <div className="header  w-full  h-auto pb-5">
//                       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <g>
//                           <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                         </g>
//                       </svg>
//                       <p id="upload-message" className="overflow-auto">Browse File to upload!</p>
//                     </div>


//                     <div className="flex items-center justify-center p-2  w-full  bg-slate-300">
//                       <label className="footer ">
//                         <p>Upload File<input type="file" className="file_inputtype1" id="image" name="images" multiple  /></p>
//                       </label>
//                     </div>
//                   </div>
//                   </div>

//                   <div className="relative pl-20">
//                     <button
//                       className="form-button w-5/6 place-content-center bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 pt-2 pb-2 absolute left-50 right-50 top-3 rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
//                       type="submit"
//                     >
//                       Update Product
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UpdateProduct;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProduct() {
  // Get URL query params
  let params = new URLSearchParams(window.location.search);
  let id = params.get("productId");
  let token_key = params.get("login");
  let token = localStorage.getItem(token_key); // Assuming a token for authorization (e.g., JWT)

  // State to store product details
  const [product, setProduct] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
    rating: "",
    category: "",
    gender: "",
    images: [],
  });
  

  // State for categories and genders
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);

  // State for file input
  const [selectedImages, setSelectedImages] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate(); // To navigate after the update (React Router v6)

  // Fetch the product details from the backend using the productId from URL params
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) {
        setError("Product ID is missing in URL parameters.");
        setIsLoading(false);
        return;
      }

      try {
        // Fetch the product using the productId from the query params
        const response = await axios.get(`http://localhost:3000/SingleProductList/${id}`);
        if (response.status === 200) {
          setProduct(response.data.data); // Set the product data to state
          setIsLoading(false);
        } else {
          setError("Product not found.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product data", error);
        setError("Failed to fetch product data");
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); // Only re-fetch when productIdFromParams changes

  // Fetch categories and genders using the Addpage function
  useEffect(() => {
    const Addpage = async () => {
      try {
        // Fetch categories
        let categoryResponse = await fetch("http://localhost:3000/fetchCategory", {
          method: "GET",
        });
        let categoryData = await categoryResponse.json();
        setCategories(categoryData.data); 
        console.log("Categories fetched:", categoryData.data)

        // Fetch genders
        let genderResponse = await fetch("http://localhost:3000/fetchGender", {
          method: "GET",
        });
        let genderData = await genderResponse.json();
        setGenders(genderData.data); // Set genders in state

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    Addpage();
  }, []); // Run once when the component mounts

  // Handle image file selection
  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files); // Get selected files
  //   setSelectedImages(files); // Update the state with the selected images
  //   console.log("Selected images:", files);
  // };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append other product fields to formData
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("brand", product.brand);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("rating", product.rating);
    formData.append("category", product.category);
    formData.append("gender", product.gender);

    // Append images to formData
    // selectedImages.forEach((image, index) => {
    //   formData.append(`images[${index}]`, image);
    // });

    try {
      // Make PUT request to update the product
      const response = await axios.put(`http://localhost:3000/productupdation/${id}`, formData, {
        headers: {
      
          Authorization: `Bearer ${token}`, // Send token if required
        },
      });

      if (response.status === 200) {
        alert("Product updated successfully!");
        navigate("/products"); // Redirect to the product list page using navigate
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product", error);
      alert("Failed to update product");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error state
  }

  return (
    <>
      <div className="h-screen">
        <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
          <div className="flex items-center justify-between py-2 text-5x1">
            <div className="font-bold text-blue-900 text-xl">
              Seller<span className="text-orange-600">Panel</span>
            </div>
          </div>
        </div>

        <div className="flex h-full pt-5 pb- bg-slate-200">
          <div className="w-full bg-slate-200 h-full">
            <h1 className="form-title px-5 fs-1 fw-bolder pt-5 place-self-center underline underline-offset-8">
              Update Product
            </h1>
            <form className="product-form w-full" onSubmit={handleSubmit}>
              <div className="d-flex w-full">
                <div className="container px-4 pt-4">
                  <span className="d-flex flex-column bg-white border-1 border-gray-600 px-2 pt-2 pb-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl">
                    <div className="p-2 d-flex flex-column">
                      <label htmlFor="title">Product Title</label>
                      <input
                        className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Product Title"
                        value={product.title}
                        onChange={(e) => {
                          setProduct({ ...product, title: e.target.value });
                          console.log("Title changed to:", e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="p-2 d-flex flex-column">
                      <label htmlFor="description">Product Description</label>
                      <input
                        className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Product Description"
                        value={product.description}
                        onChange={(e) => {
                          setProduct({ ...product, description: e.target.value });
                          console.log("Description changed to:", e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="p-2 d-flex flex-column">
                      <label htmlFor="brand">Product Brand</label>
                      <input
                        className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                        type="text"
                        name="brand"
                        id="brand"
                        placeholder="Brand"
                        value={product.brand}
                        onChange={(e) => {
                          setProduct({ ...product, brand: e.target.value });
                          console.log("Brand changed to:", e.target.value);
                        }}
                        required
                      />
                    </div>
                  </span>
                  <div className="pt-4">
                    <div className="bg-white border-1 border-gray-600 px-2 pt-2 pb-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl">
                      <div className="d-flex">
                        <div className="w-full p-2">
                          <label htmlFor="price">Price</label>
                          <input
                            className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Price"
                            value={product.price}
                            onChange={(e) => {
                              setProduct({ ...product, price: e.target.value });
                              console.log("Price changed to:", e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="w-full p-2">
                          <label htmlFor="stock">Stock</label>
                          <input
                            className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                            type="number"
                            name="stock"
                            id="stock"
                            placeholder="Stock"
                            value={product.stock}
                            onChange={(e) => {
                              setProduct({ ...product, stock: e.target.value });
                              console.log("Stock changed to:", e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="p-2">
                        <label htmlFor="rating">Rating</label>
                        <input
                          className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                          type="number"
                          name="rating"
                          id="rating"
                          placeholder="Rating"
                          value={product.rating}
                          onChange={(e) => {
                            setProduct({ ...product, rating: e.target.value });
                            console.log("Rating changed to:", e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category and Gender Dropdowns */}
                <div className="container px-4 pt-4">
                  <div className="pt-3">
                    <div className="bg-white border-1 border-gray-600 px-2 pt-2 pb-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl">
                      <div className="p-2">
                        <label htmlFor="category">Category</label>
                        <select
                          className="form-input_category bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                          name="category"
                          id="category"
                          value={product.category}
                          onChange={(e) => {
                            setProduct({ ...product, category: e.target.value });
                            console.log("Category changed to:", e.target.value,"typeof",typeof(e.target.value));
                          }}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.category} value={category.category}>
                              {category.category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="p-2">
                        <label htmlFor="gender">Gender</label>
                        <select
                          className="form-input_gender bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl"
                          name="gender"
                          id="gender"
                          value={product.gender}
                          onChange={(e) => {
                            setProduct({ ...product, gender: e.target.value });
                            console.log("Gender changed to:", e.target.value);
                          }}
                          required
                        >
                          <option value="">Select Gender</option>
                          {genders.map((gender) => (
                            <option key={gender.gender} value={gender.gender}>
                              {gender.gender}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                
                  <div className="pt-4">
                    <div className="container1 place-items-center w-full h-auto  bg-white   pt-4 rounded-lg border-neutral-700">
                      <div className="header  w-full  h-auto pb-5">
                        <button
                          className="bg-gray-900 w-full py-3 text-white font-bold text-lg uppercase rounded-lg "
                          type="submit"
                        >
                          Update Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
