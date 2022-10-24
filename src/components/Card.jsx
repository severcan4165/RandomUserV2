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
const initialTable = [];
let personData;
let name;
let person;
const Card = () => {
  const [personInfo, setPersonInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [hoverData, setHoverData] = useState({
    text1: "",
    text2: "",
  });
  const [add, setAdd] = useState(initialTable);

  const apiFetcher = async () => {
    setLoading(true);
    try {
      const response = await axios(url);
      person = response.data.results[0];
      const {email,gender,phone,dob: { age }, picture: { large: image }, name: { first, last },
        location: { country },login: { password },} = person;
      name = `${first} ${last}`;
      personData = {email,gender,name,image,age,country,phone,password,};
      
      setPersonInfo(personData);
      setHoverData({
        text1: "My name is",
        text2: personData.name,
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

  const handleAdd = () => {
    !!add.length < 1 && setAdd([...add, {firstname : personData.name, email : personData.email, phone : personData.phone}]);
    
(!add?.some((item) => item.firstname === personData.name) ? (setAdd([...add, {firstname : personData.name, email : personData.email, phone : personData.phone}])): alert("kullanıcı zaten var"))
  }
  

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
      <div className={cardStyle.butns}>
        <button disabled = {loading ? true : false} className={cardStyle.butn} onClick={() => apiFetcher()}>{loading ? "Loading" : "New User"}</button>
        <button onClick={handleAdd} className={cardStyle.butn}>Add User</button>
      </div>
      <div className={cardStyle.userTable}>
      {!!add.length > 0 &&   <table className={cardStyle.table}>
          <thead>
          <tr>
            <th>Firstname</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          </thead>
        
          <tbody>

             {add.map((item, index)=>{ 
              return(
                <tr key = {index} >
                  <td>{item.firstname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>)})}
           
          </tbody>
        </table>}
      </div>
    </div>
  );
};

export default Card;
