export type Quote = {
  id: string;
  name: string;
  detail: string;
  quote: string;
};

export const quotes: Quote[] = [
  {
    id: "sneha-iyer",
    name: "Sneha Iyer",
    detail: "B.E. IT · Data analyst",
    quote:
      "The mentors actually worked in analytics, so the SQL problems felt like real tickets, not textbook questions.",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    detail: "B.Tech ECE · Cloud support",
    quote:
      "Deploying our capstone on a real pipeline, breaking it, and fixing it taught me more than any certification.",
  },
  {
    id: "harshit-agarwal",
    name: "Harshit Agarwal",
    detail: "B.Tech CSE · AI intern",
    quote:
      "The mentor made us measure answers properly. That evaluation part is what got me the internship.",
  },
  {
    id: "ishita-banerjee",
    name: "Ishita Banerjee",
    detail: "B.Tech IT · Software engineer",
    quote:
      "By the fourth mock interview I could explain my choices without freezing.",
  },
  {
    id: "fatima-sheikh",
    name: "Fatima Sheikh",
    detail: "B.Tech CSE · Data engineer",
    quote:
      "My mentor reviewed every pipeline I wrote line by line. Now my pull requests are the easiest to review.",
  },
];
