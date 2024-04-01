import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import './Charts.scss';

const apiUrl = import.meta.env.VITE_API_URL;

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: ''
    },
  },
};

const PolarCharts = () => {
  const [error, setError] = useState<string>("");
  const [societyData, setSocietyData] = useState({});
  const { id } = useParams();

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
          setSocietyData(data);
        } else {
          setError("Failed to fetch data: " + response.statusText);
        }
      } catch (error) {
        setError("Error fetching data: " + (error instanceof Error ? error.message : String(error)));
      }
    };

    fetchData();
  }, [setSocietyData, id]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!societyData) {
    return <div>Loading...</div>;
  }

  const labels = Object.keys(societyData);
  const values = Object.values(societyData);

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random()*256);
    return randomColor;
  };

  const backgroundColor = labels.map(() => `rgba(${generateRandomColor()}, ${generateRandomColor()}, ${generateRandomColor()}, 1)`);


  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="polar-chart-container">
      <PolarArea options={options} data={data} />
    </div>
  )
};

export default PolarCharts;
