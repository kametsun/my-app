import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/events/" >
      <h1>Tsubasapp</h1>
    </Link>
    <Link to={"/tick_tack_toes/index"}>
      <h1>三目並べ</h1>
    </Link>
  </header>
);

export default Header;