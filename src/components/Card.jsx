import React, { useState, useEffect } from "react";
import cardStyle from "./Card.module.scss";
import axios from "axios";
import growingMan from "../assets/growing-up-man.svg";
import growingWoman from "../assets/growing-up-woman.svg";
import mail from "../assets/mail.svg";
import man from "../assets/man.svg";
import map from "../assets/map.svg";
import padlock from "../assets/padlock.svg";
import phone from "../assets/phone.svg";
import woman from "../assets/woman.svg";

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
      const name = `${first} ${last}`;
      const personData = {
        email,
        gender,
        name,
        image,
        age,
        country,
        phone,
        password,
      };
      setPersonInfo(personData);
      setHoverData({
        text1: "My name is",
        text2: personData.fullname,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    apiFetcher();
  }, []);
  // console.log(personInfo);

  const hoverHandler = (e) => {
    const { name } = e.target;
    setHoverData({ text1: `my ${name} is `, text2: personInfo[name] });
  };

  return (
    <div className={cardStyle.card}>
      <nav className={cardStyle.navbar}></nav>
      <img
        className={cardStyle.Image}
        src={personInfo.image}
        alt="peopleImage"
      />
      <div className={cardStyle.text}>
        <div>{hoverData.text1}</div>
        <div>{hoverData.text2}</div>
      </div>

      <div className={cardStyle.hoverImages}>
        <img
          className={cardStyle.hoverImage}
          name="name"
          onMouseOver={hoverHandler}
          src={personInfo.gender === "male" ? man : woman}
          alt="genderimage"
        />
        <img
          className={cardStyle.hoverImage}
          name="email"
          onMouseOver={hoverHandler}
          src={mail}
          alt="mailimage"
        />
        <img
          className={cardStyle.hoverImage}
          name="age"
          onMouseOver={hoverHandler}
          src={personInfo.gender === "male" ? growingMan : growingWoman}
          alt="growingimage"
        />
        <img
          className={cardStyle.hoverImage}
          name="country"
          onMouseOver={hoverHandler}
          src={map}
          alt="location"
        />
        <img
          className={cardStyle.hoverImage}
          name="phone"
          onMouseOver={hoverHandler}
          src={phone}
          alt="phone"
        />
        <img
          className={cardStyle.hoverImage}
          name="password"
          onMouseOver={hoverHandler}
          src={padlock}
          alt="password"
        />
      </div>
    </div>
  );
};

export default Card;
