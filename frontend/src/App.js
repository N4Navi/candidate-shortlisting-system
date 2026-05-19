import { useEffect, useState } from "react";

import axios from "axios";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import AIAnalysis from "./components/AIAnalysis";

import { API_BASE_URL } from "./config";

function App() {

    const [complaints, setComplaints] = useState([]);

    const [aiResult, setAiResult] = useState("");

    const fetchComplaints = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/api/complaints`
            );

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

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

            <ComplaintForm
                fetchComplaints={fetchComplaints}
                setAiResult={setAiResult}
            />

            <hr />

            <AIAnalysis aiResult={aiResult} />

            <hr />

           <ComplaintList
    complaints={complaints}
    fetchComplaints={fetchComplaints}
/>

        </div>

    );

}

export default App;