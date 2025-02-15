import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SkillEdge, SkillNode } from "./types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SliceState {
  skillNodes: SkillNode[];
  skillEdges: SkillEdge[];
}

const initialState: SliceState = {
  skillEdges: [],
  skillNodes: [],
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
  },
});

// Action creators are generated for each case reducer function
export const Actions = { ...slice.actions };

export default slice.reducer;
