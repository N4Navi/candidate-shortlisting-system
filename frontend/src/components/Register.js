import { useState } from "react";

import axios from "axios";

import { API_BASE_URL } from "../config";

function Register() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(

                    `${API_BASE_URL}/api/auth/register`,

                    {
                        name,
                        email,
                        password
                    }

                );

            alert(response.data.message);

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.error ||
                "Registration failed"
            );

        }

    };

    return (

        <div>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
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