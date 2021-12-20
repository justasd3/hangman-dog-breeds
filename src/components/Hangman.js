import axios from 'axios';
import { default as React, useState } from 'react';
import { GrPowerReset } from "react-icons/gr";
import { alphabet } from '../Alphabet.js';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import '../Hangman.css';


const maxWrong = 5
let images = [img1, img2, img3, img4, img5, img6]

const Hangman = ({ data: word, reset }) => {
    const [mistakesCount, setMistakesCount] = useState(0)
    const [guessed, setGuessed] = useState(new Set([]))
    const [hint, setHint] = useState()

    var maskedWord = String(word).split('').map(item => guessed.has(item) ? item : "_").join(" ")

    const handleClick = (letter) => {
        setGuessed(prev => new Set(prev.add(letter)))
        if (!word.includes(letter)) setMistakesCount(mistakesCount + 1)
        console.log()
    }
    const handleReset = () => {
        setMistakesCount(0)
        setGuessed(new Set([]))
        setHint()
        reset()
    }
    const getHint = () => {
        axios.get(`https://dog.ceo/api/breed/${word}/images`)
            .then((response) => {
                const img = response.data.message[Math.floor(Math.random() * 10)]
                setHint(String(img))
            })
    }
    return (
        <div className="Hangman container text-center">
            <h1>HANGMAN</h1>
            <h1>{word}</h1>
            <h2>Mistakes {mistakesCount} out of {maxWrong}</h2>
            <img src={images[mistakesCount]} alt="" />
            <div>
                <h5>{mistakesCount >= maxWrong ? "You lost! Correct word was " + word : maskedWord}</h5>
                <h5>{maskedWord.split(" ").join("") === word ? "Congrats! Play again?" : null}</h5>
            </div>
            {hint ? <img src={hint} className="hint_img" alt="" /> : null}
            <div>
                {alphabet.map((item) => {
                    return <button
                        className="btn btn-outline-dark"
                        onClick={() => handleClick(item)}
                        disabled={guessed.has(item) || mistakesCount === maxWrong || maskedWord.split(" ").join("") === word}
                    >
                        {item}
                    </button>;
                })}
            </div>
            {mistakesCount >= maxWrong ? <button className="btn btn-outline-dark" onClick={handleReset} > Play again! <GrPowerReset /></button> : <button className="btn btn-outline-dark" onClick={handleReset}><GrPowerReset /> Reset</button>}
            <button className="btn btn-outline-dark" onClick={getHint}>Get hint ?</button>
        </div >)
}

export default Hangman;