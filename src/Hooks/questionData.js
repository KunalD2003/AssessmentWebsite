// import { nanoid } from "@reduxjs/toolkit"
// import { useEffect, useState } from "react"

// const questionData = [
//     {
//         id: nanoid(),
//         sectionName: "Logical Aptitude", //Section name (like Logical Apptitude,Verbal Ability, Programming etc.)
//         sectionType: "MCQ", //Type of Section (as of now it should either be MCQ or Coding),
//         questions: [

//             // If sectionType is MCQ
//             {
//                 id: nanoid(),
//                 questionDescription: "abcd", //Description of Question
//                 Options: [
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                 ],
               
//             },
//             {
//                 id: 123,
//                 questionDescription: "xyz", //Description of Questionoption selected, this will turn equals to marksAssigned
//                 Options: [
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                 ]
//             },
//             {
//                 id: 456,
//                 questionDescription: "", //Description of Question
//                 Options: [
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                     {
//                         id: "",
//                         optionTitle: "", // Option Name
//                         isSelected: false/true, //By default this will be false. If candidate select this, this will turn into true otherwise it will remain false

//                         isCorrect: false/true, //This will indicate either the option given is correct or not 
//                     },
//                 ]
//             },
            
//         ]
//     },

//     {
//         id: nanoid(),
//         sectionName: "Programming Test", //Section name (like Logical Apptitude,Verbal Ability, Programming etc.)
//         sectionType: "Coding", //Type of Section (as of now it should either be MCQ or Coding),
//         marksObtained: 40, // This will be the total marked obtained in this particular section
//         questions: [

//             // If sectionType is Coding
//             {
//                 id: "",
//                 questionDescription: "", //Description of Question
//                 code: "",  // By Deafault this will be contain code snippet in which user have to edit code
//                 AlltestCasePassed: true/false, //All Test Cases Passed
//                 marksAssigned: 4, //Assigned Marks for the question
//                 marksObtained: 0, //By default this will be 0. If candidate submit question with right option selected, this will turn equals to marksAssigned
//                 hiddenTestCases: [
//                     {
//                         id: "",
//                         input: "",
//                         output: "",
//                     },
//                     {
//                         id: "",
//                         input: "",
//                         output: "",
//                     }
//                 ]
//             },
//             {
//                 id: "",
//                 questionDescription: "", //Description of Question
//                 code: "",  // By Deafault this will be contain code snippet in which user have to edit code
//                 AlltestCasePassed: true/false, //All Test Cases Passed
//                 marksAssigned: 4, //Assigned Marks for the question
//                 marksObtained: 0, //By default this will be 0. If candidate submit question with right option selected, this will turn equals to marksAssigned
//                 hiddenTestCases: [
//                     {
//                         id: "",
//                         input: "",
//                         output: "",
//                     },
//                     {
//                         id: "",
//                         input: "",
//                         output: "",
//                     }
//                 ]
//             },
//             {
//                 id: "",
//                 questionDescription: "", //Description of Question
//                 code: "",  // By Deafault this will be contain code snippet in which user have to edit code
//                 AlltestCasePassed: true/false, //All Test Cases Passed
//                 marksAssigned: 4, //Assigned Marks for the question
//                 marksObtained: 0, //By default this will be 0. If candidate submit question with right option selected, this will turn equals to marksAssigned
//                 hiddenTestCases: [
//                     {
//                         id: "",
//                         input: "",
//                         output: "",
//                     },
//                     {
//                         id: "",
//                         input: "",
//                         output: "",
//                     }
//                 ]
//             },
//         ]
//     },
// ]

// export function getquestionData () {
//     const [data, setData] = useState(questionData)
//     useEffect(() => {
//         return setData(questionData)
//     }, [questionData])
//     return data
// }

// export function getquestionDataUsingID (questionID) {
//     let section =  {}
//     questionData.map((index) => {
//         if(index.id === questionID){
//             section = index
//         }
//     })
//     return section
// }

// export function setSection (sectionInfo){
//     const newSection = {
//         id: nanoid(),
//         sectionName: sectionInfo.sectionName,
//         sectionType: sectionInfo.sectionType,
//         questions: []
//     };
//     questionData.push(newSection);
// }

// export function deleteSection (sectionID){
//     questionData.map((index) =>  {
//         if(index.id === sectionID){
//             questionData.pop(sectionID)
//             console.log(questionData);
//         }
//     })
// }

// export function editQuestion (questionId, questionDescription, sectionID){
//     questionData.map((index) => {
//         if(sectionID === index.id){
//             index.questions.map((quest) => {
//                 if(quest.id === questionId){
//                     quest.questionDescription = questionDescription
//                 }
//                 console.log(questionDescription)
//             })
//         }
//     })
// }



import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

const questionData = [
  {
    id: nanoid(),
    sectionName: "Logical Aptitude",
    sectionType: "MCQ",
    questions: [
      {
        id: nanoid(),
        questionDescription: "abcd",
        options: [
          { id: nanoid(), optionTitle: "", isSelected: false, isCorrect: false },
          { id: nanoid(), optionTitle: "", isSelected: false, isCorrect: false },
          { id: nanoid(), optionTitle: "", isSelected: false, isCorrect: false },
          { id: nanoid(), optionTitle: "", isSelected: false, isCorrect: false },
        ],
      },
      // other questions...
    ],
  },
  {
    id: nanoid(),
    sectionName: "Programming Test",
    sectionType: "Coding",
    marksObtained: 40,
    questions: [
      {
        id: nanoid(),
        questionDescription: "",
        code: "",
        allTestCasePassed: false,
        marksAssigned: 4,
        marksObtained: 0,
        hiddenTestCases: [
          { id: nanoid(), input: "", output: "" },
          { id: nanoid(), input: "", output: "" },
        ],
      },
      // other questions...
    ],
  },
];

export function useQuestionData() {
  const [data, setData] = useState(questionData);

  useEffect(() => {
    setData(questionData);
  }, []);

  return data;
}

export function getSectionByName(sectionName) {
  return questionData.find(section => section.sectionName === sectionName);
}

export function addSection(sectionInfo) {
  const newSection = {
    id: nanoid(),
    sectionName: sectionInfo.sectionName,
    sectionType: sectionInfo.sectionType,
    questions: [],
  };
  questionData.push(newSection);
}

export function deleteSection(sectionID) {
  const index = questionData.findIndex(section => section.id === sectionID);
  if (index !== -1) {
    questionData.splice(index, 1);
  }
}

export function editQuestion(sectionID, questionID, questionDescription) {
  const section = questionData.find(section => section.id === sectionID);
  if (section) {
    const question = section.questions.find(q => q.id === questionID);
    if (question) {
      question.questionDescription = questionDescription;
    }
  }
}









