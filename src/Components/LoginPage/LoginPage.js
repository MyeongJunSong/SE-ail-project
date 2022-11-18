import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useridState, userpwdState } from "../recoil/Atom";
function LoginPage() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const [userId, setUserId] = useRecoilState(useridState);
  const [userPwd, setUserPwd] = useRecoilState(userpwdState);
  const navigate = useNavigate();
  const changeId = (event) => {
    setId(event.target.value);
  };
  const changePwd = (event) => {
    setPwd(event.target.value);
  };
  const login = async () => {
    const user = {
      users_id: id,
      password: pwd,
    };
    await axios
      .post("http://43.200.187.27/api/users/login", user)
      .then((resp) => {
        console.log(resp);
        alert(id + "님 로그인 되었습니다");
        setUserId(id);
        setUserPwd(pwd);
        navigate("/project");
      })
      .catch((err) => {
        console.log(err);

        alert(err.response.data.message);
      });
  };
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>로그인</h3>
      </div>
      <form>
        <label>ID</label>
        <input name="users_id" type="text" value={id} onChange={changeId} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={pwd}
          onChange={changePwd}
        />
        <button className="button" type="button" onClick={login}>
          제출
        </button>
        <Link style={{ color: "gray", textDecoration: "none" }} to="/register">
          아이디가 없다면...{" "}
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
