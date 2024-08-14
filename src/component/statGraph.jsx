import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { Bar } from "react-chartjs-2";

const StatistiquesGraph = ({adherents}) => {
    // console.log(adherentData)
    
    const labels = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
    const adherentData = {
        labels: labels,
        datasets: [
            {
                label: "Statistiques des adhesions",
                data: adherents.map((data) => data.centrenroll),
                barPercentage: 0.5,
                barThickness: 25,
                backgroundColor: 'rgba(55, 176, 76)',
            }
        ]
    };

    // const [adherents, setAdhrtData] = useState({
    //     labels: adherents.map((data) => data.centrenroll),
    //     datasets: [
    //       {
    //         label: "Users Gained",
    //         data: adherents.map((data) => data.centrenroll),
    //         backgroundColor: [
    //           "rgba(75,192,192,1)",
    //           "#ecf0f1",
    //           "#50AF95",
    //           "#f3ba2f",
    //           "#2a71d0",
    //         ],
    //         borderColor: "black",
    //         borderWidth: 1,
    //       },
    //     ],
    // });

  return (
    <>
      <div className=''>
        <h2>Graph</h2>
        {/* <BarChart chartData={adherentData} /> */}
        <Bar data={adherentData} />
      </div>
    </>
  )
}

export default StatistiquesGraph;
