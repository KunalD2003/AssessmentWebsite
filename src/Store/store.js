import {configureStore} from "@reduxjs/toolkit"
import assessmentData from "./assessmentData"

const store = configureStore({
    reducer: {
        getAssessment: assessmentData,
    }
})

export default store