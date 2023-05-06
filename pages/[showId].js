import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "../src/components/navbar";
import classes from "../src/components/Default.module.css";

export default function Page() {
  const [show, setShow] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(0);
  const [lang, setLang] = useState("");

  const router = useRouter();
  let param = router.query.showId;
  console.log(router.query.showId);
  useEffect(() => {
    const fetchShow = async () => {
      const response = await fetch(
        `https://api.tvmaze.com/lookup/shows?imdb=${param}`
      );
      if (!response.ok) {
        console.log("error");
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setShow(responseData);
    };
    fetchShow().catch((error) => {});
  }, [param]);
  const submitHandler = (e) => {
    setShowForm(false);
    alert(`Tickets booked for ${show.name}`);
  };

  function showF() {
    return (
      <div className={classes.formContainer}>
        <h3>Book tickets for {show.name}</h3>
        <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
          <label className={classes.label}>Name:</label>
          <input
            className={classes.field}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <label className={classes.label}>Email:</label>
          <input
            className={classes.field}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <label>Select number of seats:</label>
          <select
            className={classes.field}
            name="seats"
            id="seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label className={classes.label}>Select language and format:</label>
          <select
            className={classes.field}
            name="lang"
            id="lang"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="English2D">English2D</option>
            <option value="English3D">English3D</option>
            <option value="Hindi2D">Hindi2D</option>
          </select>

          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: "1rem" }}
            onClick={submitHandler}
          >
            Reserve!
          </Button>
        </form>
      </div>
    );
  }
  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("name"));
    if (name) {
      setName(name);
    }
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      setEmail(email);
    }
    const seats = JSON.parse(localStorage.getItem("seats"));
    if (seats) {
      setSeats(seats);
    }
    const lang = JSON.parse(localStorage.getItem("lang"));
    if (lang) {
      setLang(lang);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("seats", JSON.stringify(seats));
    localStorage.setItem("lang", JSON.stringify(lang));
  }, [name, email, seats, lang]);

  return (
    <>
      <Navbar />
      <div className={classes.summary}>
        <h1>{show.name}</h1>
        <img
          src={
            show.image != null
              ? show.image.medium
              : "https://static.tvmaze.com/uploads/images/medium_portrait/408/1022051.jpg"
          }
          alt={show.name}
        />
        <div className={classes.summhead}>
          <h3>Summary:</h3>
        </div>
        <p className={classes.text}>{show.summary}</p>
        {!showForm && (
          <Button variant="success" onClick={() => setShowForm(true)}>
            Book Tickets
          </Button>
        )}
        {showForm ? showF() : null}
      </div>
    </>
  );
}
