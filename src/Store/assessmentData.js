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
    resultData: null,
    currentAssessmentId: null,
    authStatus: false,
    userDetails: null,
    webcamStatus: null,
    codingScore: 0,
    assessmentStatus: false,
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
        setWebcam: (state, action) => {
            state.webcamStatus = action.payload
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
            state.resultData.UcodingScore = state.resultData.UcodingScore+5
        },
        resetCodingScore: (state) => {
            state.resultData.UcodingScore = 0
        },
        setAssessmentStatus: (state) => {
            if(state.assessmentStatus){
                state.assessmentStatus = false
            }
            else{
                state.assessmentStatus = true
            }
        },
        setCurrentAssessment: (state, action) => {
            state.currentAssessmentId = action.payload
        },
        setResultData: (state, action) => {
            state.resultData = action.payload
        }
    }
})

export const { setQuestionSection, setCodingQuestion, setLoginStatus, setLogoutStatus, setWebcam, setCode, setAttempt, setCodingScore, resetCodingScore, setAssessmentStatus, setCurrentAssessment, setResultData} = assessmentData.actions

export default assessmentData.reducer