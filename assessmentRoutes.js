const express = require('express');
const router = express.Router();
const Assessment = require('./model/assessmentModel'); // Import the Assessment model



// Create a new assessment
router.post('/assessments', async (req, res) => {
    try {
        const { AssessmentTitle, AssessmentDate,AssessmentStartTime, AssessmentEndTime,AssessmentDuration, } = req.body;
        console.log(AssessmentTitle);
        console.log(AssessmentDate);
        console.log(AssessmentStartTime);
      
        console.log(AssessmentDuration);
       

        if (!AssessmentTitle || !AssessmentDate || !AssessmentStartTime  || !AssessmentEndTime || !AssessmentDuration) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

       
       
        // Create a new assessment document
        const newAssessment = new Assessment({
            AssessmentTitle,
            AssessmentDate,
            AssessmentStartTime,
           
            AssessmentEndTime,
            AssessmentDuration,
          
        });

        // Save the assessment to the database
        const savedAssessment = await newAssessment.save();
        console.log("Saved assessment successfully.");
        res.status(201).send("Saved assessment successfully.");

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all assessments
router.get('/assessments', async (req, res) => {
    console.log("hello from Get Assessment method");

    try {
        const assessments = await Assessment.find({});

        // Map assessments to include only the date in DD/MM/YY format
        const formattedAssessments = assessments.map(assessment => {
            const dateObj = new Date(assessment.AssessmentDate);
            const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear() % 100}`;
            return {
                ...assessment._doc,
                AssessmentDate: formattedDate
            };
        });

        formattedAssessments.forEach(assessment => {
            console.log(`Title: ${assessment.AssessmentTitle}, Assessment Date: ${assessment.AssessmentDate}, AssessmentStartTime: ${assessment.AssessmentStartTime}, AssessmentEndTime: ${assessment.AssessmentEndTime}, Duration: ${assessment.AssessmentDuration}`);
        });

        res.json(formattedAssessments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Get an assessment by ID
router.get('/assessments/:id', async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' });
        }

        // Format the AssessmentDate to DD/MM/YY format
        const dateObj = new Date(assessment.AssessmentDate);
        const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear() % 100}`;
        const formattedAssessment = {
            ...assessment._doc,
            AssessmentDate: formattedDate
        };

        res.json(formattedAssessment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an assessment by ID
router.put('/assessments/:id', async (req, res) => {
    try {
      //  const { AssessmentTitle } = req.body;

        const { AssessmentTitle, AssessmentDate, AssessmentStartTime, AssessmentEndTime, AssessmentDuration } = req.body;
        const assessmentId = req.params.id;

        // Check if the assessment exists
        const existingAssessment = await Assessment.findById(assessmentId);
        if (!existingAssessment) {
            return res.status(404).json({ error: 'Assessment not found' });
        }

        // Update the assessment fields
        existingAssessment.AssessmentTitle = AssessmentTitle;
        existingAssessment.AssessmentDate = AssessmentDate;
         existingAssessment.AssessmentStartTime = AssessmentStartTime;
     
         existingAssessment.AssessmentEndTime = AssessmentEndTime;
         existingAssessment.AssessmentDuration = AssessmentDuration;
       

        // Save the updated assessment
        const updatedAssessment = await existingAssessment.save();
        console.log("update successfully");
        res.json(updatedAssessment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete an assessment by ID
router.delete('/assessments/:id', async (req, res) => {
    try {
        const assessmentId = req.params.id;

        // Check if the assessment exists
        const existingAssessment = await Assessment.findById(assessmentId);
        if (!existingAssessment) {
            return res.status(404).json({ error: 'Assessment not found' });
        }

        // Delete the assessment using findByIdAndDelete
        await Assessment.findByIdAndDelete(assessmentId);
        console.log("Assessment deleted successfully");
        res.json({ message: 'Assessment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
