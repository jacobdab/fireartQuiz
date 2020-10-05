import React, {Dispatch, useEffect, useState} from 'react'
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"

import Form from "../../components/reusable/Form/Form"
import {Question, QuestionFiltered} from "../../shared/fetch/getRequests"
import {storeAnswer} from "../../shared/actions/actions"
import {decodeHTMLEntities} from "../../shared/helpers"
import Input, {inputType, stylingType} from '../../components/reusable/Input/Input'

import './Game.scss'


interface Props {
    questions: QuestionFiltered[],
    answer: string[],
    storeAnswer: (answer: string) => void
}

const Game = (props: Props) => {
    const {questions, answer, storeAnswer} = props
    const [localQuestions, setLocalQuestions] = useState<QuestionFiltered | QuestionFiltered[]>([])

    const history = useHistory()


    const handleSubmit = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.preventDefault()

        const value = (event.target as HTMLInputElement).value
        storeAnswer(value)

        if (Array.isArray(localQuestions) && localQuestions.length !== 0) {
            localQuestions.shift()
        }
    }

    useEffect(() => {
        setLocalQuestions(JSON.parse(JSON.stringify(questions)))
    }, [])

    useEffect(() => {
        if (Array.isArray(questions) && questions.length === 0 && answer.length === 0) {
            history.push('/')
        } else if (Array.isArray(localQuestions) && localQuestions.length === 0 && answer.length !== 0) {
            history.push('/results')
        }

    }, [props])


    return <div className='Game'>
        <h2 className='Game__header'>Entertainment: Video Games</h2>

        {localQuestions && Array.isArray(localQuestions) && localQuestions.length !== 0 &&
        <Form className='Game__form'>
            <div className='Game__form__content'>
                {decodeHTMLEntities(localQuestions[0].question)}
            </div>

            <div className='Game__form__buttons'>
                <Input options={{name: 'true', value: 'TRUE', styling: stylingType.blueNoFill}}
                       type={inputType.button}
                       onClick={handleSubmit}/>

                <Input options={{name: 'false', value: 'FALSE', styling: stylingType.blueNoFill}}
                       type={inputType.button}
                       onClick={handleSubmit}/>
            </div>

        </Form>}
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
        storeAnswer: (answer: string) => dispatch(storeAnswer(answer))
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Game)
