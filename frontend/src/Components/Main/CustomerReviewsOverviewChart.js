import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomerReviewsOverviewChart = () => {
  // Data for the chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Positive Reviews',
        data: [150, 200, 180, 220, 300, 350, 400, 450, 480],
        borderColor: 'rgba(75, 192, 192, 1)', // Green color for positive reviews
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true, // Fill the area under the line
      },
      {
        label: 'Negative Reviews',
        data: [50, 80, 60, 70, 90, 100, 85, 95, 110],
        borderColor: 'rgba(255, 99, 132, 1)', // Red color for negative reviews
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
        position: 'top', // Position of legends (Positive, Negative)
        labels: {
          color: '#fff', // White color for legend text
        },
      },
      tooltip: {
        enabled: true, // Show tooltips
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
      <h3 className="text-white text-lg font-semibold mb-4">Customer Reviews Overview - Monthly Trends</h3>
      <div className="w-full h-64 bg-gray-800 rounded-lg p-4"> {/* Added padding here */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CustomerReviewsOverviewChart;
