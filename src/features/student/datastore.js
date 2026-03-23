const KEY = "lawbridge_student";

function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const seed = {
      topics: ["Contract Law", "Civil Procedure", "Evidence", "Ethics & Advocacy"],
      caseStudies: [
        { id: 1, title: "Roe v. Wade (1973)", area: "Constitutional", summary: "Privacy rights and abortion." },
        { id: 2, title: "M.R. Engineers v. Som Datt (2009)", area: "Contract", summary: "Incorporation by reference." },
        { id: 3, title: "Kishore v. Retailer (2023)", area: "Consumer", summary: "Refund dispute and deficiency." },
      ],
      quizzes: [
        { id: 101, prompt: "Is a unilateral mistake sufficient to void a contract?", options: ["Always", "Never", "Sometimes"], answer: 2, explanation: "Sometimes, if the other party knew or induced the mistake." },
        { id: 102, prompt: "What is the best evidence rule aimed at?", options: ["Hearsay", "Original documents", "Character evidence"], answer: 1, explanation: "Prefers original documents over copies." },
      ],
    };
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { topics: [], caseStudies: [], quizzes: [] };
  }
}

export function listTopics() {
  return load().topics;
}

export function listCaseStudies() {
  return load().caseStudies;
}

export function listQuizzes() {
  return load().quizzes;
}
