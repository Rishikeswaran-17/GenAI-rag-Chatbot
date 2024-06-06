import React, { useState, useEffect } from "react";
import { Ripple, initTWE } from "tw-elements";

initTWE({ Ripple });

const Dataingestion = () => {
  const [dbQuery, setDbQuery] = useState("");
  const [chatBotResponse, setChatBotResponse] = useState("");
  const [dbResponse, setDbResponse] = useState([]);

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

  return (
    <div>
      <div
        className="block ml-2.5 overflow-scroll rounded-lg bg-white dark:bg-neutral-200"
        style={{ width: "95%", height: "400px" }}
      >
        {chatresponses.map((query) => (
          <div className="p-2" key={query.ID}>
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 ">
              DB Query
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {query.DbQuery}
            </p>
            <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              DB Response
            </h3>
            <ul className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {JSON.parse(query.DbResponses).map((response, index) => {
                const pageContentLines = response.page_content.split("\n");
                const documentNoLine = pageContentLines.find((line) =>
                  line.includes("Document No.:")
                );
                const versionLine = pageContentLines.find((line) =>
                  line.includes("Version")
                );
                const pageLine = pageContentLines.find((line) =>
                  line.includes("Page")
                );
                const dateLine = pageContentLines.find((line) =>
                  line.includes("Date")
                );

                return (
                  <li key={index}>
                    
                    {documentNoLine && (
                      <p className="text-sm font-semibold  text-neutral-600 dark:text-neutral-200">
                        {documentNoLine.trim()}
                      </p>
                    )}
                    {versionLine && (
                      <p className="text-sm font-semibold  text-neutral-600 dark:text-neutral-200">
                        {versionLine.trim()}
                      </p>
                    )}
                    {pageLine && (
                      <p className="text-sm font-semibold  text-neutral-600 dark:text-neutral-200">
                        {pageLine.trim()}
                      </p>
                    )}
                    {dateLine && (
                      <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-200">
                        {dateLine.trim()}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dataingestion;
