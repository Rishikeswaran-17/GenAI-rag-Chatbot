import React, { useEffect, useState } from "react";

const CreateScreen = () => {
  const [databasename, setDatabasename] = useState([]);
  const [datatype, setDatatype] = useState([]);
  const [tableCategories, setTableCategories] = useState([]);
  const [formData, setFormData] = useState({}); // State to hold input values
  const [columns, setColumns] = useState([]); // State to store dynamic columns

  useEffect(() => {
    fetchDatabasename();
  }, []);

  const fetchDatabasename = async () => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/getdatabasename`);
      const data = await response.json();
      setDatabasename(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchDatatype();
  }, []);

  const fetchDatatype = async () => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/getdatatypes`);
      const data = await response.json();
      setDatatype(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addColumn = () => {
    // Create a new column object with default values
    const newColumn = {
      columnName: "",
      dataType: "",
      value: "",
      allowNull: false,
    };

    // Add the new column to the columns state
    setColumns([...columns, newColumn]);
  };

  const handleSubmit = () => {
    // Gather the selected database name and table name
    const selectedDatabase = document.querySelector('#databaseName').value;
    const tableName = `dbo.${document.querySelector('#tableName').value}`;
    
    // Log the selected database and table name
    console.log('Selected Database:', selectedDatabase);
    console.log('Table Name:', tableName);

    // Gather the column details
    const columnsData = columns.map((column, index) => {
      const columnName = document.querySelector(`#columnName_${index}`).value;
      const dataType = document.querySelector(`#dataType_${index}`).value;
      const value = document.querySelector(`#value_${index}`).value;
      const allowNull = document.querySelector(`#allowNull_${index}`).checked;
  
      // Log the column details for each index
      console.log(`Column ${index + 1}:`);
      console.log('Column Name:', columnName);
      console.log('Data Type:', dataType);
      console.log('Value:', value);
      console.log('Allow Null:', allowNull);
      
      return {
        columnName,
        dataType,
        value,
        allowNull,
      };
    });
  
    // Create a payload with all the data
    const payload = {
      databaseName: selectedDatabase,
      tableName,
      columns: columnsData,
    };
  
    fetch(`${process.env.SERVER_URL}/createTable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          // Table creation was successful
          console.log('Table created successfully');
        } else {
          // Handle any errors here
          console.error('Table creation failed');
        }
      })
      .catch(error => {
        console.error('API request failed', error);
      });
  };
  

  return (
    <div>
      <button
        type="button"
        class="btn btn-light-success border-success border-dashed border-1 btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_3"
      >
        Add
      </button>
      <div
        className="modal fade"
        tabIndex="-1"
        id="kt_modal_3"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title font-semibold text-primary">
                Create new
              </h1>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ki-duotone ki-cross fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            </div>
            <div className="modal-body scroll h-500px">
              <form>
              <label className="fs-6 fw-semibold form-label mt-3">
                  <span className="required">Database Name</span>
                </label>
                <select id="databaseName" class="form-select form-select-solid" aria-label="Select example">
                  <option></option>
                  {databasename.map((table, idx) => (
                    <option key={idx} value={table.name}>
                      {table.name}
                    </option>
                  ))}
                </select>
                <label className="fs-6 fw-semibold form-label mt-3">
                  <span className="required">Table Name</span>
                </label>
                <input id="tableName" type="text" class="form-control form-control-solid" placeholder="Enter your table name" />
                {columns.map((column, index) => (
                  <div className="flex space-x-5" key={index}>
                    <div className="mt-3 space-y-3">
                      <span className="required">Column Name</span>
                      <input
                        type="text"
                        id={`columnName_${index}`} // Assign a unique ID
                        className="form-control form-control-solid w-52"
                        placeholder="Enter Column name"
                      />
                    </div>
                    <div className="mt-3 space-y-3 w-40">
                      <span className="required">Data Types</span>
                      <select
                        id={`dataType_${index}`} // Assign a unique ID
                        className="form-select form-select-solid"
                        aria-label="Select example"
                      >
                        <option></option>
                        {datatype.map((table, idx) => (
                          <option key={idx} value={table.Data_Type}>
                            {table.Data_Type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-3 space-y-3 w-16">
                      <span className="required">values</span>
                      <input
                        type="text"
                        id={`value_${index}`} // Assign a unique ID
                        className="form-control form-control-solid"
                        placeholder=""
                      />
                    </div>
                    <div className="mt-3 space-y-3">
                      <span className="">Allow Nulls</span>
                      <div className="form-check form-check-custom form-check-solid p-5">
                        <input
                          id={`allowNull_${index}`} // Assign a unique ID
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
              </form>
            </div>
            <button
              type="button"
              class="btn btn-light btn-active-light-primary"
              onClick={addColumn}
            >
              Add Column
            </button>
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                Close
              </button>
              <button  onClick={handleSubmit} type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateScreen;
