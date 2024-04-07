import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Grach() {
  const [mygrachs, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/data', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const combineData = mygrachs.reduce((acc, currentItem) => {
    const existingItemIndex = acc.findIndex(item => item.name === currentItem.namemenu);
    if (existingItemIndex !== -1) {
      acc[existingItemIndex].amount += currentItem.amount;
    } else {
      acc.push({ name: currentItem.namemenu, amount: currentItem.amount });
    }
    return acc;
  }, []);

  const sortedData = combineData.sort((a, b) => b.amount - a.amount);

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

  const calculateAverage = () => {
    if (mygrachs.length === 0) return 0;

    const totalPrices = mygrachs.reduce((acc, currentItem) => {
      return acc + currentItem.price;
    }, 0);

    return totalPrices / mygrachs.length;
  };

  const averagePrice = calculateAverage();

  const averagePriceDiv = (
    <div>
      <p>Average Price: {averagePrice}</p>
    </div>
  );

  const topSellingItems = sortedData.map((item, index) => (
    <p key={index}>
      {index + 1}: {item.name} จำนวน: { item.amount}
    </p>
  ));

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {mygrachs.length === 0 ? (
            <p>No data available</p>
          ) : (
            <>
              {renderBarChart}
              {averagePriceDiv}
              <div>
                <h3>Top Selling Items:</h3>
                {topSellingItems}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Grach;

