import { BaseEdge, EdgeProps, getBezierPath } from "@xyflow/react";

import styles from "./SkillEdge.module.css";

function SkillEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        className={styles.minecraftEdge}
        style={{
          ...style,
          strokeWidth: 3,
          stroke: "#ffffff",
        }}
      />
      <BaseEdge
        path={edgePath}
        className={styles.minecraftEdgeInner}
        style={{
          ...style,
          strokeWidth: 1,
          stroke: "#373737",
        }}
        markerEnd={markerEnd}
      />
    </>
  );
}

export default SkillEdge;
