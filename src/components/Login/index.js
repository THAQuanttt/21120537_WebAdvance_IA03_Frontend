import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../utils/store";
import { showNotification } from "../../utils/showNotification";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const Login = () => {
  const { email, setEmail } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      navigate("/");
    }
  }, [email, navigate]);

  if (email) {
    return null;
  }
  const handleSubmit = async (e) => {
    const response = await fetch(`${BACKEND_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: e.email, password: e.password }),
    });
    const data = await response.json();
    const messageResponse = Array.isArray(data.message) ? data.message.join(", ") : data.message;
    if (data.statusCode === 200) {
      showNotification({
        message: "Success",
        type: "success",
        description: "Login successfully",
      });
      setEmail(data?.data?.user?.email);
      navigate("/");
    } else {
      showNotification({
        message: "Error",
        type: "error",
        description: messageResponse,
      });
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div className="login-button-container">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
