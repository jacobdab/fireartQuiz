import React, {FormEvent, ReactNode} from 'react'


interface Props {
    className: string
    children: ReactNode
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}


const Form = (props: Props) => {
    const {children, className, onSubmit} = props


    return <form className={className} onSubmit={onSubmit}>
        {children}
    </form>
}

export default Form
