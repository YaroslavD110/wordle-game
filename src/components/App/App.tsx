import React, { useEffect, useState } from 'react';

import { Grid } from '../Grid/Grid';
import { LetterState } from '../../common/constants';

import words from '../../assets/words.json';
import styles from './App.module.css';

const ROWS_COUNT = 6;
const COLUMNS_COUNT = 5;

export interface Attempt {
  char: string;
  state: LetterState;
}

function App() {
  const [word, setWord] = useState<string>();
  const [attempts, setAttempts] = useState<Attempt[][]>([]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [userInput, _setUserInput] = useState<string>('');
  const userInputValRef = React.useRef<string>(userInput);

  const setUserInput = (userInput: string) => {
    userInputValRef.current = userInput;
    _setUserInput(userInput);
  };

  const getRandomWord = (): string => {
    const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    console.log('Cheat: ' + randomWord);

    return randomWord;
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setAttempts([]);
    setUserInput('');
    setActiveRow(0);
  };

  const checkUserWord = (systemWord: string, userWord: string): Attempt[] => {
    const wordData: Attempt[] = [];

    for (let i = 0; i < systemWord.length; i++) {
      if (userWord[i] === systemWord[i]) {
        wordData.push({
          char: userWord[i],
          state: LetterState.CORRECT
        });
      } else if (systemWord.includes(userWord[i])) {
        wordData.push({
          char: userWord[i],
          state: LetterState.CLOSE
        });
      } else {
        wordData.push({
          char: userWord[i],
          state: LetterState.MISSED
        });
      }
    }

    return wordData;
  }

  const handleSubmit = () => {
    const userWord = userInputValRef.current;

    if (userWord.length === COLUMNS_COUNT) {
      setUserInput('');
      setActiveRow((prevVal) => prevVal + 1);
      setAttempts((prevVal) => [
        ...prevVal,
        checkUserWord(word as string, userWord)
      ]);
    }
  };

  useEffect(() => {
    if (!word) {
      setWord(getRandomWord());
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        // In case of alphabet charecters
        if (userInputValRef.current.length < COLUMNS_COUNT) {
          setUserInput(userInputValRef.current + e.key.toUpperCase());
        }
      } else if (e.keyCode === 8) {
        // In case of backspace button
        setUserInput(userInputValRef.current.slice(0, -1));
      } else if (e.keyCode === 13) {
        // In case of enter button
        handleSubmit();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [word]);

  useEffect(() => {
    if (attempts.length === 0) {
      return;
    }

    const correctLettersCount = attempts[activeRow - 1].filter(item => {
      return item.state === LetterState.CORRECT;
    }).length;
    const isWordCorrect = correctLettersCount === word?.length;

    if (isWordCorrect) {
      setTimeout(() => {
        alert('YOU WIN BITCH!');
        resetGame();
      }, 300);
    } else if (attempts.length === ROWS_COUNT) {
      alert('YOU LOSE BITCH!');
      resetGame();
    }
  }, [attempts]);

  return (
    <div className={styles.gameWrap}>
      <button
        onClick={resetGame}
        className={styles.resetBtn}
      >
        RESET
      </button>

      <Grid
        userInput={userInput}
        activeRow={activeRow}
        attempts={attempts}
        rows={ROWS_COUNT}
        columns={COLUMNS_COUNT}
      />
    </div>
  );
}

export default App;
