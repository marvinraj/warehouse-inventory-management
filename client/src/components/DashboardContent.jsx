import Navbar from './Navbar';

const DashboardContent = () => {
    // get username from localstorage
    const username = localStorage.getItem('username');
    return (
        <div>
            <Navbar />
            {/* FOR NOW USE DUMMY VALUES */}
            <div className="dashboard-container bg-gray-100 min-h-screen ml-64 px-8 py-8">
                <h1 className='text-2xl font-bold mb-6'>Welcome back, {username}!</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Total Products</h2>
                        <p className="text-4xl font-bold text-indigo-700">218</p>
                        <p className="text-green-500 text-sm pt-2">+6% vs last month</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Low Stock Products</h2>
                        <p className="text-4xl font-bold text-indigo-700">48</p>
                        <p className="text-green-500 text-sm pt-2">+6% vs last month</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Inbounds Record Today</h2>
                        <p className="text-4xl font-bold text-indigo-700">16</p>
                        <p className="text-green-500 text-sm pt-2">+2% vs yesterday</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Outbounds Record Today</h2>
                        <p className="text-4xl font-bold text-indigo-700">12</p>
                        <p className="text-green-500 text-sm pt-2">+8% vs yesterday</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white shadow-md p-6 rounded-lg col-span-2">
                        <h2 className="text-lg font-semibold mb-4">Inbound Trends</h2>
                        <div className="h-64 bg-gray-100 flex items-center justify-center">
                            <p className="text-gray-400">Chart Loading....</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Recent Inbound/Outbound Tasks</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Inbound Record #123</p>
                                <p className="font-semibold">Received shipment of 50 items</p>
                                <p className="text-sm text-gray-400">Completed by admin1</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Outbound Record #456</p>
                                <p className="font-semibold">Shipped order of 30 items</p>
                                <p className="text-sm text-gray-400">Completed by admin2</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Inbound Record #23</p>
                                <p className="font-semibold">Received shipment of 20 items</p>
                                <p className="text-sm text-gray-400">Completed by admin3</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Total Customers</h2>
                        <p className="text-4xl font-bold text-indigo-700">324</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Total Suppliers</h2>
                        <p className="text-4xl font-bold text-indigo-700">72</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
