import React from 'react';
import { Link} from "react-router-dom";
import './Navigation.css';

const Navigation = () => {
  return (
    <div className="Navigation">
      <div className="cardContainer">
        <Link to="/">
          <div className="home card">
            <h4 className="label">Home</h4>
          </div>
        </Link>
        <Link to="/databases">
          <div className="databases card">
            <h4 className="label">Databases</h4>
          </div>
        </Link>
        <Link to="/users">
          <div className="users card">
            <h4 className="label">Users</h4>
          </div>
        </Link>
        <Link to="/query">
          <div className="users card">
            <h4 className="label">Query</h4>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navigation;
