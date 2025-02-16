import { BaseEdge, EdgeProps, getStraightPath } from "@xyflow/react";

function SkillEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  id,
  style = {},
}: EdgeProps) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 6,
          stroke: "#ffffff",
          strokeOpacity: 0.75,
        }}
      />
    </>
  );
}

export default SkillEdge;
