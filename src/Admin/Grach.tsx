import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Grach() {
  const [mygrachs, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend-olnc.onrender.com/order/orderofficer', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Combine order data
  const combineData = mygrachs.reduce((acc, currentItem) => {
    currentItem.ordercart.forEach(order => {
      const existingItemIndex = acc.findIndex(item => item.name === order.menutems.ItemName);
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].amount += order.total;
      } else {
        acc.push({ name: order.menutems.ItemName, amount: order.total });
      }
    });
    return acc;
  }, []);

  const sortedData = combineData.sort((a, b) => b.amount - a.amount);

  const COLORS = ['#8884d8', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  // Function to calculate daily sales summary
  const calculateDailySales = () => {
    const dailySales = mygrachs.reduce((acc, currentItem) => {
      const date = dayjs(currentItem.date).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = {
          totalOrders: 0,
          totalAmount: 0,
          totalRevenue: 0
        };
      }
      acc[date].totalOrders += 1;
      acc[date].totalAmount += currentItem.total_all;
      acc[date].totalRevenue += currentItem.allprice;
      return acc;
    }, {});

    return dailySales;
  };

  const dailySalesData = calculateDailySales();

  const renderBarChart = (
    <BarChart
      width={1500}
      height={400}
      data={sortedData}
      margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip wrapperStyle={{ backgroundColor: '#ccc', border: 'none' }} />
      <Bar dataKey="amount" fill="#76c2f5" barSize={60} />
    </BarChart>
  );

  const renderPieChart = (
    <PieChart width={800} height={400}>
      <Pie
        data={sortedData}
        cx={400}
        cy={200}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="amount"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {sortedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );

  const calculateAverage = () => {
    if (mygrachs.length === 0) return 0;

    const totalPrices = mygrachs.reduce((acc, currentItem) => {
      return acc + currentItem.allprice;
    }, 0);

    return (totalPrices / mygrachs.length).toFixed(2);
  };

  const averagePrice = calculateAverage();

  const averagePriceDiv = (
    <div className="my-4 p-4 bg-blue-100 rounded-lg">
      <p className="text-xl font-semibold">Average Price: {averagePrice} ฿</p>
    </div>
  );

  const topSellingItems = sortedData.map((item, index) => (
    <p key={index} className="text-lg">
      {index + 1}: {item.name} จำนวน: {item.amount}
    </p>
  ));

  const filteredSales = selectedDate
    ? {
        [dayjs(selectedDate).format('YYYY-MM-DD')]: dailySalesData[dayjs(selectedDate).format('YYYY-MM-DD')]
      }
    : dailySalesData;

  const dailySalesDiv = (
    <div className="my-4 p-4 bg-yellow-100 rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">Daily Sales Summary:</h3>
      {Object.keys(filteredSales).map((date, index) => (
        <div key={index} className="mb-2">
          <p className="text-lg">Date: {date}</p>
          <p className="text-lg">Total Orders: {filteredSales[date]?.totalOrders || 0}</p>
          <p className="text-lg">Total Items Sold: {filteredSales[date]?.totalAmount || 0}</p>
          <p className="text-lg">Total Revenue: {filteredSales[date]?.totalRevenue || 0} ฿</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-500">{error}</p>
      ) : mygrachs.length === 0 ? (
        <p className="text-center text-xl">No data available</p>
      ) : (
        <>
          <div className="flex justify-center my-8">
            {renderBarChart}
          </div>
          <div className="flex justify-center my-8">
            {renderPieChart}
          </div>
          {averagePriceDiv}
          <div className="my-4 p-4 bg-green-100 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Top Selling Items:</h3>
            {topSellingItems}
          </div>
          <div className="my-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Select Date to View Sales:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="p-2 border border-gray-300 rounded-md"
              isClearable
              placeholderText="Select a date"
            />
          </div>
          {dailySalesDiv}
        </>
      )}
    </div>
  );
}

export default Grach;
