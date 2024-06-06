import React from "react";

const Staticorpandp = () => {
  return (
    <div className="bg-primary h-screen">
      <h3 className="text-hover-success flex justify-center items-center pt-44 text-6xl text-white fw-bolder mb-5">
        Choose static or P & P
      </h3>
      <div className="flex gap-10 items-center justify-center">
        <a href="/login" class="btn btn-light-primary text-center w-96 p-8">
          <div class="alert alert-success d-flex align-items-center p-24 mb-10">
            <div class="d-flex text-justify text-3xl font-medium flex-column">
              <h4 class="mb-1 text-success">Static</h4>
              <span>Website</span>
            </div>
          </div>
        </a>
        <a href="/login" class="btn btn-light-primary text-center w-96 p-8">
          <div class="alert alert-danger d-flex align-items-center p-24 mb-10">
            <div class="d-flex text-justify text-3xl font-medium flex-column">
              <h4 class="mb-1 text-danger">Policy &</h4>
              <span>Procedure</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Staticorpandp;
