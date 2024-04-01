import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  plugins: {
    title: {
      display: true,
      text: 'Gross to Net',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  },
};

const StackedCharts = () => {
  const [error, setError] = useState<string>("");
  const [societyDataNet, setSocietyDataNet] = useState({});
  const [societyDataVat, setSocietyDataVat] = useState({});
  const [societyDataGross, setSocietyDataGross] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `charts/sum_all_sub_total_by_client_by_society?society_id=${id}`, {  
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSocietyDataNet(data);
        } else {
          setError("Failed to fetch data: " + response.statusText);
        }
      } catch (error) {
        setError("Error fetching data: " + (error instanceof Error ? error.message : String(error)));
      }
    };

    fetchData();
  }, [id]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `charts/sum_all_tva_by_client_by_society?society_id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSocietyDataVat(data);
        } else {
          setError("Failed to fetch data: " + response.statusText);
        }
      } catch (error) {
        setError("Error fetching data: " + (error instanceof Error ? error.message : String(error)));
      }
    };

    fetchData();
  }, [id]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `charts/sum_all_client_by_society?society_id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSocietyDataGross(data);
        } else {
          setError("Failed to fetch data: " + response.statusText);
        }
      } catch (error) {
        setError("Error fetching data: " + (error instanceof Error ? error.message : String(error)));
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!societyDataNet || !societyDataVat || !societyDataGross) {
    return <div>Loading...</div>;
  }

  const labels1 = Object.keys(societyDataNet);
  const values1 = Object.values(societyDataNet);

  const values2 = Object.values(societyDataVat);
  const values3 = Object.values(societyDataGross);


const data = {
  labels: labels1,
  datasets: [
    {
      label: 'Net Profit',
      data: values1,
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'VAT',
      data: values2,
      backgroundColor: 'rgb(23, 26, 127)',
    },
    {
      label: 'Gross Profit',
      data: values3,
      backgroundColor: 'rgb(209, 214, 40)',
    },
   
  ],
};

  return (
    <div className="stacked-chart-container">
      <Bar options={options} data={data} />
    </div>
  )
};

export default StackedCharts;