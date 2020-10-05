import {Dispatch} from "react"
import axios, {AxiosResponse} from 'axios'

import {storeQuestions} from "../actions/actions"
import {QuizType} from "../reducer/reducer"
import {removeUnnecessaryData} from "../helpers"

export interface Question {
    category: string,
    correct_answer: string,
    difficulty: difficultyLevels,
    incorrect_answers: [boolean],
    question: string,
    type: string
}

export interface QuestionFiltered {
    correct_answer: string,
    question: string,
}

export enum difficultyLevels {
    easy = 'easy',
    hard = 'hard'
}

export const getQuizQuestions = (amount: number, difficulty: difficultyLevels) => {
    return (dispatch: Dispatch<{ type: QuizType, questions: QuestionFiltered[] }>) => {
        return axios.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=boolean`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(
            (response: AxiosResponse) => {
                const questions = removeUnnecessaryData(response.data.results)
                dispatch(storeQuestions(questions))
            },
            (error) => dispatch(error(error))
        )
    }

}
