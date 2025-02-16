import { BaseEdge, EdgeProps } from "@xyflow/react";

const SkillEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  id,
  style = {},
}: EdgeProps) => {
  const edgePath = `M${sourceX},${sourceY} H${(sourceX + targetX) / 2} V${targetY} H${targetX}`;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 12,
          stroke: "#000",
        }}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 4,
          stroke: "#ffffff",
        }}
      />
    </>
  );
};

export default SkillEdge;
