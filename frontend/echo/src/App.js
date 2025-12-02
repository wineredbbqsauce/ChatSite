import React from "react";
import "./App.css";
import FusionChat from "./pages/main";
import "./styles/main.css";

function App() {
  const API_URL = process.env.REACT_APP_APP_URL || "http://localhost:25565";
  const [data, setData] = useState(null);

  /** 
  useEffect(() => {
    // call backend
    fetch('http://localhost:25565/')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error('Error', err));
  }, []);

  */
  useEffect(() => {
/**    fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { " Content-Type": "aplication/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Response from backend:", data)); */

      fetch(`${API_URL}/api/login`)
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, [API_URL]);

  return <FusionChat />;
}

export default App;
