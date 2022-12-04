import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        if (resp.data.data === true) {
          setidCanUsable(true);
          alert("사용 가능한 아이디입니다.");
        }
        if (resp.data.data === false) {
          setidCanUsable(false);
          setId("");
          alert("중복된 아이디입니다.");
        }
      })
      .catch((err) => {
        alert("아이디 중복 조회 실패!");
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
        alert(resp.data.data.users_id + "님 회원가입 되었습니다!");
        setidCanUsable(false);
        setId("");
        setNickname("");
        setPwd("");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data);
        setId("");
        setNickname("");
        setPwd("");
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
