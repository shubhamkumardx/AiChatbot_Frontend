import React, { useState } from "react";
import axios from "axios";
import { Audio, ThreeDots } from "react-loader-spinner";

function AiChatbot(props) {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (message.trim() !== "") {
      const newConversation = [
        ...conversation,
        { question: message, answer: "" },
      ];
      setConversation(newConversation);
      setMessage("");
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:5000/search", {
          question: message,
        });

        const updatedConversation = newConversation.map((entry, index) => {
          if (index === newConversation.length - 1) {
            return { ...entry, answer: response.data };
          }
          return entry;
        });

        setConversation(updatedConversation);
        setLoading(false);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error sending message: ", error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="nav">
        <img src="https://i0.wp.com/www.designersx.us/wp-content/uploads/2020/09/cropped-logo.png?w=713&ssl=1" alt="" className="nav_image" />
      </div>
      <hr className="hrr_line"></hr>
   
      <div className="container mt-4">
        <div className="main-comp">
          <h4 className="m-2">AI Chatbot</h4>
          <hr />

          {/* QUESTION */}
          <div className="container chat-main">
            {conversation.map((entry, index) => (
              <div key={index} className="d-flex flex-column align-items-end">
                <h5 className="align-self-end mt-3 ques">
                  Ques: {entry.question}
                </h5>
                {entry.answer ? (
                  <h5 className="align-self-start mt-3 ans">
                    Ans: {entry.answer}
                  </h5>
                ) : (
                  loading && (
                    <div className="align-self-start mt-3 ans_spinner">
                      <ThreeDots height="30" width="40" color="#000000" />
                    </div>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="input-group mt-2">
            <input
              type="text"
              className="form-control"
              value={message}
              placeholder="Please enter message."
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiChatbot;
