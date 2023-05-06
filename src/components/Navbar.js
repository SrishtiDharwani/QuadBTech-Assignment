import React from "react";
import Link from "next/link";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h1 className={classes.head}>TV Maze</h1>
      </Link>
    </div>
  );
};

export default Navbar;
