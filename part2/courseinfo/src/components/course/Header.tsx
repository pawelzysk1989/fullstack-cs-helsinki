import React from 'react';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => <h2>{title}</h2>;

export default Header;
