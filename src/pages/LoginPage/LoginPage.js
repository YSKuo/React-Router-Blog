import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/reducers/userReducer";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
`;

const Form = styled.form`
  width: 60%;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);

  const handleSubmit = () => {
    setErrorMessage(null); // 先把錯誤訊息抹掉
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token); // 登入成功把 token 放到 localStorage

      dispatch(getMe()) // 驗證身份
        .then((response) => {
          if (response.ok !== 1) {
            setAuthToken(null);
            return setErrorMessage(response.toString());
          }
          history.push("/"); // 把頁面導向首頁
        });
    });
  };

  if (user) {
    history.push("/"); // 如果已經登入就把頁面導向首頁
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        帳號:
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        密碼:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}
