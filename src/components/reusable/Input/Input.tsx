import React from 'react'

import './Input.scss'


interface Props {
    type: inputType,
    options: Options,
    onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>  void
}

interface Options {
    name: string,
    placeholder?: string,
    value?: string,
    values?: Values[],
    styling: stylingType
}

interface Values {
    value: string,
    disabled: boolean
}

export enum inputType {
    select,
    text,
    button,
    number,
    submit
}

export enum stylingType {
    redNoFill = 'input__redNoFill',
    blueNoFill = 'input__blueNoFill',
    blueFill = 'input__blueFill'
}


const Input = (props: Props) => {
    const {type, options, onClick} = props

    const integerTest = new RegExp('^\\d+$')

    const validateInput = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value

        if (value) {
            if (event.currentTarget.type === 'number' && !validateIfInteger(value)
                || event.currentTarget.type === 'number' && !validateMaxAmount(value)) {
                !event.currentTarget.classList.contains(stylingType.redNoFill) && event.currentTarget.classList.add(stylingType.redNoFill)
                return
            }

            event.currentTarget.classList.remove(stylingType.redNoFill)
        } else {
            event.currentTarget.classList.add(stylingType.redNoFill)
        }
    }

    const validateIfInteger = (value: string) => {
        return integerTest.test(value)
    }

    const validateMaxAmount = (value: string) => {
        return Number(value) <= 50
    }

    switch (type) {
        case inputType.text:
            if (options && options.name && options.placeholder) {
                return <input
                    className={'input ' + options.styling}
                    name={options.name}
                    placeholder={options.placeholder}
                    onChange={validateInput}/>
            }
            break
        case inputType.button:
            if (options && options.name && options.value) {
                return <input
                    className={'input ' + options.styling}
                    name={options.name}
                    onClick={onClick}
                    type='button'
                    value={options.value}/>
            }

            throw new Error('Options missing')
        case inputType.submit:
            if (options && options.name && options.value) {
                return <input
                    className={'input ' + options.styling}
                    name={options.name}
                    type='submit'
                    value={options.value}/>
            }

            throw new Error('Options missing')
        case inputType.number:
            if (options && options.name && options.placeholder) {
                return <input className={'input ' + options.styling}
                              type='number'
                              name={options.name}
                              placeholder={options.placeholder}
                              onChange={validateInput}
                />
            }

            throw new Error('Options missing')
        case inputType.select:
            if (options && options.name && options.values) {
                return <select className={'input ' + options.styling}
                               name={options.name}
                               id={options.name}
                               defaultValue={options.values[0].value}
                               onChange={validateInput}>
                    {options.values.map((item, index) => {
                        return <option value={item.value} disabled={item.disabled}
                                       key={`${item.value}-${index}`}>{item.value}</option>
                    })}
                </select>
            }

            throw new Error('Options missing')
    }

    return <></>
}

export default Input
