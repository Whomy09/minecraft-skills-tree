import { BaseSkillTree, SkillEdge, SkillNode, SkillsCompleted } from "./types";

export function normalizeSkillTree(
  root: BaseSkillTree,
  parentId: string | null = null,
  idCounter: { count: number } = { count: 0 },
  skillsCompleted: SkillsCompleted = {},
  skillNodes: SkillNode[] = [],
  skillEdges: SkillEdge[] = []
): {
  skillNodes: SkillNode[];
  skillEdges: SkillEdge[];
  skillsCompleted: SkillsCompleted;
} {
  const id = `skill_${idCounter.count++}`;

  skillsCompleted[id] = {
    isCompleted: false,
    isAvailable: parentId === null,
    childrenIds: [],
  };

  skillNodes.push({
    id,
    data: {
      parentId,
      name: root.name,
      description: root.description,
      image: root.image,
    },
    type: "skillNode",
    position: {
      x: 0,
      y: 0,
    },
  });

  if (parentId) {
    skillEdges.push({
      id: `edge_${parentId}${id}`,
      source: parentId,
      target: id,
      type: "skillEdge",
    });
    skillsCompleted[parentId].childrenIds.push(id);
  }

  root.children.forEach((child) => {
    const { skillEdges: edges, skillNodes: nodes } = normalizeSkillTree(
      child,
      id,
      idCounter,
      skillsCompleted
    );
    skillNodes.push(...nodes);
    skillEdges.push(...edges);
  });

  return {
    skillEdges,
    skillNodes,
    skillsCompleted,
  };
}
