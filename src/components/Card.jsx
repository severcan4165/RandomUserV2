import React, { useState, useEffect } from "react";
import cardStyle from "./Card.module.scss";
import axios from "axios";
const url = "https://randomuser.me/api/";
const Card = () => {
  const [personInfo, setPersonInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [hoverData, setHoverData] = useState({
    text1: "",
    text2: "",
  });
 
  const apiFetcher = async () => {
    setLoading(true);
    try {
      const response = await axios(url);
      const person = response.data.results[0];
      const {
        email,
        gender,
        phone,
        dob: { age },
        picture: { large: image },
        name: { first, last },
        location: { country },
        login: { password },
      } = person;
      const fullname = `${first} ${last}`;
      const personData = {
        email,
        gender,
        fullname,
        image,
        age,
        country,
        phone,
        password
      };
      setPersonInfo(personData);
      setHoverData({
        text1:"My name is",
        text2: personData.fullname
      });
      

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    apiFetcher();
  }, []);
  console.log(personInfo);

  return (
    <div className={cardStyle.card}>
      <nav className={cardStyle.navbar}></nav>
      <img className={cardStyle.Image} src={personInfo.image} alt="peopleImage" />
      <div>{hoverData.text1}</div>
      <div>{hoverData.text2}</div>
    </div>
  );
};

export default Card;
