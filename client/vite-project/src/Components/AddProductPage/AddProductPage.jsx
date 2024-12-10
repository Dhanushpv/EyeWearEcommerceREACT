import { useEffect } from "react";

function AddProductPage() {
  const Addpage = async () => {
    try {
      let response = await fetch("http://localhost:3000/fetchCategory", {
        method: "GET",
      });
      let parsed_data = await response.json();
      let data = parsed_data.data;

      let selection_Categories = document.getElementById("selection_Categories");
      let rows = '<option selected disabled>Select Categories</option>';
      for (let i = 0; i < data.length; i++) {
        rows += `<option value="${data[i].category}">${data[i].category}</option>`;
      }
      selection_Categories.innerHTML = rows;

      let additionalResponse = await fetch("http://localhost:3000/fetchGender", {
        method: "GET",
      });
      let additionalData = await additionalResponse.json();

      let genderChoice = additionalData.data;
      let selection_Subcategories = document.getElementById("selection_Gender");
      let subcategoryRows = '<option selected disabled>Select Gender</option>';
      for (let i = 0; i < genderChoice.length; i++) {
        subcategoryRows += `<option value="${genderChoice[i].gender}">${genderChoice[i].gender}</option>`;
      }
      selection_Subcategories.innerHTML = subcategoryRows;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    Addpage();

    // Attach the image upload preview functionality
    const imageInput = document.getElementById("image");
    const uploadMessage = document.getElementById("upload-message");
    const svgIcon = document.querySelector(".header svg");

    const handleImageChange = (event) => {
      if (svgIcon) {
        svgIcon.remove();
      }

      uploadMessage.innerHTML = "";

      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const imageContainer = document.createElement("div");
            imageContainer.style.position = "relative";
            imageContainer.style.display = "inline-block";
            imageContainer.style.margin = "5px";

            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "200px";
            img.style.height = "200px";
            img.style.objectFit = "contain";
            img.style.border = "1px solid black";
            img.alt = file.name;

            const removeButton = document.createElement("button");
            removeButton.textContent = "✖";
            removeButton.style.position = "absolute";
            removeButton.style.top = "0";
            removeButton.style.right = "0";
            removeButton.style.backgroundColor = "red";
            removeButton.style.color = "white";
            removeButton.style.border = "none";
            removeButton.style.borderRadius = "50%";
            removeButton.style.cursor = "pointer";
            removeButton.style.width = "20px";
            removeButton.style.height = "20px";
            removeButton.style.display = "flex";
            removeButton.style.justifyContent = "center";
            removeButton.style.alignItems = "center";

            removeButton.addEventListener("click", () => {
              imageContainer.remove();
            });

            imageContainer.appendChild(img);
            imageContainer.appendChild(removeButton);

            uploadMessage.appendChild(imageContainer);
          };

          reader.readAsDataURL(file);
        }
      }
    };

    imageInput.addEventListener("change", handleImageChange);

    // Cleanup function to remove the event listener
    return () => {
      imageInput.removeEventListener("change", handleImageChange);
    };
  }, []);

  const AddProducts = async (event) => {
    event.preventDefault();

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let token_key = params.get("login");
    let token = localStorage.getItem(token_key);

    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();
    let price = document.getElementById("price").value.trim();
    let category = document.getElementById("selection_Categories").value.trim();
    let gender = document.getElementById("selection_Gender").value.trim();
    let brand = document.getElementById("brand").value.trim();
    let stock = document.getElementById("stock").value.trim();
    let rating = document.getElementById("rating").value.trim();
    let images = document.getElementById("image");

    if (!title || !description || !price || !category || !gender || !brand || !stock || !rating) {
      alert("All fields are required. Please fill out the form completely.");
      return;
    }

    if (images.files && images.files.length > 0) {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("gender", gender);
      formData.append("brand", brand);
      formData.append("stock", stock);
      formData.append("rating", rating);

      for (let file of images.files) {
        formData.append("images", file);
      }

      try {
        let response = await fetch(`http://localhost:3000/uploadProducts/${id}`, {
          method: "POST",
          body: formData,
        });

        if (response.status === 200) {
          alert("The product has been added successfully.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the product. Please try again later.");
      }
    } else {
      alert("Please upload at least one image for the product.");
    }
  };

  return (
        <>

      <div>
        <nav className="p-3 bg-white  ">
          {/* <div class="bg-dark text-white text-center fw-light ">FREE SHIPPING ON ORDERS OVER $75</div> */}
          <div className="d-flex justify-content-between   align-item-center container-lg  ">
            <div className="text-center line">
              <span className="logo_sub1">NO</span>
              <span className="logo_sub1">VA</span>
            </div>
            <div className="pt-4 d-flex justify-content-between align-item-center px-5">
              <div className="px-3"><span>All Products</span></div>
              <div className="px-3"><span>New Arrivals</span></div>
              <div className="px-3"><span>Sunglasses</span></div>
              <div className="px-3"><span>Eyeglasses</span></div>
              <div className="px-3"><span>About</span></div>
              <div className="px-3"><span>Gift Card</span></div>
            </div>
            {/* <div id="" class="pt-2 profile"></div>
                <div id="" class="pt-4 loginSection"></div> */}
          </div>
        </nav>
        <div className="flex ">
          <div className="bg-zinc-100 w-1/4">
            <div className="flex h-screen w-[250px] flex-col bg-gray-900 pt-10">
              <ul className="flex w-full flex-col gap-3 px-3">
                <li onclick="Your_Account()">
                  <span href className="flex items-center justify-start gap-2 rounded-full bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-200 ring-offset-2 ring-offset-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Your Orders</span>
                </li>
                <li>
                  <span href className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Login &amp; Security</span>
                </li>
                <li>
                  <span href className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Seller Dashboard</span>
                </li>
                <li>
                  <span href onclick="AddPageClick()" className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Add Products</span>
                </li>
                <li>
                  <span onclick="AddressPageClick()" className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Your Addresses</span>
                </li>
                <li>
                  <span onclick="WishListPageClick()" className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Your Wish List</span>
                </li>
                <li>
                  <span href onclick="PaymentPageClick()" className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Payment options</span>
                </li>
                <li>
                  <span href onclick="ContactPageClick()" className="flex items-center justify-start gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-slate-400 ring-offset-2 ring-offset-slate-950 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Contact Us</span>
                </li>
              </ul>
              <div className="mt-auto border-t border-slate-800 px-2 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full"><img className="rounded-full h-full w-full" src="https://picsum.photos/200" alt="" /></div>
                  <div>
                    <p className="text-sm text-white">Dadda Hicham</p>
                    <p className="text-xs text-slate-400">creator</p>
                  </div>
         
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200">
            <h1 className="form-title px-5 fs-1 fw-bolder pt-5 place-self-center underline underline-offset-8">Add New Product</h1>
            <form className="product-form w-full" onSubmit={AddProducts}>
              <div className="d-flex w-full">
                <div className="container  px-4 pt-4">
                  <span className="d-flex flex-column  bg-white border-1 border-gray-600 px-2 pt-2 pb-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl   rounded-tl-3xl  ">
                    <div className="p-2 d-flex flex-column ">
                      <label htmlFor>Product Title</label>
                      <div className="w-full">
                        <input className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl   rounded-tl-xl" type="text"  name="title" id="title" placeholder="Product Title" required />
                      </div>
                    </div>
                    <div className="p-2 d-flex flex-column">
                      <label htmlFor>Product Description</label>
                      <div className="w-full">
                        <input className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl   rounded-tl-xl" type="text" name="description" id="description" placeholder="Product Description" required />
                      </div>
                    </div>
                    <div className="p-2 d-flex flex-column">
                      <label htmlFor>Product Brand</label>
                      <div className="w-full "><input className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl   rounded-tl-xl" type="text" name="brand" id="brand" placeholder="Brand" required /></div>
                    </div>
                  </span>
                  <div className="pt-4">
                    <div className="bg-white border-1 border-gray-600 px-2 pt-2 pb-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl   rounded-tl-3xl">
                      <div className="d-flex">
                        <div className="w-full p-2">
                          <label htmlFor>Price</label>
                          <input className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl   rounded-tl-xl" type="number" name="price" id="price" placeholder="Price" required />
                        </div>
                        <div className="w-full p-2">
                          <label htmlFor>Stock</label>
                          <input className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl rounded-tl-xl" type="number" name="stock" id="stock" placeholder="Stock" required />
                        </div>
                      </div>
                      <div className="p-2">
                        <label htmlFor> Rating </label>
                        <input className="form-input bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl   rounded-tl-xl" type="number" name="rating" id="rating" placeholder="Rating" required />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ui verse */}
                <div className="container  px-4 pt-4 ">
                  <div className="container1 place-items-center w-full h-auto  bg-white  border-dashed   border-3 rounded-lg border-neutral-700">
                    <div className="header  w-full  h-auto pb-5">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                      </svg>
                      <p id="upload-message" className="overflow-auto">Browse File to upload!</p>
                    </div>

                 
                  <div className="flex items-center justify-center p-2  w-full  bg-slate-300">
                    <label className="footer ">
                      <p>Upload File<input type="file" className="file_inputtype1" id="image" name="images" multiple required /></p>
                    </label>
                  </div>
                </div>
                  <div className="pt-3">
                    <div className="bg-white border-1 border-gray-600 px-2 pt-2 pb-2   rounded-br-3xl rounded-tr-3xl rounded-bl-3xl   rounded-tl-3xl">
                      <div className="p-2">
                        <label htmlFor> Category </label>
                        <select className="form-input_category bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl   rounded-tl-xl" type="text" name="category" id="selection_Categories" placeholder="Category" required />
                      </div>
                      <div className="p-2">
                        <label htmlFor> Gender </label>
                        <select className="form-input_gender bg-white p-2 border border-3 text-gray-950 w-full rounded-br-xl rounded-tr-xl rounded-bl-xl   rounded-tl-xl" type="text" name="gender" id="selection_Gender" placeholder="Gender" required />
                      </div>
                    </div>
                  </div>
                  <div className="relative pl-20">
                    <button className="form-button w-5/6 place-content-center  box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 pt-2 pb-2 absolute  left-50  right-50 top-3 bot  rounded-br-xl rounded-tr-xl rounded-bl-xl   rounded-tl-xl" type="submit">Add Product</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

        
        </>
    )
}
export default AddProductPage