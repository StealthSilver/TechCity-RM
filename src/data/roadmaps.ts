export type Stage = {
  title: string;
  detail: string;
  problem: string;
  hint: string;
};

export type Roadmap = {
  id: string;
  short: string;
  title: string;
  line: string;
  outcome: string;
  stages: [Stage, Stage, Stage, Stage, Stage, Stage];
};

export const roadmaps: Roadmap[] = [
  {
    id: "dsa",
    short: "DSA",
    title: "Data structures and algorithms",
    line: "The order interviewers expect: from arrays to the problems that combine them.",
    outcome: "You can pick an approach, say why it fits, and write it under a timer.",
    stages: [
      {
        title: "Arrays and strings",
        detail: "Indexing, two pointers, and a window that moves.",
        problem: "Pair with a given sum",
        hint: "Sort, then move the ends. Write the reason before the loop.",
      },
      {
        title: "Hash maps and sets",
        detail: "Counting, lookups, and the duplicates a scan will miss.",
        problem: "First non-repeating character",
        hint: "One pass to count. A second pass to keep the original order.",
      },
      {
        title: "Lists, stacks, and queues",
        detail: "Order, undo, and the thing you process next.",
        problem: "Valid parentheses",
        hint: "Push an opener. A closer has to match the top, or the string is done.",
      },
      {
        title: "Trees",
        detail: "Traversals, and the path two nodes share.",
        problem: "Lowest common ancestor",
        hint: "If the two nodes split, you are standing on the answer.",
      },
      {
        title: "Graphs",
        detail: "BFS, DFS, and a shortest path you can defend.",
        problem: "Number of islands",
        hint: "A visit mark is the whole problem. Count when you start a new search.",
      },
      {
        title: "Dynamic programming",
        detail: "Overlapping subproblems, then the interview set.",
        problem: "Coin change",
        hint: "The last coin is a choice. Store the best for every smaller amount.",
      },
    ],
  },
  {
    id: "aiml",
    short: "AI-ML",
    title: "Artificial intelligence and machine learning",
    line: "Models, how to judge them, and a project you can walk through.",
    outcome: "You can train a model, show where it fails, and explain the metric you trust.",
    stages: [
      {
        title: "Python for data",
        detail: "Arrays, frames, and a plot that matches the question.",
        problem: "Summarize a class column",
        hint: "Count, missing values, then one chart. The chart has to match the count.",
      },
      {
        title: "Linear models",
        detail: "A line, a loss, and what a coefficient is saying.",
        problem: "Predict rent from three features",
        hint: "Scale the features first. Then say which coefficient moved the rent.",
      },
      {
        title: "Classification",
        detail: "A boundary, a threshold, and the class you keep missing.",
        problem: "Spam or not",
        hint: "Look at false negatives before you celebrate accuracy.",
      },
      {
        title: "Neural networks",
        detail: "Layers, a forward pass, and a shape error you can read.",
        problem: "Classify handwritten digits",
        hint: "Print the tensor shapes before you train. Most bugs are a shape.",
      },
      {
        title: "Evaluation",
        detail: "The split, the metric, and the slice where the model drops.",
        problem: "Where does the model fail?",
        hint: "Hold out a slice the training set barely saw. Report that number.",
      },
      {
        title: "A model you can explain",
        detail: "One project, from the data to the decision it supports.",
        problem: "Walk through your project",
        hint: "What it predicts, what you measured, and what you would not ship.",
      },
    ],
  },
  {
    id: "cloud",
    short: "Cloud",
    title: "Cloud",
    line: "How a service is deployed, watched, and recovered.",
    outcome: "You can put a small service online and say what happens when it fails.",
    stages: [
      {
        title: "Linux and the shell",
        detail: "Processes, files, and the log you actually read.",
        problem: "Find what is using the port",
        hint: "The process list first. Then the log line with the timestamp.",
      },
      {
        title: "Networking",
        detail: "A request, a port, and where the packet stopped.",
        problem: "Why the health check fails",
        hint: "DNS, then the port, then the path. Change one thing at a time.",
      },
      {
        title: "Compute and storage",
        detail: "A machine, an object store, and what you meant to persist.",
        problem: "Keep the upload after a restart",
        hint: "The disk on the machine is not the store. Write to the bucket.",
      },
      {
        title: "Identity and access",
        detail: "Who can do what, and the key that should not be in the repo.",
        problem: "A role for the deploy",
        hint: "Name the action. Grant that action. Nothing else.",
      },
      {
        title: "Containers",
        detail: "An image, a port, and the env the process expects.",
        problem: "Run the same image locally",
        hint: "If it only works on your laptop, the image is missing a variable.",
      },
      {
        title: "A service you deployed",
        detail: "A pipeline, a release, and the page you open when it breaks.",
        problem: "Ship, then roll back",
        hint: "The rollback is part of the task. Time it.",
      },
    ],
  },
  {
    id: "data",
    short: "Data",
    title: "Data",
    line: "From a raw table to a result someone can question.",
    outcome: "You can query, clean, and explain a number without hiding the messy rows.",
    stages: [
      {
        title: "SQL that answers a question",
        detail: "Joins, filters, and the grain of the table.",
        problem: "Revenue by city, last quarter",
        hint: "Decide the grain before the join. One row per order, or the total doubles.",
      },
      {
        title: "Cleaning a messy table",
        detail: "Nulls, duplicates, and the row you refuse to invent.",
        problem: "Orders with a missing city",
        hint: "Count them. Show them. Do not fill the city with a guess.",
      },
      {
        title: "Charts someone can read",
        detail: "The comparison, the axis, and the title that states the claim.",
        problem: "Which campus grew",
        hint: "A bar for the comparison. The title is the sentence, not the column name.",
      },
      {
        title: "Statistics for the claim",
        detail: "A rate, a sample, and what the number cannot say.",
        problem: "Is the drop real?",
        hint: "Write the sample size next to the rate. A small campus can swing it.",
      },
      {
        title: "A small pipeline",
        detail: "Extract, a check, and a table the next person can rerun.",
        problem: "Rebuild yesterday’s table",
        hint: "The job should fail when the row count collapses. Add that check.",
      },
      {
        title: "A result you can defend",
        detail: "The question, the query, and the caveat in the same note.",
        problem: "Write the one-page note",
        hint: "Lead with the number. Then the query. Then what you left out.",
      },
    ],
  },
  {
    id: "software",
    short: "Software",
    title: "Software engineering",
    line: "How a team reads, reviews, and ships a change.",
    outcome: "You can open a codebase, change one thing, and explain the review.",
    stages: [
      {
        title: "Reading someone else’s code",
        detail: "The entry point, the data, and the function that does the work.",
        problem: "Where does this request go?",
        hint: "Start at the route. Follow one field until it is saved.",
      },
      {
        title: "APIs and data shapes",
        detail: "A contract, a status code, and the field the client needs.",
        problem: "Add a field without breaking the old client",
        hint: "Add it. Do not rename the one they already read.",
      },
      {
        title: "Tests that fail for a reason",
        detail: "One behavior, one assertion, and a name that says what broke.",
        problem: "A test for the empty cart",
        hint: "The test name is the spec. Make the empty case fail first.",
      },
      {
        title: "Git and review",
        detail: "A small diff, a message, and the comment you answer.",
        problem: "Review a teammate’s change",
        hint: "Comment on the behavior. Leave the style until the behavior is right.",
      },
      {
        title: "Shipping one feature",
        detail: "A branch, a check, and the note that says how to try it.",
        problem: "Save a draft",
        hint: "The happy path and the failed save. Both belong in the pull request.",
      },
      {
        title: "A codebase you can walk through",
        detail: "What you changed, what you left, and how to run it.",
        problem: "Explain the feature in ten minutes",
        hint: "Open the diff. Say the user-visible change before the files.",
      },
    ],
  },
  {
    id: "security",
    short: "Security",
    title: "Cybersecurity",
    line: "How systems fail, and how you explain the fix.",
    outcome: "You can spot a weak point, try it safely, and write down the fix.",
    stages: [
      {
        title: "How a system fails",
        detail: "An assumption, a trust boundary, and what happens if it is wrong.",
        problem: "Who is allowed to see this?",
        hint: "Draw the user, the server, and the data. Mark the line you trust.",
      },
      {
        title: "The web request",
        detail: "Input, a query, and the bug that trusts the client.",
        problem: "A login that trusts the hidden field",
        hint: "Change the field in the request. The server has to check it again.",
      },
      {
        title: "Networks and ports",
        detail: "What is exposed, and what should only answer locally.",
        problem: "A database on the open internet",
        hint: "The database answers the app. It does not answer the world.",
      },
      {
        title: "Identity",
        detail: "A password, a session, and the account that can do too much.",
        problem: "An admin route with no check",
        hint: "The route checks the role. Hiding the button is not the check.",
      },
      {
        title: "After an incident",
        detail: "What you saw, what you changed, and what you still do not know.",
        problem: "Write the incident note",
        hint: "Time, symptom, change, and the question still open. Four lines.",
      },
      {
        title: "A fix you can explain",
        detail: "The bug, the patch, and the test that would have caught it.",
        problem: "Close the hole and prove it",
        hint: "The test sends the bad request. It should fail before the patch.",
      },
    ],
  },
];

export const featuredRoadmaps = roadmaps.filter((roadmap) =>
  ["dsa", "aiml", "cloud", "data"].includes(roadmap.id),
);

export const progressStage = 2;
