import {QuestionFiltered} from "../fetch/getRequests"

const initialState = {
    questions: [],
    answer: []
}

export enum QuizType {
    STORE_QUESTIONS = 'STORE_QUESTIONS',
    CLEAR_DATA = 'CLEAR_DATA',
    STORE_ANSWER = 'STORE_ANSWER'
}

export interface QuizActions {
    type: QuizType,
    questions?: QuestionFiltered | QuestionFiltered[]
    answer?: boolean | boolean[]
}

export const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case QuizType.STORE_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        case QuizType.CLEAR_DATA:
            return {
                questions: [],
                answer: []
            }
        case QuizType.STORE_ANSWER:
            return {
                ...state,
                answer: state.answer.concat(action.answer)
            }
        default:
    }

    return state
}
