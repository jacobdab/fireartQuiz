import {Question, QuestionFiltered} from "./fetch/getRequests"

export const decodeHTMLEntities = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
}

export const checkIfValidated = (element: HTMLElement) => {
    return !element.classList.contains('input__redNoFill')
}

export const removeUnnecessaryData = (questions: Question[]): QuestionFiltered[] => {
   return questions.map((question: Question) => {
        return {question: question.question, correct_answer: question.correct_answer}
    })
}
