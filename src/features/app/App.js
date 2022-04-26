import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.module.css';
import { fetchDataAsync } from './appSlice';

function App() {
  const dispatch = useDispatch();
  const { geoData } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(fetchDataAsync())
  }, [dispatch]);

  return (
    <div className="App">
      {
        geoData && geoData.map(el => (
          <h1 key={el.id}>{el.properties.asset_numb}</h1>
        ))
      }
    </div>
  );
}

export default App;
