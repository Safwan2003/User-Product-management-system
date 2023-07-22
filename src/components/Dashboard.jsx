// import React from 'react'
// import { Bar } from 'react-chartjs-2';

// const Dashboard = () => {



//   return (
//     <div>
//       <h1>Dashboard</h1>




//     </div>
//   )
// }

// export default Dashboard
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const Dashboard =  (props) => {

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data =  {
  labels: [ 'User', 'Product'],
  datasets: [
    {
      label: 'N.O OF ',
      data: [props.totaluser, 50],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
              ],
      borderWidth: 2,
    },
  ],
};


  return( 
    <div className='mt-48 p-12'>
    
    <Pie data={data} className=''/>
  </div>
)
}
  
export default Dashboard
