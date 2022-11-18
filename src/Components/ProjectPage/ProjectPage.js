import React from "react";
import { useRecoilValue } from "recoil";
import { useridState } from "../recoil/Atom";
function ProjectPage() {
  const userId = useRecoilValue(useridState);
  return (
    <div className="pro-wrapper">
      <div className="pro-header">
        <div className="user-id">{userId}</div>
        <div className="project">Project Dashbord</div>
      </div>
    </div>
  );
}

export default ProjectPage;
