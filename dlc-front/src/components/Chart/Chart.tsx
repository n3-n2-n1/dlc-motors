import { Chart } from "react-google-charts";
import React, { useEffect } from 'react';
import 'apexcharts';


interface ChartData {
  x: string;
  y: number;
}

interface ChartSeries {
  name: string;
  color: string;
  data: ChartData[];
}

interface ChartOptions {
  colors: string[];
  series: ChartSeries[];
  chart: {
    type: string;
    height: string;
    // ... (resto de las propiedades)
  };
  // ... (resto de las propiedades)
}



const ChartDash: React.FC = () => {

  const data = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];
  
  const options = {
    title: "Ventas en ciudad",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Ventas Totales",
      minValue: 0,
    },
    vAxis: {
      title: "Ciudad",
    },
  };
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};






export default ChartDash;
