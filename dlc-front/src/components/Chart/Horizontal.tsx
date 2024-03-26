import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSearchContext } from "../../contexts/SearchContext.tsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

// Define una paleta de colores para las barras
const barColors = [
  'rgba(255, 193, 182, 0.6)', // Coral pastel
  'rgba(255, 224, 179, 0.6)', // Melocotón pastel
  'rgba(255, 209, 255, 0.6)', // Lavanda pastel
  'rgba(255, 255, 179, 0.6)', // Amarillo pastel
  'rgba(179, 217, 255, 0.6)', // Azul cielo pastel
  'rgba(255, 223, 211, 0.6)', // Rosa pastel
  'rgba(194, 194, 240, 0.6)', // Lila pastel
  'rgba(214, 224, 179, 0.6)', // Verde menta pastel
  'rgba(179, 230, 204, 0.6)', // Aguamarina pastel
  'rgba(255, 179, 179, 0.6)', // Rojo sandía pastel
  'rgba(209, 209, 224, 0.6)', // Gris azulado pastel
  'rgba(255, 245, 230, 0.6)'  // Marfil pastel
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
      textOpacity: '0.3',

      
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
        textOpacity: '0.9',
        

      }]
    });
  }, [products]);

  const options = {
    indexAxis: 'y',
    plugins: {
      legend: {
        labels: {
          color: 'gray' // Hace que el texto de la leyenda sea blanco
        }
      },
      title: {
        display: true,
        text: 'Ventas por Mes',
        color: 'gray' // Hace que el título sea blanco
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'gray' // Hace que las etiquetas del eje x sean blancas
        },
        grid: {
        }
      },
      y: {
        ticks: {
          color: 'gray' // Hace que las etiquetas del eje y sean blancas
        },
        grid: {
        }
      }
    }
  };

  return (
    <div style={{ width: '1200px', height: '380px', color: 'black'}}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Horizontal;
