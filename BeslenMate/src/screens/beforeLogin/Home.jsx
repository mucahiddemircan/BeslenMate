import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button, Typography, Divider } from "antd";
import logo from "../images/BeslenMate.png";

const { Title, Paragraph, Text } = Typography;

function Home() {
  return (
    <div>
      <img
        src={logo}
        style={{
          display: "flex",
          alignItems: "center",
          margin: "auto",
          paddingTop: "100px",
        }}
      />
      <Typography>
        <Title className="textTitle">BeslenMate'e hoş geldiniz.</Title>
        <Paragraph className="textParagraph">
          BeslenMate'de dilediğiniz danışanınıza dilediğiniz yemek listesini
          dakikalar içerisinde oluşturabilirsiniz! Kahvaltı, Öğle Yemeği ve
          Akşam Yemeği için ayrı ayrı kalori hesabı yapıp yemek listesinden
          gerekli kalorileri karşılayabilirsiniz! Çok çeşitli yemek menüsü ve
          basit arayüzüyle BeslenMate!
        </Paragraph>
        <Divider />
        <Text strong className="textLogin">
          Devam edebilmek için giriş yapmanız gerekmektedir.
        </Text>
      </Typography>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button type="primary" htmlType="submit" className="buttonLogin">
          Giriş Yap
        </Button>
      </Link>
    </div>
  );
}

export default Home;
