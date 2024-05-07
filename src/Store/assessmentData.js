import { createSlice, nanoid } from "@reduxjs/toolkit";
import useQusetionData from "../Hooks/useQuestionData";
import { useState,useEffect } from "react";



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
    currentPageType: `${QuestionBank[0].sectionType}`,
    authStatus: false,
    userDetails: null,
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
        },
        setLoginStatus: (state, action) => {
            if(!state.authStatus) {
                state.authStatus = true
            }
            console.log(action.payload);
            state.userDetails = action.payload
        }
    }
})

export const { setQuestionSection, setCodingQuestion, setLoginStatus } = assessmentData.actions

export default assessmentData.reducer