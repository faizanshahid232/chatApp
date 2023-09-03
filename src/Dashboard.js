import React, {useEffect} from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    let history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            if (Date.now() - parseInt(localStorage.getItem("accessTime")) > 7200000) {
                localStorage.clear();
                history("/login")
            }
        } else {
          history("/login")
        }
        const interval = setInterval(() => {
            if (token) {
                if (
                    Date.now() - parseInt(localStorage.getItem("accessTime")) >
                    7200000
                ) {
                    localStorage.clear();
                    history("/login")
                }
            }
        }, 10000);
    
        return () => clearInterval(interval);
    }, []);

    return (
        'Dashboard'
    );
}