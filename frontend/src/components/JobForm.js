import { API_BASE_URL } from "../config";
import { useState } from "react";
import axios from "axios";

function JobForm() {

    const [jobData, setJobData] = useState({
        requiredSkills: "",
        preferredSkills: "",
        minExperience: ""
    });

    const [results, setResults] = useState([]);

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
                `${API_BASE_URL}/api/match`,
                {
                    requiredSkills:
                        jobData.requiredSkills.split(","),

                    preferredSkills:
                        jobData.preferredSkills.split(","),

                    minExperience:
                        Number(jobData.minExperience)
                }
            );

            setResults(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div>

            <h2>Job Requirement Form</h2>

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
                    Match Candidates
                </button>

            </form>

            <hr />

            <h2>Matched Candidates</h2>

            {
                results.map((candidate, index) => (

                    <div
                        key={index}
                        style={{
                            border: "1px solid blue",
                            margin: "10px",
                            padding: "10px"
                        }}
                    >

                        <h3>{candidate.name}</h3>

                        <p>
                            Match Score:
                            {" "}
                            {candidate.totalScore}
                        </p>

                        <p>
                            Ranking:
                            {" "}
                            {candidate.ranking}
                        </p>

                        <p>
                            Matched Skills:
                            {" "}
                            {candidate.matchedSkills.join(", ")}
                        </p>

                    </div>

                ))
            }

        </div>

    );

}

export default JobForm;
