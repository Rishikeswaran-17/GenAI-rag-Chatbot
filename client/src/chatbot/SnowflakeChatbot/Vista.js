import React from "react";

const Vista = () => {
  return (
    <div className="bg-danger h-screen">
      <h3 className="text-hover-primary flex justify-center items-center pt-44 text-6xl fs-2hx text-white fw-bolder mb-5">
        Snowflake Bank Chatbot Demo
      </h3>
      <div className="flex items-center justify-center">
        <label className="flex flex-col rounded-lg border-4 border-dashed p-20 group text-center">
          <div className="flex flex-col gap-3">
            <a href="/openai" class="btn btn-light-primary text-center w-96 p-8">
            🧠 OpenAI
            </a>
            <a href="/falcon" class="btn btn-light-primary text-center w-96 p-8">
              🦅 Falcon
            </a>
            <a href="/llama" class="btn btn-light-primary text-center w-96 p-8">
              🐐 Llama
            </a>
            <a href="/llama" class="btn btn-light-success text-center w-96 p-8">
             🤗 Huggingface Models 
            </a>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Vista;
