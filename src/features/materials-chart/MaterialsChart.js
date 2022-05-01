import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MaterialsChart() {
  const { materialsData } = useSelector(state => state.app.geoData);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let data = {}
    if(materialsData) {

      let labels = Object.keys(materialsData);
      let totals = Object.keys(materialsData).map((mat => {
        return mat.length
      }))

      data = {
        labels,
        totals
      }

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
    labels: chartData.labels,
    datasets: [
      {
        label: '# of Votes',
        data: chartData.totals,
        backgroundColor: [
          '#22d3ee',
          '#38bdf8',
          '#0284c7',
          '#4f46e5',
          '#7c3aed',
          '#4c1d95',
          '#7e22ce',
          '#c026d3',
          '#701a75',
        ],
        borderColor: "rgba(36,33,40, 0.9)",
        borderWidth: 4,
      },
    ],
  };

  return (
    <article>
      <div className='bg-contrast shadow-xl p-2'>
        <div className='text-lg text-white uppercase text-primary'>Construction material</div>
      </div>
      <div className='p-2'> 
        <Doughnut data={data} options={options} />
      </div>
    </article>
  )
}
