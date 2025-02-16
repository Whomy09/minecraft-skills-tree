import Dagre from "@dagrejs/dagre";
import { Actions } from "../../slice";
import { RootState } from "../../store";
import { ReactFlow } from "@xyflow/react";
import { useEffect, useMemo } from "react";
import SkillEdge from "../SkillEdge/SkillEdge";
import SkillNode from "../SkillNode/SkillNode";
import { normalizeSkillTree } from "../../utils";
import { getBaseSkillTree } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import {
  SkillEdge as SkillEdgeType,
  SkillNode as SkillNodeType,
} from "../../types";

import "@xyflow/react/dist/style.css";
import styles from "./SkillTree.module.css";

const edgesTypes = {
  skillEdge: SkillEdge,
};

function SkillTree() {
  const dispatch = useDispatch();
  const nodeTypes = useMemo(() => ({ skillNode: SkillNode }), []);
  const { skillEdges, skillNodes } = useSelector((state: RootState) => state);

  function getLayoutElements(
    skillNodes: SkillNodeType[],
    skillEdges: SkillEdgeType[]
  ) {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({
      rankdir: "LR",
      nodesep: 100,
      ranksep: 50,
    });

    skillNodes.forEach((node) => {
      g.setNode(node.id, { width: 100, height: 50 });
    });

    skillEdges.forEach((edge) => {
      g.setEdge(edge.source, edge.target);
    });

    Dagre.layout(g);

    return {
      calculateSkillNodes: skillNodes.map((node) => {
        const { x, y } = g.node(node.id);
        return {
          ...node,
          position: { x, y },
        };
      }),
    };
  }

  useEffect(() => {
    async function handleGetSkillTree() {
      try {
        const baseSkillTree = await getBaseSkillTree();

        if (!baseSkillTree) return;

        const { skillEdges, skillNodes, skillsCompleted } =
          normalizeSkillTree(baseSkillTree);

        const { calculateSkillNodes } = getLayoutElements(
          skillNodes,
          skillEdges
        );

        dispatch(Actions.setSkillsCompleted(skillsCompleted));
        dispatch(Actions.setSkillNodes(calculateSkillNodes));
        dispatch(Actions.setSkillEdges(skillEdges));
      } catch (error) {
        console.error(error);
      }
    }

    void handleGetSkillTree();
  }, [dispatch]);

  return (
    <div className={styles.skillTreeContainer}>
      <ReactFlow
        nodes={skillNodes}
        edges={skillEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgesTypes}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnPinch={false}
        panOnScroll={false}
        fitView
      ></ReactFlow>
    </div>
  );
}

export default SkillTree;
