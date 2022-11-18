import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";

function RegisterPage() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwd, setPwd] = useState("");
  const [idCanUsable, setidCanUsable] = useState(false);

  useEffect(() => {
    setidCanUsable(false);
  }, []);
  const navigate = useNavigate();

  const changeId = (event) => {
    setId(event.target.value);
    console.log(id);
  };

  const changeNickname = (event) => {
    setNickname(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const checkIdCanUsable = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://43.200.187.27/api/users/idCanUsable/${id}`)
      .then((resp) => {
        console.log(resp);
        if (resp.data.data === true) {
          setidCanUsable(true);
          console.log(id);
          alert("사용 가능한 아이디입니다.");
        }
        if (resp.data.data === false) {
          setidCanUsable(false);
          setId("");
          console.log(id);
          alert("중복된 아이디입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        const resp = err.response;
        alert(resp.data);
      });
  };

  const join = async () => {
    const req = {
      users_id: id,
      password: pwd,
      nickname: nickname,
    };

    await axios
      .post("http://43.200.187.27/api/users/save", req)
      .then((resp) => {
        console.log(resp);

        alert(resp.data.data.users_id + "님 회원가입 되었습니다!");
        setidCanUsable(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);

        alert(err.response.data);
      });
  };
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>회원가입</h3>
      </div>
      <form>
        <div className="id">
          <label>ID</label>
          <button className="idCheck" onClick={checkIdCanUsable}>
            아이디 중복 확인
          </button>
        </div>
        <input name="users_id" type="text" value={id} onChange={changeId} />
        <label>nickname</label>
        <input name="nickname" value={nickname} onChange={changeNickname} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={pwd}
          onChange={changePwd}
        />
        <button
          className="button"
          type="button"
          disabled={!idCanUsable}
          onClick={join}
        >
          제출
        </button>
        <Link style={{ color: "gray", textDecoration: "none" }} to="/login">
          이미 아이디가 있다면...{" "}
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
