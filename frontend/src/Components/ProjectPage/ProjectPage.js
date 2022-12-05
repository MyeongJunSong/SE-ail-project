import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {
  projectidState,
  projectNameState,
  useridState,
  userpwdState,
} from "../recoil/Atom";
import { useNavigate } from "react-router-dom";
function ProjectPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [userProject, setUserProject] = useState([]);
  const [projectId, setProjectId] = useRecoilState(projectidState);
  const [projectNameRe, setProjectNameRe] = useRecoilState(projectNameState);
  const [userId, setUserId] = useRecoilState(useridState);
  const [userPwd, setUserPwd] = useRecoilState(userpwdState);
  const [show4, setShow4] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const changeProjectName = (e) => {
    setProjectName(e.target.value);
  };

  const projectLogin = (projects_id, name) => {
    setProjectId(projects_id);
    setProjectNameRe(name);
    navigate("/canban");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = {
      author: userId,
      name: projectName,
    };

    await axios
      .post("http://43.200.187.27/api/projects/save", req)
      .then((resp) => {
        const project = {
          name: projectName,
          projects_id: resp.data.data.projects_id,
        };

        setUserProject([...userProject, project]);
        alert(resp.data.message);
        handleClose();
        setProjectName("");
      })
      .catch((err) => {
        alert("프로젝트 저장 실패!");
        handleClose();
        setProjectName("");
      });
  };

  const getProjectsList = async () => {
    await axios
      .get(`http://43.200.187.27/api/users/getProjectsList/${userId}`)
      .then((resp) => {
        setUserProject(resp.data.data);
      })
      .catch((err) => {});
  };
  const logout = () => {
    handleClose4();
    navigate("/");
  };

  useEffect(() => {
    getProjectsList();
  }, []);
  return (
    <div>
      <div className="pro-wrapper">
        <div className="pro-header">
          <div className="user-id" onClick={handleShow4}>
            {userId}
          </div>
          <div className="project">Project Dashbord</div>
        </div>
        <div className="pro-container">
          <div className="pro-block">
            <div className="pro-top">
              <h2>프로젝트 목록</h2>
              <button className="pro-button" type="button" onClick={handleShow}>
                프로젝트 생성
              </button>
            </div>

            {userProject.map((data) => (
              <div className="list-style" key={data.projects_id}>
                <div className="list-content">{data.name}</div>
                <button
                  className="list-button"
                  type="button"
                  onClick={() => projectLogin(data.projects_id, data.name)}
                >
                  입장
                </button>
              </div>
            ))}
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>프로젝트 생성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>프로젝트 이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a project name"
                  value={projectName}
                  onChange={changeProjectName}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              프로젝트 생성
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show4} onHide={handleClose4}>
          <Modal.Header closeButton>
            <Modal.Title>로그 아웃</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose4}>
              닫기
            </Button>
            <Button variant="primary" onClick={logout}>
              로그 아웃
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ProjectPage;
