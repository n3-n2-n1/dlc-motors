import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSearchContext } from "../../contexts/SearchContext.tsx";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Registro de componentes necesarios en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);


interface ChartData {
  labels: string[];
  datasets: {
        color: string
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      type?: string; // Tipo de gráfico para cada conjunto de datos
  }[];
}

const RubroChart = () => {
  const { products } = useSearchContext();
  const [chartData, setChartData] = useState<ChartData>({
      labels: [],
      datasets: []
  });

  useEffect(() => {
      if (products) {
          const rubroCounts = products.reduce((acc, product) => {
              acc[product.rubro] = (acc[product.rubro] || 0) + 1;
              return acc;
          }, {});

          // Asegúrate de tomar solo 5 rubros (puedes ajustar esto según sea necesario)
          const rubroLabels = Object.keys(rubroCounts).slice(0, 5);
          const rubroData = Object.values(rubroCounts).slice(0, 5);

          setChartData({
              labels: rubroLabels,
              datasets: [
                  {
                      label: 'Cantidad por Rubro',
                      data: rubroData,
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      borderColor: 'rgba(53, 162, 235, 1)',
                      borderWidth: 1,
                      type: 'bar',
                      color:'white' // Especifica el tipo de gráfico para este conjunto de datos
                      
                  },
                  {
                      label: 'Línea de Tendencia',
                      data: rubroData, // Puedes cambiar estos datos para representar otra métrica si lo deseas
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 2,
                      type: 'line' // Especifica el tipo de gráfico para este conjunto de datos
                  }
              ]
          });
      }
  }, [products]);

  return <div className='w-[805px] h-[415px] p-4 rounded-xl bg-gray-700'>
      <Bar data={chartData} />
  </div>;
};

export default RubroChart;