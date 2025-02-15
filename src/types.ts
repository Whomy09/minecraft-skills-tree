export interface BaseSkillTree {
  name: string;
  description: string;
  image: string;
  children: BaseSkillTree[];
}

export interface SkillNode {
  id: string;
  data: {
    name: string;
    description: string;
    image: string;
    parentId: string | null;
    completed: boolean;
  };
  type: string;
  position: {
    x: number;
    y: number;
  }
}

export interface SkillEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}
