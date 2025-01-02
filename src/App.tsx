import { useReducer } from "react";
import "./App.css";

interface PasswordProps {
  password: string;
  passwordLength: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

type Action =
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_PASSWORD_LENGTH"; payload: number }
  | { type: "SET_INCLUDE_UPPERCASE"; payload: boolean }
  | { type: "SET_INCLUDE_LOWERCASE"; payload: boolean }
  | { type: "SET_INCLUDE_NUMBERS"; payload: boolean }
  | { type: "SET_INCLUDE_SYMBOLS"; payload: boolean };

function reducer(state: PasswordProps, action: Action): PasswordProps {
  switch (action.type) {
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_PASSWORD_LENGTH":
      return { ...state, passwordLength: action.payload };
    case "SET_INCLUDE_UPPERCASE":
      return { ...state, includeUppercase: action.payload };
    case "SET_INCLUDE_LOWERCASE":
      return { ...state, includeLowercase: action.payload };
    case "SET_INCLUDE_NUMBERS":
      return { ...state, includeNumbers: action.payload };
    case "SET_INCLUDE_SYMBOLS":
      return { ...state, includeSymbols: action.payload };
    default:
      return state;
  }
}

const initialState: PasswordProps = {
  password: "",
  passwordLength: 8,
  includeUppercase: false,
  includeLowercase: false,
  includeNumbers: false,
  includeSymbols: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const generatePassword = () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=";

    let characters = "";

    if (
      !state.includeUppercase &&
      !state.includeLowercase &&
      !state.includeNumbers &&
      !state.includeSymbols
    ) {
      alert("Please select at least one option");
      return;
    }

    if (state.includeUppercase) {
      characters += uppercaseLetters;
    }

    if (state.includeLowercase) {
      characters += lowercaseLetters;
    }

    if (state.includeNumbers) {
      characters += numbers;
    }

    if (state.includeSymbols) {
      characters += symbols;
    }

    let password = "";
    for (let i = 0; i < state.passwordLength; i++) {
      const character = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      password += character;
    }

    dispatch({ type: "SET_PASSWORD", payload: password });
  };

  return (
    <div className="App">
      <h1 className="App-Name">Password Generator</h1>

      {/*Password Input*/}
      <div className="Password-Container">
        <input
          className="Password-Input"
          type="text"
          placeholder="Password"
          value={state.password}
          readOnly
        />
        <button
          className="Password-Button"
          onClick={() => navigator.clipboard.writeText(state.password)}
        >
          Copy
        </button>
      </div>

      {/*Password Spechs*/}
      <div className="Password-Specs">
        <p>Character length</p>
        <div className="Password-Length">
          <input
            className="Password-Length-Input"
            type="range"
            min="0"
            max="20"
            value={state.passwordLength}
            onChange={(event) =>
              dispatch({
                type: "SET_PASSWORD_LENGTH",
                payload: parseInt(event.target.value),
              })
            }
          />
          <span className="Password-Length-Number">{state.passwordLength}</span>
        </div>

        <div>
          <input
            type="checkbox"
            name="Include Uppercase Letters"
            id="Uppercase"
            onChange={(event) =>
              dispatch({
                type: "SET_INCLUDE_UPPERCASE",
                payload: event.target.checked,
              })
            }
          />
          <label htmlFor="Uppercase">Include Uppercase Letters</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="Include Lowercase Letters"
            id="Lowercase"
            onChange={(event) =>
              dispatch({
                type: "SET_INCLUDE_LOWERCASE",
                payload: event.target.checked,
              })
            }
          />
          <label htmlFor="Lowercase">Include Lowercase Letters</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="Include Numbers"
            id="Numbers"
            onChange={(event) =>
              dispatch({
                type: "SET_INCLUDE_NUMBERS",
                payload: event.target.checked,
              })
            }
          />
          <label htmlFor="Numbers">Include Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="Include Symbols"
            id="Symbols"
            onChange={(event) =>
              dispatch({
                type: "SET_INCLUDE_SYMBOLS",
                payload: event.target.checked,
              })
            }
          />
          <label htmlFor="Symbols">Include Symbols</label>
        </div>
      </div>

      {/*Button generator*/}
      <button onClick={generatePassword}>Generate Password</button>
    </div>
  );
}

export default App;
