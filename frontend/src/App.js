import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import JobForm from "./components/JobForm";
import AIShortlist from "./components/AIShortlist";

function App() {

  return (
    <div style={{ padding: "20px" }}>

      <h1>Candidate Shortlisting System</h1>

      <CandidateForm />

      <hr />

      <CandidateList />

      <hr />

      <JobForm />

      <hr />

      <AIShortlist />

    </div>
  );

}

export default App;