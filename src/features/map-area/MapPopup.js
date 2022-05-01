import React, { useEffect, useState } from 'react'
import {Popup} from 'react-map-gl';

export default function MapPopup({popupInfo, closePopup}) {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  })

  return (
    <Popup
          anchor={isMobile ? "center" : "left"}
          longitude={Number(popupInfo.geometry.coordinates[0])}
          latitude={Number(popupInfo.geometry.coordinates[1])}
          onClose={() => closePopup(null)}
          offset={10}
        >
          <div className='w-full h-full text-white ml-4 mr-6 mt-4 p-2'>

            <h3 className='text-sm sm:text-lg font-bold text-primary m-0 underline underline-offset-2'>Ramp information</h3>

            <table className="table-auto my-4">
              <tbody>
                <tr>
                    <td>Asset number: </td>
                    <td>{popupInfo.properties.asset_numb}</td>
                </tr>
                <tr>
                    <td>Area: </td>
                    <td>{popupInfo.properties.area_}m<sup>2</sup></td>
                </tr>
                <tr>
                    <td>Material: </td>
                    <td>{popupInfo.properties.material}</td>
                </tr>
                {
                    popupInfo.properties.comments && <tr>
                        <td>Note: </td>
                        <td>{popupInfo.properties.comments}</td>
                    </tr>
                }
              </tbody>
            </table>
            
          </div>
    </Popup>
  )
}
