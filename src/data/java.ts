import type { TrackContent } from "@/data/track";

export const javaTrack: TrackContent = {
  id: "java",
  prerequisites: [
    {
      id: "jdk",
      title: "JDK installed",
      detail: "javac and java run, and you know your JDK version.",
    },
    {
      id: "ide-java",
      title: "An IDE or editor",
      detail: "You can create a project, run a main, and read a stack trace.",
    },
    {
      id: "git-java",
      title: "Git basics",
      detail: "Clone, commit, and push a small change.",
    },
  ],
  sections: [
    {
      id: "java-fundamentals",
      title: "Java fundamentals",
      summary: "A class, a collection, and a method you can test.",
      topics: [
        {
          id: "lang",
          title: "Language core",
          detail: "Types, control flow, and packages.",
          subtopics: [
            { id: "types-java", title: "Primitives and objects" },
            { id: "control-java", title: "Control flow" },
            { id: "methods", title: "Methods and overloading" },
            { id: "packages", title: "Packages and visibility" },
          ],
        },
        {
          id: "oop-java",
          title: "OOP in Java",
          detail: "One class for the student. One class that holds the list.",
          subtopics: [
            { id: "classes-java", title: "Classes and constructors" },
            { id: "inheritance", title: "Inheritance and interfaces" },
            { id: "equals-hash", title: "equals and hashCode" },
            { id: "exceptions", title: "Checked vs unchecked exceptions" },
          ],
        },
        {
          id: "collections",
          title: "Collections",
          detail: "Lists, maps, and the structure that fits the job.",
          subtopics: [
            { id: "list-map", title: "List, Set, Map" },
            { id: "generics", title: "Generics" },
            { id: "streams", title: "Streams basics" },
            { id: "optional", title: "Optional" },
          ],
        },
      ],
    },
    {
      id: "build-test",
      title: "Build and test",
      summary: "A build tool and tests that fail for a reason.",
      topics: [
        {
          id: "build",
          title: "Maven or Gradle",
          detail: "Dependencies and a repeatable build.",
          subtopics: [
            { id: "pom-gradle", title: "Project file basics" },
            { id: "deps", title: "Dependencies and scopes" },
            { id: "run-build", title: "Build and run from CLI" },
          ],
        },
        {
          id: "testing-java",
          title: "JUnit",
          detail: "The test name is the spec.",
          subtopics: [
            { id: "junit", title: "JUnit basics" },
            { id: "assertions", title: "Assertions" },
            { id: "mocks", title: "Mocks for services" },
          ],
        },
      ],
    },
    {
      id: "spring",
      title: "Spring and routes",
      summary: "A controller, a path, and the JSON you return.",
      topics: [
        {
          id: "spring-boot",
          title: "Spring Boot basics",
          detail: "The controller stays thin. Work lives in a service.",
          subtopics: [
            { id: "app", title: "Spring Boot application" },
            { id: "di", title: "Dependency injection" },
            { id: "config", title: "application.properties / yaml" },
            { id: "profiles", title: "Profiles" },
          ],
        },
        {
          id: "rest-java",
          title: "REST controllers",
          detail: "List and create without stuffing logic into the controller.",
          subtopics: [
            { id: "controllers", title: "@RestController mapping" },
            { id: "dto", title: "DTOs vs entities" },
            { id: "validation-java", title: "Bean validation" },
            { id: "exception-handler", title: "@ControllerAdvice errors" },
          ],
        },
        {
          id: "services",
          title: "Service layer",
          detail: "A service you can call without HTTP.",
          subtopics: [
            { id: "service", title: "Service classes" },
            { id: "transactions", title: "Transactions" },
            { id: "mapping", title: "Entity ↔ DTO mapping" },
          ],
        },
      ],
    },
    {
      id: "persistence",
      title: "Persistence",
      summary: "An entity, a repository, and the row that survives a restart.",
      topics: [
        {
          id: "jpa",
          title: "JPA and repositories",
          detail: "The id is generated. Do not set it from the request body.",
          subtopics: [
            { id: "entities", title: "Entities and IDs" },
            { id: "repos", title: "Spring Data repositories" },
            { id: "relations-jpa", title: "Relations" },
            { id: "migrations-java", title: "Flyway / Liquibase idea" },
          ],
        },
        {
          id: "db-ops",
          title: "Database operations",
          detail: "Save a student and read them back.",
          subtopics: [
            { id: "crud-java", title: "CRUD end to end" },
            { id: "query-methods", title: "Query methods" },
            { id: "pagination-java", title: "Pagination and sorting" },
          ],
        },
      ],
    },
    {
      id: "errors-security",
      title: "Validation, errors, security",
      summary: "A bad payload, a status code, and a message.",
      topics: [
        {
          id: "api-errors",
          title: "API errors",
          detail: "400 with a reason. An empty 500 is not an answer.",
          subtopics: [
            { id: "problem-details", title: "Error response shape" },
            { id: "reject-blank", title: "Reject invalid input" },
            { id: "logging-java", title: "Structured logging" },
          ],
        },
        {
          id: "security-java",
          title: "Spring Security intro",
          detail: "Auth that lives on the server.",
          subtopics: [
            { id: "security-config", title: "Security filter chain" },
            { id: "jwt-java", title: "JWT or session auth" },
            { id: "method-sec", title: "Method security idea" },
          ],
        },
      ],
    },
    {
      id: "client-ship",
      title: "Client and ship",
      summary: "A page that calls the API, and a service you can walk through.",
      topics: [
        {
          id: "client",
          title: "The client",
          detail: "A form that creates a student and handles the error response.",
          subtopics: [
            { id: "spa-or-thymeleaf", title: "SPA client or server templates" },
            { id: "call-api", title: "Call the API" },
            { id: "error-ui-java", title: "Surface API errors" },
          ],
        },
        {
          id: "ship-java",
          title: "Ship and explain",
          detail: "Start at the route. Follow one field until it is saved.",
          subtopics: [
            { id: "docker-java", title: "Containerize the service" },
            { id: "deploy-java", title: "Deploy to a host" },
            { id: "walkthrough-java", title: "Ten-minute feature walkthrough" },
          ],
        },
      ],
    },
    {
      id: "messaging-cache",
      title: "Messaging, cache, and resilience",
      summary: "Async boundaries and the failures you plan for.",
      topics: [
        {
          id: "messaging",
          title: "Messaging",
          detail: "Publish an event; consume it once.",
          subtopics: [
            { id: "broker", title: "Broker idea (Kafka / Rabbit / SQS)" },
            { id: "publish", title: "Publish from a service" },
            { id: "consume", title: "Consumer and acknowledgements" },
            { id: "idempotent-java", title: "Idempotent handlers" },
          ],
        },
        {
          id: "cache-java",
          title: "Caching",
          detail: "Cache-aside with a clear TTL.",
          subtopics: [
            { id: "spring-cache", title: "Spring Cache annotations" },
            { id: "redis-java", title: "Redis as a cache" },
            { id: "invalidation-java", title: "Invalidation on write" },
          ],
        },
        {
          id: "resilience",
          title: "Resilience",
          detail: "Timeouts, retries, and circuit breakers.",
          subtopics: [
            { id: "timeouts", title: "Timeouts on outbound calls" },
            { id: "retries", title: "Bounded retries" },
            { id: "circuit", title: "Circuit breaker idea" },
            { id: "health-java", title: "Health endpoints" },
          ],
        },
      ],
    },
  ],
};
