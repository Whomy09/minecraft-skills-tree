import { BaseSkillTree, SkillEdge, SkillNode } from "./types";

export function normalizeSkillTree(
  root: BaseSkillTree,
  parentId: string | null = null,
  idCounter: { count: number } = { count: 0 },
  skillNodes: SkillNode[] = [],
  skillEdges: SkillEdge[] = []
): { skillNodes: SkillNode[]; skillEdges: SkillEdge[] } {
  const id = `skill_${idCounter.count++}`;

  skillNodes.push({
    id,
    data: {
      name: root.name,
      description: root.description,
      image: root.image,
      parentId,
      completed: false,
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
      type: 'skillEdge'
    });
  }

  root.children.forEach((child) => {
    const { skillEdges: edges, skillNodes: nodes } = normalizeSkillTree(
      child,
      id,
      idCounter
    );
    skillNodes.push(...nodes);
    skillEdges.push(...edges);
  });

  return {
    skillEdges,
    skillNodes,
  };
}
