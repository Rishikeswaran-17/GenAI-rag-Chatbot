import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import compLogo from "../assets/snowflakes_logo.png";
import Dataingestion from "../Dataingestion/Dataingestion";
import sademoji from "../assets/sademoji.png";
import neutralface from "../assets/neutralface.png";
import happy from "../assets/happy.png";
import chatLogo from "../assets/snowflake6.png";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messageFormRef = useRef(null);
  const [selectedEmoji, setSelectedEmoji] = useState("neutral"); // Initialize with "neutral"
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [questionTime, setQuestionTime] = useState(null);
  const [answerTime, setAnswerTime] = useState(null);
  const [isContentVisible, setContentVisibility] = useState(true);

  const [chatresponses, setChatresponses] = useState([]);

  useEffect(() => {
    fetchchatresponse();
  }, []);

  const fetchchatresponse = async () => {
    try {
      const response = await fetch("/chat-response");
      const data = await response.json();
      setChatresponses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleChatInfo = () => {
    setShowChatInfo((prevShowChatInfo) => !prevShowChatInfo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const str_time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    sendFeedbackToBackend(
      selectedEmoji,
      answer,
      answerTime,
      question,
      questionTime
    );
    // Reset selectedEmoji to "neutral" for the next message
    setSelectedEmoji("neutral");

    const userHtml = (
      <div className="flex justify-end mb-4">
        <div
          className="msg_cotainer_send text-lg font-poppins bg-light-danger text-danger"
          key="userMessage"
        >
          {inputText}
          <span className="msg_time_send text-black text-hover-danger">{str_time}</span>
        </div>
        <div className="img_cont_msg">
          <img
            src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
            className="rounded-circle user_img_msg"
            alt="User"
          />
        </div>
      </div>
    );

    setMessages((prevMessages) => [...prevMessages, userHtml]);
    setInputText("");
    setIsLoading(true);

    try {
      console.log("Sending user query to server:", inputText);
      setQuestion(inputText);
      setQuestionTime(str_time);
      const response = await fetch(`${process.env.REACT_APP_API_CHAT_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        const botHtml = (
          <div className="flex-col">
            <div className="flex justify-start mb-4">
              <div className="img_cont_msg">
                <img
                  src={compLogo}
                  className="rounded-circle user_img_msg"
                  alt="Bot"
                />
              </div>
              <div
                className="msg_cotainer text-lg font-poppins bg-light-primary text-primary"
                key="botMessage"
              >
                {data.ChatBot.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
                <span className="msg_time text-black text-hover-primary">{str_time}</span>
              </div>
            </div>

            <div className="flex justify-start ml-32 mb-4 gap-2">
              <div>
                <span
                  role="img"
                  aria-label="Dissatisfied"
                  className="emoji text-3xl cursor-pointer"
                  onClick={() =>
                    handleEmojiClick(
                      "dissatisfied",
                      data.ChatBot,
                      str_time,
                      inputText,
                      str_time
                    )
                  }
                >
                  <img src={sademoji} alt="sad" className="h-8" />
                </span>
              </div>
              <div>
                <span
                  role="img"
                  aria-label="Irrelevant"
                  className="emoji text-3xl cursor-pointer"
                  onClick={() =>
                    handleEmojiClick(
                      "irrelevant",
                      data.ChatBot,
                      str_time,
                      inputText,
                      str_time
                    )
                  }
                >
                  <img src={neutralface} alt="neutral" className="h-8" />
                </span>
              </div>
              <div>
                <span
                  role="img"
                  aria-label="Satisfied"
                  className="emoji text-3xl cursor-pointer gap-2"
                  onClick={() =>
                    handleEmojiClick(
                      "satisfied",
                      data.ChatBot,
                      str_time,
                      inputText,
                      str_time
                    )
                  }
                >
                  <img src={happy} alt="happy" className="h-8" />
                </span>
              </div>
              {chatresponses.map((query) => (
                <div className="" key={query.ID}>
                  {JSON.parse(query.DbResponses).map((response, index) => {
                    const pageContentLines = response.page_content.split("\n");
                    const documentNoLine = pageContentLines.find((line) =>
                      line.includes("Document No.:")
                    );
                    return (
                      <div
                        class="rounded-lg inline-block bg-white text-left dark:bg-neutral-700"
                        key={index}
                      >
                        <div class="p-0.5">
                          {documentNoLine && (
                            <p class="text-xs bg-light-primary text-primary">
                              {documentNoLine.trim()}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
        setAnswer(data.ChatBot);
        setAnswerTime(str_time);

        setMessages((prevMessages) => [...prevMessages, botHtml]);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiClick = (
    value,
    answer,
    answerTime,
    question,
    questionTime
  ) => {
    setSelectedEmoji(value);
    sendFeedbackToBackend(value, answer, answerTime, question, questionTime);
    hideEmojis();

    setQuestion(null);
    setAnswer(null);
    setQuestionTime(null);
    setAnswerTime(null);
  };

  function hideEmojis() {
    const emojis = document.querySelectorAll(".emoji");
    emojis.forEach((emoji) => {
      emoji.style.display = "none";
    });
  }

  const sendFeedbackToBackend = async (
    value,
    answer,
    answerTime,
    question,
    questionTime
  ) => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const str_time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    const questionTimeFormatted = questionTime
      ? `${questionTime.split(":")[0].padStart(2, "0")}:${questionTime
          .split(":")[1]
          .padStart(2, "0")}`
      : null;
    const answerTimeFormatted = answerTime
      ? `${answerTime.split(":")[0].padStart(2, "0")}:${answerTime
          .split(":")[1]
          .padStart(2, "0")}`
      : null;

    try {
      console.log("Sending feedback to server:", {
        question: question,
        answer: answer,
        questionTime: questionTimeFormatted,
        answerTime: answerTimeFormatted,
        feedback: value || selectedEmoji || "neutral",
      });
      const response = await fetch(`${process.env.SERVER_URL}/qafeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          answer: answer,
          questionTime: questionTimeFormatted,
          answerTime: answerTimeFormatted,
          feedback: value || selectedEmoji || "neutral",
        }),
      });

      console.log("Server response for feedback:", response);

      const responseData = await response.json();

      console.log("Received response data for feedback:", responseData);

      if (!response.ok) {
        console.error("Error sending feedback:", response.status);
      } else {
        const responseData = await response.json();
        console.log(
          "Feedback sent successfully - Response Data:",
          responseData
        );
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToLatestMessage();
  }, [messages]);

  const scrollToLatestMessage = () => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };

  return (
    <>
      <button
        type="button"
        className="bottom-10 right-10 fixed"
        id="btn-back-to-top"
        onClick={toggleChatInfo}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/4233/4233830.png"
          data-src="https://cdn-icons-png.flaticon.com/128/4233/4233830.png"
          alt="Chatbot"
          title="Chatbot"
          width="50"
          height="50"
          className="lzy lazyload--done"
          srcSet="https://cdn-icons-png.flaticon.com/128/4233/4233830.png 4x"
        />
      </button>
      <div
        id="message"
        className={showChatInfo ? "" : "hidden"}
        style={{
          transform: showChatInfo ? "translateX(0)" : "translateX(0)",
          top: "0px",
          position: "sticky",
        }}
      >
        <div
          className="ml-auto md:-right-2  fixed"
          style={{
            width: "800px",
            left: "62.5%",
            marginTop: "155px",
            "@media (min-width: 768px) and (max-width: 1197px)": {
              width: "800px",
            },
          }}
        >
          <div className="flex justify-center h-full">
            <div className="md:w-2/3 xl:w-1/2 md:ml-52 chat">
              <div
                className="card border-white h-400 bg-gradient-to-tr from-cyan-200 to-red-300"
                style={{ borderWidth: "5px" }}
              >
                <div className="card-header msg_head">
                  <div className="flex items-center">
                    <div className="img_cont">
                      <img
                        src={compLogo}
                        className="rounded-full user_img w-12 h-12"
                        alt="ChatBot"
                      />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info gap-8">
                     <span className="text-hover-primary text-black text-md font-medium">SNOWFLAKE CHATBOT</span>
                    {/* <img src={chatLogo} className="w-72 h-8" alt="ChatBot" />  */}
                      <button
                        type="button"
                        class="btn btn-light-danger"
                        onClick={() => setContentVisibility(!isContentVisible)}
                      >
                        Ingest
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  id="messageFormeight"
                  className={`card-body msg_card_body ${
                    isContentVisible ? "" : "hidden"
                  }`}
                  ref={messageContainerRef}
                >
                  {messages.map((message, index) => (
                    <React.Fragment key={index}>{message}</React.Fragment>
                  ))}
                </div>
                <div
                  className={`card-footer ${isContentVisible ? "" : "hidden"}`}
                >
                  <form
                    ref={messageFormRef}
                    className="input-group"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      id="text"
                      name="msg"
                      placeholder="Type your message..."
                      autoComplete="off"
                      className="form-control type_msg border rounded-full opacity-30 text-black "
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        id="send"
                        className="input-group-text send_btn btn btn-active-primary border rounded-full"
                      >
                        <i className="fas fa-location-arrow " />
                      </button>
                    </div>
                  </form>
                </div>
                {!isContentVisible && (
                  <div className="data-ingestion-container">
                    <Dataingestion />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <></>}
    </>
  );
};

export default Chat;
