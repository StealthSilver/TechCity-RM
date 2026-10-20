import type { TrackContent } from "@/data/track";

export const mernTrack: TrackContent = {
  id: "mern",
  prerequisites: [
    {
      id: "js-basics",
      title: "JavaScript basics",
      detail: "Variables, functions, arrays, and objects.",
    },
    {
      id: "browser",
      title: "Browser DevTools",
      detail: "You can open the console and the network tab.",
    },
    {
      id: "git-node",
      title: "Git and Node installed",
      detail: "node, npm, and git run on your machine.",
    },
  ],
  sections: [
    {
      id: "web-foundations",
      title: "Web foundations",
      summary: "HTML, CSS, and a layout that holds.",
      topics: [
        {
          id: "html",
          title: "HTML",
          detail: "Structure first. Semantics before styling.",
          subtopics: [
            { id: "elements", title: "Elements, forms, and links" },
            { id: "semantic", title: "Semantic layout" },
            { id: "a11y", title: "Accessibility basics" },
          ],
        },
        {
          id: "css",
          title: "CSS",
          detail: "Layout systems you can explain.",
          subtopics: [
            { id: "box", title: "Box model" },
            { id: "flex-grid", title: "Flexbox and Grid" },
            { id: "responsive", title: "Responsive breakpoints" },
            { id: "tokens", title: "Variables and simple design tokens" },
          ],
        },
        {
          id: "js-dom",
          title: "JavaScript in the browser",
          detail: "Events, fetch, and updating the DOM.",
          subtopics: [
            { id: "dom", title: "DOM selection and events" },
            { id: "async", title: "Promises and async/await" },
            { id: "fetch", title: "fetch and JSON" },
            { id: "modules", title: "ES modules" },
          ],
        },
      ],
    },
    {
      id: "react",
      title: "React",
      summary: "Components, state, and the screen that updates.",
      topics: [
        {
          id: "react-basics",
          title: "React basics",
          detail: "Components as functions that return UI.",
          subtopics: [
            { id: "jsx", title: "JSX and props" },
            { id: "state", title: "useState" },
            { id: "effects", title: "useEffect" },
            { id: "lists", title: "Lists and keys" },
            { id: "forms-react", title: "Controlled forms" },
          ],
        },
        {
          id: "react-routing",
          title: "Routing and data",
          detail: "Pages, params, and loading remote data.",
          subtopics: [
            { id: "router", title: "React Router" },
            { id: "loading", title: "Loading and error UI" },
            { id: "context", title: "Context for shared state" },
          ],
        },
        {
          id: "react-quality",
          title: "Quality habits",
          detail: "Structure that survives a second feature.",
          subtopics: [
            { id: "folder", title: "Folder structure" },
            { id: "hooks-custom", title: "Custom hooks" },
            { id: "env-fe", title: "Frontend env vars" },
          ],
        },
      ],
    },
    {
      id: "node-express",
      title: "Node and Express",
      summary: "A route, a status, and JSON the client can trust.",
      topics: [
        {
          id: "node-basics",
          title: "Node basics",
          detail: "The runtime your API lives in.",
          subtopics: [
            { id: "npm", title: "npm scripts and packages" },
            { id: "modules-node", title: "CommonJS / ESM" },
            { id: "env-be", title: "dotenv and config" },
          ],
        },
        {
          id: "express",
          title: "Express APIs",
          detail: "Thin controllers; clear routes.",
          subtopics: [
            { id: "routes", title: "Routes and routers" },
            { id: "middleware", title: "Middleware" },
            { id: "validation", title: "Request validation" },
            { id: "errors", title: "Error handling and status codes" },
            { id: "rest", title: "REST resource design" },
          ],
        },
      ],
    },
    {
      id: "mongo",
      title: "MongoDB",
      summary: "A document, an id, and the query that finds it.",
      topics: [
        {
          id: "mongo-basics",
          title: "Documents and collections",
          detail: "JSON-shaped data that lives past a restart.",
          subtopics: [
            { id: "crud", title: "CRUD operations" },
            { id: "queries", title: "Queries and indexes" },
            { id: "schema", title: "Schema design tradeoffs" },
            { id: "mongoose", title: "Mongoose models" },
          ],
        },
        {
          id: "mongo-api",
          title: "API + database",
          detail: "The route writes; the id comes from the database.",
          subtopics: [
            { id: "create-read", title: "Create and list" },
            { id: "update-delete", title: "Update and delete" },
            { id: "pagination", title: "Pagination and filters" },
          ],
        },
      ],
    },
    {
      id: "auth",
      title: "Auth",
      summary: "A user, a session, and the route that checks.",
      topics: [
        {
          id: "auth-core",
          title: "Authentication",
          detail: "Prove who the user is.",
          subtopics: [
            { id: "password", title: "Password hashing" },
            { id: "jwt", title: "JWT / sessions" },
            { id: "login-register", title: "Register and login flows" },
            { id: "protected", title: "Protected routes" },
          ],
        },
        {
          id: "authz",
          title: "Authorization",
          detail: "The check is on the server. Hiding a button is not the check.",
          subtopics: [
            { id: "ownership", title: "Resource ownership" },
            { id: "roles", title: "Roles and permissions" },
            { id: "cors", title: "CORS for the SPA" },
          ],
        },
      ],
    },
    {
      id: "ship-mern",
      title: "Ship the product",
      summary: "One feature, deployed, that you can walk through.",
      topics: [
        {
          id: "fullstack-wiring",
          title: "Wire frontend to API",
          detail: "The happy path and a failed save both belong in the demo.",
          subtopics: [
            { id: "api-client", title: "API client layer" },
            { id: "auth-ui", title: "Auth UI state" },
            { id: "error-ux", title: "Error and empty states" },
          ],
        },
        {
          id: "deploy-mern",
          title: "Deploy",
          detail: "Frontend, API, and DB reachable from the internet.",
          subtopics: [
            { id: "build", title: "Production builds" },
            { id: "host-fe", title: "Host the React app" },
            { id: "host-api", title: "Host the API" },
            { id: "mongo-atlas", title: "Managed MongoDB" },
            { id: "walkthrough", title: "Ten-minute walkthrough" },
          ],
        },
      ],
    },
    {
      id: "quality-mern",
      title: "TypeScript, testing, performance",
      summary: "Types, tests, and the slow path you measure.",
      topics: [
        {
          id: "typescript",
          title: "TypeScript",
          detail: "Types on the client and the API boundary.",
          subtopics: [
            { id: "ts-basics", title: "Types, interfaces, unions" },
            { id: "ts-react", title: "Typing React props and hooks" },
            { id: "ts-api", title: "Shared request/response types" },
            { id: "strict", title: "Strict mode habits" },
          ],
        },
        {
          id: "testing-mern",
          title: "Testing",
          detail: "One behavior, one assertion, a name that says what broke.",
          subtopics: [
            { id: "unit-fe", title: "Component / unit tests" },
            { id: "api-tests", title: "API integration tests" },
            { id: "e2e", title: "One critical E2E path" },
          ],
        },
        {
          id: "perf-security",
          title: "Performance and hardening",
          detail: "Indexes, caching, and the headers that matter.",
          subtopics: [
            { id: "indexes-mongo", title: "Mongo indexes for hot queries" },
            { id: "caching", title: "HTTP and app caching" },
            { id: "rate-limit", title: "Rate limiting" },
            { id: "helmet", title: "Security headers" },
          ],
        },
      ],
    },
  ],
};
