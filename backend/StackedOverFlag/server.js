const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { log } = require('console');
require('dotenv').config();

// import { GoogleGenerativeAI } from "@google/generative-ai";

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.Gemini_API_KEY;


// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());


// Read the CSV file

const readCSV = () => {

    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'geography_questions.csv');
        const results = [];
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });

}


(async () => {
    try{
        const csvData = await readCSV();
        let questionIndex = 0;
        let score = 0;
        let lives = 3;
        let hints = 3;

        // toDo: remove this
        console.log("questionIndex is: ", questionIndex, " and csvData.length is: ", csvData.length);


        // routes
        app.get('/test', (req, res) => {
            res.send('Hello, World!');
        });

        app.get('/api/start', (req, res) => {
            res.json({ score: score, lives: lives, hints: hints, isGameOver: false });

        });

        app.get('/api/question', (req, res) => {
            if (questionIndex < csvData.length) {
                const question = csvData[questionIndex];
                res.json({question: question.Question})
            } else if (questionIndex === csvData.length) {
                res.json({question: "completed"})
            } else {
                res.status(404).send('No more questions');
            }
        });


        const getHint = async (question) => {
            const genAI = new GoogleGenerativeAI(apiKey);

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


            const prompt = `
            You are a geography expert. You are given a question and need to provide a hint that is related to the question. The hint should not be the answer to the question or contain any key words from the question. The question is: ${question}. Provide hint that is less than 20 words.
            `
            
            const result = await model.generateContent(prompt);
            console.log(result.response.text());

            return result.response.text();
        }


        // get hint from gemini
        app.get('/api/hint', async (req, res) => {
            if (hints > 0) {
                const question = csvData[questionIndex];

                const questionHint = await getHint(question.Question);
                console.log("questionHint is: ", questionHint);
                res.json({ questionHint: questionHint, hintsRemaining: hints });
                hints--;
            } else {
                res.json({ questionHint: "No hints left", hintsRemaining: hints });
            }
        });


        app.get('/api/stats', (req, res) => {

            const accuracy = ((score / (questionIndex)) * 100).toFixed(2);
            res.json({ score: score, lives: lives, hints: hints, accuracy: accuracy });
        });

        app.post('/api/response', (req, res) => {
    
            const response = req.body;
            const userAnswer = response.answer;
            const correctAnswer = csvData[questionIndex].Answer;

            console.log("userAnswer is: ", userAnswer.toLowerCase().trim(), " and correctAnswer is: ", correctAnswer.toLowerCase().trim());
        
            if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {

                score++;

                if (score % 3 === 0){
                    lives++;
                }

                res.json({ answer: correctAnswer, message: 'Correct', score: score, lives: lives, hints: hints, isGameOver: false });

            } else {
                lives--;

                if (lives <= 0) {
                    res.json({ answer: correctAnswer, message: 'Incorrect', score: score, lives: lives, hints: hints, isGameOver: true });
                } else {
                    res.json({ answer: correctAnswer, message: 'Incorrect', score: score, lives: lives, hints: hints, isGameOver: false });
                }

                
            }

            console.log({
                questionIndex: questionIndex,
                score: score,
                lives: lives,
                hints: hints,
                isGameOver: false
            });
            
            questionIndex++;
        });


        app.get('/api/reset', (req, res) => {
            console.log("resetting game");
            questionIndex = 0;
            score = 0;
            lives = 3;
            hints = 3;
            res.json({ message: 'Question index reset to 0' });
        });
        
        
        // Start the server
        app.listen(PORT, '0.0.0.0', () => {
        // app.listen(PORT, () => {
            console.log(`Server is running on http://0.0.0.0:${PORT}`);
            // console.log(`Server is running on http://localhost:${PORT}`);
        });

    }
    catch (error){
        console.log("An error occurred:", error);
    }
})();