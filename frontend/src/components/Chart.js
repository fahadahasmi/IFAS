import React from 'react';
import {Bar} from 'react-chartjs-2';

const Chart = () => {

    const data = {
        labels:['FE Comps','SE Comps','TE Comps','BE Comps'],
        datasets:[{
            label: 'Attendance',
            data:[40,34,24,23,43],
            backgroundColor:['rgb(33, 33, 80)'],
            borderColor:['rgba(33,23,80,0.8)'],
            borderWidth:3
        }
        ]
    }


    return (
        <>
            <Bar data={data} width={600} height={400} />
        </>
    )
}

export default Chart