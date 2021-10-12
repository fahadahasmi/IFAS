import React from 'react';
import {Bar} from 'react-chartjs-2';

const Chart = () => {

    const data = canvas => {
    const ctx = canvas.getContext('2d');
    const g = ctx.createLinearGradient(20,0, 220,0);

    return {
        labels:['FE Comps','SE Comps','TE Comps','BE Comps'],
        datasets:[{
            label: 'Attendance',
            data:[40,34,24,23,43],
            backgroundColor:g,
            borderColor:['rgba(33,23,80,0.8)'],
            borderWidth:3
        }
        ],
    };
}


    return (
        <>
            <Bar data={data} width={600} height={400} />
        </>
    )
}

export default Chart