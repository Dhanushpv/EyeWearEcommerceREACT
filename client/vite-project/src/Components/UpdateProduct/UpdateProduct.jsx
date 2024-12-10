import { useEffect } from "react";

function UpdateProduct() {


  return (
        <>


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


        <div className="flex h-full pt-5 pb- bg-slate-200">
          {/* <div className="bg-zinc-100 w-1/4">
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
          </div> */}
          <div className="w-full bg-slate-200 h-full">
            <h1 className="form-title px-5 fs-1 fw-bolder pt-5 place-self-center underline underline-offset-8">Add New Product</h1>
            <form className="product-form w-full" >
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
                    <div className="header  w-56   pb-5">
                      <svg viewBox="0 0 24 24" fill="none" className="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
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
     

        
        </>
    )
}
export default UpdateProduct