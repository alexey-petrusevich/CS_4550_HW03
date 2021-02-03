import {useState} from "react";
import './App.css';

function App() {
    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [secret, setSecret] = useState(generateSecret);
    const [hints, setHints] = useState([]);

    // returns a 4 digit randomized secret number
    function generateSecret() {
        let temp = new Set();
        while (temp.size < 4) {
            let newNum = Math.ceil(Math.random() * 9);
            temp.add(newNum);
        }

        return ((vars) => {
            let str = "";
            for (let c of vars) {
                str.concat(c.toString());
            }
            return str;
        })(temp);
    }

    // called when the textfield is changed
    function updateGuess(ev) {
        let text = ev.target.value;
        let fieldLength = text.length;
        if (fieldLength > 4) {
            text = text.substr(0, 4);
        }
        setGuess(text);
    }

    // checks if the guess is a unique 4-digit integer
    // and returns true if so and false otherwise
    function isValidInput(input) {
        let temp = new Set(input.split(""));
        if (temp.size < 4) {
            console.log("size is less than 4")
            return false;
        }
        for (let value of temp) {
            let iValue = parseInt(value);
            if (isNaN(iValue) || iValue < 1) {
                console.log("value is not a 1-9 number")
                return false;
            }
        }
        return true;
    }

    // adds current guess (value of the textfield to the list
    // of all guesses
    // TODO: implement table like behavior for displaying guesses and
    function makeGuess() {
        setGuesses(guesses.concat(guess));
        setHints(hints.concat(checkSecret(secret, guess)));
    }

    // returns a string representing the positions of
    // "bulls" and "cows" (or "As" and "Bs")
    // TODO: implement behavior
    function checkSecret(secret, guess) {
        let res = "";
        let numA = 0, numB = 0;
        if (secret.length != guess.length
        || secret.length != 4) {
            throw "Bad secret and/or guess";
        }
        for (let i = 0; i < 4; i++) {

        }
        return res;
    }

    // called when a new key is pressed
    function keypress(ev) {
        if (ev.key === "Enter") {
            if (isValidInput(guess)) {
                makeGuess();
            } else {
                alert("A guess must be a 4-digit unique integer (1-9)");
            }
        }
    }

    // called when reset button is clicked
    function reset() {
        setGuesses([]);
        setGuess("");
        setSecret(generateSecret());
    }

    return (
        <div className="App">
            <p>
                <input type="text"
                       onChange={updateGuess}
                       value={guess}
                       onKeyPress={keypress}
                />
            </p>
            <p>
                <button onClick={makeGuess}>Guess</button>
                <button onClick={reset}>Reset</button>
            </p>
            <p>
                Guesses: {guesses.join("\n")}
            </p>
        </div>
    );
}

export default App;
