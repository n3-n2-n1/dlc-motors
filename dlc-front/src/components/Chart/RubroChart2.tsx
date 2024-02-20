import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSearchContext } from "../../contexts/SearchContext.tsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registro de los componentes necesarios en Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const RubroChart2 = () => {
  const { products } = useSearchContext();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Cantidad por Rubro',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    if (products && products.length > 0) {
      const rubroCounts = products.reduce((acc, product) => {
        acc[product.Rubro] = (acc[product.Rubro] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
  
      // Convertir a array, anotar tipo, ordenar y tomar los primeros 5
      const sortedRubros = Object.entries(rubroCounts as Record<string, number>)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
  
      const rubros = sortedRubros.map(item => item[0]);
      const counts = sortedRubros.map(item => item[1]);
      const backgroundColors = rubros.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);
      const borderColors = rubros.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);
  
      setChartData({
        labels: rubros,
        datasets: [{
          label: 'Productos',
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        }],
      });
    }
  }, [products]);
  
  
  return <div className= "h-[600px] w-[600px]">
    <Doughnut data={chartData} />
  </div>;
};

export default RubroChart2;
