import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Descriptions, Table, Row, Col, Button } from "antd";
import axios from "axios";

function DietList() {
  const location = useLocation();
  const { client } = location.state || {};

  const [breakfastData, setBreakfastData] = useState([]);
  const [lunchDinnerData, setLunchDinnerData] = useState([]);
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchDinnerItems, setLunchDinnerItems] = useState([]);

  useEffect(() => {
    // Axios ile veri çekme işlemi
    axios
      .get("http://localhost:5000/yemekler")
      .then((response) => {
        // API'den gelen veriyi işle
        const data = response.data;

        // Kahvaltı ve Öğle-Akşam Yemeği için veriyi filtrele ve ayır
        const breakfastMeals = data.filter((meal) => meal.tur === "kahvaltı");
        const lunchDinnerMeals = data.filter(
          (meal) => meal.tur === "öğle/akşam yemeği"
        );

        setBreakfastData(breakfastMeals);
        setLunchDinnerData(lunchDinnerMeals);
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  }, []); // Boş dependency array, effect'in sadece bir kez çalışmasını sağlar

  const dailyCalories = calculateDailyCalories(client);
  const breakfastCalories = Math.round((2 / 8) * dailyCalories);
  const lunchDinnerCalories = Math.round((3 / 8) * dailyCalories);

  // Kahvaltı ve Öğle-Akşam Yemeği tablo sütunları
  const breakfastColumns = [
    {title: "Gıda", dataIndex: "isim", key: "isim",},
    {title: "Kalori", dataIndex: "kalori", key: "kalori",},
    {title: "Ekle", dataIndex: "id", key: "id",
      render: (id, record) => (
        <Button
          disabled={isBreakfastDisabled(record)}
          onClick={() => handleAddItem(record, "breakfast")}
        >
          Ekle
        </Button>
      ),
    },
  ];

  const lunchDinnerColumns = [
    {
      title: "Gıda",
      dataIndex: "isim",
      key: "isim",
    },
    {
      title: "Kalori",
      dataIndex: "kalori",
      key: "kalori",
    },
    {
      title: "Ekle",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <Button
          disabled={isLunchDinnerDisabled(record)}
          onClick={() => handleAddItem(record, "lunchDinner")}
        >
          Ekle
        </Button>
      ),
    },
  ];

  // Eklenen öğeleri tutan state'ler
  const handleAddItem = (item, type) => {
    if (type === "breakfast") {
      setBreakfastItems([...breakfastItems, item]);
    } else if (type === "lunchDinner") {
      setLunchDinnerItems([...lunchDinnerItems, item]);
    }
  };

  // Kahvaltı ve Öğle-Akşam Yemeği toplam kalori kontrolü
  const isBreakfastDisabled = (item) => {
    const totalCalories = breakfastItems.reduce(
      (total, item) => total + item.kalori,
      0
    );
    const remainingCalories = breakfastCalories - totalCalories;
    return (
      remainingCalories <= 0 ||
      item.kalori > remainingCalories ||
      breakfastItems.some((i) => i.id === item.id)
    );
  };

  const isLunchDinnerDisabled = (item) => {
    const totalCalories = lunchDinnerItems.reduce(
      (total, item) => total + item.kalori,
      0
    );
    const remainingCalories = lunchDinnerCalories - totalCalories;
    return (
      remainingCalories <= 0 ||
      item.kalori > remainingCalories ||
      lunchDinnerItems.some((i) => i.id === item.id)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <h1 style={{ marginBottom: 20 }}>Diyet Listesi Oluştur</h1>
      <Card
        title="Danışan Bilgileri"
        style={{
          width: "100%",
        }}
      >
        {client ? (
          <Descriptions bordered column={7}>
            <Descriptions.Item label="Danışan Adı">
              {client.ad}
            </Descriptions.Item>
            <Descriptions.Item label="Danışan Soyadı">
              {client.soyad}
            </Descriptions.Item>
            <Descriptions.Item label="Yaş">{client.yaş}</Descriptions.Item>
            <Descriptions.Item label="Kilo (kg)">
              {client.kilo}
            </Descriptions.Item>
            <Descriptions.Item label="Boy (m)">{client.boy}</Descriptions.Item>
            <Descriptions.Item label="Cinsiyet">
              {client.cinsiyet}
            </Descriptions.Item>
            <Descriptions.Item label="Vücut Kitle İndeksi (V.K.İ)">
              {client.vki}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Danışan bilgisi bulunamadı.</p>
        )}
      </Card>
      <p style={{ marginTop: 20, fontSize: 20 }}>
        Zayıflamak için alınması gereken günlük kalori: {dailyCalories} kcal
      </p>
      <Row gutter={16} style={{ width: "100%", marginTop: 20 }}>
        <Col span={12}>
          <Card
            title={`Kahvaltı (Kahvaltıda alınması gereken kalori: ${breakfastCalories} kcal)`}
          >
            <Table
              columns={breakfastColumns}
              dataSource={breakfastData}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={`Öğle-Akşam Yemeği (Öğle veya Akşam yemeğinde alınması gereken kalori: ${lunchDinnerCalories} kcal)`}
          >
            <Table
              columns={lunchDinnerColumns}
              dataSource={lunchDinnerData}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ width: "100%", marginTop: 20 }}>
        <Col span={12}>
          <Card
            title="Eklenen Kahvaltılar"
            style={{
              width: "100%",
              marginTop: 20,
            }}
          >
            <ul>
              {breakfastItems.map((item, index) => (
                <li key={index}>
                  {item.isim} - Kalori: {item.kalori}
                </li>
              ))}
            </ul>
            {breakfastItems.length > 0 && (
              <p>
                Kalan Kalori:{" "}
                {breakfastCalories -
                  breakfastItems.reduce(
                    (total, item) => total + item.kalori,
                    0
                  )}
              </p>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Eklenen Öğle-Akşam Yemekleri"
            style={{
              width: "100%",
              marginTop: 20,
            }}
          >
            <ul>
              {lunchDinnerItems.map((item, index) => (
                <li key={index}>
                  {item.isim} - Kalori: {item.kalori}
                </li>
              ))}
            </ul>
            {lunchDinnerItems.length > 0 && (
              <p>
                Kalan Kalori:{" "}
                {lunchDinnerCalories -
                  lunchDinnerItems.reduce(
                    (total, item) => total + item.kalori,
                    0
                  )}
              </p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function calculateDailyCalories(client) {
  let calories = 0;

  if (client) {
    const { yaş, cinsiyet, kilo, boy } = client;

    // Mifflin-St Jeor formülü ile günlük kalori hesaplama
    if (cinsiyet === "erkek") {
      calories = 10 * kilo + 6.25 * (boy / 100) * 100 - 5 * yaş + 5;
    } else if (cinsiyet === "kadın") {
      calories = 10 * kilo + 6.25 * (boy / 100) * 100 - 5 * yaş - 161;
    }

    return Math.round(calories); // Kaloriyi tam sayıya yuvarla
  }
}
export default DietList;
