import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./LOGIN/Login";
import Register from "./LOGIN/Register";
import ChatRecord from "./Components/Tables/ChatRecord";
import Bank from "./chatbot/Bank/Bank";
import Vista from "./chatbot/SnowflakeChatbot/Vista";
import Staticorpandp from "./chatbot/SnowflakeChatbot/Staticorpandp";
// import Callcenter from "./callcenter/Callcenter";
// import Azure from "./azure_speech/Azure";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={
              <>
                <Vista />
              </>
            }
          />
          <Route path="/openai" element={
              <>
                <Staticorpandp />
              </>
            }
          />
          <Route path="/falcon" element={
              <>
                <Staticorpandp />
              </>
            }
          />
          <Route path="/llama" element={
              <>
                <Staticorpandp />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/datatables" element={<ChatRecord />} />
          <Route path="/snowflake" element={<Bank />} />
          {/* <Route path="/callcenter" element={<Callcenter />} /> */}
          {/* <Route path="/azurespeech" element={<Azure />} /> */}
          </Routes>
      </Router>
    </div>
  );
};

export default App;
