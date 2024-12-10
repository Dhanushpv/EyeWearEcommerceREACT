function ContactPage(){
    return(
        <>
      <nav className="p-3 bg-white">
        {/* <div className="bg-dark text-white text-center fw-light">FREE SHIPPING ON ORDERS OVER $75</div> */}
        <div className="d-flex justify-content-between align-items-center container-lg">
          <div className="text-center line">
            <span className="logo_sub1">NO</span>
            <span className="logo_sub1">VA</span>
          </div>
          <div className="pt-4 d-flex justify-content-between align-items-center px-5">
            <div className="px-3">
              <span>All Products</span>
            </div>
            <div className="px-3">
              <span>New Arrivals</span>
            </div>
            <div className="px-3">
              <span>Sunglasses</span>
            </div>
            <div className="px-3">
              <span>Eyeglasses</span>
            </div>
            <div className="px-3">
              <span>About</span>
            </div>
            <div className="px-3">
              <span>Gift Card</span>
            </div>
          </div>
          {/* <div id="" className="pt-2 profile"></div>
          <div id="" className="pt-4 loginSection"></div> */}
        </div>
      </nav>

      <div className="flex">
        <div className="bg-zinc-100 w-1/4">
          <div className="flex min-h-screen w-[250px] flex-col bg-gray-900 pt-10">
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
            <div className="mt-auto border-t border-slate-800 px-2 py-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <img className="rounded-full h-full w-full" src="https://picsum.photos/200" alt="" />
                </div>
                <div>
                  <p className="text-sm text-white">Dadda Hicham</p>
                  <p className="text-xs text-slate-400">creator</p>
                </div>
                <button
                  className="relative ml-auto flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-slate-200">
          <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Our Customer Service</h1>
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">📞 Phone</h2>
                  <p className="text-lg text-gray-600 mb-4">Call us at:</p>
                  <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800 font-bold text-xl">+123 456 7890</a>
                  <p className="text-gray-500 mt-2">Available 24/7</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">💬 Chat</h2>
                  <p className="text-lg text-gray-600 mb-4">Start a conversation with our customer service team via chat.</p>
                  <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Start Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

        
    )
}
export default ContactPage