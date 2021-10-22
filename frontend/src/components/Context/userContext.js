import React, { createContext, useEffect, useState } from 'react';
import Attendance from '../Attendance';
import AttendRecords from '../AttendRecords';
export const userData = createContext();

export function Usercontext() {
    const [name, setName] = useState('');
    const [isName, setIsName] = useState(false);

    useEffect(() => {
        userInfo()
    }, []);

    function userInfo() {
        fetch("http://localhost:4000/api/auth/user", {
            method: "POST",
            headers: {
                'auth-token': localStorage.getItem('token'),
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.name)
                setName(data.name);
                setIsName(true)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (window.location.pathname === '/attendance') {
        return (

            <userData.Provider value={{ name }}>
                {isName ? (<Attendance />) : null}
            </userData.Provider>
        )
    }
    else if (window.location.pathname === '/Records') {
        return (

            <userData.Provider value={{ name }}>
                {isName ? (<AttendRecords />) : null}
            </userData.Provider>
        )
    }
}

