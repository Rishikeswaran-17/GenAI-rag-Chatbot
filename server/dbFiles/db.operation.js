const sql = require("mssql");
const config = require("./db.config");

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// -------------------- Login -----------------------
const registerUser = async (username, email, passwordHash) => {
  try {
    if (!username || username.trim() === "") {
      throw new Error("Username cannot be empty");
    }
    console.log("Received email in dbOperation:", email);
    console.log("Received passwordHash in dbOperation:", passwordHash);
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("UserName", sql.NVarChar(255), username)
      .input("Email", sql.NVarChar(255), email)
      .input("PasswordHash", sql.NVarChar(64), passwordHash)
      .execute("InsertAdminandUserLogin");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register user");
  }
};

const getUserByEmail = async (email) => {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Email", sql.NVarChar(255), email)
      .query("SELECT * FROM AdminandUserLogin WHERE Email = @Email");
    return result.recordset[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user by email");
  }
};

const loginUser = async (email, passwordHash) => {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Email", sql.NVarChar(255), email)
      .input("PasswordHash", sql.NVarChar(64), passwordHash)
      .query(
        "SELECT COUNT(*) AS UserCount FROM AdminandUserLogin WHERE Email = @Email AND PasswordHash = @PasswordHash"
      );
    const userCount = result.recordset[0].UserCount;
    return userCount === 1; // Return true if user exists, false otherwise
  } catch (error) {
    //console.log(error);
  }
};
// ------------------------- x x --------------------------------------
//-------------------------- CRUD -----------------------------------------------
const getTablenames = async () => {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        "SELECT TABLE_NAME FROM [Rishi].[INFORMATION_SCHEMA].[TABLES] WHERE TABLE_SCHEMA = 'dbo';"
      );
    return result;
  } catch (error) {
    throw new Error("Failed to get Table Name");
  }
};

const getCategoriesForTable = async (tableName) => {
  try {
    // Make sure the connection is established before executing the query
    await poolConnect;

    // Use parameterized query to avoid SQL injection
    const result = await pool
      .request()
      .input("tableName", sql.NVarChar, tableName).query(`SELECT column_name
      FROM information_schema.columns
      WHERE table_name = @tableName
      AND COLUMNPROPERTY(OBJECT_ID(TABLE_SCHEMA + '.' + TABLE_NAME), COLUMN_NAME, 'IsIdentity') <> 1;       
      `);

    const categories = result.recordset.map((row) => row.column_name);
    return categories;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed to get Categories for Table");
  }
};

const insertData = async (tableName, dataToInsert) => {
  try {
    const pool = await sql.connect(config);

    // Construct your SQL query based on the tableName and the data
    const columnNames = Object.keys(dataToInsert).join(", ");
    const values = Object.keys(dataToInsert)
      .map((key) => `@${key}`)
      .join(", ");
    const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${values})`;

    const inputParams = Object.entries(dataToInsert).map(([key, value]) => ({
      name: key,
      type: sql.NVarChar(255), // Change the type based on your column's data type
      value: value,
    }));

    const request = pool.request();
    inputParams.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    await request.query(query);

    console.log("Data inserted successfully");
  } catch (error) {
    console.log("Error inserting data:", error);
    throw new Error("Failed to insert data");
  }
};

const UpdateData = async (tableName, dataToUpdate) => {
  try {
    console.log("tableName:", tableName);
    console.log("dataToUpdate:", dataToUpdate);

    const pool = await sql.connect(config);

    // Construct your SQL query based on the tableName and dataToUpdate
    const setClause = Object.keys(dataToUpdate)
      .map((key) => `${key} = @${key}`)
      .join(", ");

    // Construct the WHERE clause dynamically based on matching columns and values
    const whereConditions = Object.keys(dataToUpdate)
      .map((key) => `${key} = @${key}_condition`)
      .join(" OR ");

    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereConditions}`;

    const inputParams = Object.entries(dataToUpdate).map(([key, value]) => ({
      name: key,
      type: sql.NVarChar(255), // Change the type based on your column's data type
      value: value,
    }));

    const request = pool.request();
    inputParams.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    // Duplicate the input parameters to use for the condition
    inputParams.forEach((param) => {
      request.input(`${param.name}_condition`, param.type, param.value);
    });

    await request.query(query);

    console.log("Data updated successfully");
  } catch (error) {
    console.log("Error updating data:", error);
    throw new Error("Failed to update data");
  }
};

const getTablenameswithvalue = async (tableName) => {
  try {
    console.log("Attempting to connect to the database...");
    await poolConnect;

    console.log(`Executing query for table: ${tableName}`);
    const result = await pool
      .request()
      .input("tableName", sql.NVarChar, tableName)
      .query(`SELECT * FROM ${tableName};`);

    console.log("Query executed successfully. Result:", result);

    if (result.recordset.length === 0) {
      console.log("No rows found.");
    }

    return result.recordset; // Return the array of rows
  } catch (error) {
    console.error("Error occurred:", error);
    throw new Error("Failed to get table rows");
  }
};
// ------------------------- x x x x x x  --------------------------------------
// ------------------------- CREATE TABLE -----------------------------

const getDatabasename = async () => {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        "SELECT name FROM sys.databases;"
      );
    return result;
  } catch (error) {
    throw new Error("Failed to get Data Types");
  }
};

const getDatatypes = async () => {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        "SELECT name AS Data_Type FROM sys.types;"
      );
    return result;
  } catch (error) {
    throw new Error("Failed to get Data Types");
  }
};

const createtable = async (databaseName, tableName, columns) => {
  try {
    const pool = await sql.connect(config);
    
    // Construct the CREATE TABLE query
    let createTableQuery = `CREATE TABLE ${databaseName}.${tableName} (`;

    columns.forEach((column, index) => {
      createTableQuery += `${column.columnName} ${column.dataType}`;

      // Check if a value is provided
      if (column.value) {
        createTableQuery += `(${column.value})`;
      }

      createTableQuery += column.allowNull ? ' NULL' : ' NOT NULL';

      // Add a comma unless it's the last column
      if (index < columns.length - 1) {
        createTableQuery += ', ';
      }
    });

    createTableQuery += ');';

    // Execute the CREATE TABLE query
    await pool.request().query(createTableQuery);

    return 'Table created successfully';
  } catch (error) {
    throw new Error('Failed to create the table: ' + error.message);
  }
};

// ------------------------ LLAMA CHAT SQL---------------------


const QAlogs = async (question, answer, questionTime, answerTime, feedback) => {
  console.log('dbOperation - QAlogs function called');
  try {
    console.log('Inserting course content:');
    console.log('question:', question);
    console.log('answer:', answer);
    console.log('questionTime:', questionTime);
    console.log('answerTime:', answerTime);
    console.log('feedback:', feedback); 

    const questionTimeValue = new Date(`1970-01-01T${questionTime}:00Z`);
    const answerTimeValue = new Date(`1970-01-01T${answerTime}:00Z`);

    let pool = await sql.connect(config);
    await pool
      .request()
      .input('Question', sql.VarChar(sql.MAX), question)
      .input('Answer', sql.VarChar(sql.MAX), answer)
      .input('QuestionTime', sql.TIME, questionTimeValue)
      .input('AnswerTime', sql.TIME, answerTimeValue)
      .input('Feedback', sql.VarChar(sql.MAX), feedback)
      .execute('INSERTQUESTIONLOGSANAYSIS')

    console.log('QAlogs inserted successfully');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to save QAlogs');
  }
};

const getQuestionloganalysis = async () => {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT * FROM QUESTIONLOGSANALYSIS");
    return result;
  } catch (error) {
    //console.log(error);
    throw new Error('Failed to get master course');
  }
};

const SavingingestionResponse = async (userQuery, ChatBotResponse, DbQuery, DbResponses) => {
  console.log('dbOperation - chatresponse function called');
  try {
    console.log('Inserting chatresponse db content:');
    console.log('userQuery:', userQuery);
    console.log('ChatBotResponse:', ChatBotResponse);
    console.log('DbQuery:', DbQuery);
    console.log('DbResponses:', DbResponses);
    let pool = await sql.connect(config);
    await pool
      .request()
      .input('UserQuery', sql.NVarChar(sql.MAX), userQuery)
      .input('ChatBotResponse', sql.NVarChar(sql.MAX), ChatBotResponse)
      .input('DbQuery', sql.NVarChar(sql.MAX), DbQuery)
      .input('DbResponses', sql.NVarChar(sql.MAX), JSON.stringify(DbResponses)) // Convert to JSON string here
      .execute('SaveChatResponse');

    console.log('chatresponse inserted successfully');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to save QAlogs');
  }
};

const getchatResponse = async () => {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT * FROM ChatResponses");
    return result;
  } catch (error) {
    throw new Error('Failed to get chatresponse course');
  }
};

module.exports = {
  sql,
  registerUser,
  getUserByEmail,
  loginUser,
  getTablenames,
  getCategoriesForTable,
  insertData,
  UpdateData,
  getTablenameswithvalue,
  getDatabasename,
  getDatatypes,
  createtable,
  QAlogs,
  getQuestionloganalysis,
  SavingingestionResponse,
  getchatResponse,
};