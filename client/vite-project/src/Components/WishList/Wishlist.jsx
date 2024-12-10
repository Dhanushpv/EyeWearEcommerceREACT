function WishList(){
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
          <div className="bg-zinc-100">
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
          <div className="w-full">
            <div className="p-5">
              <div className="flex flex-wrap " id="WishListCard" />
            </div>
          </div>
        </div>
      </div>

        
        </>
    )
}
export default WishList