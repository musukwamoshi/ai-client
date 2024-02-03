import React, { useState, useEffect } from 'react';
import { ITypeWriterObject } from '../common/Interfaces';


export interface TypewriterProps {
    response: ITypeWriterObject
}
const Typewriter = ({ text, delay }: ITypeWriterObject) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prevText: string) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex: number) => prevIndex + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
};

export default Typewriter;
