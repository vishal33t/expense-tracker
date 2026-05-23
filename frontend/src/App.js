import React, { useEffect, useState } from "react";

import axios from "axios";

import ExpenseForm from "./components/ExpenseForm";

import ExpenseList from "./components/ExpenseList";

import Login from "./components/Login";

import Signup from "./components/Signup";

import "./App.css";


function App() {

    const [expenses, setExpenses] = useState([]);

    const [search, setSearch] = useState("");

    const [isLoggedIn, setIsLoggedIn] =
        useState(false);

    const [showSignup, setShowSignup] =
        useState(false);

    const [darkMode, setDarkMode] =
        useState(false);


    // Fetch Expenses

    const fetchExpenses = async () => {

        try {

            const res = await axios.get(
                "https://expense-tracker-knv7.onrender.com/api/expenses"
            );

            setExpenses(res.data);

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (token) {

            setIsLoggedIn(true);
        }

        fetchExpenses();

    }, []);


    // Total Expense

    const totalExpense = expenses.reduce(

        (total, item) =>

            total + Number(item.amount),

        0
    );


    // Search Filter

    const filteredExpenses = expenses.filter(

        (expense) =>

            expense.title
                .toLowerCase()
                .includes(search.toLowerCase())
    );


    // Monthly Analysis

    const monthlyExpenses = {};

    expenses.forEach((expense) => {

        const month = new Date(
            expense.date
        ).toLocaleString(

            "default",

            { month: "long" }
        );

        monthlyExpenses[month] =

            (monthlyExpenses[month] || 0)

            + Number(expense.amount);
    });


    // LOGIN / SIGNUP SCREEN

    if (!isLoggedIn) {

        return (

            <div className="auth-container">

                <h1 className="heading">
                    Expense Tracker
                </h1>

                {
                    showSignup ? (

                        <Signup />

                    ) : (

                        <Login
                            setIsLoggedIn={
                                setIsLoggedIn
                            }
                        />
                    )
                }

                <button
                    className="switch-btn"
                    onClick={() =>
                        setShowSignup(
                            !showSignup
                        )
                    }
                >

                    {
                        showSignup

                            ? "Already have account? Login"

                            : "Create New Account"
                    }

                </button>

            </div>
        );
    }


    return (

        <div
            className={
                darkMode
                    ? "container dark"
                    : "container"
            }
        >

            <div className="top-bar">

                <h1 className="heading">
                    Expense Tracker
                </h1>

                <button
                    className="dark-btn"
                    onClick={() =>
                        setDarkMode(!darkMode)
                    }
                >

                    {
                        darkMode
                            ? "Light Mode"
                            : "Dark Mode"
                    }

                </button>

            </div>


            <input
                className="search-input"
                type="text"
                placeholder="Search Expense"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />


            <ExpenseForm
                fetchExpenses={fetchExpenses}
            />


            <div className="total-box">

                <h2>

                    Total Expense:
                    ₹ {totalExpense}

                </h2>

            </div>


            <div className="monthly-box">

                <h2>
                    Monthly Analysis
                </h2>

                {
                    Object.entries(
                        monthlyExpenses
                    ).map(

                        ([month, total]) => (

                            <p key={month}>

                                {month}: ₹ {total}

                            </p>
                        )
                    )
                }

            </div>


            <ExpenseList
                expenses={filteredExpenses}
                fetchExpenses={fetchExpenses}
            />

        </div>
    );
}

export default App;