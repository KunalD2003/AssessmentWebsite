import {configureStore} from "@reduxjs/toolkit"
import assessmentData from "./assessmentData"

const store = configureStore({
    reducer: {
        getAssessment: assessmentData,
        // TODO: "add more slice here for posts"
    }
})

export default store