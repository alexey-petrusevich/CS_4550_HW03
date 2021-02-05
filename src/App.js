import {useState} from "react";
import "milligram";
import './App.css';

// called when the game is in progress
function App() {
    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [secret, setSecret] = useState(generateSecret());
    const [hints, setHints] = useState([]);

    // returns a 4 digit randomized secret number
    // TODO: office hours (this function is called twice but logs only once?)
    function generateSecret() {
        // console.log("generate secret called");
        let temp = new Set();
        while (temp.size < 4) {
            let newNum = Math.ceil(Math.random() * 9);
            temp.add(newNum);
        }
        return ((vars) => {
            let str = "";
            for (let c of vars) {
                // console.log("concatenating: " + c.toString());
                str = str.concat(c.toString());
                // console.log("str: " + str);
            }
            return str;
        })(temp);
    }

    // called when the textfield is changed
    function updateGuess(ev) {
        if (hasGameEnded(guesses, secret)) {
            return;
        }
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
    function makeGuess() {
        if (hasGameEnded(guesses, secret)) {
            return;
        }
        console.log("secret: " + secret);
        setGuesses(guesses.concat(guess));
        setGuess("");
        setHints(hints.concat(getHint(secret, guess)));
        console.log("num guesses: " + guesses.length);
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
        if (hasGameEnded(guesses, secret)) {
            return;
        }
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
        setHints([]);
        setSecret(generateSecret);
        // console.log("reset called");
    }

    // returns true if the game has ended and false otherwise
    function hasGameEnded(guesses, secret) {
        return guesses.length >= 8 || guesses.includes(secret);
    }


    return (
        <div>
            <div className="controls">
                <div className="row">
                    <div className="column">
                        <p>
                            <input type="text"
                                   onChange={updateGuess}
                                   value={guess}
                                   onKeyPress={keypress}
                            />
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            <button onClick={makeGuess}>Guess</button>
                            <button onClick={reset}>Reset</button>
                        </p>
                    </div>
                </div>
            </div>
            <ResultTable guesses={guesses} hints={hints}/>

            <StatusBar guesses={guesses} gameOver={hasGameEnded(guesses, secret)}/>

        </div>
    );
}

function ResultTable({guesses, hints}) {
    return (
        <div className="results">
            <div className="row">
                <div className="column">
                    <div className="colHeader">
                        <p>Num guesses</p>
                    </div>
                </div>
                <div className="column">
                    <div className="colHeader">
                        <p>Guess</p>
                    </div>
                </div>
                <div className="column">
                    <div className="colHeader">
                        <p>Hint</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>1</p>
                </div>
                <div className="column">
                    <p>
                        {guesses[0]}
                    </p>
                </div>
                <div className="column">
                    <p>
                        {hints[0]}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>2</p>
                </div>
                <div className="column">
                    <p>
                        {guesses[1]}
                    </p>
                </div>
                <div className="column">
                    <p>
                        {hints[1]}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>3</p>
                </div>
                <div className="column">
                    <p>
                        {guesses[2]}
                    </p>
                </div>
                <div className="column">
                    <p>
                        {hints[2]}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>4</p>
                </div>
                <div className="column">
                    <p>
                        {guesses[3]}
                    </p>
                </div>
                <div className="column">
                    <p>
                        {hints[3]}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>5</p>
                </div>
                <div className="column">
                    <p>
                        {guesses[4]}
                    </p>
                </div>
                <div className="column">
                    <p>
                        {hints[4]}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>6</p>
                </div>
                <div className="column">
                    <p>
                        {guesses[5]}
                    </p>
                </div>
                <div className="column">
                    <p>
                        {hints[5]}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>7</p>
                </div>
                <div className="column">
                    <p>
                        {guesses[6]}
                    </p>
                </div>
                <div className="column">
                    <p>
                        {hints[6]}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>8</p>
                </div>
                <div className="column">
                    <p>
                        {guesses[7]}
                    </p>
                </div>
                <div className="column">
                    <p>
                        {hints[7]}
                    </p>
                </div>
            </div>
        </div>
    );
}

function StatusBar({guesses, gameOver}) {
    let status = "";
    if (gameOver) {
        if (guesses.length < 8) {
            status = "You won!";
        } else {
            status = "You lost!";
        }
    }
    return (
        <div className="status">
            <div className="row">
                <div className="column">
                    <p>
                        {status}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default App;
