import React, {Dispatch, useEffect, useState} from 'react'
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"

import Button from "../../components/reusable/Button/Button"
import {Question, QuestionFiltered} from "../../shared/fetch/getRequests"
import {clearData} from "../../shared/actions/actions"
import {decodeHTMLEntities} from "../../shared/helpers"
import {blueMinus, redCross} from "../../shared/svgs"

import './Result.scss'


interface Props {
    questions: QuestionFiltered[],
    answer: string[],
    clearData: () => void
}

const Result = (props: Props) => {
    const {questions, answer, clearData} = props
    const [results, setResults] = useState<boolean[] | undefined>([])
    const [points, setPoints] = useState<boolean[] | undefined>([])

    const history = useHistory()


    const checkAnswers = () => {
        if (Array.isArray(questions)) {
            return questions.map((question: QuestionFiltered, index) => {
                return question.correct_answer.toLowerCase() === answer[index].toLowerCase()
            })
        }
    }

    const checkHowManyPoints = () => {
        return results?.filter((result) => result)
    }

    const prepareResults = () => {
        return (<ul className='Result__list'>
            {questions.map((question, index: number) => {
                return (<li className='Result__list__listItem'
                            key={index}>
                        {results && results[index] ? redCross : blueMinus}
                        <span>{decodeHTMLEntities(question.question)}</span>
                    </li>

                )
            })}</ul>)
    }

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        clearData()
        history.push('/')
    }


    useEffect(() => {
        if (Array.isArray(questions) && questions.length === 0 && answer.length === 0) {
            history.push('/')
        }
        setResults(checkAnswers())
    }, [])

    useEffect(() => {
        setPoints(checkHowManyPoints())
    }, [results])


    return <div className='Result'>
        <h3 className='Result__header'>You scored <br/> {points?.length} / {results?.length}</h3>

        {prepareResults()}

        <Button className='my-5' onClick={clickHandler}>PLAY AGAIN?</Button>
    </div>
}

const mapStateToProps = (state: { questions: Question[], answer: string[] }) => {
    return {
        answer: state.answer,
        questions: state.questions,
    }
}

const dispatchStateToProps = (dispatch: Dispatch<any>) => {
    return {
        clearData: () => dispatch(clearData())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Result)
