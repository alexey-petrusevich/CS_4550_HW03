import {useState} from "react";
import './App.css';

// called when the game is in progress
function App() {
    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [secret, setSecret] = useState(generateSecret());
    const [hints, setHints] = useState([]);

    // returns a 4 digit randomized secret number
    // TODO: office hours
    function generateSecret() {
        console.log("generate secret called");
        let temp = new Set();
        while (temp.size < 4) {
            let newNum = Math.ceil(Math.random() * 9);
            temp.add(newNum);
        }
        return ((vars) => {
            let str = "";
            for (let c of vars) {
                console.log("concatenating: " + c.toString());
                str = str.concat(c.toString());
                console.log("str: " + str);
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
        setHints(hints.concat(getHint(secret, guess)));
    }

    // returns a string representing the positions of
    // "bulls" and "cows" (or "As" and "Bs")
    function getHint(secret, guess) {
        if (secret.length !== guess.length
            || secret.length !== 4) {
            throw "Bad secret and/or guess";
        }
        let numA = 0, numB = 0;
        for (let i = 0; i < 4; i++) {
            if (secret[i] === guess[i]) {
                numA++;
            } else if (secret.includes(guess[i])) {
                numB++;
            }
        }
        return numA + "A" + numB + "B";
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
        setSecret(generateSecret);
        console.log("reset called");
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
                Secret: {secret}
            </p>
            <p>
                Guesses: {guesses.join("\n")}
            </p>
            <p>
                Hints: {hints.join("\n")}
            </p>
        </div>
    );
}

export default App;
