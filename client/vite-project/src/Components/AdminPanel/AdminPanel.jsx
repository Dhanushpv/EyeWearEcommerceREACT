import React from "react";

function AdminPanel() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <MainContent />
        </div>
    );
}

function Sidebar() {
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-6">
                <div className="flex items-center">
                    <img src="https://placehold.co/24x24" alt="Logo" className="mr-3" />
                    <span className="text-xl font-semibold">Spike Admin</span>
                </div>
            </div>
            <nav className="mt-6">
                <ul>
                    <li className="px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-lg">
                        <i className="fas fa-th-large mr-3"></i>
                        <span>Dashboard</span>
                    </li>
                    <li className="px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-lg">
                        <i className="fas fa-bell mr-3"></i>
                        <span>Alert</span>
                    </li>
                    <li className="px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-lg">
                        <i className="fas fa-button mr-3"></i>
                        <span>Button</span>
                    </li>
                    <li className="px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-lg">
                        <i className="fas fa-card mr-3"></i>
                        <span>Cards</span>
                    </li>
                    <li className="px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-lg">
                        <i className="fas fa-table mr-3"></i>
                        <span>Tables</span>
                    </li>
                    <li className="px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-lg">
                        <i className="fas fa-sign-in-alt mr-3"></i>
                        <span>Login</span>
                    </li>
                    <li className="px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-lg">
                        <i className="fas fa-user-plus mr-3"></i>
                        <span>Register</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

function MainContent() {
    return (
        <div className="flex-1 p-6">
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Profit & Expenses</h2>
                    <img src="https://placehold.co/600x300" alt="Bar Chart" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Traffic Distribution</h2>
                    <div className="text-2xl font-semibold">$36,358</div>
                    <div className="text-green-500">+9% last year</div>
                    <div className="mt-4">
                        <img src="https://placehold.co/100x100" alt="Pie Chart" />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            <span>Organic</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                            <span>Referral</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Product Sales</h2>
                    <div className="text-2xl font-semibold">$6,820</div>
                    <div className="text-red-500">-9% last year</div>
                    <div className="mt-4">
                        <img src="https://placehold.co/100x50" alt="Line Chart" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <i className="fas fa-bell text-gray-600 text-xl"></i>
                <div className="ml-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Upgrade To Pro</button>
                </div>
            </div>
            <div className="flex items-center">
                <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full" />
            </div>
        </div>
    );
}

export default AdminPanel;
