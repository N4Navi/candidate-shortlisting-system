import { API_BASE_URL } from "../config";
import { useState } from "react";
import axios from "axios";

function CandidateForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                `${API_BASE_URL}/api/candidates`,
                {
                    ...formData,
                    skills: formData.skills.split(",")
                }
            );

            console.log(response.data);

            alert("Candidate Added");

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div>

            <h2>Add Candidate</h2>

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
                    type="text"
                    name="skills"
                    placeholder="Skills comma separated"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="experience"
                    placeholder="Experience"
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Add Candidate
                </button>

            </form>

        </div>

    );

}

export default CandidateForm;