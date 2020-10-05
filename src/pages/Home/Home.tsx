import React, {Dispatch, FormEvent} from 'react'
import {useHistory} from 'react-router-dom'

import {difficultyLevels, getQuizQuestions} from "../../shared/fetch/getRequests"
import Form from "../../components/reusable/Form/Form"
import Input, {inputType, stylingType} from '../../components/reusable/Input/Input'

import './Home.scss'
import {connect} from "react-redux"
import {checkIfValidated} from "../../shared/helpers"


interface Props {
    getQuizQuestions: (amount: number, difficulty: difficultyLevels) => void
}

const Home = (props: Props) => {
    const {getQuizQuestions} = props

    const history = useHistory()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // HTMLFormControlsCollection nie obsługuję customName
        const elements = event.currentTarget.elements as any

        const difficulty = elements.difficulty.value
        const amount = elements.amount.value

        if (amount && difficulty
            && checkIfValidated(elements.amount)
            && checkIfValidated(elements.difficulty)) {
            await getQuizQuestions(amount, difficulty)
            history.push('/game')
        }
    }

    return <div className='Home'>
        <h2 className='Home__header'>Welcome to the Trivia Challenge!</h2>

        <Form className='Home__form' onSubmit={handleSubmit}>
            <Input type={inputType.select}
                   options={{
                       styling: stylingType.redNoFill,
                       name: 'difficulty',
                       values:
                           [{value: 'difficulty', disabled: true},
                               {value: difficultyLevels.easy, disabled: false},
                               {value: difficultyLevels.hard, disabled: false}]
                   }}/>

            <Input type={inputType.number}
                   options={{
                       name: 'amount',
                       styling: stylingType.redNoFill,
                       placeholder: 'amount'
                   }}/>

            <Input type={inputType.submit}
                   options={{
                       name: 'submit',
                       styling: stylingType.blueFill,
                       value: 'BEGIN'
                   }}/>
        </Form>
    </div>
}


const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getQuizQuestions: (amount: number, difficulty: difficultyLevels) => dispatch(getQuizQuestions(amount, difficulty))
})


export default connect(null, mapDispatchToProps)(Home)
