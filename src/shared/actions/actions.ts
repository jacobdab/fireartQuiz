import {QuestionFiltered} from "../fetch/getRequests"
import {QuizType} from "../reducer/reducer"


export const storeQuestions = (questions: QuestionFiltered[]) => {
    return {
        type: QuizType.STORE_QUESTIONS,
        questions
    }
}

export const storeAnswer = (answer: string) => {
    return {
        type: QuizType.STORE_ANSWER,
        answer
    }
}

export const clearData = () => {
    return {
        type: QuizType.CLEAR_DATA
    }
}
