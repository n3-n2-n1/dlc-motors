import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSearchContext } from "../../contexts/SearchContext.tsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

// Define una paleta de colores para las barras
const barColors = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900'
];

const Horizontal = () => {
  const { products } = useSearchContext();
  const [chartData, setChartData] = useState({
    labels: months,
    datasets: [{
      label: 'Ventas por Mes',
      data: [], // Array con 12 espacios para las ventas de cada mes
      backgroundColor: barColors,
      borderColor: barColors,
      borderWidth: 1,
      
    }]
  });

  useEffect(() => {
    // Aquí iría la lógica para calcular las ventas por mes.
    // Por ahora, solo se ponen valores de ejemplo.
    setChartData({
      labels: months,
      datasets: [{
        label: 'Ventas por Mes',
        data: months.map(() => Math.floor(Math.random() * 900)), // Datos aleatorios como ejemplo
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
      }]
    });
  }, [products]);

  const options = {
    indexAxis: 'y',
    plugins: {
      legend: {
        labels: {
          color: 'white' // Hace que el texto de la leyenda sea blanco
        }
      },
      title: {
        display: true,
        text: 'Ventas por Mes',
        color: 'white' // Hace que el título sea blanco
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white' // Hace que las etiquetas del eje x sean blancas
        },
        grid: {
        }
      },
      y: {
        ticks: {
          color: 'white' // Hace que las etiquetas del eje y sean blancas
        },
        grid: {
        }
      }
    }
  };

  return (
    <div  style={{ width: '1200px', height: '500px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Horizontal;
