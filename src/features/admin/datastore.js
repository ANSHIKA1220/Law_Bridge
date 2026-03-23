const KEY = "lawbridge_admin";

function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const seed = {
      users: [
        { id: 1, name: "Sarah", role: "Citizen", verified: true, banned: false },
        { id: 2, name: "Ravi", role: "Advocate", verified: false, banned: false, barId: "UP/5678/2020" },
        { id: 3, name: "Leela", role: "Student", verified: true, banned: false },
      ],
      laws: [{ id: 1, title: "Contract Act, 1872" }, { id: 2, title: "Consumer Protection Act, 2019" }],
      cases: [{ id: 10, title: "ABC v. XYZ, 2021" }, { id: 11, title: "Tenant v. Landlord, 2020" }],
      logs: [
        { id: 101, type: "api", message: "Analyze document", ts: new Date().toISOString() },
        { id: 102, type: "search", message: "Case query: termination", ts: new Date().toISOString() },
      ],
      models: [
        { id: "llama3", name: "Llama 3", enabled: true },
        { id: "ocr", name: "OCR Engine", enabled: true },
        { id: "embed", name: "Vector Embedding", enabled: true },
      ],
    };
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { users: [], laws: [], cases: [], logs: [], models: [] };
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function listUsers() {
  return load().users;
}

export function verifyAdvocate(id, verified) {
  const store = load();
  store.users = store.users.map(u => u.id === id ? { ...u, verified } : u);
  save(store);
  return store.users.find(u => u.id === id);
}

export function banUser(id, banned) {
  const store = load();
  store.users = store.users.map(u => u.id === id ? { ...u, banned } : u);
  save(store);
  return store.users.find(u => u.id === id);
}

export function listLaws() {
  return load().laws;
}
export function addLaw(title) {
  const store = load();
  const law = { id: Date.now(), title };
  store.laws.unshift(law);
  save(store);
  return law;
}

export function listCases() {
  return load().cases;
}
export function addCase(title) {
  const store = load();
  const c = { id: Date.now(), title };
  store.cases.unshift(c);
  save(store);
  return c;
}

export function listLogs() {
  return load().logs.slice(-20).reverse();
}
export function addLog(log) {
  const store = load();
  store.logs.unshift({ id: Date.now(), ts: new Date().toISOString(), ...log });
  save(store);
}

export function listModels() {
  return load().models;
}
export function setModel(id, enabled) {
  const store = load();
  store.models = store.models.map(m => m.id === id ? { ...m, enabled } : m);
  save(store);
}
