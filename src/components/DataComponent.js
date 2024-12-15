import React, { useEffect, useState } from 'react';

const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/data`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to Security Website</h1>
      <h2>Fetched Data</h2>
      <p>Here is the data fetched from the backend:</p>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
