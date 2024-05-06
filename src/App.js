import { Route,Routes } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;
