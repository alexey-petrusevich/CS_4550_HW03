import logo from './logo.svg';
import {useState} from "react";
import './App.css';

function App() {
    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [secret, setSecret] = useState(generateSecret);

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

    function updateGuess(ev) {
        let key = ev.key;
        let fieldLength = ev.target.value.length;
        if (key === "Enter") {
            if (isValidInput()) {
                makeGuess();
            } else {
                alert("A guess must be a 4-digit unique integer");
            }
        } else {
            if (fieldLength <= 4) {
                setGuess(guess.concat(key));
            }
        }
    }

    // checks if the guess is a unique 4-digit integer
    // and returns true if so and false otherwise
    function isValidInput() {
        let temp = new Set(guess.split(""));
        if (temp.size < 4) {
            return false;
        }
        for (let value of temp) {
            if (!isNaN(parseInt(value))) {
                return false;
            }
        }
        return true;
    }

    function makeGuess() {
        setGuesses(guesses.concat(guess));
    }

    function reset() {
        setGuesses([]);
        setGuess("");
    }

    return (
        <div className="App">
            <p>
                <input type="text"
                       onKeyPress={updateGuess}
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
