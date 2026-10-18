import { roadmaps, type Roadmap, type Stage } from "@/data/roadmaps";

function stage(title: string, detail: string, problem: string, hint: string): Stage {
  return { title, detail, problem, hint };
}

function fromExisting(id: string, title: string): Roadmap {
  const source = roadmaps.find((roadmap) => roadmap.id === id);
  if (!source) {
    throw new Error(`Missing roadmap ${id}`);
  }
  return { ...source, title };
}

function track(
  id: string,
  short: string,
  title: string,
  line: string,
  outcome: string,
  stages: [Stage, Stage, Stage, Stage, Stage, Stage],
): Roadmap {
  return { id, short, title, line, outcome, stages };
}

export const catalog: Roadmap[] = [
  fromExisting("dsa", "Data Structures and Algorithms"),
  fromExisting("aiml", "Artificial Intelligence and Machine Learning"),
  fromExisting("cloud", "Cloud Computing"),
  track(
    "mern",
    "MERN",
    "FullStack Web Development MERN",
    "Mongo, Express, React, and Node, in the order a product is actually built.",
    "You can ship a small product with a React UI, an API, and a database you can explain.",
    [
      stage(
        "The page",
        "HTML, CSS, and a layout that holds.",
        "Build the shell of a dashboard",
        "Structure first. Color after the regions are obvious.",
      ),
      stage(
        "React",
        "Components, state, and the screen that updates.",
        "A list you can filter",
        "The filter is state. The list is what that state renders.",
      ),
      stage(
        "Node and Express",
        "A route, a status, and JSON the client can trust.",
        "Create and list notes",
        "One route writes. One route reads. Name them before you code them.",
      ),
      stage(
        "MongoDB",
        "A document, an id, and the query that finds it.",
        "Save a note and read it back",
        "The id comes from the database. Do not invent it on the client.",
      ),
      stage(
        "Auth",
        "A user, a session, and the route that checks.",
        "Only the owner sees their notes",
        "The check is on the server. Hiding the button is not the check.",
      ),
      stage(
        "The product",
        "One feature, deployed, that you can walk through.",
        "Ship the notes app",
        "The happy path and a failed save. Both belong in the demo.",
      ),
    ],
  ),
  track(
    "python",
    "Python",
    "FullStack Web Development Python",
    "A Python server, a database, and the pages a user actually touches.",
    "You can build a Python web app from the route to the row it writes.",
    [
      stage(
        "Python for the web",
        "A function, a request, and the response you return.",
        "A route that greets by name",
        "Read the query. Return HTML. Print the request when it surprises you.",
      ),
      stage(
        "Templates",
        "A page, a loop, and the value you pass in.",
        "Render a list of courses",
        "The template does not fetch. The view fetches, then renders.",
      ),
      stage(
        "Forms",
        "Input, validation, and the error the user can read.",
        "A signup form that rejects a blank name",
        "Show the error next to the field. Do not only print it in the console.",
      ),
      stage(
        "The database",
        "A model, a migration, and the row you can query.",
        "Save a course and list it",
        "Write the model first. The form should match the fields you stored.",
      ),
      stage(
        "Auth and permissions",
        "A login, a session, and the page a guest cannot open.",
        "An instructor page with a check",
        "The view checks the role. The template only hides the link.",
      ),
      stage(
        "A deployed app",
        "One feature online, with the command that runs it.",
        "Ship the course list",
        "If it only works on your laptop, name the missing variable.",
      ),
    ],
  ),
  track(
    "java",
    "Java",
    "FullStack Web Development Java",
    "Java on the server, a persisted model, and a client that speaks to it.",
    "You can build a Java service, persist the data, and show it in a UI.",
    [
      stage(
        "Java fundamentals",
        "A class, a collection, and a method you can test.",
        "A grade book in memory",
        "One class for the student. One class that holds the list. Test the average.",
      ),
      stage(
        "Spring and routes",
        "A controller, a path, and the JSON you return.",
        "List and create students",
        "The controller stays thin. The work lives in a service you can call without HTTP.",
      ),
      stage(
        "Persistence",
        "An entity, a repository, and the row that survives a restart.",
        "Save a student and read them back",
        "The id is generated. Do not set it from the request body.",
      ),
      stage(
        "Validation and errors",
        "A bad payload, a status code, and a message.",
        "Reject a student with no name",
        "400 with a reason. An empty 500 is not an answer.",
      ),
      stage(
        "The client",
        "A page that calls the API and shows the list.",
        "A form that creates a student",
        "Handle the error response. A silent failure is a broken form.",
      ),
      stage(
        "A service you can walk through",
        "The request, the table, and how to run it.",
        "Explain the feature in ten minutes",
        "Start at the route. Follow one field until it is saved.",
      ),
    ],
  ),
];

export function getCatalogRoadmap(slug: string) {
  return catalog.find((roadmap) => roadmap.id === slug);
}
