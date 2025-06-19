import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VoteForm from "./components/VoteForm.jsx";
import Results from "./components/Results.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VoteForm />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
