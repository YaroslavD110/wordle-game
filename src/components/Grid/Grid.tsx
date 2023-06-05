import React from 'react';

import { Attempt } from '../App/App';
import { Letter } from '../Letter/Letter';
import { LetterState } from '../../common/constants';

import styles from './Grid.module.css';

interface Props {
  userInput: string;
  activeRow: number;
  attempts: Attempt[][];
  rows: number;
  columns: number;
}

export const Grid = (props: Props) => {
  const { userInput, activeRow, attempts, rows, columns } = props;

  const getRow = (rowIndex: number) => {
    if (attempts[rowIndex]) {
      return (
        <div key={rowIndex} className={styles.row}>
          {attempts[rowIndex].map((letterData, colIndex) => (
            <Letter
              key={letterData + colIndex.toString()}
              char={letterData.char}
              state={letterData.state}
            />
          ))}
        </div>
      );
    }

    return (
      <div key={rowIndex} className={styles.row}>
        {[...new Array(columns)].map((_, colIndex) => (
          <Letter
          key={'letter' + colIndex.toString()}
            char={rowIndex === activeRow ? userInput[colIndex] : undefined}
            state={LetterState.IDLE}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.wrap}>
      {[...new Array(rows)].map((_, rowIndex) => getRow(rowIndex))}
    </div>
  );
}