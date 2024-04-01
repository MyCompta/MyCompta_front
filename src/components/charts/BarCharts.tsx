import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


import './Charts.scss';

const apiUrl = import.meta.env.VITE_API_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total turnover by Client',
    },
  },
};

const BarCharts = () => {
  const [sumbyclientData, setSumbyclientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "charts/sum_all_client", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSumbyclientData(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!sumbyclientData) {
    return <div>Loading...</div>;
  }

  const labels = Object.keys(sumbyclientData);
  const values = Object.values(sumbyclientData);
  const data = {
    labels,
    datasets: [
      {
        label: 'Turnover in currency',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarCharts;