import React, { useCallback } from 'react'
import styled from 'styled-components'

interface InputProps {
    value: string,
    onChange: (value: any) => void,
    className?: string,
    style?: React.CSSProperties,
    adornment?: React.ReactNode,
    label?: string
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const InputBase = styled.input`
    width: 90%;
`

/**
 * An input component that can be reused and has a prop-defined right-adornment.
 * @param value The value of the controlled input.
 * @param onChange The onChange handler of the controlled input.
 * @param adornment A react node to fix to the right hand side of the input's content.
 */
export const Input: React.FC<InputProps> = ({
    value,
    onChange,
    adornment,
    className,
    label,
    style
}) => {

    const $onChange = useCallback((e: any) => {
        onChange(e.target.value);
    }, [onChange])

    return (
        <InputContainer style={style} className={`input-container ${className}`}>
            <InputBase 
                className='input-field' 
                type='text'
                value={value} 
                onChange={$onChange} 
                placeholder={label}
            />
            { adornment }
        </InputContainer>
    )
}
