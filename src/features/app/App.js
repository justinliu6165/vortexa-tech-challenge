import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAsync } from './appSlice';
import styles from './App.module.css';

import MapArea from '../map-area/MapArea';
import MaterialsChart from '../materials-chart/MaterialsChart';
import SizeCategoryChart from '../size-category-chart/SizeCategoryChart';

const StatComp = ({description, value}) => {
  return (
    <div className="">
      <p className='m-0'>{description}</p>
      <div className='text-7xl text-primary font-bold'>{value}</div>
    </div>
  )
}

function App() {
  const dispatch = useDispatch();
  const { geoJson, materialsData, total } = useSelector(state => state.app.geoData);

  useEffect(() => {
    dispatch(fetchDataAsync())
  }, [dispatch]);

  return (
    <main className="w-full py-6 px-4">

      <div className={styles.background}></div>

      <div className="w-full m-auto max-w-5xl">
        <h1>
          Boat Ramp
          <small className='text-md md:text-3xl text-primary'>By the Gold Coast, Australia</small>
        </h1>

        <div className='pt-8'></div>

        <div className='flex'>
          <div className='mr-4'>
            <StatComp description="Total number of boat ramps" value={total} />
          </div>
        </div>

        <div className='pt-8'></div>

        <div className='my-4'>
          <div className='grid grid-cols-2 gap-4 md:gap-8'>
            
            <div className='col-span-2 bg-contrast/90 shadow-xl shadow-slate-300/60'>
              <p>This interactive map shows the boat ramps available in the Gold Coast area in Australia. <br/> Click on the markers to see more information.</p>
              <div className={styles["map-container"]}>
                <div className={styles["map-inner"]}>
                  <MapArea geoJSON={geoJson} />
                </div>
              </div>
            </div>
 
            <div className='col-span-2 md:col-span-1'>
              <div className='bg-contrast bg-opacity-90 shadow-xl shadow-slate-300/60'>
                <MaterialsChart/> 
              </div>
            </div>
            
            <div className='col-span-2 md:col-span-1'>
              <div className='bg-contrast bg-opacity-90 shadow-xl shadow-slate-300/60'>
                <SizeCategoryChart/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
