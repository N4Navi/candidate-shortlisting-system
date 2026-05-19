import { useState } from "react";

import axios from "axios";

import { API_BASE_URL } from "../config";

function ComplaintForm({
    fetchComplaints,
    setAiResult
}) {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [location, setLocation] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                `${API_BASE_URL}/api/complaints`,

                {
                    name,
                    email,
                    title,
                    description,
                    category,
                    location
                }

            );

            const aiResponse =
                await axios.post(

                    `${API_BASE_URL}/api/ai/analyze`,

                    {
                        category,
                        description
                    }

                );

            setAiResult(
                aiResponse.data
            );

            fetchComplaints();

            alert(
                "Complaint submitted successfully"
            );

            setName("");
            setEmail("");
            setTitle("");
            setDescription("");
            setCategory("");
            setLocation("");

        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.error ||

                "Error submitting complaint"

            );

        }

    };

    return (

        <div>

            <h2>Register Complaint</h2>

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
                    type="text"
                    placeholder="Complaint Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />

                <br /><br />

                <button type="submit">
                    Submit Complaint
                </button>

            </form>

        </div>

    );

}

export default ComplaintForm;