import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  projectidState,
  projectNameState,
  useridState,
  userpwdState,
} from "../recoil/Atom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Span = styled.span`
  padding: 30px;
  display: block;
  background-color: ${(props) => {
    if (props.isColor && props.color === "0") {
      return "#ffb9b9";
    } else if (props.isColor && props.color === "1") {
      return "#ff7675";
    } else if (props.isColor && props.color === "2") {
      return "#ff3231";
    } else {
      return "white";
    }
  }};
  border-radius: 10px;
  margin: 4px;
`;

const CanbanWrapper = styled.div`
  width: 100%;
  margin: auto;
`;

const CanbanHeader = styled.div`
  background-color: #7a84eb;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const CanbanUserID = styled.div`
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const CanbanBord = styled.div`
  font-size: 25px;
  color: white;
  margin-left: 500px;
`;
const CanbanSection = styled.div`
  width: 400px;
  background-color: #a6adf2;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;
const CanbanSectionTitle = styled.div`
  margin-bottom: 2px;
`;
const CanbanSectionContent = styled.div`
  margin: 5px 10px 10px 10px;
`;
const Canban = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
const CanbanButton = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1px;
`;
const CanbanSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
function CanbanPage() {
  const [projectId, setProjectId] = useRecoilState(projectidState);
  const [projectNameRe, setProjectNameRe] = useRecoilState(projectNameState);
  const [userId, setUserId] = useRecoilState(useridState);
  const [userPwd, setUserPwd] = useRecoilState(userpwdState);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [isColor, setisColor] = useState(false);
  const [data, setData] = useState([]);
  const [issueId, setIssueId] = useState("");
  const [issueCategory, setIssueCategory] = useState("");
  const [issueContent, setIssueContent] = useState("");
  const [issueDeadline, setIssueDeadline] = useState("");
  const [issueStoryPoint, setIssueStoryPoint] = useState(0);
  const [issueImportance, setIssueImportance] = useState("");
  const [userInvite, setUserInvite] = useState("");
  const [sectionIndex, setSectionIndex] = useState(-1);
  const [issueIndex, setIssueIndex] = useState(-1);
  const navigate = useNavigate();
  const changeissueContent = (e) => {
    setIssueContent(e.target.value);
  };
  const changeissueDeadline = (e) => {
    setIssueDeadline(e.target.value);
  };
  const changeissueStoryPoint = (e) => {
    setIssueStoryPoint(e.target.value);
  };
  const changeissueImportance = (e) => {
    setIssueImportance(e.target.value);
  };
  const changeuserInvite = (e) => {
    setUserInvite(e.target.value);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => {
    setShow3(false);
    setSectionIndex(-1);
    setIssueIndex(-1);
    setIssueId("");
    setIssueCategory("");
    setIssueContent("");
    setIssueDeadline("");
    setIssueImportance("");
    setIssueStoryPoint(0);
  };
  const handleShow3 = () => setShow3(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const getIssueList = async () => {
    await axios
      .get(`http://43.200.187.27/api/projects/getIssuesList/${projectId}`)
      .then((resp) => {
        setData(resp.data.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getIssueList();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const issue = {
      author: userId,
      projects_id: projectId,
      content: issueContent,
      deadline: issueDeadline,
      storyPoint: issueStoryPoint,
      importance: issueImportance,
    };

    await axios
      .post("http://43.200.187.27/api/issues/save", issue)
      .then((resp) => {
        const issue = {
          issues_id: resp.data.data.issues_id,
          content: issueContent,
          deadline: issueDeadline,
          storyPoint: issueStoryPoint,
          category: "예정",
          importance: issueImportance,
        };
        const col = data[0];
        const colTask = [...col.issuesList];
        colTask.splice(0, 0, issue);
        data[0].issuesList = colTask;
        setData(data);
        handleClose();
        alert(resp.data.message);
        setIssueContent("");
        setIssueDeadline("");
        setIssueImportance("");
        setIssueStoryPoint(0);
      })
      .catch((err) => {
        alert("이슈 저장 실패!");
        handleClose();
        setIssueContent("");
        setIssueDeadline("");
        setIssueImportance("");
        setIssueStoryPoint(0);
      });
  };

  const UserInviteSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `http://43.200.187.27/api/projects/invite/${userInvite}/${projectId}`
      )
      .then((resp) => {
        handleClose2();
        alert(resp.data.message);
        setUserInvite("");
      })
      .catch((err) => {
        alert("유저 초대 실패!");
        handleClose2();
        setUserInvite("");
      });
  };
  const issueDelete = async () => {
    axios
      .delete(`http://43.200.187.27/api/issues/delete/${issueId}`)
      .then((resp) => {
        const col = data[sectionIndex];
        const colTask = [...col.issuesList];
        colTask.splice(issueIndex, 1);
        data[sectionIndex].issuesList = colTask;
        setData(data);
        alert("이슈 삭제 완료!");
        handleClose3();
      })
      .catch((err) => {
        alert("이슈 삭제 실패!");
        handleClose3();
      });
  };
  const issueChange = async () => {
    const issue = {
      issues_id: issueId,
      content: issueContent,
      deadline: issueDeadline,
      storyPoint: issueStoryPoint,
      category: issueCategory,
      importance: issueImportance,
    };
    await axios
      .put(`http://43.200.187.27/api/issues/update`, issue)
      .then((resp) => {
        const col = data[sectionIndex];
        const colTask = [...col.issuesList];
        colTask.splice(issueIndex, 1);
        colTask.splice(issueIndex, 0, issue);
        data[sectionIndex].issuesList = colTask;
        setData(data);
        handleClose3();
      })
      .catch((err) => {
        alert("이슈 변경 실패!");
        handleClose3();
      });
  };
  const logout = () => {
    setUserId("");
    setUserPwd("");
    handleClose4();
    navigate("/");
  };
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex(
        (e) => e.category === source.droppableId
      );
      const destinationColIndex = data.findIndex(
        (e) => e.category === destination.droppableId
      );

      const newData = data;
      const sourceCol = newData[sourceColIndex];
      const destinationCol = newData[destinationColIndex];

      const sourceTask = [...sourceCol.issuesList];
      const destinationTask = [...destinationCol.issuesList];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      newData[sourceColIndex].issuesList = sourceTask;
      newData[destinationColIndex].issuesList = destinationTask;
      setData(newData);
    }

    if (source.droppableId === destination.droppableId) {
      const sourceColIndex = data.findIndex(
        (e) => e.category === source.droppableId
      );
      const newData = data;
      const sourceCol = newData[sourceColIndex];
      const sourceTask = [...sourceCol.issuesList];

      const [removed] = sourceTask.splice(source.index, 1);
      sourceTask.splice(destination.index, 0, removed);
      newData[sourceColIndex].issuesList = sourceTask;

      setData(newData);
    }
    const issue = {
      issues_id: result.draggableId,
      past_index: source.index,
      past_droppableId: source.droppableId,
      cur_index: destination.index,
      cur_droppableId: destination.droppableId,
    };
    await axios
      .put("http://43.200.187.27/api/issues/dragAndDrop", issue)
      .then((resp) => {})
      .catch((err) => {});
  };

  return (
    <CanbanWrapper>
      <CanbanHeader>
        <CanbanBord>
          <CanbanUserID onClick={handleShow4}>{userId}</CanbanUserID>
          {projectNameRe} CanbanBord
        </CanbanBord>
        <CanbanButton>
          <Button variant="primary" onClick={handleShow2}>
            멤버 초대
          </Button>
          <DropdownButton id="dropdown-basic-button" title="정렬 기준">
            <Dropdown.Item onClick={() => setisColor(false)}>
              기본
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setisColor(true)}>
              중요도 정렬
            </Dropdown.Item>
          </DropdownButton>
        </CanbanButton>
      </CanbanHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <Canban>
          {data &&
            data.map((section, sectionIndex) => (
              <Droppable key={section.category} droppableId={section.category}>
                {(provided) => (
                  <CanbanSection
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <CanbanSectionWrapper>
                      <CanbanSectionTitle>
                        {section.category}
                      </CanbanSectionTitle>
                      {section.category === "예정" && (
                        <AiOutlinePlus
                          style={{
                            width: "27px",
                            height: "27px",
                            cursor: "pointer",
                          }}
                          onClick={handleShow}
                        />
                      )}
                    </CanbanSectionWrapper>
                    <CanbanSectionContent>
                      {section.issuesList &&
                        section.issuesList.map((issuesList, index) => (
                          <Draggable
                            key={issuesList.issues_id}
                            draggableId={issuesList.issues_id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? "0.5" : "1",
                                }}
                              >
                                <Span
                                  isColor={isColor}
                                  color={issuesList.importance}
                                  onClick={() => {
                                    console.log(section);
                                    console.log(sectionIndex);
                                    console.log(index);
                                    setSectionIndex(sectionIndex);
                                    setIssueIndex(index);
                                    setIssueId(issuesList.issues_id);
                                    setIssueCategory(issuesList.category);
                                    setIssueContent(issuesList.content);
                                    setIssueDeadline(issuesList.deadline);
                                    setIssueImportance(issuesList.importance);
                                    setIssueStoryPoint(issuesList.storyPoint);
                                    handleShow3();
                                  }}
                                >
                                  {issuesList.content}
                                </Span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </CanbanSectionContent>
                  </CanbanSection>
                )}
              </Droppable>
            ))}
        </Canban>
      </DragDropContext>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>이슈 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이슈 내용</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a issue content"
                value={issueContent}
                onChange={changeissueContent}
              />
            </Form.Group>
          </Form>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이슈 데드라인</Form.Label>
              <Form.Control
                type="text"
                placeholder="YYYYMMDD"
                value={issueDeadline}
                onChange={changeissueDeadline}
              />
            </Form.Group>
          </Form>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이슈 스토리포인트</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter a issue storypoint"
                value={issueStoryPoint}
                onChange={changeissueStoryPoint}
              />
            </Form.Group>
          </Form>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이슈 중요도</Form.Label>
              <Form.Control
                type="text"
                placeholder="0~2"
                value={issueImportance}
                onChange={changeissueImportance}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            이슈 생성
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>유저 초대</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={UserInviteSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>초대 유저 아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter user ID"
                value={userInvite}
                onChange={changeuserInvite}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            닫기
          </Button>
          <Button variant="primary" onClick={UserInviteSubmit}>
            유저 초대
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>이슈 상세 및 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={issueChange}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이슈 내용</Form.Label>
              <Form.Control
                type="text"
                value={issueContent}
                onChange={changeissueContent}
              />
            </Form.Group>
          </Form>
          <Form onSubmit={issueChange}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이슈 데드라인</Form.Label>
              <Form.Control
                type="text"
                value={issueDeadline}
                onChange={changeissueDeadline}
              />
            </Form.Group>
          </Form>
          <Form onSubmit={issueChange}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이슈 스토리포인트</Form.Label>
              <Form.Control
                type="text"
                value={issueStoryPoint}
                onChange={changeissueStoryPoint}
              />
            </Form.Group>
          </Form>
          <Form onSubmit={issueChange}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이슈 중요도</Form.Label>
              <Form.Control
                type="text"
                value={issueImportance}
                onChange={changeissueImportance}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={issueDelete}>
            이슈 삭제
          </Button>
          <Button variant="primary" onClick={issueChange}>
            이슈 수정
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show4} onHide={handleClose4}>
        <Modal.Header closeButton>
          <Modal.Title>로그아웃</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            닫기
          </Button>
          <Button variant="primary" onClick={logout}>
            로그아웃
          </Button>
        </Modal.Footer>
      </Modal>
    </CanbanWrapper>
  );
}

export default CanbanPage;
