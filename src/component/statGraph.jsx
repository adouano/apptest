import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';

const StatistiquesGraph = ({adherents}) => {
  const {user} = useAuth();
  const [datas, setDatas] = useState([]);
    // console.log(adherents)

  const getStatEnregJour = async() => {
    try{
      // const {data,error} = await supabase.from('dvenrollment').select('*', { count: 'exact', head: true }).eq('associate_id', user?.id).group('created_at');
      // const {data,error} = await supabase.from('dvenrollment').select('*, count(associate_id)').eq('associate_id', user?.id).group('created_at');
      // const {data,error} = await supabase.from('dvenrollment').select('*', { count: 'exact' }).eq('associate_id', user?.id);
      const {data,error} = await supabase.from('dvenrollment').select('*', { count: 'exact' }).eq('associate_id', user?.id);
      setDatas(data);
    }
    catch(error){}
  }



  const [functData, setFunctData] = useState([]);
  const getFunction = async () => {
      // const {data} = await supabase.rpc("stat_enroll");
      const {data} = await supabase.rpc("stat_enrollment");
      setFunctData(data);
  }


  useEffect(() => {
    getFunction();
  },[]);
  (functData).map((dt3) => console.log(dt3))
  console.log(Object.entries(functData).length);
  
  // let groupData1;
  // let groupData;
  // let result1;
  // let result;
  // groupData1 = Map.groupBy(adherents, data1 => result1 = new Date(data1.created_at).toLocaleDateString());
  // // groupData1 = Map.groupBy(adherents, data1 => result1 = Object.entries(new Date(data1.created_at).toLocaleDateString().length));
  // groupData = Map.groupBy(adherents, data1 => {
  //   result = new Date(data1.created_at).toLocaleDateString();
  // });
  // // groupData.map((dt1) => console.log(dt1));
  // console.log(groupData1);
  // console.log(result1);
  // console.log(groupData);
  // console.log(result);
  

  // let groupe = 0;
  // datas.map((dt) => {
  //   if(new Date(dt.created_at).toLocaleDateString()){
  //     groupe += 1;
  //   }
  // });
  //   console.log(groupe);


    
    // const labels = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
    // const labels = adherents.map((dt) => dt.genresexe);
    // const adherentData = {
    //     labels: labels,
    //     datasets: [
    //         {
    //             label: "Statistiques des adhesions",
    //             data: adherents.map((dt) => dt.centrenroll),
    //             barPercentage: 0.5,
    //             barThickness: 25,
    //             backgroundColor: 'rgba(55, 176, 76)',
    //         }
    //     ]
    // };

    const [adherentData, setAdhrtData] = useState({
        labels: functData.map((data) => new Date(data.created_at).toLocaleDateString()),
        datasets: [
          {
            label: "Stat de la semaine",
            data: functData.map((data) => data.centrenroll),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 1,
          },
        ],
    });

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
