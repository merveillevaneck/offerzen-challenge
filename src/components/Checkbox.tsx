import React, { useCallback } from 'react'
import styled from 'styled-components'

interface CheckboxProps {
    label?: string,
    checked?: boolean,
    onChange?: (checked: boolean) => void,
    className?: string,
    style?: React.CSSProperties
}

const InputContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`

const InputBase = styled.input`
    width: 20px;
    height: 20px;

    span {
        position: relative;
    }

    span::after {
        position: absolute;
        width: 25px;
        height: 45px;
        border-right: 5px solid #fff;
        border-bottom: 5px solid #fff;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(40deg);
        opacity: 0;
        transition: all 0.4s;
    }
`

export const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onChange,
    label,
    className,
    style,
    ...props
}) => {

    const handleChange = useCallback(
        (e: any) => {
            const checked = e.target.checked
            if (onChange) onChange(checked)
        },
        [onChange],
    )

    return (
        <InputContainer style={style} className={`checkbox-container ${className}`}>
            {label}
            <InputBase 
                type='checkbox' 
                checked={checked} 
                onChange={handleChange}
            />
            <span className='check-mark' />
        </InputContainer>
    )
}
