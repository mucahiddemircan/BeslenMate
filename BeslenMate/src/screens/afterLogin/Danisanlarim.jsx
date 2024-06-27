import { React, useEffect, useState } from "react";
import axios from "axios";
import { Input, Table, Card, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const BASE_URL = "http://localhost:4000";

function Danisanlarim() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { title: "Danışan Adı", dataIndex: "ad", key: "ad" },
    { title: "Danışan Soyadı", dataIndex: "soyad", key: "soyad" },
    { title: "Yaş", dataIndex: "yaş", key: "yaş" },
    { title: "Kilo (kg) ", dataIndex: "kilo", key: "kilo" },
    { title: "Boy (m) ", dataIndex: "boy", key: "boy" },
    { title: "Cinsiyet", dataIndex: "cinsiyet", key: "cinsiyet" },
  ];

  const getAllClients = async (value) => {
    setIsLoading(true);
    await axios.get(BASE_URL + "/danisanlar").then(function (response) {
      setIsLoading(false);
      setClients(response.data.filter((d) => d.ad.includes(value)));
    });
  };

  const getClientById = async (clientID) => {
    const response = await axios.get(BASE_URL + "/danisanlar/" + clientID);
    console.log(response.data);
  };

  const handleRowClick = (record) => {
    const vki = calculateVKI(record.kilo, record.boy);
    setSelectedClient({ ...record, vki });
  };

  const calculateVKI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  useEffect(() => {
    getClientById(1);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          marginBottom: 20,
        }}
      >
        <h1 style={{ fontSize: "48px", margin: 0, textAlign: "center" }}>
          Danışanlarım
        </h1>
        <Button
          icon={<LogoutOutlined />}
          type="primary"
          style={{ marginLeft: "auto", position: "absolute", right: 20 }}
          onClick={() => navigate("../")}
        >
          Çıkış Yap
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Search
          placeholder="Danışan adı giriniz"
          onSearch={getAllClients}
          style={{
            width: 300,
            paddingTop: 10,
            margin: "auto",
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={clients}
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
          };
        }}
        style={{
          paddingTop: 50,
        }}
      ></Table>
      {selectedClient && (
        <Card
          title="Danışan Detayları"
          style={{
            width: 300,
            marginTop: 20,
            margin: "auto",
          }}
        >
          <p>Vücut Kitle İndeksi (V.K.İ): {selectedClient.vki}</p>
          <Button
            type="primary"
            htmlType="submit"
            block
            onClick={() =>
              navigate("/dietlist", { state: { client: selectedClient } })
            }
          >
            Diyet Listesi Oluştur
          </Button>
        </Card>
      )}
    </div>
  );
}

export default Danisanlarim;
