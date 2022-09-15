import axios from 'axios';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { baseUrl } from './../constants/Urls';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function Ejercicio2() {
  const [dates, setDates] = useState();
  const [cases, setCases] = useState();
  const [tests, setTests] = useState();
  const [deaths, setDeaths] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`${baseUrl}/covid/historical`);

        setDates(result.data.data.map((e) => e.date));
        setCases(result.data.data.map((e) => e.cases.total.value));
        setTests(result.data.data.map((e) => e.testing.total.value));
        setDeaths(result.data.data.map((e) => e.outcomes.death.total.value));
      } catch (e) {
        setCases();
      }
    };

    getData();
  }, []);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Deaths',
        data: deaths,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: 'Cases',
        data: cases,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 0,
      },
      {
        label: 'Tests',
        data: tests,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192, 0.5)',
        pointRadius: 0,
      },
    ],
  };

  return (
    <div>
      <h2>Ejercicio 2</h2>
      {cases && <Line options={options} data={data} />}
    </div>
  );
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Covid en EEUU',
    },
  },
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
      type: 'logarithmic',
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  layout: {
    padding: 10,
  },
};

export default Ejercicio2;
