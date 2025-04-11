import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a78bfa", "#f43f5e"];

const ChartDashboard = ({ courses }) => {
  const [chartType, setChartType] = useState("pie");
  const [dataType, setDataType] = useState("student");
  const [studentData, setStudentData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    const sData = courses.map((course) => ({
      name: course.courseName,
      value: course.totalStudentsEnrolled,
    }));

    const iData = courses.map((course) => ({
      name: course.courseName,
      value: course.totalAmountEarned,
    }));

    setStudentData(sData);
    setIncomeData(iData);
  }, [courses]);

  const chartData = dataType === "student" ? studentData : incomeData;

  const renderChart = () => {
    if (chartData.length === 0 || chartData.every((d) => d.value === 0)) {
      return <p className="text-gray-500 text-lg mt-10">📭 No data available to display.</p>;
    }

    switch (chartType) {
      case "pie":
        return (
          <PieChart width={420} height={320}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );

      case "bar":
        return (
          <BarChart width={500} height={320} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" barSize={40} radius={[5, 5, 0, 0]} />
          </BarChart>
        );

      case "line":
        return (
          <LineChart width={500} height={320} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl  w-[35rem]   rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 text-center text-richblack-5">📊 Course Analytics Dashboard</h1>

      {/* Toggle Controls */}
      <div className="flex justify-center gap-6 mb-8">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </select>

        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="student">Student Enrollments</option>
          <option value="income">Income Generated</option>
        </select>
      </div>

      {/* Chart Display */}
      <div className="flex justify-center items-center">{renderChart()}</div>
    </div>
  );
};

export default ChartDashboard;
