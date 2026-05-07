import React, { useState } from 'react';
import '../App.css';

const Navbar = ({ setCategory }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">NewsMag</span>

      <span className="menu-toggle text-white" onClick={() => setOpen(!open)}>
        ☰
      </span>

      <div className={`custom-nav ${open ? "active" : ""}`}>
        <span className="nav-link text-white" onClick={()=>setCategory("technology")}>Technology</span>
        <span className="nav-link text-white" onClick={()=>setCategory("business")}>Business</span>
        <span className="nav-link text-white" onClick={()=>setCategory("health")}>Health</span>
        <span className="nav-link text-white" onClick={()=>setCategory("sports")}>Sports</span>
        <span className="nav-link text-white" onClick={()=>setCategory("entertainment")}>Entertainment</span>
      </div>
    </nav>
  );
};

export default Navbar;