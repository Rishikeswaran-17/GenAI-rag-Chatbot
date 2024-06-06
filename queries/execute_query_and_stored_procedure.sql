--Create the table AdminandUserLogin

DROP TABLE IF EXISTS [dbo].[AdminandUserLogin]

CREATE TABLE [Rishi].[dbo].[AdminandUserLogin] (
    ID INT PRIMARY KEY IDENTITY,
    UserName NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    PasswordHash NVARCHAR(64) NOT NULL
);

--Insert sample data
INSERT INTO [Rishi].[dbo].[AdminandUserLogin] (UserName, Email, PasswordHash)
VALUES
    ('Shahul', 'shahul@hotmail.com', 'Apple@123'),
    ('Rahul', 'rahul@gmail.com', 'Rahul@123'),
    ('Ramcharan', 'ramcharan.itd@gmail.com', 'Ramcharan@123'),
    ('Rishikeswaran', 'rishikeswaran.business.pandp@gmail.com', 'Rishikeswaran@22'),
    ('Madhupriya', 'madhu.business.finance@gmail.com', 'Madhu@123'),
    ('SivaDharshini', 'sivadharshini.business.accounts@gmail.com', 'Siva@123'),
    ('KaliDasan', 'Kali.business.audit@gmail.com', 'Kali@123'),
    ('Nasrin', 'nasrin.hr@gmail.com', 'Nasrin@123'),
    ('Jareena', 'jareena@gmail.com', 'Jareena@123'),
    ('Parveen', 'parveen.hr@gmail.com', 'parveen@123'),
    ('Shubham', 'shubham.hr@gmail.com', 'shubham@123');

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Create the table ChatResponses
DROP TABLE IF EXISTS [dbo].[ChatResponses]

CREATE TABLE [dbo].[ChatResponses] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    UserQuery NVARCHAR(MAX) NOT NULL,
    ChatBotResponse NVARCHAR(MAX) NOT NULL,
    DbQuery NVARCHAR(MAX) NOT NULL,
    DbResponses NVARCHAR(MAX) NOT NULL
);

INSERT INTO [dbo].[ChatResponses] ([UserQuery], [ChatBotResponse], [DbQuery], [DbResponses])
VALUES
('How to Tackle a Massive Annual Report',
 'Tackling a massive annual report, such as a company''s 10-K, can initially seem daunting due to its length and the complexity of its contents. However, with a structured approach, you can efficiently extract valuable information for fundamental analysis. Here are some steps and tips on how to approach it:
1. **Start with the Footnotes**: Unlike reading a novel, where you might save the end for last, starting with the footnotes of an annual report can be incredibly insightful. These often contain critical details about the company''s financials, accounting practices, and any potential red flags that aren''t immediately apparent in the main text.
2. **Familiarize Yourself with the Report''s Structure**: Before diving deep, get a sense of what the report contains. Annual reports typically start with glossy pages featuring photos and messages from the company''s leadership, but the real substance lies beyond this section. Look for the table of contents to identify key sections such as the management discussion and analysis (MD&A), financial statements, and the aforementioned footnotes.
3. **Focus on Key Sections for Fundamental Analysis**:
   - **Management Discussion and Analysis (MD&A)**: This section provides management''s perspective on the company''s financial condition, results of operations, and future outlook. It can give you insights into the company''s strategy, market position, and potential challenges.
   - **Financial Statements**: Pay close attention to the income statement, balance sheet, and cash flow statement. These will give you a quantitative measure of the company''s performance.
   - **Auditor''s Report**: This section can provide valuable information about the company''s financial health and any concerns raised by the auditing firm.
4. **Use Tools and Resources**: If you''re not familiar with financial statements or the terminology used in annual reports, don''t hesitate to use resources such as financial dictionaries, online courses, or guides on reading financial statements. The Securities and Exchange Commission''s (SEC) EDGAR database is also a valuable tool for accessing these documents.
5. **Look for Red Flags**: Be on the lookout for any information that the company might prefer to downplay or hide. This includes significant changes in accounting practices, unexplained adjustments, or large off-balance-sheet items.
6. **Summarize Your Findings**: As you go through the report, take notes and summarize key points. This will help you remember important details and form a coherent analysis of the company''s financial health and prospects.
By following these steps, you can systematically work through an annual report, making the task less overwhelming and more productive in terms of gaining insights into a company''s financial and operational status.',
 'How to Tackle a Massive Annual Report',
 '[{"title":"Title not available","page_content":"CHAPTER 12  Using the Annual Report (10-K) to See What a Company Is Worth      225How to Tackle a Massive Annual Report\nWhen slogging through a company''s annual report, you might start thinking  \nWar and Peace  wasn''t so long after all. Not only are annual reports usually around \n200 pages long, they''re stuffed with technical language, tables, and detailed foot-\nnotes that will make you wish you were reading about the Bezukhovs and the \nBolkonskys instead of revenue and earnings.\nBut as a fundamental analyst, reading the 10-K is one of those things you''ll \nquickly master. Don''t worry. You don''t need to be an accountant to get what you \nneed from the annual report. In this section, I''ll step you through things you \nshould be looking for in the annual report.\nStarting from the bottom up: The footnotes\nReading an annual report is very different from reading a book. With a novel, you \nprobably wouldn''t read the back of the book first, in case you ruin the surprise"},{"title":"Title not available","page_content":"initially intimidating documents.\nFamiliarizing Yourself with the  \nAnnual Report\nPlunk. The annual report to shareholders for the company you own shares of has \njust arrived in your email or been posted on the company''s website. Flipping \nthrough it, you''ll probably notice scores of colorful photos and pictures of happy \nexecutives and employees at the front of the document. But if you read through \npages long enough, you''re sure to hit the meat of the report, which is a pile of \nfinancials, legal disclaimers, and seemingly endless footnotes. You might feel \ntempted to stuff the document back into the mailbox or delete the email and pre-\ntend you never got it.\nBut while it would seem you need some sort of decoder ring to make any sense out \nof the annual report to shareholders and 10-K, after a little guidance you''ll know \nexactly what to do. If you''re already experienced at reading annual reports, it''s a"},{"title":"Title not available","page_content":"business was and where it is headed. Just as the State of the Union Address is a \nchance for the president to stir up hopes for the nation, the annual report is a \ncompany''s chance to do a bit of flag-waving for itself, too. But the document also IN THIS CHAPTER\n »Understanding what data \nfundamental analysts should be on \nthe lookout for in the annual report\n »Getting a game plan on how to \nlogically read an annual report and \nfind the things that matter\n »Pinpointing seemingly minute details \nthat have large meaning for \nfundamental analysis\n »Tuning into valuable information \nauditing firms share about \ncompanies"},{"title":"Title not available","page_content":"exactly what to do. If you’re already experienced at reading annual reports, it’s a \ngood idea to know what kinds of things companies can easily bury in these docu-\nments and hope nobody notices.\nCompanies used to mail annual reports to all investors. Paper annual reports still \nexist today, but companies are rapidly getting away from them. Today, getting the \nannual report is up to you. Your broker or the company will likely notify you when \nthe statement is available. You can then access the document either at the com-\npany’s website or using the Securities and Exchange Commission’s EDGAR data -\nbase. If you’re not familiar with using EDGAR to find financial statements, review \nChapter 4’s section “Getting acquainted with the SEC’s database.”"}]');

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Create the table QUESTIONLOGSANALYSIS
DROP TABLE IF EXISTS [dbo].[QUESTIONLOGSANALYSIS]


CREATE TABLE [dbo].[QUESTIONLOGSANALYSIS]
   (QuestionID INT IDENTITY(1,1) PRIMARY KEY,
   Date Datetime NOT NULL,
   Question VARCHAR(MAX) NOT NULL,
   Answer VARCHAR(MAX)NOT NULL,
   QuestionTime Time(0)NOT NULL,
   AnswerTime Time(0)NOT NULL,
   Feedback VARCHAR(MAX) NOT NULL
)


INSERT INTO [dbo].[QUESTIONLOGSANALYSIS]
([Date], [Question], [Answer], [QuestionTime], [AnswerTime], [Feedback])
VALUES
('2023-09-12 08:26:45.370',
 'hi',
 'Hello! How can I assist you today?',
 '08:26:00',
 '08:26:00',
 'neutral');

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


-----------------------------------------------------STORED_PROCEDURES--------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InsertAdminandUserLogin] (
    @UserName NVARCHAR(255),
    @Email NVARCHAR(255),
    @PasswordHash NVARCHAR(64)
)
AS
BEGIN
    IF @UserName IS NULL OR @UserName = ''
    BEGIN
        RAISERROR('UserName cannot be empty', 16, 1);
        RETURN;
    END;
    IF @Email NOT LIKE '%@%.%'
    BEGIN
        RAISERROR('Invalid email format', 16, 1);
        RETURN;
    END;
    IF (
        LEN(@PasswordHash) < 6
        OR @PasswordHash NOT LIKE '%[0-9]%'
        OR @PasswordHash NOT LIKE '%[!@#$%^&*()]%'
        OR @PasswordHash NOT LIKE '%[a-z]%'
        OR @PasswordHash NOT LIKE '%[A-Z]%'
        OR @PasswordHash NOT LIKE '%[a-zA-Z]%'
    )
    BEGIN
        RAISERROR('Invalid password format', 16, 1);
        RETURN;
    END;
    INSERT INTO [dbo].[AdminandUserLogin] ([UserName], [Email], [PasswordHash])
    VALUES (@UserName, @Email, @PasswordHash);
    -- Additional logic if needed
END;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


CREATE OR ALTER PROCEDURE [dbo].[INSERTQUESTIONLOGSANAYSIS]
    @Question VARCHAR(MAX),
    @Answer VARCHAR(MAX),
    @QuestionTime TIME(0),
    @AnswerTime TIME(0),
    @Feedback VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @CurrentDate DATETIME = GETDATE();
    INSERT INTO [Rishi].[dbo].[QUESTIONLOGSANALYSIS] (Date, Question, Answer, QuestionTime, AnswerTime, Feedback)
    VALUES (@CurrentDate, @Question, @Answer, @QuestionTime, @AnswerTime, @Feedback);
END;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE SaveChatResponse
    @UserQuery NVARCHAR(MAX),
    @ChatBotResponse NVARCHAR(MAX),
    @DbQuery NVARCHAR(MAX),
    @DbResponses NVARCHAR(MAX)
AS
BEGIN
    DECLARE @RowCount INT;
    -- Check if there are any rows in ChatResponses
    SELECT @RowCount = COUNT(*) FROM ChatResponses;
    IF @RowCount = 0
    BEGIN
        -- Insert a new row if no rows exist
        INSERT INTO ChatResponses (UserQuery, ChatBotResponse, DbQuery, DbResponses)
        VALUES (@UserQuery, @ChatBotResponse, @DbQuery, @DbResponses);
    END
    ELSE
    BEGIN
        -- Update the existing row
        UPDATE ChatResponses
        SET UserQuery = @UserQuery,
            ChatBotResponse = @ChatBotResponse,
            DbQuery = @DbQuery,
            DbResponses = @DbResponses
        WHERE ID = 1; -- Assuming ID of the first row is 1
    END
END;