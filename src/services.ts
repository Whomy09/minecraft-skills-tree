import { BaseSkillTree } from "./types";

export async function getBaseSkillTree() {
  try {
    const response = await fetch(
      "https://minecraft.capta.co/BaseSkillTree.json"
    );

    const baseSkillTree = (await response.json()) as BaseSkillTree;

    return baseSkillTree;
  } catch (error) {
    console.error(error);
  }
}
