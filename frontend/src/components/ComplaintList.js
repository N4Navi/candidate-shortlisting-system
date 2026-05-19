import axios from "axios";

import { API_BASE_URL } from "../config";

function ComplaintList({
    complaints,
    fetchComplaints
}) {

    const updateStatus = async (id, status) => {

    try {

        const token =
            localStorage.getItem("token");

        await axios.put(

            `${API_BASE_URL}/api/complaints/${id}`,

            {
                status: status
            },

            {
                headers: {

                    Authorization: token

                }
            }

        );

        fetchComplaints();

    } catch (error) {

        console.log(error);

        alert("Failed to update status");

    }

};

    return (

        <div>

            <h2>Complaint List</h2>

            {
                complaints.map((complaint) => (

                    <div
                        key={complaint._id}

                        style={{
                            border: "1px solid gray",
                            margin: "10px",
                            padding: "10px"
                        }}
                    >

                        <h3>
                            {complaint.title}
                        </h3>

                        <p>
                            {complaint.description}
                        </p>

                        <p>
                            <b>Status:</b>
                            {" "}
                            {complaint.status}
                        </p>

                        <p>
                            <b>Location:</b>
                            {" "}
                            {complaint.location}
                        </p>

                        <button
                            onClick={() =>
                                updateStatus(
                                    complaint._id,
                                    "Pending"
                                )
                            }
                        >
                            Pending
                        </button>

                        {" "}

                        <button
                            onClick={() =>
                                updateStatus(
                                    complaint._id,
                                    "In Progress"
                                )
                            }
                        >
                            In Progress
                        </button>

                        {" "}

                        <button
                            onClick={() =>
                                updateStatus(
                                    complaint._id,
                                    "Resolved"
                                )
                            }
                        >
                            Resolved
                        </button>

                    </div>

                ))
            }

        </div>

    );

}

export default ComplaintList;