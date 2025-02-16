import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SkillEdge, SkillNode, SkillsCompleted } from "./types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SliceState {
  skillNodes: SkillNode[];
  skillEdges: SkillEdge[];
  skillsCompleted: SkillsCompleted;
}

const initialState: SliceState = {
  skillEdges: [],
  skillNodes: [],
  skillsCompleted: {},
};

export const slice = createSlice({
  name: "Minecraft-Skill-Tree",
  initialState,
  reducers: {
    setSkillNodes: (state, action: PayloadAction<SkillNode[]>) => {
      state.skillNodes = action.payload;
    },
    setSkillEdges: (state, action: PayloadAction<SkillEdge[]>) => {
      state.skillEdges = action.payload;
    },
    setSkillsCompleted: (state, action: PayloadAction<SkillsCompleted>) => {
      state.skillsCompleted = action.payload;
    },
    completeSkill: (state, action: PayloadAction<string>) => {
      const skillId = action.payload;
      
      if (!state.skillsCompleted[skillId].isAvailable) return

      state.skillsCompleted[skillId].isCompleted = true;

      state.skillsCompleted[skillId].childrenIds.forEach((childId) => {
        state.skillsCompleted[childId].isAvailable = true;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const Actions = { ...slice.actions };

export default slice.reducer;
