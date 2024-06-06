import Dropzone from "dropzone";
import React, { useEffect } from "react";

const Practice = () => {
  useEffect(() => {
    // Initialize Dropzone
    const myDropzone = new Dropzone("#kt_dropzonejs_example_1", {
      url: "/your-upload-endpoint", // Replace with your actual upload endpoint
      maxFiles: 10, // Maximum number of files allowed
      acceptedFiles: ".csv, .tsv", // Allow only CSV and TSV files
      addRemoveLinks: true, // Show remove links on uploaded files
    });

    // Event listener for a successful file upload
    myDropzone.on("success", (file, response) => {
      console.log("File uploaded successfully:", file, response);
      // Add any additional actions you want to perform after successful upload
    });

    // Event listener for an error during file upload
    myDropzone.on("error", (file, errorMessage) => {
      console.error("Error uploading file:", file, errorMessage);
      // Handle the error as needed
    });

    // Cleanup Dropzone when the component unmounts
    return () => myDropzone.destroy();
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <div>
      <div id="kt_header" class="header align-items-stretch  bg-primary ">
        <div class="container-xxl d-flex align-items-stretch justify-content-between">
          <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
            <h3 className="text-hover-success flex justify-center items-center pt-4 text-6xl fs-2hx text-white fw-bolder mb-5">
              Snowflake DS Solution
            </h3>
          </div>
        </div>
      </div>

      <form class="form" action="#" method="post">
        <div class="fv-row">
          <div class="dropzone" id="kt_dropzonejs_example_1">
            <div class="dz-message needsclick">
              <i class="ki-duotone ki-file-up fs-3x text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>

              <div class="ms-4">
                <h3 class="fs-5 fw-bold text-gray-900 mb-1">
                  Drop files here or click to upload.
                </h3>
                <span class="fs-7 fw-semibold text-gray-500">
                  Upload up to 10 files
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Practice;
