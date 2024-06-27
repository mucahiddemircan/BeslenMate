import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import "./Register.css";
import { Form, Input, Typography, Button, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { React, useState } from "react";

const BASE_URL = "http://localhost:3000";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();

  const Registered = () => {
    message.success("Kayıt Oluşturuldu! Giriş yapabilirsiniz.");
    navigate("../login");
  };

  const createUser = async (newUser) => {
    await axios.post(`${BASE_URL}/kullanicilar`, newUser);
  };

  const handleSubmit = async (values) => {
    const regobj = {
      email: values.email,
      password: values.password,
      name: values.name,
      surname: values.surname,
    };
    try {
      await axios.post(`${BASE_URL}/kullanicilar`, regobj);
      message.success("Kayıt Oluşturuldu! Giriş yapabilirsiniz.");
      navigate("../login");
    } catch (error) {
      message.error("Kullanıcı kaydı oluşturulurken hata oluştu", error);
    }
  };

  return (
    <div className="registerScreen">
      <Form
        className="registerForm"
        onFinish={handleSubmit}
        onValuesChange={(changedValues, allValues) => {
          setEmail(allValues.email);
          setPassword(allValues.password);
          setName(allValues.name);
          setSurname(allValues.surname);
        }}
      >
        <Typography.Title className="registerTitle">Kaydol</Typography.Title>
        <Form.Item
          className="emailInput"
          label="E-posta"
          name={"email"}
          rules={[
            {
              type: "email",
              message: "Geçerli bir e-posta giriniz",
            },
            {
              required: true,
              message: "E-posta gereklidir",
            },
          ]}
        >
          <Input
            value={email}
            onChange={(e) => [setEmail(e.target.value)]}
            placeholder="E-posta giriniz"
          ></Input>
        </Form.Item>
        <Form.Item
          label="Şifre"
          name={"password"}
          rules={[
            {
              required: true,
              message: "Şifre gereklidir.",
            },
          ]}
        >
          <Input.Password
            value={password}
            onChange={(e) => [setPassword(e.target.value)]}
            placeholder="Şifre giriniz"
          ></Input.Password>
        </Form.Item>
        <Form.Item
          label="Ad"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Ad gereklidir.",
            },
          ]}
        >
          <Input
            value={name}
            onChange={(e) => [setName(e.target.value)]}
            placeholder="Adınızı giriniz."
          ></Input>
        </Form.Item>
        <Form.Item
          label="Soyad"
          name={"surname"}
          rules={[
            {
              required: true,
              message: "Soyad gereklidir.",
            },
          ]}
        >
          <Input
            value={surname}
            onChange={(e) => [setSurname(e.target.value)]}
            placeholder="Soyadınızı giriniz"
          ></Input>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Kaydol
        </Button>
        <Divider className="divider">veya</Divider>
        <div className="socialLogins">
          <GoogleOutlined className="socialIcon" onClick={Registered} />
          <FacebookFilled className="socialIcon" onClick={Registered} />
        </div>
        <div className="register">
          Üyeliğin varsa : <Link to="/login">Giriş Yap</Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
