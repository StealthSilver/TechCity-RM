import type { TrackContent } from "@/data/track";

export const aimlTrack: TrackContent = {
  id: "aiml",
  prerequisites: [
    {
      id: "python-ready",
      title: "Python on your machine",
      detail: "A file runs, and a traceback points at a line you can open.",
    },
    {
      id: "algebra",
      title: "School algebra",
      detail: "You can rearrange a short equation and say what a function returns.",
    },
  ],
  sections: [
    {
      id: "programming",
      title: "Programming and math",
      summary: "Python, and the math a model actually uses.",
      topics: [
        {
          id: "python-basics",
          title: "Python basics",
          detail: "Enough Python to hold a column of numbers and print a result.",
          subtopics: [
            { id: "py-vars", title: "Variables, types, and operators" },
            { id: "py-control", title: "Conditionals and loops" },
            { id: "py-functions", title: "Functions and modules" },
            { id: "py-lists", title: "Lists, dicts, and comprehensions" },
            { id: "py-files", title: "Reading files and printing results" },
          ],
        },
        {
          id: "python-objects",
          title: "Objects in Python",
          detail: "A class that keeps data, and a method that answers a question about it.",
          subtopics: [
            { id: "classes", title: "Classes and instances" },
            { id: "methods", title: "Methods and state" },
            { id: "dunder", title: "Common dunder methods" },
          ],
        },
        {
          id: "linear-algebra",
          title: "Vectors and matrices",
          detail: "A vector, a matrix, and the shape you check before you multiply.",
          subtopics: [
            { id: "vectors", title: "Vectors and scalar operations" },
            { id: "matrices", title: "Matrix multiply and transpose" },
            { id: "shapes", title: "Shapes and broadcasting intuition" },
            { id: "norms", title: "Dot product, norms, distance" },
          ],
        },
        {
          id: "calculus",
          title: "Derivatives and gradients",
          detail: "A slope, a gradient, and how a change in one weight reaches the loss.",
          subtopics: [
            { id: "derivative", title: "Derivative as slope" },
            { id: "partial", title: "Partial derivatives" },
            { id: "chain", title: "Chain rule" },
            { id: "grad-descent", title: "Gradient descent idea" },
          ],
        },
        {
          id: "probability",
          title: "Probability and statistics",
          detail: "A mean, a distribution, and Bayes as a sentence about evidence.",
          subtopics: [
            { id: "mean-var", title: "Mean, variance, standard deviation" },
            { id: "distributions", title: "Common distributions" },
            { id: "bayes", title: "Bayes rule in plain language" },
            { id: "sampling", title: "Sampling and estimation" },
          ],
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
          detail: "Arrays, shapes, and vectorized work instead of Python loops.",
          subtopics: [
            { id: "ndarray", title: "ndarray creation and indexing" },
            { id: "reshape", title: "Reshape and axis" },
            { id: "vectorize", title: "Vectorized operations" },
            { id: "agg", title: "Aggregations (mean, sum, argmax)" },
          ],
        },
        {
          id: "pandas",
          title: "Pandas",
          detail: "A frame, a column, and a filter that keeps the rows you mean.",
          subtopics: [
            { id: "series-frame", title: "Series and DataFrame" },
            { id: "select-filter", title: "Select, filter, sort" },
            { id: "groupby", title: "GroupBy and aggregations" },
            { id: "join-merge", title: "Join and merge" },
          ],
        },
        {
          id: "cleaning",
          title: "Cleaning",
          detail: "Missing values, wrong types, and the row you leave as it is.",
          subtopics: [
            { id: "missing", title: "Missing values" },
            { id: "dtypes", title: "Types and parsing" },
            { id: "duplicates", title: "Duplicates and outliers" },
            { id: "leakage", title: "Avoiding label leakage" },
          ],
        },
        {
          id: "eda",
          title: "Exploratory analysis",
          detail: "The question, the counts, and the chart that matches those counts.",
          subtopics: [
            { id: "describe", title: "Describe and value counts" },
            { id: "charts", title: "Histograms, bars, scatter" },
            { id: "correlation", title: "Correlation and relationships" },
            { id: "story", title: "One-page EDA note" },
          ],
        },
      ],
    },
    {
      id: "models",
      title: "Classical machine learning",
      summary: "A model, a metric, and the split you can defend.",
      topics: [
        {
          id: "supervised",
          title: "Linear models",
          detail: "A line, a loss, and what a coefficient is saying.",
          subtopics: [
            { id: "regression", title: "Linear regression" },
            { id: "loss-mse", title: "MSE / residual intuition" },
            { id: "regularization-l", title: "Ridge and Lasso" },
            { id: "feature-scale", title: "Feature scaling" },
          ],
        },
        {
          id: "classification",
          title: "Classification",
          detail: "A boundary, a threshold, and the class the model keeps missing.",
          subtopics: [
            { id: "logistic", title: "Logistic regression" },
            { id: "threshold", title: "Thresholds and decision tradeoffs" },
            { id: "confusion", title: "Confusion matrix" },
            { id: "precision-recall", title: "Precision, recall, F1, ROC" },
          ],
        },
        {
          id: "trees-ensembles",
          title: "Trees and ensembles",
          detail: "One tree, then many; compare on the same split.",
          subtopics: [
            { id: "decision-tree", title: "Decision trees" },
            { id: "random-forest", title: "Random forests" },
            { id: "boosting", title: "Gradient boosting idea" },
            { id: "feature-importance", title: "Feature importance caution" },
          ],
        },
        {
          id: "unsupervised",
          title: "Clustering and dimensionality",
          detail: "Groups without labels, and fewer axes that still hold the shape.",
          subtopics: [
            { id: "kmeans", title: "K-means" },
            { id: "hierarchical", title: "Hierarchical clustering idea" },
            { id: "pca", title: "PCA" },
            { id: "cluster-eval", title: "Naming and checking clusters" },
          ],
        },
        {
          id: "evaluation",
          title: "Evaluation and validation",
          detail: "The holdout, the metric, and the slice where the model drops.",
          subtopics: [
            { id: "split", title: "Train / validation / test" },
            { id: "cv", title: "Cross-validation" },
            { id: "overfit", title: "Overfitting vs underfitting" },
            { id: "slice", title: "Slice metrics and failure cases" },
          ],
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
          subtopics: [
            { id: "perceptron", title: "Perceptron and activations" },
            { id: "forward", title: "Forward pass" },
            { id: "backprop", title: "Backpropagation idea" },
            { id: "loss-nn", title: "Loss functions for nets" },
          ],
        },
        {
          id: "framework",
          title: "PyTorch or TensorFlow",
          detail: "A tensor, a shape, and the training step the framework runs.",
          subtopics: [
            { id: "tensors", title: "Tensors and devices" },
            { id: "autograd", title: "Autograd / gradients" },
            { id: "datasets", title: "Datasets and dataloaders" },
            { id: "train-loop", title: "A minimal training loop" },
          ],
        },
        {
          id: "mlp",
          title: "Multilayer networks",
          detail: "Hidden layers, a forward pass, and a loss that falls across epochs.",
          subtopics: [
            { id: "mlp-arch", title: "MLP architecture" },
            { id: "init", title: "Initialization basics" },
            { id: "batch-norm", title: "Batch norm / layer norm idea" },
            { id: "digits", title: "Classify a simple dataset end to end" },
          ],
        },
        {
          id: "training-craft",
          title: "Training craft",
          detail: "Optimizers, schedules, and what you change when loss stalls.",
          subtopics: [
            { id: "sgd-adam", title: "SGD and Adam" },
            { id: "lr", title: "Learning rate and schedules" },
            { id: "dropout", title: "Dropout and weight decay" },
            { id: "early-stop", title: "Early stopping" },
          ],
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
          subtopics: [
            { id: "cnn", title: "Convolutions and CNNs" },
            { id: "pooling", title: "Pooling and receptive fields" },
            { id: "transfer-vision", title: "Transfer learning for images" },
            { id: "aug", title: "Augmentation" },
          ],
        },
        {
          id: "nlp",
          title: "Language and sequences",
          detail: "Tokens, embeddings, and attention as a way to look at what matters.",
          subtopics: [
            { id: "tokenize", title: "Tokenization" },
            { id: "embeddings", title: "Word / token embeddings" },
            { id: "rnn", title: "RNN / sequence models idea" },
            { id: "attention", title: "Attention" },
          ],
        },
        {
          id: "llm",
          title: "Large language models",
          detail: "A pretrained model, a prompt, and a small fine-tune when needed.",
          subtopics: [
            { id: "prompt", title: "Prompting for structured answers" },
            { id: "rag-idea", title: "Retrieval-augmented idea" },
            { id: "fine-tune", title: "Fine-tuning overview" },
            { id: "eval-llm", title: "Checking LLM outputs" },
          ],
        },
        {
          id: "generative",
          title: "Generative models",
          detail: "A model that produces, and the check you use before you keep an output.",
          subtopics: [
            { id: "gen-basics", title: "What generation means" },
            { id: "sampling", title: "Sampling and temperature intuition" },
            { id: "reject", title: "Rejection criteria for outputs" },
          ],
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
          title: "Model APIs",
          detail: "One route, and a prediction a client can call.",
          subtopics: [
            { id: "fastapi", title: "FastAPI / Flask endpoint" },
            { id: "schema", title: "Request and response schema" },
            { id: "batch-infer", title: "Batch vs single inference" },
          ],
        },
        {
          id: "docker",
          title: "Packaging",
          detail: "An image, a port, and the environment the model expects.",
          subtopics: [
            { id: "dockerfile", title: "Dockerfile for inference" },
            { id: "env", title: "Env vars and secrets" },
            { id: "repro", title: "Reproducible runs" },
          ],
        },
        {
          id: "tracking",
          title: "Experiment tracking",
          detail: "A run with a name, a metric, and a model you can find.",
          subtopics: [
            { id: "log-metrics", title: "Log metrics and params" },
            { id: "artifacts", title: "Model artifacts" },
            { id: "compare-runs", title: "Compare runs" },
          ],
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
          title: "Portfolio projects",
          detail: "End to end, from the question to the decision the model supports.",
          subtopics: [
            { id: "tabular-project", title: "One tabular prediction project" },
            { id: "vision-or-nlp", title: "One vision or NLP project" },
            { id: "writeup", title: "Write-up: metric, failure, next step" },
          ],
        },
        {
          id: "system-design",
          title: "ML system design",
          detail: "Data, model, metric, and the failure you name before you train.",
          subtopics: [
            { id: "problem-framing", title: "Frame the prediction problem" },
            { id: "data-plan", title: "Data and labeling plan" },
            { id: "metric-choice", title: "Metric and tradeoffs" },
            { id: "monitor", title: "Monitoring after ship" },
          ],
        },
        {
          id: "interviews",
          title: "Interview practice",
          detail: "Coding, the math, and an explanation of a model you trained.",
          subtopics: [
            { id: "ml-coding", title: "ML coding drills" },
            { id: "concept-qs", title: "Concept questions" },
            { id: "project-story", title: "Ten-minute project story" },
          ],
        },
      ],
    },
    {
      id: "feature-eng",
      title: "Feature engineering",
      summary: "The columns you build often matter more than the model name.",
      topics: [
        {
          id: "encoding",
          title: "Encoding and transforms",
          detail: "Categorical, numeric, and leakage-safe pipelines.",
          subtopics: [
            { id: "one-hot", title: "One-hot and target encoding caution" },
            { id: "scaling-fe", title: "Scaling and robust transforms" },
            { id: "datetime", title: "Datetime and cyclical features" },
            { id: "pipeline", title: "sklearn-style pipelines" },
          ],
        },
        {
          id: "selection",
          title: "Selection and leakage",
          detail: "Choose features without peeking at the test set.",
          subtopics: [
            { id: "corr-filter", title: "Correlation and filters" },
            { id: "importance-sel", title: "Model-based selection caution" },
            { id: "leak-check", title: "Leakage checklist" },
          ],
        },
      ],
    },
    {
      id: "mlops",
      title: "MLOps basics",
      summary: "Version data, models, and the checks after deploy.",
      topics: [
        {
          id: "data-version",
          title: "Data and model versioning",
          detail: "A run you can find again next month.",
          subtopics: [
            { id: "dataset-snap", title: "Dataset snapshots" },
            { id: "model-registry", title: "Model registry idea" },
            { id: "repro-seed", title: "Seeds and environment pins" },
          ],
        },
        {
          id: "serving-monitor",
          title: "Serving and monitoring",
          detail: "Latency, drift, and when to retrain.",
          subtopics: [
            { id: "batch-vs-online", title: "Batch vs online inference" },
            { id: "drift", title: "Data / prediction drift" },
            { id: "alerts-ml", title: "Alert on metric drop" },
            { id: "retrain", title: "Retrain trigger" },
          ],
        },
      ],
    },
  ],
};

