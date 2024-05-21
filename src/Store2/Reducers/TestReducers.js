import { nanoid } from "@reduxjs/toolkit";
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
};

export default function TestReducer(state = initialState, action) {
    switch (action.type) {
        case "Coding_Questions":
            return {
                ...state,
                codingQuestions: action.payload,
            };
        case "Question_Section": {
            if (state.currentPage != action.payload[0]) {
                return {
                    ...state,
                    currentPage: action.payload[0],
                    currentPageType: action.payload[1]
                }
            }
            return state
        }
        default:
            return state;
    }
}
