import React, { ReactNode, useState } from 'react';

type Stat = {
  label: string;
  value: number | string;
};

type StatisticProps = Stat;

const StatisticLine = ({ label, value }: StatisticProps) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

type StatisticsProps = {
  statistics: Stat[];
};

const Statistics = ({ statistics }: StatisticsProps) => (
  <table>
    <tbody>
      {statistics.map(({ label, value }) => (
        <StatisticLine key={label} label={label} value={value} />
      ))}
    </tbody>
  </table>
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

const toPercentage = (value: number) => `${value * 100} %`;

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all;

  const statistics: Stat[] = [
    { label: 'good', value: good },
    { label: 'neutral', value: neutral },
    { label: 'bad', value: bad },
    { label: 'all', value: all },
    { label: 'average', value: average },
    { label: 'positive', value: toPercentage(positive) },
  ];

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  const areStatisticsVisible = all > 0;

  return (
    <>
      <Section title="give feedback">
        <Button onClick={increaseGood}>good</Button>
        <Button onClick={increaseNeutral}>neutral</Button>
        <Button onClick={increaseBad}>bad</Button>
      </Section>

      <Section title="statistics">
        {areStatisticsVisible ? (
          <Statistics statistics={statistics} />
        ) : (
          <span>no feedback given</span>
        )}
      </Section>
    </>
  );
}

export default App;
