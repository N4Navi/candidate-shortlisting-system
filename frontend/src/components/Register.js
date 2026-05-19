import { useState } from "react";

import axios from "axios";

import { API_BASE_URL } from "../config";

function Register() {

    const [formData, setFormData] =
        useState({

            name: "",
            email: "",
            password: ""

        });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(

                    `${API_BASE_URL}/api/auth/register`,

                    formData

                );

            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert("Registration failed");

        }

    };

    return (

        <div>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;