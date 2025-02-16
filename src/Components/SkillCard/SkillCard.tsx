import { SkillNode } from "../../types";

import styles from "./SkillCard.module.css";

interface SkillCardProps {
  position: {
    x: number;
    y: number;
  };
  skillNode: SkillNode | null;
}

function SkillCard({ position, skillNode }: SkillCardProps) {
  if (!skillNode) return null;

  return (
    <div
      className={styles.skillCard}
      style={{
        left: `${position.x - 80}px`,
        top: position.y + 50,
      }}
    >
      <div className={styles.skillTitle}>{skillNode.data.name}</div>
      <div className={styles.skillDescription}>
        {skillNode.data.description}
      </div>
    </div>
  );
}

export default SkillCard;
