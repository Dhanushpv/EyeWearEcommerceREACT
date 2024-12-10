
import React, { useState, useEffect } from "react";

function AddressPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    flatDetails: "",
    streetDetails: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [addresses, setAddresses] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddAddressClick = () => {
    setShowForm(!showForm);
    setMessage("");
  };

  const hideForm = () => {
    setShowForm(false);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addAddress();
      setMessage("Address added successfully!");
      setFormData({
        fullName: "",
        flatDetails: "",
        streetDetails: "",
        landmark: "",
        city: "",
        pincode: "",
        state: "",
      });
      setShowForm(false);
    } catch (error) {
      setMessage("Failed to add address. Please try again.");
      console.error("Error adding address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function addAddress() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let token_key = params.get("login");
    let token = localStorage.getItem(token_key);

    if (!id) {
      alert("User ID is missing!");
      return;
    }

    try {
      let data = {
        firstName: formData.fullName,
        flatDetails: formData.flatDetails,
        streetDetails: formData.streetDetails,
        landmark: formData.landmark,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
      };

      let response = await fetch(`http://localhost:3000/addAddress/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      let parsed_Response = await response.json();

      if (response.ok) {
        alert("Address successfully added");
        hideForm();
        addressLoad(); // Reload addresses after adding a new one
      } else {
        alert(parsed_Response.message || "Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("An error occurred while adding the address.");
    }
  }

  async function addressLoad() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let token_key = params.get("login");
    let token = localStorage.getItem(token_key);

    try {
      let AddressFetch = await fetch(`http://localhost:3000/addAddressLoad/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const parsed_data = await AddressFetch.json();
      setAddresses(parsed_data.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  }

  useEffect(() => {
    addressLoad();
  }, []);

  return (
    <>
      <div>
        <nav className="p-3 bg-white">
          <div className="d-flex justify-content-between align-item-center container-lg">
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
              <div className="mt-auto border-t border-slate-800 px-2 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full"><img className="rounded-full h-full w-full" src="https://picsum.photos/200" alt="" /></div>
                  <div>
                    <p className="text-sm text-white">Dadda Hicham</p>
                    <p className="text-xs text-slate-400">creator</p>
                  </div>
                </div>
              </div>

            </div>}
          </div>
          <div className="w-full bg-slate-200">
            <div className="px-10 pt-10 flex gap-5">
              {!showForm ? (
                <div
                  className="bg-white box-content border-dashed h-auto w-52 p-4 border-3 rounded-lg border-neutral-700 place-items-center"
                  onClick={handleAddAddressClick}
                >
                  <div className="py-56 flex  items-center justify-center place-items-center">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>
                    <div className="text-xl">Add Address</div>
                  </div>
                </div>
              ) : (
                <div className="container mx-auto">
                  <button className=" top-0 right-0 m-3 text-lg" onClick={hideForm}>
                    &times;
                  </button>
                  <h2 className="text-center mb-4">Add New Address</h2>
                  <form
                    className="p-4 border rounded bg-gray-200 shadow-sm w-full"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="flatDetails" className="form-label">
                        Flat Details
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="flatDetails"
                        value={formData.flatDetails}
                        onChange={handleInputChange}
                        placeholder="Flat Details"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="streetDetails" className="form-label">
                        Street Details
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="streetDetails"
                        value={formData.streetDetails}
                        onChange={handleInputChange}
                        placeholder="Street Details"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="landmark" className="form-label">
                        Landmark
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        placeholder="Landmark"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded-md"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Add Address"}
                    </button>
                  </form>
                </div>
              )}

              {/* Addresses Section */}
              {!showForm && (
                <div id="loadAddresspage" className="flex flex-wrap gap-5">
                  {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <div
                        key={index}
                        className="bg-white border-dashed h-auto w-full md:w-1/3 lg:w-1/4 p-4 border-3 rounded-lg border-neutral-700 shadow-md"
                      >
                        <div className="text-base text-cyan-400 text-center bg-cyan-700 p-2 rounded-md">
                          {address.firstName}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          FlatDetails: {address.flatDetails}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          Landmark: {address.landmark}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          City: {address.city}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          State: {address.state}
                        </div>
                        <div className="text-base text-zinc-800 text-left pt-2">
                          Pincode: {address.pincode}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No addresses found.</p>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressPage;
