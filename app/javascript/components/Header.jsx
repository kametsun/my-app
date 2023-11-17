import React from 'react';
import { Link } from 'react-router-dom';

import Title from "./Title";

const Header = () => (
  <header>
    <Title />
    <Link to={"/tick_tack_toes/index"}>
      <h1>三目並べ</h1>
    </Link>
  </header>
);

export default Header;