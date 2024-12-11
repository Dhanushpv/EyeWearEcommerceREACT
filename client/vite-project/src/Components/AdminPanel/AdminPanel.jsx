// import React from "react";
// import Chart from 'chart.js/auto';


// function AdminPanel() {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white h-screen shadow-md">
//         <div className="p-6">
//           <img
//             alt="Pixel Commerce Logo"
//             className="mb-6"
//             height={50}
//             src="https://storage.googleapis.com/a1aa/image/FTv75SVGCfViUazyfYtFQterwca1vlMNPIc9emwB5p2fFaOfE.jpg"
//             width={100}
//           />
//           <ul>
//             <li className="mb-4">
//               <a className="flex items-center text-teal-500" href="#">
//                 <i className="fas fa-home mr-3"></i>
//                 <span>Dashboard</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-chart-line mr-3"></i>
//                 <span>Analytics</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-box-open mr-3"></i>
//                 <span>Products</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-tags mr-3"></i>
//                 <span>Offers</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-warehouse mr-3"></i>
//                 <span>Inventory</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-shopping-cart mr-3"></i>
//                 <span>Orders</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-chart-bar mr-3"></i>
//                 <span>Sales</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-user mr-3"></i>
//                 <span>Customer</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-envelope mr-3"></i>
//                 <span>Newsletter</span>
//               </a>
//             </li>
//             <li className="mb-4">
//               <a className="flex items-center text-gray-600" href="#">
//                 <i className="fas fa-cog mr-3"></i>
//                 <span>Settings</span>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Overview</h1>
//           <div className="flex items-center space-x-4">
//             <input
//               className="px-4 py-2 border rounded-md"
//               placeholder="Search"
//               type="text"
//             />
//             <i className="fas fa-calendar-alt text-gray-600"></i>
//             <i className="fas fa-bell text-gray-600"></i>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-gray-600">Total Revenue</span>
//               <i className="fas fa-dollar-sign text-teal-500"></i>
//             </div>
//             <div className="text-2xl font-semibold mb-2">$82,650</div>
//             <div className="text-green-500">+11%</div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-gray-600">Total Order</span>
//               <i className="fas fa-shopping-cart text-teal-500"></i>
//             </div>
//             <div className="text-2xl font-semibold mb-2">1645</div>
//             <div className="text-green-500">+11%</div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-gray-600">Total Customer</span>
//               <i className="fas fa-user text-teal-500"></i>
//             </div>
//             <div className="text-2xl font-semibold mb-2">1,462</div>
//             <div className="text-red-500">-17%</div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-gray-600">Pending Delivery</span>
//               <i className="fas fa-truck text-teal-500"></i>
//             </div>
//             <div className="text-2xl font-semibold mb-2">117</div>
//             <div className="text-green-500">+5%</div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//           {/* <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Sales Analytic</h2>
//               <select className="border rounded-md px-4 py-2">
//                 <option>Jul 2023</option>
//               </select>
//             </div>
//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <div className="text-gray-600">Income</div>
//                 <div className="text-2xl font-semibold">23,262.00</div>
//                 <div className="text-blue-500">+0.05%</div>
//               </div>
//               <div>
//                 <div className="text-gray-600">Expenses</div>
//                 <div className="text-2xl font-semibold">11,135.00</div>
//                 <div className="text-orange-500">+0.05%</div>
//               </div>
//               <div>
//                 <div className="text-gray-600">Balance</div>
//                 <div className="text-2xl font-semibold">48,135.00</div>
//                 <div className="text-green-500">+0.05%</div>
//               </div>
//             </div>
//             <img
//               alt="Sales Analytic Graph"
//               height={200}
//               src="https://storage.googleapis.com/a1aa/image/EWamnhbQoGJeUi9faHJTGktE5IgL1OI0BLIZEi89Gh2oQz5TA.jpg"
//               width={600}
//             />
//           </div> */}
//           <canvas id="bestSellerChart" width="400" height="200"></canvas>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-4">Sales Target</h2>
//             <img
//               alt="Sales Target Chart"
//               className="mb-4"
//               height={200}
//               src="https://storage.googleapis.com/a1aa/image/15e9rNeG81qyBk1tgddpUID2zezd5vIuyNCAGv1yeS2wCNnPB.jpg"
//               width={200}
//             />
//             <div className="flex justify-between items-center mb-2">
//               <span>Daily Target</span>
//               <span className="text-red-500">650</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Monthly Target</span>
//               <span className="text-green-500">145,00</span>
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div className="text-center">
//                 <img
//                   alt="Air Jordan 8"
//                   className="mb-2"
//                   height={100}
//                   src="https://storage.googleapis.com/a1aa/image/ZQhfIaVq89yHOqH6EhgHFfEreXcT6ffe7fHf9kET1D5MqQz5TA.jpg"
//                   width={100}
//                 />
//                 <div>Air Jordan 8</div>
//                 <div className="text-gray-600">752 Pcs</div>
//               </div>
//               <div className="text-center">
//                 <img
//                   alt="Air Jordan 5"
//                   className="mb-2"
//                   height={100}
//                   src="https://storage.googleapis.com/a1aa/image/tcB7iyAly77HPpgCw8fWn4EfoOBr7ypx6fljbcrcTaohhmznA.jpg"
//                   width={100}
//                 />
//                 <div>Air Jordan 5</div>
//                 <div className="text-gray-600">752 Pcs</div>
//               </div>
//               <div className="text-center">
//                 <img
//                   alt="Air Jordan 13"
//                   className="mb-2"
//                   height={100}
//                   src="https://storage.googleapis.com/a1aa/image/AUHne7z08MWvE6zZs5IJkPaveNZy8nOf6BBObLlhfBX5CNnPB.jpg"
//                   width={100}
//                 />
//                 <div>Air Jordan 13</div>
//                 <div className="text-gray-600">752 Pcs</div>
//               </div>
//               <div className="text-center">
//                 <img
//                   alt="Nike Air Max"
//                   className="mb-2"
//                   height={100}
//                   src="https://storage.googleapis.com/a1aa/image/9SfvMf1e1xUhXpzMhcoZJVIftbY1p8Evxz6H1DLmPJctCNnPB.jpg"
//                   width={100}
//                 />
//                 <div>Nike Air Max</div>
//                 <div className="text-gray-600">752 Pcs</div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-4">Current Offer</h2>
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span>40% Discount Offer</span>
//                 <span className="text-gray-600">Expire on: 05-08-2023</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-teal-500 h-2.5 rounded-full"
//                   style={{ width: "70%" }}
//                 ></div>
//               </div>
//             </div>
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span>100 Taka Coupon</span>
//                 <span className="text-gray-600">Expire on: 10-09-2023</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-teal-500 h-2.5 rounded-full"
//                   style={{ width: "50%" }}
//                 ></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <span>Stock Out Sell</span>
//                 <span className="text-gray-600">Upcoming on: 14-09-2023</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-teal-500 h-2.5 rounded-full"
//                   style={{ width: "30%" }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// }


// export default AdminPanel;


import React, { useEffect } from "react";
import Chart from 'chart.js/auto';

function AdminPanel() {
  // Fetch the data from the server and create the chart
  async function fetchBestSellerData() {
    try {
      const response = await fetch('http://localhost:3000/bestseller');
      const data = await response.json();
      
      console.log("Raw response data:", data);  // Log the data to inspect its structure
    
      // Check if data is an object and extract values
      if (data && typeof data === 'object') {
        // Since the response is a single object, use its properties to build your chart data
        const labels = [data.description];  // Example: Use the description as a label
        const sales = [data.totalQuantity];  // Use totalQuantity as sales numbers
  
        renderChart(labels, sales);
      } else {
        console.error("Expected an object with product data, but got:", data);
      }
    } catch (error) {
      console.error('Error fetching best-seller data:', error);
    }
  }
   

  let chartInstance = null;  // Declare the chart instance globally

  function renderChart(labels, sales) {
    const ctx = document.getElementById('bestSellerChart').getContext('2d');
    
    // Destroy the previous chart if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    // Create a new chart
    chartInstance = new Chart(ctx, {
      type: 'bar',  // Example chart type
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales',
          data: sales,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `Sales: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });
  }
  

  // Initialize the chart by fetching the data on component mount
  useEffect(() => {
    fetchBestSellerData();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white h-screen shadow-md">
        <div className="p-6">
          <img
            alt="Pixel Commerce Logo"
            className="mb-6"
            height={50}
            src="https://storage.googleapis.com/a1aa/image/FTv75SVGCfViUazyfYtFQterwca1vlMNPIc9emwB5p2fFaOfE.jpg"
            width={100}
          />
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Revenue</span>
              <i className="fas fa-dollar-sign text-teal-500"></i>
            </div>
            <div className="text-2xl font-semibold mb-2">$82,650</div>
            <div className="text-green-500">+11%</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Order</span>
              <i className="fas fa-shopping-cart text-teal-500"></i>
            </div>
            <div className="text-2xl font-semibold mb-2">1645</div>
            <div className="text-green-500">+11%</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Customer</span>
              <i className="fas fa-user text-teal-500"></i>
            </div>
            <div className="text-2xl font-semibold mb-2">1,462</div>
            <div className="text-red-500">-17%</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Pending Delivery</span>
              <i className="fas fa-truck text-teal-500"></i>
            </div>
            <div className="text-2xl font-semibold mb-2">117</div>
            <div className="text-green-500">+5%</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <canvas id="bestSellerChart" width="50" height="50"></canvas>

          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Sales Target</h2>
            <img
              alt="Sales Target Chart"
              className="mb-4"
              height={200}
              src="https://storage.googleapis.com/a1aa/image/15e9rNeG81qyBk1tgddpUID2zezd5vIuyNCAGv1yeS2wCNnPB.jpg"
              width={200}
            />
            <div className="flex justify-between items-center mb-2">
              <span>Daily Target</span>
              <span className="text-red-500">650</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Monthly Target</span>
              <span className="text-green-500">145,00</span>
            </div>
          </div> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <img
                  alt="Air Jordan 8"
                  className="mb-2"
                  height={100}
                  src="https://storage.googleapis.com/a1aa/image/ZQhfIaVq89yHOqH6EhgHFfEreXcT6ffe7fHf9kET1D5MqQz5TA.jpg"
                  width={100}
                />
                <div>Air Jordan 8</div>
                <div className="text-gray-600">752 Pcs</div>
              </div>
              <div className="text-center">
                <img
                  alt="Air Jordan 5"
                  className="mb-2"
                  height={100}
                  src="https://storage.googleapis.com/a1aa/image/tcB7iyAly77HPpgCw8fWn4EfoOBr7ypx6fljbcrcTaohhmznA.jpg"
                  width={100}
                />
                <div>Air Jordan 5</div>
                <div className="text-gray-600">752 Pcs</div>
              </div>
              <div className="text-center">
                <img
                  alt="Air Jordan 13"
                  className="mb-2"
                  height={100}
                  src="https://storage.googleapis.com/a1aa/image/AUHne7z08MWvE6zZs5IJkPaveNZy8nOf6BBObLlhfBX5CNnPB.jpg"
                  width={100}
                />
                <div>Air Jordan 13</div>
                <div className="text-gray-600">752 Pcs</div>
              </div>
              <div className="text-center">
                <img
                  alt="Nike Air Max"
                  className="mb-2"
                  height={100}
                  src="https://storage.googleapis.com/a1aa/image/9SfvMf1e1xUhXpzMhcoZJVIftbY1p8Evxz6H1DLmPJctCNnPB.jpg"
                  width={100}
                />
                <div>Nike Air Max</div>
                <div className="text-gray-600">752 Pcs</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Current Offer</h2>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>40% Discount Offer</span>
                <span className="text-gray-600">Expire on: 05-08-2023</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>100 Taka Coupon</span>
                <span className="text-gray-600">Expire on: 10-09-2023</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Stock Out Sell</span>
                <span className="text-gray-600">Upcoming on: 14-09-2023</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

