// Lightweight graph helpers for War territories adjacency

/**
 * Build a normalized adjacency list from raw data.
 * @param {string[]} nodes - list of territory ids
 * @param {Record<string, string[]>} rawAdj - map of id -> neighbor ids
 * @returns {{nodes: string[], index: Map<string, number>, adj: Map<string, Set<string>>}}
 */
export function buildGraph(nodes, rawAdj) {
  const set = new Set(nodes);
  const index = new Map(nodes.map((id, i) => [id, i]));
  const adj = new Map();

  for (const id of nodes) {
    const neighbors = new Set();
    const list = Array.isArray(rawAdj?.[id]) ? rawAdj[id] : [];
    for (const n of list) {
      if (n !== id && set.has(n)) neighbors.add(n);
    }
    adj.set(id, neighbors);
  }

  // Ensure undirected symmetry: if A lists B, ensure B lists A
  for (const [a, neigh] of adj.entries()) {
    for (const b of neigh) {
      if (!adj.has(b)) adj.set(b, new Set());
      adj.get(b).add(a);
    }
  }

  return { nodes, index, adj };
}

/**
 * Return 0/1 adjacency matrix in node order.
 * @param {{nodes: string[], index: Map<string, number>, adj: Map<string, Set<string>>}} graph
 * @returns {number[][]}
 */
export function adjacencyMatrix(graph) {
  const n = graph.nodes.length;
  const M = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  for (const [id, neigh] of graph.adj.entries()) {
    const i = graph.index.get(id);
    for (const nb of neigh) {
      const j = graph.index.get(nb);
      if (i != null && j != null) {
        M[i][j] = 1;
        M[j][i] = 1;
      }
    }
  }
  return M;
}

/**
 * Are two territories adjacent?
 * @param {{adj: Map<string, Set<string>>}} graph
 * @param {string} a
 * @param {string} b
 */
export function areAdjacent(graph, a, b) {
  if (!a || !b) return false;
  return graph.adj.get(a)?.has(b) || false;
}

/**
 * Get neighbors of a territory.
 * @param {{adj: Map<string, Set<string>>}} graph
 * @param {string} id
 * @returns {string[]}
 */
export function neighborsOf(graph, id) {
  return Array.from(graph.adj.get(id) ?? []);
}
