import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useridState } from "../recoil/Atom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { projectidState, projectNameState } from "../recoil/Atom";
import { useNavigate } from "react-router-dom";
function ProjectPage() {
  const userId = useRecoilValue(useridState);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [userProject, setUserProject] = useState([]);
  const [projectId, setProjectId] = useRecoilState(projectidState);
  const [projectNameRe, setProjectNameRe] = useRecoilState(projectNameState);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeProjectName = (e) => {
    setProjectName(e.target.value);
  };

  const projectLogin = (projects_id, name) => {
    console.log(projects_id);
    console.log(name);
    setProjectId(projects_id);
    setProjectNameRe(name);
    console.log(projectId);
    console.log(projectNameRe);
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
        console.log(resp);
        const project = {
          name: projectName,
          projects_id: resp.data.data.projects_id,
        };

        setUserProject([...userProject, project]);
        console.log(userProject);
        alert(resp.data.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);

        alert("프로젝트 저장 실패!");
        handleClose();
      });
  };

  const getProjectsList = async () => {
    await axios
      .get(`http://43.200.187.27/api/users/getProjectsList/${userId}`)
      .then((resp) => {
        console.log(resp);
        setUserProject(resp.data.data);
        console.log(userProject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProjectsList();
  }, []);
  return (
    <div>
      <div className="pro-wrapper">
        <div className="pro-header">
          <div className="user-id">{userId}</div>
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
      </div>
    </div>
  );
}

export default ProjectPage;
