import type { TrackContent } from "@/data/track";

export const cloudTrack: TrackContent = {
  id: "cloud",
  prerequisites: [
    {
      id: "cli-ready",
      title: "Comfortable in a terminal",
      detail: "You can open a shell, change directories, and edit a file.",
    },
    {
      id: "http-basics",
      title: "HTTP basics",
      detail: "You know a request, a response, and what a status code means.",
    },
    {
      id: "git-basics",
      title: "Git basics",
      detail: "Clone, commit, push, and read a short diff.",
    },
  ],
  sections: [
    {
      id: "linux",
      title: "Linux and the shell",
      summary: "Processes, files, and the log you actually read.",
      topics: [
        {
          id: "shell-nav",
          title: "Shell navigation",
          detail: "Move around a machine without a GUI.",
          subtopics: [
            { id: "paths", title: "Paths, ls, cd, pwd" },
            { id: "read-files", title: "cat, less, head, tail" },
            { id: "permissions", title: "Permissions and ownership" },
            { id: "env", title: "Environment variables" },
          ],
        },
        {
          id: "processes",
          title: "Processes and ports",
          detail: "What is running, and what is listening.",
          subtopics: [
            { id: "ps", title: "ps, top, kill" },
            { id: "ports", title: "Find what owns a port" },
            { id: "logs", title: "Reading system and app logs" },
            { id: "systemd", title: "Services and restarts (systemd idea)" },
          ],
        },
        {
          id: "networking-host",
          title: "Host networking",
          detail: "DNS, ping, and where a packet stopped.",
          subtopics: [
            { id: "dns", title: "DNS lookup" },
            { id: "curl", title: "curl and status codes" },
            { id: "ssh", title: "SSH keys and sessions" },
            { id: "firewall", title: "Firewall basics" },
          ],
        },
      ],
    },
    {
      id: "networking",
      title: "Networking",
      summary: "A request, a port, and the path between clients and services.",
      topics: [
        {
          id: "tcp-http",
          title: "TCP, TLS, HTTP",
          detail: "Layers you can name when something fails.",
          subtopics: [
            { id: "tcp-udp", title: "TCP vs UDP" },
            { id: "tls", title: "TLS and certificates" },
            { id: "http-methods", title: "HTTP methods and headers" },
            { id: "load-balancer", title: "Load balancer idea" },
          ],
        },
        {
          id: "dns-cdn",
          title: "DNS and CDN",
          detail: "Names resolve; content is closer to the user.",
          subtopics: [
            { id: "records", title: "A, AAAA, CNAME, TXT" },
            { id: "ttl", title: "TTL and propagation" },
            { id: "cdn", title: "CDN caching basics" },
          ],
        },
      ],
    },
    {
      id: "compute-storage",
      title: "Compute and storage",
      summary: "Machines, objects, and what you meant to persist.",
      topics: [
        {
          id: "compute",
          title: "Virtual machines",
          detail: "A box in the cloud you can SSH into.",
          subtopics: [
            { id: "vm-launch", title: "Launch and connect to a VM" },
            { id: "images", title: "Images and snapshots" },
            { id: "autoscaling", title: "Autoscaling idea" },
            { id: "spot", title: "Spot / preemptible tradeoffs" },
          ],
        },
        {
          id: "storage",
          title: "Block and object storage",
          detail: "Disk vs bucket — know which one survives a restart.",
          subtopics: [
            { id: "block", title: "Block volumes" },
            { id: "object", title: "Object storage (S3-style)" },
            { id: "lifecycle", title: "Lifecycle and retention" },
            { id: "backup", title: "Backup and restore drills" },
          ],
        },
        {
          id: "databases-cloud",
          title: "Managed databases",
          detail: "A DB you did not install by hand.",
          subtopics: [
            { id: "rds-idea", title: "Managed relational DB" },
            { id: "connections", title: "Connection strings and secrets" },
            { id: "backups-db", title: "Automated backups" },
          ],
        },
      ],
    },
    {
      id: "iam",
      title: "Identity and access",
      summary: "Who can do what, and the key that should not be in the repo.",
      topics: [
        {
          id: "iam-basics",
          title: "IAM basics",
          detail: "Users, roles, and least privilege.",
          subtopics: [
            { id: "users-roles", title: "Users, groups, roles" },
            { id: "policies", title: "Policies and permissions" },
            { id: "least", title: "Least privilege habit" },
            { id: "mfa", title: "MFA for humans" },
          ],
        },
        {
          id: "secrets",
          title: "Secrets",
          detail: "Keys live outside the image and the git history.",
          subtopics: [
            { id: "env-secrets", title: "Env vars vs secret stores" },
            { id: "rotate", title: "Rotation" },
            { id: "no-commit", title: "Never commit secrets" },
          ],
        },
      ],
    },
    {
      id: "containers",
      title: "Containers",
      summary: "An image, a port, and the env the process expects.",
      topics: [
        {
          id: "docker",
          title: "Docker",
          detail: "Build once; run the same way locally and in cloud.",
          subtopics: [
            { id: "dockerfile", title: "Dockerfile basics" },
            { id: "build-run", title: "Build, run, publish" },
            { id: "volumes", title: "Volumes and bind mounts" },
            { id: "compose", title: "Compose for local stacks" },
          ],
        },
        {
          id: "orchestration",
          title: "Orchestration intro",
          detail: "Many containers, one control plane idea.",
          subtopics: [
            { id: "k8s-idea", title: "Kubernetes concepts" },
            { id: "pods-svc", title: "Pods, services, deployments" },
            { id: "health", title: "Health checks and restarts" },
          ],
        },
      ],
    },
    {
      id: "cicd",
      title: "CI/CD and ops",
      summary: "A pipeline, a release, and the page you open when it breaks.",
      topics: [
        {
          id: "pipelines",
          title: "Pipelines",
          detail: "Test, build, deploy without a laptop ritual.",
          subtopics: [
            { id: "ci", title: "Continuous integration" },
            { id: "cd", title: "Continuous delivery / deploy" },
            { id: "artifacts", title: "Build artifacts and registries" },
            { id: "rollback", title: "Rollback as a first-class step" },
          ],
        },
        {
          id: "observability",
          title: "Observability",
          detail: "Logs, metrics, and traces you can find at 2am.",
          subtopics: [
            { id: "logging", title: "Centralized logging" },
            { id: "metrics", title: "Metrics and alerts" },
            { id: "tracing", title: "Tracing idea" },
            { id: "oncall", title: "On-call runbook basics" },
          ],
        },
        {
          id: "iac",
          title: "Infrastructure as code",
          detail: "The cloud state is code you can review.",
          subtopics: [
            { id: "terraform", title: "Terraform / Pulumi idea" },
            { id: "state", title: "State and plan/apply" },
            { id: "modules", title: "Modules and reuse" },
          ],
        },
      ],
    },
    {
      id: "ship-cloud",
      title: "Ship a service",
      summary: "One small service online that you can walk through.",
      topics: [
        {
          id: "deploy-project",
          title: "End-to-end deploy",
          detail: "From repo to URL with a rollback path.",
          subtopics: [
            { id: "package", title: "Package the app" },
            { id: "host", title: "Host it (VM, PaaS, or container)" },
            { id: "domain-tls", title: "Domain and TLS" },
            { id: "demo", title: "Demo: fail, then roll back" },
          ],
        },
      ],
    },
    {
      id: "serverless-cost",
      title: "Serverless and cost",
      summary: "Pay for what runs, and know what you are paying for.",
      topics: [
        {
          id: "serverless",
          title: "Functions and managed runtimes",
          detail: "Event in, response out, cold starts included.",
          subtopics: [
            { id: "faas", title: "Functions as a service" },
            { id: "triggers", title: "HTTP and queue triggers" },
            { id: "cold-start", title: "Cold starts and timeouts" },
            { id: "limits", title: "Memory and concurrency limits" },
          ],
        },
        {
          id: "cost",
          title: "Cost awareness",
          detail: "Tags, budgets, and the bill that surprises you.",
          subtopics: [
            { id: "billing", title: "Billing dashboards" },
            { id: "tags", title: "Resource tags" },
            { id: "budgets", title: "Budgets and alerts" },
            { id: "rightsize", title: "Right-sizing compute" },
          ],
        },
        {
          id: "networking-adv",
          title: "VPC and private paths",
          detail: "Public edge, private data plane.",
          subtopics: [
            { id: "vpc", title: "VPC / VNet basics" },
            { id: "subnets", title: "Public vs private subnets" },
            { id: "nat", title: "NAT and egress" },
            { id: "private-db", title: "Private database access" },
          ],
        },
      ],
    },
  ],
};
