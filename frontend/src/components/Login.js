import React, { useState } from "react";

import axios from "axios";


function Login({ setIsLoggedIn }) {

    const [formData, setFormData] =
        useState({

            email: "",

            password: ""
        });


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(

                "https://expense-tracker-knv7.onrender.com/api/auth/login",

                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            setIsLoggedIn(true);

        } catch (error) {

            alert("Login Failed");
        }
    };


    return (

        <form
            className="auth-form"
            onSubmit={handleLogin}
        >

            <h2>Login</h2>

            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
            />

            <button type="submit">
                Login
            </button>

        </form>
    );
}

export default Login;