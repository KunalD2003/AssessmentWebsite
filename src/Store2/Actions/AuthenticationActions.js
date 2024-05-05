export const getCodingQuestions = (codingQuestions) => {

    return (dispatch) => {
        dispatch({
            type: "Coding_Questions",
            payload: codingQuestions
        })
    };
};
export const getQuestionSection = (data) => {
    return (dispatch) => {
        dispatch({
            type: "Question_Section",
            payload: data
        })
    }
}