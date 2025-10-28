import { useMemo } from 'react';
import adjacency from '../data/warAdjacency.json';
import { buildGraph, adjacencyMatrix, areAdjacent, neighborsOf } from '../game/graph';

/**
 * Hook to provide the War territories graph and helpers.
 * Data source: src/data/warAdjacency.json (keys are SVG path IDs from public/world.svg)
 */
export function useWarGraph() {
  const nodes = useMemo(() => Object.keys(adjacency).sort((a, b) => a.localeCompare(b)), []);
  const graph = useMemo(() => buildGraph(nodes, adjacency), [nodes]);
  const matrix = useMemo(() => adjacencyMatrix(graph), [graph]);

  return {
    nodes,
    graph,
    matrix,
    areAdjacent: (a, b) => areAdjacent(graph, a, b),
    neighborsOf: (id) => neighborsOf(graph, id),
    adjacency, // raw
  };
}

export default useWarGraph;
