import React from "react";
import { useRecoilValue } from "recoil";
import { projectidState, projectNameState } from "../recoil/Atom";

function CanbanPage() {
  const projectId = useRecoilValue(projectidState);
  const projectNameRe = useRecoilValue(projectNameState);
  return (
    <div>
      {projectId}
      {projectNameRe}
    </div>
  );
}

export default CanbanPage;
