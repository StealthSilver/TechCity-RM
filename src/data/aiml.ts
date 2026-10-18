export type AimlItem = {
  id: string;
  title: string;
  detail: string;
};

export type AimlTopic = AimlItem & {
  problem: string;
  hint: string;
};

export type AimlPhase = {
  id: string;
  title: string;
  summary: string;
  topics: AimlTopic[];
};

export const aimlPrerequisites: AimlItem[] = [
  {
    id: "algebra",
    title: "Algebra you can use",
    detail: "You can rearrange an equation and say what a function returns.",
  },
  {
    id: "python-ready",
    title: "Python on your machine",
    detail: "A file runs, and a traceback points at a line you can open.",
  },
  {
    id: "tables",
    title: "Tables",
    detail: "Rows, columns, and a blank cell are familiar from a spreadsheet.",
  },
  {
    id: "prediction",
    title: "A prediction you can name",
    detail: "Rent, spam, a grade, a pass or a fail. You can say what the model should output.",
  },
];

export const aimlPhases: AimlPhase[] = [
  {
    id: "programming",
    title: "Programming and math",
    summary: "Python, and the math a model actually uses.",
    topics: [
      {
        id: "python-basics",
        title: "Python basics",
        detail: "Variables, loops, and functions. Enough Python to hold a column of numbers and print a result.",
        problem: "Summarize a list of scores",
        hint: "Sum, count, and the average. Print each one. They have to agree.",
      },
      {
        id: "python-objects",
        title: "Objects in Python",
        detail: "A class that keeps data, and a method that answers a question about it.",
        problem: "A class that counts its own rows",
        hint: "Store the rows. The count is a method. It reads what you stored.",
      },
      {
        id: "linear-algebra",
        title: "Vectors and matrices",
        detail: "A vector, a matrix, and the shape you check before you multiply.",
        problem: "Multiply a 2×3 matrix by a 3×1 vector",
        hint: "Write both shapes first. The inner numbers have to match.",
      },
      {
        id: "calculus",
        title: "Derivatives and the chain rule",
        detail: "A slope, a gradient, and how a change in one weight reaches the loss.",
        problem: "Say which way the loss falls",
        hint: "The derivative is the slope. Name the direction that makes the loss smaller.",
      },
      {
        id: "probability",
        title: "Probability and statistics",
        detail: "A mean, a distribution, and Bayes as a sentence about evidence.",
        problem: "Which outcome is more likely",
        hint: "Write the starting chance and the new evidence. Then one sentence. The formula comes after the sentence.",
      },
    ],
  },
  {
    id: "data",
    title: "Data",
    summary: "Frames, cleaning, and a chart that matches the question.",
    topics: [
      {
        id: "numpy",
        title: "NumPy",
        detail: "Arrays, shapes, and a vectorized operation in place of a Python loop.",
        problem: "Mean of each column",
        hint: "Check the axis. Axis 0 runs down the rows. Print the shape of the result.",
      },
      {
        id: "pandas",
        title: "Pandas",
        detail: "A frame, a column, and a filter that keeps the rows you mean.",
        problem: "Keep the rows from one campus",
        hint: "Filter, then count. The count has to match a spreadsheet filter on the same file.",
      },
      {
        id: "cleaning",
        title: "Cleaning",
        detail: "Missing values, wrong types, and the row you leave as it is.",
        problem: "Orders with a missing city",
        hint: "Count them. Show them. Leave the city blank.",
      },
      {
        id: "charts",
        title: "Charts",
        detail: "A comparison, an axis, and a title that states the claim.",
        problem: "Which campus grew",
        hint: "A bar for the comparison. The title is the sentence, not the column name.",
      },
      {
        id: "eda",
        title: "Exploratory analysis",
        detail: "The question, the counts, and the chart that matches those counts.",
        problem: "Summarize a class column",
        hint: "Count, missing values, then one chart. The chart has to match the count.",
      },
    ],
  },
  {
    id: "models",
    title: "Machine learning",
    summary: "A model, a metric, and the split you can defend.",
    topics: [
      {
        id: "supervised",
        title: "Linear models",
        detail: "A line, a loss, and what a coefficient is saying about the prediction.",
        problem: "Predict rent from three features",
        hint: "Scale the features first. Then say which coefficient moved the rent.",
      },
      {
        id: "classification",
        title: "Classification",
        detail: "A boundary, a threshold, and the class the model keeps missing.",
        problem: "Spam or not",
        hint: "Look at false negatives before you celebrate accuracy.",
      },
      {
        id: "unsupervised",
        title: "Clustering and PCA",
        detail: "Groups without labels, and a smaller set of axes that still hold the shape.",
        problem: "Find three groups in the table",
        hint: "Name each group from the columns that separate it. A named group is the result.",
      },
      {
        id: "ensembles",
        title: "Forests and boosting",
        detail: "Many small models, and a comparison against one tree on the same rows.",
        problem: "Beat a single tree on the same split",
        hint: "Same training rows. Same test rows. Report both scores side by side.",
      },
      {
        id: "evaluation",
        title: "Metrics and the split",
        detail: "The holdout, the metric, and the slice where the model drops.",
        problem: "Where does the model fail?",
        hint: "Hold out a slice the training set barely saw. Report that number.",
      },
    ],
  },
  {
    id: "deep",
    title: "Deep learning",
    summary: "Layers, a framework, and a loss that moves.",
    topics: [
      {
        id: "nn-basics",
        title: "Neural networks",
        detail: "A perceptron, a layer, and an error passed back through the weights.",
        problem: "One neuron, two inputs",
        hint: "Write the weighted sum, then the output. Change one weight and say how the output moves.",
      },
      {
        id: "framework",
        title: "PyTorch or TensorFlow",
        detail: "A tensor, a shape, and the training step the framework runs for you.",
        problem: "A tensor you can add to",
        hint: "Print the shape after every operation. Most bugs are a shape.",
      },
      {
        id: "mlp",
        title: "A multilayer network",
        detail: "Hidden layers, a forward pass, and a loss that falls across epochs.",
        problem: "Classify handwritten digits",
        hint: "Print the tensor shapes before you train. Then train. Then report the holdout accuracy.",
      },
      {
        id: "optimizers",
        title: "Optimizers",
        detail: "SGD and Adam, and the one change you make when the loss stalls.",
        problem: "A loss that stops falling",
        hint: "Lower the learning rate once. Say whether the loss moved. Change one thing at a time.",
      },
      {
        id: "regularization",
        title: "Overfitting",
        detail: "Dropout, weight decay, and a training score that has left the holdout behind.",
        problem: "Training accuracy up, holdout flat",
        hint: "Add one regularizer. Report the training number and the holdout number again.",
      },
    ],
  },
  {
    id: "domains",
    title: "Vision, language, and generation",
    summary: "Images, text, and a model that produces something you can check.",
    topics: [
      {
        id: "vision",
        title: "Computer vision",
        detail: "A convolution, a feature map, and a network that looks at an image.",
        problem: "Tell two kinds of image apart",
        hint: "Show one image the model gets right and one it misses. Say what is in the miss.",
      },
      {
        id: "nlp",
        title: "Sequences and attention",
        detail: "A sequence, a recurrent net, and attention as a way to look at the words that matter.",
        problem: "Predict the next word in a short sentence",
        hint: "Show the words the model was allowed to see. The word it predicts stays hidden.",
      },
      {
        id: "llm",
        title: "Large language models",
        detail: "A pretrained model, a prompt, and a small fine-tune when the prompt is not enough.",
        problem: "A prompt that returns a structured answer",
        hint: "Ask for one format. Show a failure. Change the prompt once and show the new answer.",
      },
      {
        id: "generative",
        title: "Generative models",
        detail: "A model that produces, and the check you use before you keep an output.",
        problem: "Generate three answers and keep one",
        hint: "Write the rule you used to reject the other two.",
      },
    ],
  },
  {
    id: "ship",
    title: "Deployment",
    summary: "An endpoint, a container, and a run you can find again.",
    topics: [
      {
        id: "api",
        title: "An API for the model",
        detail: "FastAPI or Flask, one route, and a prediction a client can call.",
        problem: "POST a row, get a prediction",
        hint: "The route accepts the same fields you trained on. Name them. Reject a missing field.",
      },
      {
        id: "docker",
        title: "Docker",
        detail: "An image, a port, and the environment the model expects.",
        problem: "Run the same image twice",
        hint: "Name the file or variable the image still needs when the second run fails.",
      },
      {
        id: "hosting",
        title: "Hosting",
        detail: "A small cloud endpoint or a Hugging Face Space someone else can open.",
        problem: "A URL that returns a prediction",
        hint: "Open it in a private window. The page has to answer without your laptop.",
      },
      {
        id: "tracking",
        title: "Experiment tracking",
        detail: "MLflow or Weights & Biases, so a run has a name, a metric, and a model you can find.",
        problem: "Find last week’s best run",
        hint: "Log the metric and the data version with the run.",
      },
    ],
  },
  {
    id: "portfolio",
    title: "Projects and interviews",
    summary: "Work you can walk through, and the questions that follow.",
    topics: [
      {
        id: "projects",
        title: "Three projects",
        detail: "End to end, from the question to the decision the model supports.",
        problem: "Walk through your best project",
        hint: "What it predicts, what you measured, and what you would leave unpublished.",
      },
      {
        id: "competition",
        title: "A public score",
        detail: "One competition or a public notebook with a score you did not assign yourself.",
        problem: "Submit once and read the leaderboard",
        hint: "Write what you changed between the local score and the public score.",
      },
      {
        id: "system-design",
        title: "Machine learning system design",
        detail: "Data, model, metric, and the failure you name before you train.",
        problem: "Design a model that flags late assignments",
        hint: "Name the data, the metric, and the student the metric will treat unfairly.",
      },
      {
        id: "interviews",
        title: "Interview practice",
        detail: "Coding, the math, and an explanation of a model you trained.",
        problem: "Explain one project in ten minutes",
        hint: "Start with the decision a person sees. The architecture comes after.",
      },
    ],
  },
];

export const aimlTopicIds = aimlPhases.flatMap((phase) => phase.topics.map((topic) => topic.id));

export const aimlPrerequisiteIds = aimlPrerequisites.map((item) => item.id);
