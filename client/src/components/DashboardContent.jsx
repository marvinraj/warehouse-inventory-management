import React from 'react';
import Navbar from './Navbar';

const DashboardContent = () => {
    // Data for the top row of cards
    const topCards = [
        {
            title: 'Noteworthy technology acquisitions 2021',
            description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
            link: '#'
        },
        {
            title: 'Inventory Update',
            description: 'Track the latest updates in your inventory, including recent additions and low-stock alerts.',
            link: '#'
        },
        {
            title: 'Sales Insights',
            description: 'View detailed insights into your sales performance and revenue trends.',
            link: '#'
        }
    ];

    // Data for the second-row large card
    const bottomCard = {
        title: 'Detailed Warehouse Overview',
        description: 'Get a comprehensive overview of your warehouse, including inventory, sales, and inbound shipments in one place.',
        link: '#'
    };

    return (
        <div>
            <Navbar />
            <div className="dashboard-content ml-64 px-8 mt-5">
                <div className="header">
                    <h1 className="text-2xl font-bold">Welcome back, Marvin!</h1>
                    <p className="text-xs mt-3">Let's check on the warehouse.</p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {/* Top row of cards */}
                    {topCards.map((card, index) => (
                        <a
                            href={card.link}
                            key={index}
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {card.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {card.description}
                            </p>
                        </a>
                    ))}

                    {/* Bottom large card */}
                    <a
                        href={bottomCard.link}
                        className="block col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {bottomCard.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {bottomCard.description}
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
