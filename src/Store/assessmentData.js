import { createSlice, nanoid } from "@reduxjs/toolkit";
import useQusetionData from "../Hooks/useQuestionData";
import { useState,useEffect } from "react";
// const MCQ = [
//     {
//         id: nanoid(),
//         sectionName: "Logical Aptitude",
//         Questions: [
//             {
//                 id: nanoid(),
//                 problemStatement: "What is a data structure?",
//                 options: [
//                     {
//                         optionName: "A programming language",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "A collection of algorithms",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "A way to store and organize data",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "A type of computer hardware",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                 ]
//             },
//             {
//                 id: nanoid(),
//                 problemStatement: "What are the disadvantages of arrays?",
//                 options: [
//                     {
//                         optionName: "Index value of an array can be negative",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "Elements are sequentially accessed",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Data structure like queue or stack cannot be implemented",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                 ]
//             },
//             {
//                 id: nanoid(),
//                 problemStatement: "Which data structure is used for implementing recursion?",
//                 options: [
//                     {
//                         optionName: "Stack",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Queue",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "List",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Array",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                 ]
//             },
//         ]
//     },
//     {
//         id: nanoid(),
//         sectionName: "Reasoning",
//         Questions: [
//             {
//                 id: nanoid(),
//                 problemStatement: "What is a data structure?",
//                 options: [
//                     {
//                         optionName: "A programming language",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "A collection of algorithms",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "A way to store and organize data",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "A type of computer hardware",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                 ]
//             },
//             {
//                 id: nanoid(),
//                 problemStatement: "What are the disadvantages of arrays?",
//                 options: [
//                     {
//                         optionName: "Index value of an array can be negative",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "Elements are sequentially accessed",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Data structure like queue or stack cannot be implemented",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                 ]
//             },
//             {
//                 id: nanoid(),
//                 problemStatement: "Which data structure is used for implementing recursion?",
//                 options: [
//                     {
//                         optionName: "Stack",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Queue",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "List",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Array",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                 ]
//             },
//         ]
//     },
//     {
//         id: nanoid(),
//         sectionName: "Verbal Ability",
//         Questions: [
//             {
//                 id: nanoid(),
//                 problemStatement: "What is a data structure?",
//                 options: [
//                     {
//                         optionName: "A programming language",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "A collection of algorithms",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "A way to store and organize data",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "A type of computer hardware",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                 ]
//             },
//             {
//                 id: nanoid(),
//                 problemStatement: "What are the disadvantages of arrays?",
//                 options: [
//                     {
//                         optionName: "Index value of an array can be negative",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "Elements are sequentially accessed",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Data structure like queue or stack cannot be implemented",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                     {
//                         optionName: "There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size",
//                         selectedAnswer: false,
//                         correctAnswer: false,
//                     },
//                 ]
//             },
//             {
//                 id: nanoid(),
//                 problemStatement: "Which data structure is used for implementing recursion?",
//                 options: [
//                     {
//                         optionName: "Stack",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Queue",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "List",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                     {
//                         optionName: "Array",
//                         selectedAnswer: false,
//                         correctAnswer: true,
//                     },
//                 ]
//             },
//         ]
//     },
// ]


const QuestionBank = [
    {
        id: nanoid(),
        sectionType: "coding",
        sectionName: "Coding",
    },
    {
        id: nanoid(),
        sectionType: "MCQ",
        sectionName: "Logical Aptitude",
    }
]
const initialState = {
    questionBank: QuestionBank,
    codingQuestions: null,
    currentPage: `${QuestionBank[0].sectionName}`,
    currentPageType: `${QuestionBank[0].sectionType}`
}

export const assessmentData = createSlice({
    name: "assessmentQuestions",
    initialState,
    reducers: {
        setQuestionSection: (state, action) => {
            console.log(action);
            if (state.currentPage != action.payload[0]) {
                state.currentPage = action.payload[0]
                state.currentPageType = action.payload[1]
            }
        },
        setCodingQuestion: (state,action) => {
            console.log(action.payload);
            state.questionBank = action.payload
        }
    }
})

export const { setQuestionSection } = assessmentData.actions

export default assessmentData.reducer