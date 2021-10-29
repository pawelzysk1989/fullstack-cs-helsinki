import React, { ReactNode, useState } from 'react';

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

const App = () => {
  const [anecdotes, setAnecdotes] = useState(() =>
    ANECDOTES.map((text) => ({
      text,
      votes: 0,
    })),
  );
  const [selected, setSelected] = useState(() => getRandomIndex(anecdotes));

  const selectedAnecdote = anecdotes[selected];

  const mostPopularAnecdote = anecdotes.reduce<typeof anecdotes[0] | undefined>(
    (mostPopular, current) =>
      current.votes > (mostPopular?.votes ?? 0) ? current : mostPopular,
    undefined,
  );

  const switchSelectedAnecdote = () => {
    setSelected(getAnotherRandomIndex(anecdotes));
  };
  const updateVotes = () => {
    setAnecdotes(
      anecdotes.map((anecdote) =>
        anecdote.text === selectedAnecdote.text
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote,
      ),
    );
  };

  return (
    <>
      <Section title="Anectode of the day">
        <Anecdote text={selectedAnecdote.text} votes={selectedAnecdote.votes} />
        <Button onClick={updateVotes}>vote</Button>
        <Button onClick={switchSelectedAnecdote}>next anecdote</Button>
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
