import React from 'react';

type Props = {
  message: string;
};

const Info = ({ message }: Props) => <span>{message}</span>;
export default Info;
