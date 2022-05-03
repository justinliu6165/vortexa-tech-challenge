import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

export default function MaterialsChart() {
  const { sizeCategoryData } = useSelector(state => state.app.geoData);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if(sizeCategoryData) {
      let data = {}

      let labels = Object.keys(sizeCategoryData);
      let sizes = Object.keys(sizeCategoryData).map((sizeData => {
        return sizeCategoryData[sizeData].length
      }))

      data = {
        labels,
        sizes
      }

      setChartData(data);
    }
  }, [sizeCategoryData])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Number of ramps per size category',
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function(label) {
            return `${this.getLabelForValue(label)}`
          }
        }
      },
      secondXAxis: {
        axis: 'x',
        labels: ['Range of area (m\u00B2)'],
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Number of ramps',
        data: chartData.sizes,
        backgroundColor: [
          '#7d2071', 
          '#d02d69', 
          '#ffb014'
        ],
      }
    ]
  };

  return (
    <article>
      <div className='bg-contrast shadow-xl py-2 px-4'>
        <div className='text-lg text-white uppercase font-bold text-primary'>Size category</div>
      </div>
      <div className='p-2'> 
        <Bar options={options} data={data} />
      </div>
    </article>
  )
}
