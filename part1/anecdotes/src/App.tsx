import React, { ReactNode, useReducer } from 'react';

type AnecdoteProps = {
  text: string;
  votes: number;
};
const Anecdote = ({ text, votes }: AnecdoteProps) => (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
);

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <div>
    <h2>{title}</h2>
    <div className="content">{children}</div>
  </div>
);

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void;
  children: ReactNode;
};

const Button = ({ onClick, children }: ButtonProps) => (
  <button onClick={onClick}>{children}</button>
);

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const ANECDOTES = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
];

const getRandomIndex = (arr: any[]): number => getRandomIntInclusive(0, arr.length - 1);

const getAnotherRandomIndex = (arr: any[]) => {
  const getIndex = (prevIndex: number): number => {
    const randomIndex = getRandomIndex(arr);
    if (randomIndex !== prevIndex) {
      return randomIndex;
    }
    return getIndex(prevIndex);
  };
  return getIndex;
};

const anecdotes = ANECDOTES.map((text) => ({
  text,
  votes: 0,
}));

const initialState = {
  anecdotes,
  selectedIndex: getRandomIndex(ANECDOTES),
  mostPopularAnecdote: undefined as typeof anecdotes[0] | undefined,
};

type ActionType =
  | { type: 'draw_next'; payload: number }
  | { type: 'vote'; payload: number };

type State = typeof initialState;

function anecdoteReducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'draw_next':
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case 'vote': {
      const selectedAnecdote = state.anecdotes[state.selectedIndex];
      const upvotedSelectedAnecdote = {
        ...selectedAnecdote,
        votes: selectedAnecdote.votes + 1,
      };

      return {
        ...state,
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.text === upvotedSelectedAnecdote.text
            ? upvotedSelectedAnecdote
            : anecdote,
        ),
        mostPopularAnecdote:
          !state.mostPopularAnecdote ||
          upvotedSelectedAnecdote.votes > state.mostPopularAnecdote.votes
            ? upvotedSelectedAnecdote
            : state.mostPopularAnecdote,
      };
    }
  }
}

const App = () => {
  const [{ anecdotes, selectedIndex, mostPopularAnecdote }, dispatch] = useReducer(
    anecdoteReducer,
    initialState,
  );

  const selectedAnecdote = anecdotes[selectedIndex];

  const drawNext = () => {
    dispatch({
      type: 'draw_next',
      payload: getAnotherRandomIndex(anecdotes)(selectedIndex),
    });
  };
  const vote = () => {
    dispatch({
      type: 'vote',
      payload: selectedAnecdote.votes + 1,
    });
  };

  return (
    <>
      <Section title="Anectode of the day">
        <Anecdote text={selectedAnecdote.text} votes={selectedAnecdote.votes} />
        <Button onClick={vote}>vote</Button>
        <Button onClick={drawNext}>next anecdote</Button>
      </Section>
      {mostPopularAnecdote && (
        <Section title="Anectode with most votes">
          <Anecdote text={mostPopularAnecdote.text} votes={mostPopularAnecdote.votes} />
        </Section>
      )}
    </>
  );
};

export default App;
