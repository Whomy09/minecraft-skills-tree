import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { SkillNode as SkillNodeType } from "../../types";

import styles from "./SkillNode.module.css";

interface SkillNodeProps {
  data: SkillNodeType["data"];
  id: string;
}

function SkillNode({ data }: SkillNodeProps) {
  const [hover, setHover] = useState(false);

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className={styles.skillNode}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={data.image} alt={data.name} className={styles.skillIcon} />
        {hover && (
          <div className={styles.skillCard}>
            <div className={styles.skillTitle}>{data.name}</div>
            <div className={styles.skillDescription}>{data.description}</div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default SkillNode;
