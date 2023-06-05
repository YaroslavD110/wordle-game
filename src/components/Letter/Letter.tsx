import classNames from 'classnames';

import { LetterState } from '../../common/constants';

import styles from './Letter.module.css';

interface Props {
  state: LetterState;
  char?: string;
}

export const Letter = (props: Props) => {
  const { char, state } = props;

  return (
    <div className={classNames(styles.wrap, {
      [styles.idle]: state === LetterState.IDLE,
      [styles.green]: state === LetterState.CORRECT,
      [styles.yellow]: state === LetterState.CLOSE,
      [styles.missed]: state === LetterState.MISSED
    })}>
      {char}
    </div>
  );
}