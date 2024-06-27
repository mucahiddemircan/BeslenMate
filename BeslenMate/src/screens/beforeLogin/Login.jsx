import "./Login.css";
import { Form, Input, Typography, Button, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.get(`${BASE_URL}/kullanicilar`);
      const users = response.data;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        message.success("Giriş Başarılı");
        navigate("../danisanlarim");
      } else {
        message.error("Geçersiz e-posta veya şifre");
      }
    } catch (error) {
      message.error("Giriş sırasında bir hata oluştu");
      console.error("Login error", error);
    }
  };

  return (
    <div className="loginScreen">
      <Form className="loginForm" onFinish={handleSubmit}>
        <Typography.Title className="loginTitle">Giriş Yap</Typography.Title>
        <Form.Item
          className="emailInput"
          label="E-posta"
          name="email"
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
          <Input placeholder="E-posta giriniz" />
        </Form.Item>
        <Form.Item
          label="Şifre"
          name="password"
          rules={[
            {
              required: true,
              message: "Şifre gereklidir.",
            },
          ]}
        >
          <Input.Password placeholder="Şifre giriniz" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Giriş
        </Button>
        <Divider className="divider">veya</Divider>
        <div className="register">
          BeslenMate üyeliğin yok mu ?<Link to="/register">Kaydol</Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
