import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSearchContext } from "../../contexts/SearchContext.tsx";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registro de componentes necesarios en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }
  
const RubroChart = () => {
  const { products } = useSearchContext();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: '',
      borderColor: '',
      borderWidth: 1
    }]
  });
  useEffect(() => {
    if (products) {
      const rubroCounts = products.reduce((acc, product) => {
        acc[product.Rubro] = (acc[product.Rubro] || 0) + 1;
        console.log(acc)
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(rubroCounts),
        datasets: [{
          label: 'Cantidad por Rubro',
          data: Object.values(rubroCounts),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderColor: 'rgba(53, 162, 235, 1)',
          borderWidth: 1,
        }]
      });
    }
  }, [products]);

  return <div>
    <Bar data={chartData} />
  </div>;
};

export default RubroChart;
