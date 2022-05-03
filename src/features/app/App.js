import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAsync } from './appSlice';
import styles from './App.module.css';

import MapArea from '../map-area/MapArea';
import MaterialsChart from '../materials-chart/MaterialsChart';
import SizeCategoryChart from '../size-category-chart/SizeCategoryChart';

const StatComp = ({description, value}) => {
  return (
    <div className="text-center bg-contrast bg-opacity-90 shadow-xl shadow-slate-300/60 p-2 px-4 rounded-md">
      <p className='m-0'>{description}</p>
      <div className='text-9xl text-primary font-bold'>{value}</div>
    </div>
  )
}

function App() {
  const dispatch = useDispatch();
  const { geoJson, total } = useSelector(state => state.app.geoData);

  useEffect(() => {
    dispatch(fetchDataAsync())
  }, [dispatch]);

  return (
    <main className="w-full py-6 px-4">

      <div className={styles.background}></div>

      <div className="w-full m-auto max-w-5xl">
 
        <h1 className='text-center'>
          Boat Ramp
          <small className='text-md md:text-3xl text-primary'>By the Gold Coast, Australia</small>
        </h1>
        <p className='text-center'>An interactive dashboard comparing boat ramps in the Gold Coast.</p>

        <div className='mt-8'></div>
        
        {
          geoJson ? (<>
            <div className='flex justify-center'>
              <StatComp description="Total number of boat ramps" value={total} />
            </div>

            <div className='mt-8'></div>

            <div className='py-4 md:py-8'>
              <div className='grid grid-cols-2 gap-4 md:gap-8'>
                
                <div className='col-span-2 bg-contrast/90 shadow-xl shadow-slate-300/60'>
                  <p>
                    Use your mouse to drag the map and see the locations of all the boat ramps.
                    <br/> 
                    Click on the markers for more information.
                  </p>
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
          </>
          ) : (
          <div className="text-center bg-contrast bg-opacity-90 shadow-xl shadow-slate-300/60 p-2 px-4 rounded-md">
            <div className='text-9xl text-primary font-bold'>404 error</div>
            <p className='m-0'>The data you are looking for is not available right now.</p>
          </div>
          )
        }
        </div>
    </main>
  );
}

export default App;
