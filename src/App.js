import { Route,Routes } from "react-router-dom";
import Chat from "./components/Chat";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;
