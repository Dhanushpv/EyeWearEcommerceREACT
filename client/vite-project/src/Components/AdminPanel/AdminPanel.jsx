

import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AdminPanel() {
  const navigate = useNavigate();
  let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
  const [totalSeller, setTotalSeller] = useState(0); // State for total seller count
  const [totalBuyer, setTotalBuyer] = useState(0); // State for total seller count
  const [totalOrders, setTotalOrders] = useState(0); // State for total seller count
  const [totalRevenue, setTotalRevenue] = useState(0); // State for total seller count
  const [BestSeller, setBestSeller] = useState(0); // State for total seller count



  // Fetch best-seller data for the chart
  async function fetchBestSellerData() {
    try {
      const response = await axios.get("http://localhost:3000/bestseller");
      const data = response.data;
    

      console.log("Raw response data:", data); // Inspect the structure

        setBestSeller(data)
    
    } catch (error) {
      console.error("Error fetching best-seller data:", error);
    }
  }

  async function fetchTotalSeller() {
    try {
      const response = await axios.get("http://localhost:3000/totalseller");
      const data = response.data;

      console.log("Total seller response:", data); // Log the response
      setTotalSeller(data.totalSeller); // Assume the response has a `count` property
      // console.log("Updated totalSeller:", data.count || 0);
    } catch (error) {
      console.error("Error fetching total seller count:", error);
    }
  }

  async function fetchTotalBuyer() {
    try {
      const response = await axios.get("http://localhost:3000/totalbuyers");
      const data = response.data;

      console.log("Total Buyer response:", data); // Log the response
      setTotalBuyer(data.totalBuyers); // Assume the response has a `count` property
      // console.log("Updated totalSeller:", data.count || 0);
    } catch (error) {
      console.error("Error fetching total seller count:", error);
    }
  }


  async function fetchTotalorders() {
    try {
      const response = await axios.get("http://localhost:3000/totalorders");
      const data = response.data;

      console.log("Total orders response:", data); // Log the response
      setTotalOrders(data.totalOrders); // Assume the response has a `count` property
      // console.log("Updated totalSeller:", data.count || 0);
    } catch (error) {
      console.error("Error fetching total seller count:", error);
    }
  }

  async function fetchTotalRevenue() {
    try {
      const response = await axios.get("http://localhost:3000/totalRevenue");
      const data = response.data;

      console.log("Total totalRevenue response:", data); // Log the response
      setTotalRevenue(data.totalRevenue); // Assume the response has a `count` property
      // console.log("Updated totalSeller:", data.count || 0);
    } catch (error) {
      console.error("Error fetching total seller count:", error);
    }
  }


  let chartInstance = null; // Declare the chart instance globally

  function renderChart(labels, sales) {
    const canvas = document.getElementById("bestSellerChart");
    const ctx = canvas.getContext("2d");
    // const ctx = document.getElementById("bestSellerChart").getContext("2d");

    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous chart if it exists
    }

    canvas.width = 400;
    canvas.height = 400;

    chartInstance = new Chart(ctx, {
      type: "bar", // Example chart type
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sales",
            data: sales,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Sales: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchBestSellerData();
    fetchTotalSeller();
    fetchTotalBuyer();
    fetchTotalorders();
    fetchTotalRevenue();
  }, []);
  const SellerList = () => {
    navigate (`/SellerList?login=${token_key}&id=${id}`)
};

const BuyerList = () => {
  navigate (`/BuyerList?login=${token_key}&id=${id}`)
};

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white h-screen shadow-md">
        <div className="p-6 pb-5">
          <h1 className="text-5xl pb-5">NOVA</h1>
          <ul>
            <li className="mb-4">
              <a className="flex items-center text-teal-500" href="#">
                <i className="fas fa-home mr-3"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-chart-line mr-3"></i>
                <span>Analytics</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-box-open mr-3"></i>
                <span>Products</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-tags mr-3"></i>
                <span>Offers</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-warehouse mr-3"></i>
                <span>Inventory</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-shopping-cart mr-3"></i>
                <span>Orders</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-chart-bar mr-3"></i>
                <span>Sales</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-user mr-3"></i>
                <span>Customer</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-envelope mr-3"></i>
                <span>Newsletter</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-600" href="#">
                <i className="fas fa-cog mr-3"></i>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <div className="flex items-center space-x-4">
            <input
              className="px-4 py-2 border rounded-md"
              placeholder="Search"
              type="text"
            />
            <i className="fas fa-calendar-alt text-gray-600"></i>
            <i className="fas fa-bell text-gray-600"></i>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md"onClick={BuyerList}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Buyer</span>
              <i className="fas fa-shopping-cart text-teal-500"></i>
            </div>
            <div id="totalBuyer" className="text-2xl font-semibold mb-2">
            {` ${totalBuyer}` || "Loading..."}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md" onClick={SellerList}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Seller</span>
              <i className="fas fa-shopping-cart text-teal-500"></i>
            </div>
            <div id="totalseller" className="text-2xl font-semibold mb-2">
            {` ${totalSeller}` || "Loading..."}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Revenue</span>
              <i className="fas fa-user text-teal-500"></i>
            </div>
            <div id="totalseller" className="text-2xl font-semibold mb-2">
            {` $${totalRevenue}` || "Loading..."}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Orders</span>
              <i className="fas fa-truck text-teal-500"></i>
            </div>
            <div id="totalOrders" className="text-2xl font-semibold mb-2">
            {` ${totalOrders}` || "Loading..."}
            </div>
            
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 mt-10">Best Seller</h2>
        <div className="flex gap-3 flex-wrap justify-center pt-6">
        {BestSeller ? (
  <div className="">
    <div className="">
      <img
        src={`http://localhost:3000/${BestSeller.images[0].url}`}
        alt={BestSeller.title}
        style={{
          // width: "100%",
          // height: "25vh",
          borderRadius: "20px",
        }}
      />
    </div>
    <div className="">
      {/* <p className="text-title">{BestSeller.title.slice(0, 20) + "..."}</p> */}
      <p className="text-body">{BestSeller.description.slice(0, 20)}</p>
      <span className="text-title">{BestSeller.price}</span>
    </div>
  </div>
) : (
  <p>No wishlist items available</p>
)}

        </div>
        </div>


      </div>
    </div>
  );
}

export default AdminPanel;