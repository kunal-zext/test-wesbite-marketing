export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQ = {
  category: string;
  title: string;
  description?: string;
  items: FAQItem[];
};
