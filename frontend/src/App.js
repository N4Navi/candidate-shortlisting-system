import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";

import axios from "axios";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import AIAnalysis from "./components/AIAnalysis";

import { API_BASE_URL } from "./config";

function App() {

    const [location, setLocation] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [complaints, setComplaints] =
        useState([]);

    const [aiResult, setAiResult] =
        useState("");

    const token =
        localStorage.getItem("token");

    const fetchComplaints = async () => {

        try {

            const response =
                await axios.get(
                    `${API_BASE_URL}/api/complaints`
                );

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const searchComplaints = async () => {

        try {

            const response =
                await axios.get(

                    `${API_BASE_URL}/api/complaints/search`,

                    {
                        params: {
                            location,
                            category
                        }
                    }

                );

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

            alert("Search failed");

        }

    };

    useEffect(() => {

        fetchComplaints();

    }, []);

    return (

        <div style={{ padding: "20px" }}>

            <h1>
                Smart Complaint Management System
            </h1>

            {

                !token ? (

                    <>

                        <Register />

                        <hr />

                        <Login />

                    </>

                ) : (

                    <>

                        <button

                            onClick={() => {

                                localStorage.removeItem("token");

                                window.location.reload();

                            }}

                        >

                            Logout

                        </button>

                        <hr />

                        <ComplaintForm
                            fetchComplaints={fetchComplaints}
                            setAiResult={setAiResult}
                        />

                        <hr />

                        <AIAnalysis
                            aiResult={aiResult}
                        />

                        <hr />

                        <h2>Search Complaints</h2>

                        <input
                            type="text"
                            placeholder="Search by location"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                        />

                        <br /><br />

                        <input
                            type="text"
                            placeholder="Filter by category"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        />

                        <br /><br />

                        <button
                            onClick={searchComplaints}
                        >
                            Search
                        </button>

                        <hr />

                        <ComplaintList
                            complaints={complaints}
                            fetchComplaints={fetchComplaints}
                        />

                    </>

                )

            }

        </div>

    );

}

export default App;