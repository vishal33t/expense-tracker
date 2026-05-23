import React, { useState } from "react";

import axios from "axios";


function ExpenseList({ expenses, fetchExpenses }) {

    const [editId, setEditId] = useState(null);

    const [editData, setEditData] = useState({

        title: "",

        amount: "",

        category: "",

        date: ""
    });


    // Delete Expense

    const deleteExpense = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/api/expenses/${id}`
            );

            fetchExpenses();

        } catch (error) {

            console.log(error);
        }
    };


    // Start Edit

    const startEdit = (expense) => {

        setEditId(expense._id);

        setEditData({

            title: expense.title,

            amount: expense.amount,

            category: expense.category,

            date: expense.date
        });
    };


    // Save Edit

    const saveEdit = async (id) => {

        try {

            await axios.put(

                `http://localhost:5000/api/expenses/${id}`,

                {
                    ...editData,
                    amount: Number(editData.amount)
                }
            );

            setEditId(null);

            fetchExpenses();

        } catch (error) {

            console.log(error);

            alert("Failed to update expense");
        }
    };


    return (

        <div className="expense-list">

            {
                expenses.length === 0 ? (

                    <h3 className="empty-message">
                        No Expenses Found
                    </h3>

                ) : (

                    expenses.map((expense) => (

                        <div
                            className="expense-card"
                            key={expense._id}
                        >

                            {
                                editId === expense._id ? (

                                    <div className="edit-form">

                                        <input
                                            type="text"
                                            value={editData.title}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    title: e.target.value
                                                })
                                            }
                                        />


                                        <input
                                            type="number"
                                            value={editData.amount}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    amount: e.target.value
                                                })
                                            }
                                        />


                                        <input
                                            type="text"
                                            value={editData.category}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    category: e.target.value
                                                })
                                            }
                                        />


                                        <input
                                            type="date"
                                            value={editData.date}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    date: e.target.value
                                                })
                                            }
                                        />


                                        <button
                                            className="save-btn"
                                            onClick={() =>
                                                saveEdit(expense._id)
                                            }
                                        >
                                            Save
                                        </button>

                                    </div>

                                ) : (

                                    <>

                                        <div className="expense-info">

                                            <h3>
                                                {expense.title}
                                            </h3>

                                            <p>
                                                Amount: ₹ {expense.amount}
                                            </p>

                                            <p>
                                                Category: {expense.category}
                                            </p>

                                            <p>
                                                Date: {expense.date}
                                            </p>

                                        </div>


                                        <div className="btn-group">

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    startEdit(expense)
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteExpense(expense._id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </>

                                )
                            }

                        </div>
                    ))
                )
            }

        </div>
    );
}

export default ExpenseList;