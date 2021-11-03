import React, { useState } from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Expandable = ({ title, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleClick = () => setIsExpanded((expanded) => !expanded);
  return (
    <div>
      <span>{title}</span> <button onClick={handleToggleClick}>show</button>
      {isExpanded && <div>{children}</div>}
    </div>
  );
};

export default Expandable;
