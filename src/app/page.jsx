"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
    const [inputData, setInputData] = useState({
        sepal_length: "5.1",
        sepal_width: "3.5",
        petal_length: "1.4",
        petal_width: "0.2",
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        // Map frontend snake_case to backend camelCase
        const formattedData = {
            sepalLength: parseFloat(inputData.sepal_length),
            sepalWidth: parseFloat(inputData.sepal_width),
            petalLength: parseFloat(inputData.petal_length),
            petalWidth: parseFloat(inputData.petal_width),
        };

        try {
            const res = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            const data = await res.json();

            if (data.prediction) {
                setResult(data.prediction);
            } else {
                setError("Invalid response from server");
                console.error("Backend Response:", data);
            }
        } catch (err) {
            setError("Failed to get prediction");
            console.error("Prediction Error:", err);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
                    Iris Flower Predictor 🌸
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {["sepal_length", "sepal_width", "petal_length", "petal_width"].map((field) => (
                        <input
                            key={field}
                            type="number"
                            name={field}
                            placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            value={inputData[field]}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                        />
                    ))}


                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Predict
                    </button>
                </form>

                {result && (
                    <p className="mt-6 text-green-600 font-semibold text-center">
                        ✅ Predicted Class: {result}
                    </p>
                )}

                {error && (
                    <p className="mt-6 text-red-600 font-semibold text-center">
                        ❌ Error: {error}
                    </p>
                )}
            </div>
        </main>
    );
}
