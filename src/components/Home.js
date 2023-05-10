import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import mealImage from "./assets/meals.jpg";
import css from "./Quote.module.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (id) {
      setIsLoggedIn(true);
    }
    if (role) setRole(role);
  }, []);

  return (
    <div>
      <div className={classes["main-img"]}>
        <img src={mealImage} alt="delicious meal" />
      </div>
      <section className={css.summary}>
        <p>
          You are a part of a puzzle in someone's life. You may never know where
          you fit. But, someone's life may never be complete without you in it.
        </p>
        {isLoggedIn ? (
          role === 1 ? (
            <button className={css.login} onClick={() => navigate("/user")}>
              Go to user section
            </button>
          ) : (
            <button className={css.login} onClick={() => navigate("/admin")}>
              Go to admin section
            </button>
          )
        ) : (
          <>
            <button className={css.login} onClick={() => navigate("/login")}>
              Login
            </button>
            <button className={css.signup} onClick={() => navigate("/signup")}>
              Signup
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;
