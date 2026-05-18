import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";

function CandidateList() {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {

        fetchCandidates();

    }, []);

    const fetchCandidates = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/api/candidates`
            );

            setCandidates(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div>

            <h2>Candidate List</h2>

            {
                candidates.map((candidate) => (

                    <div
                        key={candidate._id}
                        style={{
                            border: "1px solid black",
                            margin: "10px",
                            padding: "10px"
                        }}
                    >

                        <h3>{candidate.name}</h3>

                        <p>Email: {candidate.email}</p>

                        <p>
                            Skills:
                            {" "}
                            {candidate.skills.join(", ")}
                        </p>

                        <p>
                            Experience:
                            {" "}
                            {candidate.experience}
                            {" "}
                            years
                        </p>

                    </div>

                ))
            }

        </div>

    );

}

export default CandidateList;