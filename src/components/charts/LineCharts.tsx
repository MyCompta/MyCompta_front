import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';

import { useEffect, useState } from "react";
import Cookies from "js-cookie";


import './Charts.scss';

const apiUrl = import.meta.env.VITE_API_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Invoice\'s paid status',
    },
  },
};

const LineCharts = () => {
  const [isPaid, setIsPaid] = useState({});
  const [isNotPaid, setIsNotPaid] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "charts/invoice_paid", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsPaid(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "charts/invoice_not_paid", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsNotPaid(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!isPaid && !isNotPaid) {
    return <div>Loading...</div>;
  }

  const labels1 = Object.keys(isPaid);
  const values1 = Object.values(isPaid);

  const labels2 = Object.keys(isNotPaid);
  const values2 = Object.values(isNotPaid);

  const data = {
    labels1, labels2,
    datasets: [
      {
        label: 'Paid',
        data: values1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Not Paid',
        data: values2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return <Line options={options} data={data} />;
};

export default LineCharts;

