import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAtom } from 'jotai';

import { sumbySocietyAtom } from "./ChartsAtom";

import './Charts.scss';

const apiUrl = import.meta.env.VITE_API_URL;

ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Overall by clients',
    },
  },
};

const DoughnutsCharts = () => {
  const [error, setError] = useState<string>("");
  const [sumbySocietyData, setSumbySocietyData] = useAtom(sumbySocietyAtom);

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
          setSumbySocietyData(data);
        } else {
          setError("Failed to fetch data: " + response.statusText);
        }
      } catch (error) {
        setError("Error fetching data: " + (error instanceof Error ? error.message : String(error)));
      }
    };

    fetchData();
  }, [setSumbySocietyData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!sumbySocietyData) {
    return <div>Loading...</div>;
  }

  const labels = Object.keys(sumbySocietyData);
  const values = Object.values(sumbySocietyData);

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random()*256); // Valeur aléatoire entre 0 et 255
    return randomColor;
  };

  const backgroundColor = labels.map(() => `rgba(${generateRandomColor()}, ${generateRandomColor()}, ${generateRandomColor()}, 0.2)`);
  const borderColor = labels.map(() => `rgba(${generateRandomColor()}, ${generateRandomColor()}, ${generateRandomColor()}, 1)`);

  const data = {
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
    labels: labels,
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutsCharts;