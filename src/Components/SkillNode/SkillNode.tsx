import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { SkillNode as SkillNodeType } from "../../types";

import styles from "./SkillNode.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Actions } from "../../slice";

interface SkillNodeProps {
  data: SkillNodeType["data"];
  id: string;
}

function SkillNode({ data, id }: SkillNodeProps) {
  const dispatch = useDispatch();
  const skill = useSelector((state: RootState) => state.skillsCompleted[id]);

  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        className={`${styles.skillNode} ${skill.isAvailable && !skill.isCompleted && "cursor-pointer"} ${skill.isCompleted && styles.skillCompleted} aaaa`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => dispatch(Actions.completeSkill(id))}
      >
        <img src={data.image} alt={data.name} className={styles.skillIcon} />
        {hover && (
          <div className={styles.skillCard}>
            <div className={styles.skillTitle}>{data.name}</div>
            <div className={styles.skillDescription}>{data.description}</div>
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 2, height: 2 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 2, height: 2 }} />
    </>
  );
}

export default SkillNode;
