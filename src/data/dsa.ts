import type { TrackContent } from "@/data/track";

export const dsaTrack: TrackContent = {
  id: "dsa",
  prerequisites: [
    {
      id: "language",
      title: "One language you can write",
      detail: "Loops, arrays, functions, and a print or debugger you trust.",
    },
    {
      id: "math-basics",
      title: "School math",
      detail: "Sums, averages, and reading a short formula.",
    },
  ],
  sections: [
    {
      id: "foundations",
      title: "Foundations",
      summary: "How you measure work, and how you think before you type.",
      topics: [
        {
          id: "complexity",
          title: "Time and space complexity",
          detail: "Big-O as a habit: count the dominant work, then name it.",
          subtopics: [
            { id: "big-o", title: "Big-O, Big-Theta, Big-Omega" },
            { id: "common-bounds", title: "O(1), O(log n), O(n), O(n log n), O(n²)" },
            { id: "space", title: "Auxiliary space vs input space" },
            { id: "amortized", title: "Amortized analysis (append, hash resize)" },
          ],
        },
        {
          id: "recursion",
          title: "Recursion",
          detail: "Base case, recursive case, and the call stack you can draw.",
          subtopics: [
            { id: "call-stack", title: "Call stack and base cases" },
            { id: "recursion-tree", title: "Recursion trees" },
            { id: "tail", title: "Tail recursion and iteration" },
            { id: "memo-intro", title: "Memoization as caching recursive answers" },
          ],
        },
        {
          id: "problem-patterns",
          title: "How to approach a problem",
          detail: "Examples, edge cases, then a plan you can defend.",
          subtopics: [
            { id: "brute", title: "Brute force first" },
            { id: "constraints", title: "Reading constraints to pick a bound" },
            { id: "invariants", title: "Invariants and what must stay true" },
            { id: "dry-run", title: "Dry-running on two examples" },
          ],
        },
      ],
    },
    {
      id: "arrays-strings",
      title: "Arrays and strings",
      summary: "Indexing, windows, and the scans interviewers expect.",
      topics: [
        {
          id: "array-basics",
          title: "Array basics",
          detail: "Index math, in-place updates, and prefix thinking.",
          subtopics: [
            { id: "indexing", title: "Indexing and bounds" },
            { id: "prefix-sum", title: "Prefix sums" },
            { id: "diff-array", title: "Difference arrays" },
            { id: "kadane", title: "Kadane / maximum subarray" },
          ],
        },
        {
          id: "two-pointers",
          title: "Two pointers",
          detail: "Ends that move when the answer cannot sit between them.",
          subtopics: [
            { id: "pair-sum", title: "Pair sum on a sorted array" },
            { id: "remove-inplace", title: "Remove duplicates in place" },
            { id: "partition", title: "Partition around a pivot" },
            { id: "container", title: "Container with most water" },
          ],
        },
        {
          id: "sliding-window",
          title: "Sliding window",
          detail: "A window that grows and shrinks with a running answer.",
          subtopics: [
            { id: "fixed-window", title: "Fixed-size window" },
            { id: "variable-window", title: "Variable-size window" },
            { id: "at-most-k", title: "At most K distinct / frequency maps" },
            { id: "longest-substring", title: "Longest substring without repeat" },
          ],
        },
        {
          id: "strings",
          title: "Strings",
          detail: "Characters as arrays, with pattern and parsing problems.",
          subtopics: [
            { id: "string-scan", title: "Scanning and building strings" },
            { id: "anagrams", title: "Anagrams and character counts" },
            { id: "palindrome", title: "Palindrome checks" },
            { id: "pattern-match", title: "Pattern matching basics (KMP idea)" },
          ],
        },
      ],
    },
    {
      id: "hashing",
      title: "Hash maps and sets",
      summary: "Lookups in average O(1), and the counts a scan alone will miss.",
      topics: [
        {
          id: "hash-map",
          title: "Hash maps",
          detail: "Key to value, collision intuition, and when not to hash.",
          subtopics: [
            { id: "map-ops", title: "Insert, lookup, delete" },
            { id: "frequency", title: "Frequency maps" },
            { id: "index-map", title: "Value → index maps" },
            { id: "group-by", title: "Group by key (anagrams, categories)" },
          ],
        },
        {
          id: "hash-set",
          title: "Hash sets",
          detail: "Membership and uniqueness without order.",
          subtopics: [
            { id: "dedupe", title: "Deduplicating" },
            { id: "seen", title: "Seen-before checks" },
            { id: "intersection", title: "Intersection and difference" },
          ],
        },
        {
          id: "hash-patterns",
          title: "Hash patterns in interviews",
          detail: "Two-sum family, prefix tricks, and order-preserving scans.",
          subtopics: [
            { id: "two-sum", title: "Two sum / complement" },
            { id: "subarray-sum", title: "Subarray sum equals K" },
            { id: "first-unique", title: "First unique character" },
            { id: "lru-idea", title: "Ordered map idea (LRU intuition)" },
          ],
        },
      ],
    },
    {
      id: "linked-lists",
      title: "Linked lists",
      summary: "Pointers, reversal, and the dummy node that saves a case.",
      topics: [
        {
          id: "list-basics",
          title: "List basics",
          detail: "Nodes, head/tail, and walking without losing the chain.",
          subtopics: [
            { id: "singly", title: "Singly linked list" },
            { id: "doubly", title: "Doubly linked list" },
            { id: "dummy", title: "Dummy / sentinel nodes" },
            { id: "fast-slow", title: "Fast and slow pointers" },
          ],
        },
        {
          id: "list-ops",
          title: "Core operations",
          detail: "Reverse, merge, cycle, and middle — the interview set.",
          subtopics: [
            { id: "reverse", title: "Reverse a list" },
            { id: "cycle", title: "Detect and find a cycle" },
            { id: "middle", title: "Middle of the list" },
            { id: "merge-sorted", title: "Merge two sorted lists" },
            { id: "remove-nth", title: "Remove Nth from end" },
          ],
        },
      ],
    },
    {
      id: "stacks-queues",
      title: "Stacks and queues",
      summary: "Order, undo, and the next thing you process.",
      topics: [
        {
          id: "stack",
          title: "Stacks",
          detail: "LIFO for matching, parsing, and monotonic work.",
          subtopics: [
            { id: "stack-ops", title: "Push, pop, peek" },
            { id: "parentheses", title: "Valid parentheses / matching" },
            { id: "min-stack", title: "Min / max stack" },
            { id: "monotonic-stack", title: "Monotonic stack (next greater)" },
            { id: "eval", title: "Expression evaluation" },
          ],
        },
        {
          id: "queue",
          title: "Queues and deques",
          detail: "FIFO for BFS and sliding extremes.",
          subtopics: [
            { id: "queue-ops", title: "Enqueue and dequeue" },
            { id: "circular-queue", title: "Circular queue" },
            { id: "deque", title: "Deque / double-ended queue" },
            { id: "sliding-max", title: "Sliding window maximum" },
          ],
        },
      ],
    },
    {
      id: "trees",
      title: "Trees and heaps",
      summary: "Traversals, BST rules, and priority as a structure.",
      topics: [
        {
          id: "binary-trees",
          title: "Binary trees",
          detail: "Structure first, then the walks that visit every node.",
          subtopics: [
            { id: "tree-repr", title: "Node representation" },
            { id: "traversals", title: "Inorder, preorder, postorder" },
            { id: "level-order", title: "Level order / BFS on trees" },
            { id: "height-depth", title: "Height, depth, diameter" },
            { id: "path-sum", title: "Path sum problems" },
          ],
        },
        {
          id: "bst",
          title: "Binary search trees",
          detail: "Order invariant, search, and validate.",
          subtopics: [
            { id: "bst-search", title: "Search, insert, delete" },
            { id: "bst-validate", title: "Validate a BST" },
            { id: "lca-bst", title: "LCA in a BST" },
            { id: "kth", title: "Kth smallest / largest" },
          ],
        },
        {
          id: "heaps",
          title: "Heaps and priority queues",
          detail: "Get min or max fast; the rest can wait.",
          subtopics: [
            { id: "heap-ops", title: "Heapify, push, pop" },
            { id: "top-k", title: "Top-K elements" },
            { id: "merge-k", title: "Merge K sorted lists" },
            { id: "median", title: "Running median (two heaps)" },
          ],
        },
        {
          id: "advanced-trees",
          title: "More tree patterns",
          detail: "LCA, views, and serialization when the interview goes further.",
          subtopics: [
            { id: "lca", title: "Lowest common ancestor" },
            { id: "views", title: "Left / right / top view" },
            { id: "serialize", title: "Serialize and deserialize" },
            { id: "trie-intro", title: "Trie / prefix tree" },
          ],
        },
      ],
    },
    {
      id: "graphs",
      title: "Graphs",
      summary: "Representation, search, and the paths you can defend.",
      topics: [
        {
          id: "graph-basics",
          title: "Graph basics",
          detail: "Nodes, edges, and the matrix or list you store them in.",
          subtopics: [
            { id: "repr", title: "Adjacency list and matrix" },
            { id: "directed", title: "Directed vs undirected" },
            { id: "weighted", title: "Weighted edges" },
            { id: "degree", title: "Degree, components, bipartite check" },
          ],
        },
        {
          id: "graph-search",
          title: "BFS and DFS",
          detail: "Visit marks are the whole problem on many graphs.",
          subtopics: [
            { id: "bfs", title: "Breadth-first search" },
            { id: "dfs", title: "Depth-first search" },
            { id: "islands", title: "Number of islands / grid DFS" },
            { id: "cycle-detect", title: "Cycle detection" },
            { id: "topo", title: "Topological sort" },
          ],
        },
        {
          id: "shortest-path",
          title: "Shortest paths",
          detail: "When distance matters, and which algorithm fits the weights.",
          subtopics: [
            { id: "bfs-unweighted", title: "BFS on unweighted graphs" },
            { id: "dijkstra", title: "Dijkstra" },
            { id: "bellman", title: "Bellman-Ford idea" },
            { id: "floyd", title: "Floyd-Warshall idea" },
          ],
        },
        {
          id: "union-find",
          title: "Union-Find",
          detail: "Components that merge; connectivity without a full search.",
          subtopics: [
            { id: "dsu-ops", title: "Find and union" },
            { id: "path-compression", title: "Path compression / union by rank" },
            { id: "dsu-problems", title: "Connected components / redundant edge" },
          ],
        },
      ],
    },
    {
      id: "sorting-search",
      title: "Sorting and searching",
      summary: "Ordered data unlocks binary search and clean merges.",
      topics: [
        {
          id: "sorting",
          title: "Sorting",
          detail: "Know a few deeply; know the rest by bound and stability.",
          subtopics: [
            { id: "compare-sorts", title: "Bubble, insertion, selection" },
            { id: "merge-sort", title: "Merge sort" },
            { id: "quick-sort", title: "Quick sort and partition" },
            { id: "heap-sort", title: "Heap sort" },
            { id: "counting", title: "Counting / bucket sort when keys allow" },
          ],
        },
        {
          id: "binary-search",
          title: "Binary search",
          detail: "Halve a sorted space — including answer spaces, not only arrays.",
          subtopics: [
            { id: "classic-bs", title: "Classic binary search" },
            { id: "bounds", title: "Lower / upper bound" },
            { id: "rotated", title: "Rotated sorted array" },
            { id: "answer-space", title: "Binary search on the answer" },
          ],
        },
      ],
    },
    {
      id: "dp",
      title: "Dynamic programming",
      summary: "Overlapping subproblems, then the interview patterns.",
      topics: [
        {
          id: "dp-intro",
          title: "DP foundations",
          detail: "State, transition, and the order you fill the table.",
          subtopics: [
            { id: "overlapping", title: "Overlapping subproblems" },
            { id: "optimal", title: "Optimal substructure" },
            { id: "top-down", title: "Top-down with memo" },
            { id: "bottom-up", title: "Bottom-up tabulation" },
          ],
        },
        {
          id: "dp-1d",
          title: "1D DP",
          detail: "A state that depends on a few earlier answers.",
          subtopics: [
            { id: "fib-climb", title: "Fibonacci / climb stairs" },
            { id: "house-robber", title: "House robber" },
            { id: "coin-change", title: "Coin change" },
            { id: "lis", title: "Longest increasing subsequence" },
          ],
        },
        {
          id: "dp-2d",
          title: "2D DP",
          detail: "Grids, strings, and two indices that move together.",
          subtopics: [
            { id: "grid-paths", title: "Unique / min paths in a grid" },
            { id: "knapsack", title: "0/1 knapsack" },
            { id: "lcs", title: "Longest common subsequence" },
            { id: "edit-distance", title: "Edit distance" },
            { id: "palindrome-dp", title: "Palindromic substrings / partitions" },
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "Greedy, backtracking, bits",
      summary: "When local choice works, when you must search, and bit tricks.",
      topics: [
        {
          id: "greedy",
          title: "Greedy",
          detail: "Prove the choice, or treat it as a guess until you can.",
          subtopics: [
            { id: "interval", title: "Interval scheduling / merge intervals" },
            { id: "activity", title: "Activity selection" },
            { id: "huffman-idea", title: "Huffman / encoding intuition" },
            { id: "jump-game", title: "Jump game family" },
          ],
        },
        {
          id: "backtracking",
          title: "Backtracking",
          detail: "Build a candidate, prune early, undo.",
          subtopics: [
            { id: "subsets", title: "Subsets and permutations" },
            { id: "combination-sum", title: "Combination sum" },
            { id: "n-queens", title: "N-Queens" },
            { id: "sudoku", title: "Sudoku solver idea" },
          ],
        },
        {
          id: "bits",
          title: "Bit manipulation",
          detail: "Masks, parity, and the XOR tricks that show up in rounds.",
          subtopics: [
            { id: "ops", title: "AND, OR, XOR, shifts" },
            { id: "set-bits", title: "Count / toggle bits" },
            { id: "xor-tricks", title: "Single number / missing number" },
            { id: "bitmask-dp", title: "Bitmask DP intro" },
          ],
        },
      ],
    },
    {
      id: "practice",
      title: "Interview practice",
      summary: "Timed problems, patterns under pressure, and talking through code.",
      topics: [
        {
          id: "patterns",
          title: "Pattern catalog",
          detail: "Name the pattern before you name the language feature.",
          subtopics: [
            { id: "pattern-map", title: "Map problem → pattern" },
            { id: "mixed", title: "Mixed-topic sets" },
            { id: "edge-cases", title: "Edge-case checklist" },
          ],
        },
        {
          id: "timed",
          title: "Timed rounds",
          detail: "One problem, a clock, and a clean explanation at the end.",
          subtopics: [
            { id: "easy-set", title: "Easy set under 20 minutes" },
            { id: "medium-set", title: "Medium set under 40 minutes" },
            { id: "explain", title: "Explain complexity out loud" },
            { id: "follow-ups", title: "Handle follow-up constraints" },
          ],
        },
        {
          id: "mock",
          title: "Mock interviews",
          detail: "Talk while you code. Defend the tradeoff.",
          subtopics: [
            { id: "clarify", title: "Clarify constraints first" },
            { id: "whiteboard", title: "Whiteboard / shared editor habit" },
            { id: "complexity-out", title: "State time and space before coding" },
            { id: "test-cases", title: "Walk through tests aloud" },
          ],
        },
      ],
    },
    {
      id: "strings-advanced",
      title: "Advanced strings",
      summary: "Matching, hashing, and structure on text.",
      topics: [
        {
          id: "string-hash",
          title: "String hashing",
          detail: "Rolling hashes when comparison cost matters.",
          subtopics: [
            { id: "rabin", title: "Rabin-Karp idea" },
            { id: "prefix-hash", title: "Prefix hashes" },
            { id: "collision", title: "Collision awareness" },
          ],
        },
        {
          id: "kmp-z",
          title: "KMP and Z-algorithm",
          detail: "Linear pattern matching you can sketch.",
          subtopics: [
            { id: "lps", title: "LPS / failure function" },
            { id: "kmp-search", title: "KMP search" },
            { id: "z-array", title: "Z-array construction" },
          ],
        },
        {
          id: "tries-deep",
          title: "Tries in practice",
          detail: "Prefix search, autocomplete, and word problems.",
          subtopics: [
            { id: "insert-search", title: "Insert and search" },
            { id: "prefix-count", title: "Prefix counts" },
            { id: "word-break-trie", title: "Word break with a trie" },
            { id: "xor-trie", title: "Binary trie / max XOR idea" },
          ],
        },
      ],
    },
    {
      id: "more-graphs-dp",
      title: "Harder graphs and DP",
      summary: "The patterns that show up after the basics stick.",
      topics: [
        {
          id: "mst",
          title: "Minimum spanning trees",
          detail: "Connect the graph with minimum cost.",
          subtopics: [
            { id: "kruskal", title: "Kruskal + Union-Find" },
            { id: "prim", title: "Prim idea" },
            { id: "mst-use", title: "When MST is the model" },
          ],
        },
        {
          id: "dp-hard",
          title: "Advanced DP patterns",
          detail: "Intervals, trees, and digit DP intuition.",
          subtopics: [
            { id: "interval-dp", title: "Interval DP" },
            { id: "tree-dp", title: "DP on trees" },
            { id: "digit-dp", title: "Digit DP idea" },
            { id: "state-compress", title: "State compression review" },
          ],
        },
        {
          id: "math-dsa",
          title: "Number theory for contests",
          detail: "Modular arithmetic and the few formulas that recur.",
          subtopics: [
            { id: "gcd", title: "GCD / LCM" },
            { id: "mod-inv", title: "Modular inverse" },
            { id: "sieve", title: "Sieve of Eratosthenes" },
            { id: "combinatorics", title: "nCr under a modulus" },
          ],
        },
      ],
    },
  ],
};
