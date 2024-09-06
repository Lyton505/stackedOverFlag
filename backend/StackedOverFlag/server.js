const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { log } = require('console');

// Middleware to parse JSON bodies
app.use(express.json());


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

        app.post('/api/response', (req, res) => {

    
            const response = req.body;
            const userAnswer = response.answer;
        
        
            if (userAnswer === csvData[questionIndex].Answer) {
                console.log("User correct answer:", userAnswer);
                console.log("Correct answer:", csvData[questionIndex].Answer);
                
                score++;

                if (score % 3 === 0){
                    lives++;
                }

                res.json({ message: 'Correct', score: score, lives: lives, hints: hints });

            } else {
                console.log("User incorrect answer:", userAnswer);
                console.log("Correct answer:", csvData[questionIndex].Answer);
                lives--;
                res.json({ message: 'Incorrect', score: score, lives: lives, hints: hints });
            }
        
            
            questionIndex++;
        });


        app.post('/api/reset', (req, res) => {
            questionIndex = 0;
            score = 0;
            lives = 3;
            hints = 3;
            res.json({ message: 'Question index reset to 0' });
        });
        
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    }
    catch (error){
        console.log("An error occurred:", error);
    }
})();