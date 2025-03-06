import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminOverviewChart = () => {
  // Data for the chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Total Orders Placed',
        data: [300, 500, 400, 600, 700, 800, 750, 950, 1000],
        borderColor: 'rgba(54, 162, 235, 1)', // Blue color for orders placed
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4, // Curved lines
        fill: true, // Fill area under the line
      },
      {
        label: 'Orders Delivered',
        data: [200, 400, 350, 500, 600, 700, 680, 850, 900],
        borderColor: 'rgba(75, 192, 192, 1)', // Green color for orders delivered
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Orders Cancelled',
        data: [50, 100, 80, 120, 150, 130, 160, 180, 190],
        borderColor: 'rgba(255, 99, 132, 1)', // Red color for orders cancelled
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents the aspect ratio from forcing height
    plugins: {
      legend: {
        position: 'top', // Show legends on the top
        labels: {
          color: '#fff', // White text for legends
        },
      },
      tooltip: {
        enabled: true, // Show tooltips on hover
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff', // White color for x-axis labels
        },
      },
      y: {
        ticks: {
          color: '#fff', // White color for y-axis labels
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-white text-lg font-semibold mb-4">Orders Overview - Monthly Trends</h3>
      <div className="w-full h-64 bg-gray-800 p-4 rounded-lg"> {/* Added height and padding here */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AdminOverviewChart;
