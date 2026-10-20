import type { TrackContent } from "@/data/track";

export const pythonTrack: TrackContent = {
  id: "python",
  prerequisites: [
    {
      id: "python-installed",
      title: "Python installed",
      detail: "python --version runs, and you can create a virtualenv.",
    },
    {
      id: "editor",
      title: "An editor you like",
      detail: "You can open a file, run it, and read a traceback.",
    },
    {
      id: "git-py",
      title: "Git basics",
      detail: "Clone, commit, and push a small change.",
    },
  ],
  sections: [
    {
      id: "python-core",
      title: "Python for the web",
      summary: "A function, a request, and the response you return.",
      topics: [
        {
          id: "py-lang",
          title: "Language essentials",
          detail: "Enough Python to build a view without fighting the syntax.",
          subtopics: [
            { id: "types-py", title: "Types, collections, and comprehensions" },
            { id: "functions-py", title: "Functions and modules" },
            { id: "oop-py", title: "Classes for models and services" },
            { id: "venv", title: "venv and requirements.txt" },
          ],
        },
        {
          id: "http-py",
          title: "HTTP in Python",
          detail: "Requests in, responses out.",
          subtopics: [
            { id: "status", title: "Status codes and headers" },
            { id: "json-py", title: "JSON request and response bodies" },
            { id: "routing-idea", title: "URL routing idea" },
          ],
        },
      ],
    },
    {
      id: "framework",
      title: "Django or Flask/FastAPI",
      summary: "Pick a framework and learn its grain.",
      topics: [
        {
          id: "framework-choice",
          title: "Framework foundations",
          detail: "Views, routes, and project layout.",
          subtopics: [
            { id: "project-layout", title: "Project and app layout" },
            { id: "views", title: "Views / route handlers" },
            { id: "settings", title: "Settings and configuration" },
            { id: "static", title: "Static files" },
          ],
        },
        {
          id: "templates",
          title: "Templates",
          detail: "The template does not fetch. The view fetches, then renders.",
          subtopics: [
            { id: "template-basics", title: "Template syntax" },
            { id: "loops-cond", title: "Loops and conditionals" },
            { id: "context", title: "Passing context" },
            { id: "base", title: "Base layouts and includes" },
          ],
        },
        {
          id: "forms",
          title: "Forms",
          detail: "Input, validation, and the error the user can read.",
          subtopics: [
            { id: "form-fields", title: "Fields and widgets" },
            { id: "validation-py", title: "Server-side validation" },
            { id: "csrf", title: "CSRF protection" },
            { id: "flash", title: "Messages / flash errors" },
          ],
        },
      ],
    },
    {
      id: "database-py",
      title: "The database",
      summary: "A model, a migration, and the row you can query.",
      topics: [
        {
          id: "orm",
          title: "ORM and models",
          detail: "Write the model first. The form should match the fields.",
          subtopics: [
            { id: "models", title: "Models / tables" },
            { id: "migrations", title: "Migrations" },
            { id: "queries-orm", title: "Querysets / queries" },
            { id: "relations", title: "Relations (FK, M2M)" },
          ],
        },
        {
          id: "data-layer",
          title: "Data habits",
          detail: "Transactions, indexes, and not inventing rows.",
          subtopics: [
            { id: "admin", title: "Admin / inspection tools" },
            { id: "seed", title: "Seeding data" },
            { id: "n-plus-one", title: "N+1 awareness" },
          ],
        },
      ],
    },
    {
      id: "auth-py",
      title: "Auth and permissions",
      summary: "A login, a session, and the page a guest cannot open.",
      topics: [
        {
          id: "auth-py-core",
          title: "Authentication",
          detail: "Built-in auth before you invent your own.",
          subtopics: [
            { id: "users", title: "User model" },
            { id: "login-logout", title: "Login and logout" },
            { id: "password-reset", title: "Password reset idea" },
            { id: "sessions-py", title: "Sessions and cookies" },
          ],
        },
        {
          id: "permissions-py",
          title: "Permissions",
          detail: "The view checks the role. The template only hides the link.",
          subtopics: [
            { id: "decorators", title: "Login-required decorators" },
            { id: "object-perms", title: "Object-level checks" },
            { id: "roles-py", title: "Roles / groups" },
          ],
        },
      ],
    },
    {
      id: "apis-py",
      title: "APIs",
      summary: "JSON endpoints your frontend or mobile client can call.",
      topics: [
        {
          id: "rest-py",
          title: "REST with Python",
          detail: "Serializers, status codes, and auth headers.",
          subtopics: [
            { id: "serializers", title: "Serializers / schemas" },
            { id: "viewsets", title: "Viewsets or route groups" },
            { id: "token-auth", title: "Token / session API auth" },
            { id: "pagination-py", title: "Pagination" },
          ],
        },
      ],
    },
    {
      id: "ship-py",
      title: "A deployed app",
      summary: "One feature online, with the command that runs it.",
      topics: [
        {
          id: "testing-py",
          title: "Tests",
          detail: "One behavior, one assertion, a name that says what broke.",
          subtopics: [
            { id: "unit", title: "Unit tests" },
            { id: "client-tests", title: "Request / client tests" },
            { id: "fixtures", title: "Fixtures and factories" },
          ],
        },
        {
          id: "deploy-py",
          title: "Deploy",
          detail: "If it only works on your laptop, name the missing variable.",
          subtopics: [
            { id: "gunicorn", title: "WSGI/ASGI server" },
            { id: "static-prod", title: "Static files in production" },
            { id: "host-py", title: "Host on a PaaS or VM" },
            { id: "env-prod", title: "Production env and secrets" },
            { id: "demo-py", title: "Ship the course list demo" },
          ],
        },
      ],
    },
    {
      id: "async-cache",
      title: "Async, tasks, and caching",
      summary: "Work that should not block the request.",
      topics: [
        {
          id: "async-py",
          title: "Async views",
          detail: "When await helps, and when it does not.",
          subtopics: [
            { id: "asyncio", title: "asyncio basics" },
            { id: "async-views", title: "Async views / ASGI" },
            { id: "httpx", title: "Async HTTP clients" },
          ],
        },
        {
          id: "background",
          title: "Background jobs",
          detail: "Email, exports, and work that finishes later.",
          subtopics: [
            { id: "celery-rq", title: "Celery / RQ / Dramatiq idea" },
            { id: "queues", title: "Queues and retries" },
            { id: "idempotent", title: "Idempotent workers" },
          ],
        },
        {
          id: "cache-py",
          title: "Caching",
          detail: "Redis or local cache with a clear key and TTL.",
          subtopics: [
            { id: "cache-keys", title: "Cache keys and invalidation" },
            { id: "redis", title: "Redis as a cache" },
            { id: "page-cache", title: "Per-view / fragment cache" },
          ],
        },
      ],
    },
  ],
};
