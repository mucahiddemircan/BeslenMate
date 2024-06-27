import React from "react";
import { Typography } from "antd";
import logo from "../images/BeslenMate.png";

const { Text, Title } = Typography;

function AboutUs() {
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
      <Title
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        BeslenMate Hakkında
      </Title>
      <Text
        strong
        style={{
          display: "flex",
          alignItems: "center",
          width: "30vw",
          margin: "auto",
          paddingTop: "30px",
        }}
      >
        2024 yılında Edirne'de kurulan Mücahid Bilişim Tic.ve Ltd.Şti , uzman
        kadrosuyla dünya çapında birçok müşterisine özel yazılım ve danışmanlık
        hizmetleri sağlamakta; strateji, geliştirme, kalite güvencesi, müşteri
        desteği ve eğitim dahil olmak üzere mobil ve web geliştirmenin tüm
        alanlarında çözüm mimarlığı sunmakta olan %100 yerli sermayeli bir Türk
        firmasıdır. Geliştirdiği projeler ile bilişim sektöründe başarılı bir
        ivme yakalayan Mücahid Bilişim, müşteri odaklı hizmet anlayışı ilkesini
        benimseyerek daha bir çok sektör için profesyonel çözümler üretmekte ve
        yazılım sektöründe süreklilik sağlama vizyonunu ortaya koymaktadır.
        Mücahid Bilişim, BeslenMate projesi ile diyetisyenlere son derece iyi
        hizmet sunmaktadır.
      </Text>
    </div>
  );
}

export default AboutUs;
