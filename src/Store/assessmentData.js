import { createSlice, nanoid } from "@reduxjs/toolkit";
import useQusetionData from "../Hooks/useQuestionData";
import { useState,useEffect } from "react";



const QuestionBank = [
    {
        id: nanoid(),
        sectionType: "MCQ",
        sectionName: "Logical Apptitude",
    },
    {
        id: nanoid(),
        sectionType: "coding",
        sectionName: "Programming Test",
    }
]
const initialState = {
    questionBank: QuestionBank,
    currentPage: `${QuestionBank[0].sectionName}`,
    currentPageType: `${QuestionBank[0].sectionType}`,
    authStatus: false,
    userDetails: null,
    webcamStatus: true,
    codingScore: 0,
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
        },
        setLogoutStatus: (state) => {
            state.authStatus = false
            state.userDetails = null
        },
        disableWebcam: (state) => {
            state.webcamStatus = false
        },
        setCode: (state, action) => {
            console.log(action.payload.code);
            state.questionBank[action.payload.questionIndex].code = action.payload.code
            console.log(state.questionBank);
        },
        setAttempt: (state, action) => {
            state.questionBank[action.payload].isAttempted = true
        },
        setCodingScore: (state) => {
            state.codingScore = state.codingScore+5
        },
        resetCodingScore: (state) => {
            state.codingScore = 0
        },
    }
})

export const { setQuestionSection, setCodingQuestion, setLoginStatus, setLogoutStatus, disableWebcam, setCode, setAttempt, setCodingScore, resetCodingScore} = assessmentData.actions

export default assessmentData.reducer