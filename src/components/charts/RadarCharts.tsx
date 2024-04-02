import {Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import './Charts.scss';

const apiUrl = import.meta.env.VITE_API_URL;

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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
      display: false,
      text: '',
    },
  },
};

const RadarCharts = () => {
  const [sumRequest, setSumRequest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "charts/sum_by_country_ordered_alphabet", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSumRequest(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }

    fetchData();
  }, []);

  if (!sumRequest) {
    return <div>Loading...</div>;
  }

  type TupleType = [number, string, number];
const values: TupleType[] = Object.values(sumRequest);

const countries = values.map(item => item[1]);
const count_number = values.map(item => item[2]);


  console.log("label", countries)
  console.log("value", values)


const data = {
  labels: countries,
  datasets: [
    {
      label: '# of sumtotal',
      data: count_number,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1.5,
    },
  ],
};


  return (
    <div className="radar-chart-container">
      <Radar options={options} data={data} />
    </div>
  )
}

export default RadarCharts;