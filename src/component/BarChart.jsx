import React from "react";
import { Bar } from "react-chartjs-2";
import { useActionData } from "react-router-dom";

const BarChart = ({ chartData }) => {
  return <Bar data={chartData} />;
}

export default BarChart;

