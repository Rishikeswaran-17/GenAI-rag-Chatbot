require("dotenv").config();
const dbOperation = require("./dbFiles/db.operation");

const express = require("express");
const cors = require("cors");
const app = express();

const path = require("path");
const multer = require("multer");
const fs = require("fs");
const fsExtra = require("fs-extra"); // Import fs-extra library

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5020;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "C:\\Users\\shahulhameed\\Desktop\\RISHI\\Karthigai\\Ram\\chatbot\\data";
    fsExtra.emptyDirSync(uploadPath); // Clear the folder before uploading
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.array("file"), (req, res) => {
  // Handle file upload logic here
  res.send("Files uploaded successfully");
});

// -------------------- Login -----------------------
app.post("/api/v1/save_login", async (req, res) => {
  const { username, emailID, password } = req.body;
  try {
    console.log("Received login: ", req.body);
    console.log("username: ", username);
    console.log("emailID: ", emailID);
    console.log("password: ", password);
    await dbOperation.saveLoginCredentials(username, emailID, password);
    res.status(200).json({ message: "User is successfully registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to register" });
  }
});

app.post("/api/v1/register", async (req, res) => {
  const { username, email, passwordHash } = req.body;
  console.log("Received email:", email);
  console.log("Received password:", passwordHash);
  try {
    // Check if the email already exists in the database
    const existingUser = await dbOperation.getUserByEmail(email);
    if (existingUser) {
      // If the email already exists, send an error response
      return res.status(400).json({ error: "Email already exists" });
    }
    // If the email doesn't exist, proceed with user registration
    await dbOperation.registerUser(username, email, passwordHash);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/api/v1/login", async (req, res) => {
  const { email, passwordHash } = req.body;
  try {
    const isAuthenticated = await dbOperation.loginUser(email, passwordHash);
    if (isAuthenticated) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login user" });
  }
});

app.get('/api/v1/gettablename', async (req, res) => {
    try {
      const Tablename = await dbOperation.getTablenames();
      res.json(Tablename.recordset);
      console.log("Tablename :::: ",Tablename.recordset)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error for Tablename' });
    }
  });

// ------------------------- x x --------------------------------------
//-------------------------- CRUD -----------------------------------------------

app.get('/api/v1/gettablename', async (req, res) => {
  try {
    const Tablename = await dbOperation.getTablenames();
    res.json(Tablename.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error for Tablename' });
  }
});

app.post('/api/v1/tablenamecategories', async (req, res) => {
  const { tableName } = req.body;
  console.log("Received POST request with tableName:", tableName); // Log to see if you received the table name correctly
  try {
    console.log("Fetching categories for tableName:", tableName); // Log to see if you're attempting to fetch categories
    const categories = await dbOperation.getCategoriesForTable(tableName);
    console.log("Fetched categories:", categories); // Log the fetched categories
    res.json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/insertData',upload.none(), async (req, res) => {
  const { tableName, dataToInsert } = req.body; // Extract tableName and dataToInsert from the request body
  console.log("Received POST request with tableName:", req.body); // Log to see if you received the table name correctly
  try {
    // Assuming you have a function to insert data into your database
    await dbOperation.insertData(tableName, dataToInsert); // Provide both tableName and dataToInsert

    res.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/updateData',upload.none(), async (req, res) => {
  const { tableName, dataToUpdate } = req.body; // Extract tableName and dataToInsert from the request body
  console.log("Received POST request with tableName:", req.body); // Log to see if you received the table name correctly
  try {
    // Assuming you have a function to insert data into your database
    await dbOperation.UpdateData(tableName, dataToUpdate); // Provide both tableName and dataToInsert

    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/tablecategorieswithvalue', async (req, res) => {
  const { tableName } = req.body;
  console.log("Received POST request with tableName:", tableName); // Log to see if you received the table name correctly
  try {
    console.log("Fetching rowvalues for tableName:", tableName); // Log to see if you're attempting to fetch categories
    const rowvalues = await dbOperation.getTablenameswithvalue(tableName);
    console.log("Fetched rowvalues:", rowvalues); // Log the fetched rowvalues
    res.json(rowvalues);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ----------------------------- x x x x x x x ----------------------------------
// ----------------------------- DATA TYPES -------------------------------------
app.get('/api/v1/getdatabasename', async (req, res) => {
  try {
    const Databasesname = await dbOperation.getDatabasename();
    res.json(Databasesname.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error for Data basename' });
  }
});

app.get('/api/v1/getdatatypes', async (req, res) => {
  try {
    const DataTypes = await dbOperation.getDatatypes();
    res.json(DataTypes.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error for DATA TYPES' });
  }
});

app.post("/api/v1/createTable", async (req, res) => {
  // The data sent from the frontend will be available in req.body
  const { databaseName, tableName, columns } = req.body;
  console.log("Received POST request with TABLE CREATION:", req.body);
  try {
    // Assuming you have a function to insert data into your database
    await dbOperation.createtable(databaseName, tableName, columns); // Provide both tableName and dataToInsert
    console.log("Table created successfully");
    res.status(200).json({ message: 'Table created successfully' });
  } catch (error) {
    console.error("Table creation failed", error);
    res.status(500).json({ message: "Table creation failed" });
  }
});

// ------------------------ LLAMA CHAT SQL---------------------

app.post("/api/v1/qafeedback", async (req, res) => {
  const { question, answer, questionTime, answerTime, feedback } = req.body;
  try {
    console.log("Received Data:", req.body);
    console.log("question:", question);
    console.log("answer:", answer);
    console.log("questionTime", questionTime);
    console.log("answerTime", answerTime);
    console.log("feedback", feedback);
    await dbOperation.QAlogs( question, answer, questionTime, answerTime, feedback );
    res.status(200) 
       .json({ message: "QAlogsfeedback saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save QAlogsfeedback" });
  }
});

app.get('/api/v1/questionlogsanalysis', async (req, res) => {
  try {
    const QuestionlogsAnalysis = await dbOperation.getQuestionloganalysis();
    res.json(QuestionlogsAnalysis.recordset);
    // console.log(mastercourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error for QuestionlogsAnalysis' });
  }
});

app.post('/api/v1/save-response', async (req, res) => {
  const response = req.body;
  console.log('Received response:', response); // Add this line to log the received response

  try {
    await dbOperation.SavingingestionResponse(
      response.User,
      response.ChatBot,
      response.db_query,
      response.db_response // Pass the whole array directly
    );

    res.status(200).send('Response saved successfully');
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).send('Error saving response');
  }
});

app.get('/api/v1/chat-response', async (req, res) => {
  try {
    const IngestchatResponse = await dbOperation.getchatResponse();
    res.json(IngestchatResponse.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error for IngestchatResponse' });
  }
});

// -------------------> PORT Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
