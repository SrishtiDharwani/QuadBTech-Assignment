import React from "react";
import { useState, useEffect } from "react";
import classes from "./Default.module.css";
import { Card, Row, Col, Container, Link } from "react-bootstrap";

const Default = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchShows = async () => {
      const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
      if (!response.ok) {
        console.log("error");
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setShows(responseData);
      setIsLoading(false);
    };
    fetchShows().catch((error) => {
      setIsLoading(false);
      setErr(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div className={classes.notFound}>
        <p>Getting data...</p>
      </div>
    );
  }

  if (err) {
    console.log(err);
    return (
      <div className={classes.error}>
        <p className={classes.text}>{err}</p>
      </div>
    );
  }
  return (
    <Container className={classes.card}>
      <Row>
        {shows.map((show, k) => (
          <Col key={k} xs={12} md={4} lg={3}>
            <Card style={{ margin: '1rem'}}>
              <Card.Link href={"/" + show.show.externals.imdb} key={show.show.externals.imdb} style={{textDecoration:'none',color:'black'}}>
                  <Card.Img
                    variant="top"
                    src={
                      show.show.image != null
                        ? show.show.image.medium
                        : "https://static.tvmaze.com/uploads/images/medium_portrait/408/1022051.jpg"
                    }
                    alt={show.show.name}
                  />

                  <Card.Body>
                    <Card.Title>{show.show.name}</Card.Title>
                    <Card.Text>Lang: {show.show.language}</Card.Text>
                  </Card.Body>
              </Card.Link>
                </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Default;
