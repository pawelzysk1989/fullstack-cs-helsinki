import React from 'react';

type Props = {
  search: string;
  onSearchChange: (search: string) => void;
};

const PersonSearch = ({ search, onSearchChange }: Props) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };
  return (
    <input value={search} onChange={handleSearchChange} placeholder="filter by name" />
  );
};

export default PersonSearch;
