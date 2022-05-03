import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MaterialsChart() {
  const { materialsData } = useSelector(state => state.app.geoData);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let data = []
    if(materialsData) {

      data = Object.keys(materialsData).map(material => {
        return {
          label: material,
          total: materialsData[material].length
        }
      }).sort((a, b) => b.total - a.total)

      setChartData(data);
    }
  }, [materialsData])

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Number of ramps per construction material',
      },
    },
  }

  const data = {
    labels: chartData.map(mt => mt.label),
    datasets: [
      {
        label: '# of Votes',
        data: chartData.map(mt => mt.total),
        backgroundColor: [
          "#171c5c",
          "#7d2071",
          "#d02d69",
          "#ff654a",
          "#ffb014",
          "#fbff04",
        ],
        borderColor: "rgba(36,33,40, 0.9)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <article>
      <div className='bg-contrast shadow-xl py-2 px-4'>
        <div className='text-lg text-white uppercase font-bold text-primary'>Construction material</div>
      </div>
      <div className='p-2'> 
        <Doughnut data={data} options={options} />
      </div>
    </article>
  )
}
