import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="text-2xl font-bold">
      <Link to="/">
        Expense
        <span className="text-yellow-300 dark:text-yellow-500">Tracker</span>
      </Link>
    </div>
  );
}

export default Logo