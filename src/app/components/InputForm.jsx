import { useState } from "react";

export default function InputForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        sepalLength: "",
        sepalWidth: "",
        petalLength: "",
        petalWidth: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {["sepalLength", "sepalWidth", "petalLength", "petalWidth"].map((name) => (
                <div key={name}>
                    <label>{name.replace(/([A-Z])/g, " $1")}:</label>
                    <input
                        type="number"
                        step="0.1"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                    />
                </div>
            ))}
            <button type="submit">Predict Species</button>
        </form>
    );
}
