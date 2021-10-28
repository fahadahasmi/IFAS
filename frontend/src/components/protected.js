import React,{useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function Protected(props){
    let Components = props.component;
    const history = useHistory();
    useEffect(()=>{
        if(!localStorage.getItem('token') || Date.now() < (3600*1000-60000)){
            history.push('/signIn');
        }
        // eslint-disable-next-line 
    },[]);
    return(
        <>
            <Components />
        </>
    )
}

export default Protected