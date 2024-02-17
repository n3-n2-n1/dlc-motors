import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSearchContext } from "../../contexts/SearchContext.tsx";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  DoughnutController,
} from "chart.js";

// Registro de componentes necesarios en Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  DoughnutController
);

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

const ProductChart = () => {
  const { products } = useSearchContext();
  const [productCount, setProductCount] = useState(0);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (products && products.length > 0) {
      setProductCount(products.length);
    }
  }, [products]);

  useEffect(() => {
    if (productCount > 0) {
      setChartData({
        labels: ["Total de Productos"],
        datasets: [
          {
            label: "Cantidad",
            data: [productCount],
            backgroundColor: ["rgba(255, 99, 132, 0.5)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [productCount]);

  return (
    <div className="w-[600px] h-[600px]">
      <Doughnut data={chartData} />
    </div>
  );
};

export default ProductChart;
