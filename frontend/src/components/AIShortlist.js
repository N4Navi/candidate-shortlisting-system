import { API_BASE_URL } from "../config";
import { useState } from "react";
import axios from "axios";

function AIShortlist() {

    const [jobData, setJobData] = useState({
        requiredSkills: "",
        preferredSkills: "",
        minExperience: ""
    });

    const [aiResult, setAIResult] = useState("");

    const handleChange = (e) => {

        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                `${API_BASE_URL}/api/ai/shortlist`,
                {
                    requiredSkills:
                        jobData.requiredSkills.split(","),

                    preferredSkills:
                        jobData.preferredSkills.split(","),

                    minExperience:
                        Number(jobData.minExperience)
                }
            );
            console.log(response.data);
            setAIResult(response.data.result);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div>

            <h2>AI Candidate Shortlisting</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="requiredSkills"
                    placeholder="Required Skills"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="preferredSkills"
                    placeholder="Preferred Skills"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="minExperience"
                    placeholder="Minimum Experience"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Get AI Recommendation
                </button>

            </form>

            <hr />

            <h2>AI Recommendation</h2>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    background: "#f4f4f4",
                    padding: "15px"
                }}
            >
                {aiResult}
            </pre>

        </div>

    );

}

export default AIShortlist;