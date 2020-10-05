import React from 'react'

import './Button.scss'

export enum buttonType {
    nofill,
    fill
}

interface Props {
    type?: buttonType,
    className: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    children: React.ReactNode
}

const Button = (props: Props) => {
    const {type, children, onClick, className} = props


    const decideWhatTypeOfButton = (type?: buttonType) => {
        switch (type) {
            case buttonType.fill:
                return 'button button__fill'
            case buttonType.nofill:
                return 'button button__nofill'
            default:
                return 'button button__fill'
        }
    }

    return <button
        className={`${className} ${decideWhatTypeOfButton(type)}`}
        onClick={onClick}>
        {children}
    </button>
}

export default Button
