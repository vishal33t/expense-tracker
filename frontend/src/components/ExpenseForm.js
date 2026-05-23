import React, { useState } from "react";

import axios from "axios";


function ExpenseForm({ fetchExpenses }) {

    const [expense, setExpense] = useState({

        title: "",

        amount: "",

        category: "Food",

        customCategory: "",

        date: ""
    });


    // Handle Input Change

    const handleChange = (e) => {

        setExpense({

            ...expense,

            [e.target.name]: e.target.value
        });
    };


    // Handle Submit

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (

            expense.title.trim() === "" ||

            expense.amount === "" ||

            expense.date === ""

        ) {

            alert("Please fill all fields");

            return;
        }


        const expenseData = {

            ...expense,

            category:

                expense.category === "Others"

                    ? expense.customCategory

                    : expense.category,

            amount: Number(expense.amount)
        };


        try {

            await axios.post(

                "https://expense-tracker-knv7.onrender.com/api/expenses",

                expenseData
            );


            fetchExpenses();


            setExpense({

                title: "",

                amount: "",

                category: "Food",

                customCategory: "",

                date: ""
            });

        } catch (error) {

            console.log(error);

            alert("Failed to add expense");
        }
    };


    return (

        <form
            className="expense-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                name="title"
                placeholder="Enter Title"
                value={expense.title}
                onChange={handleChange}
            />


            <input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={expense.amount}
                onChange={handleChange}
            />


            <select
                name="category"
                value={expense.category}
                onChange={handleChange}
            >

                <option>Food</option>

                <option>Travel</option>

                <option>Shopping</option>

                <option>Bills</option>

                <option>Entertainment</option>

                <option>Gym</option>

                <option>Others</option>

            </select>


            {
                expense.category === "Others" && (

                    <input
                        type="text"
                        name="customCategory"
                        placeholder="Enter Custom Category"
                        value={expense.customCategory}
                        onChange={handleChange}
                    />
                )
            }


            <input
                type="date"
                name="date"
                value={expense.date}
                onChange={handleChange}
            />


            <button
                className="add-btn"
                type="submit"
            >
                Add Expense
            </button>

        </form>
    );
}

export default ExpenseForm;