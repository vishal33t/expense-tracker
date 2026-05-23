import React, { useState } from "react";

import axios from "axios";


function Signup() {

    const [formData, setFormData] =
        useState({

            name: "",

            email: "",

            password: ""
        });


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };


    const handleSignup = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "https://expense-tracker-knv7.onrender.com/api/auth/signup",

                formData
            );

            alert("Signup Successful");

        } catch (error) {

            alert("Signup Failed");
        }
    };


    return (

        <form
            className="auth-form"
            onSubmit={handleSignup}
        >

            <h2>Signup</h2>

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
            />

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
                Signup
            </button>

        </form>
    );
}

export default Signup;