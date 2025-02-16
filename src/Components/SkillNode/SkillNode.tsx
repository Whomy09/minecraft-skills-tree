import { Actions } from "../../slice";
import { RootState } from "../../store";
import { Handle, Position } from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { SkillNode as SkillNodeType } from "../../types";

import styles from "./SkillNode.module.css";

interface SkillNodeProps {
  data: SkillNodeType["data"];
  id: string;
}

function SkillNode({ data, id }: SkillNodeProps) {
  const dispatch = useDispatch();
  const skill = useSelector((state: RootState) => state.skillsCompleted[id]);

  return (
    <>
      <div
        className={`${styles.skillNode} ${skill.isAvailable && !skill.isCompleted && "cursor-pointer"} ${skill.isCompleted && styles.skillCompleted}`}
        onClick={() => dispatch(Actions.completeSkill(id))}
      >
        <img src={data.image} alt={data.name} className={styles.skillIcon} />
      </div>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </>
  );
}

export default SkillNode;
