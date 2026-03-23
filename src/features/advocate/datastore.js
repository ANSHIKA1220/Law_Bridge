const KEY = "lawbridge_advocate";

function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { requests: [], templates: [], profile: { name: "Adv. Demo", expertise: "Contract Law", barId: "UP/1234/2021", verified: true } };
  try {
    return JSON.parse(raw);
  } catch {
    return { requests: [], templates: [], profile: { name: "Adv. Demo", expertise: "Contract Law", barId: "UP/1234/2021", verified: true } };
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function seedIfEmpty() {
  const store = load();
  if (store.requests.length === 0) {
    store.requests = [
      { id: 1, client: "Sarah", subject: "Lease termination advice", status: "new", createdAt: new Date().toISOString() },
      { id: 2, client: "Ravi", subject: "Refund claim drafting", status: "in_review", createdAt: new Date().toISOString() },
    ];
    store.templates = [
      { id: 1, title: "Notice of Termination", body: "This is to notify termination as per Clause ..." },
      { id: 2, title: "Consumer Complaint Draft", body: "Under Consumer Protection Act, 2019 ..." },
    ];
    save(store);
  }
}

export function listRequests() {
  return load().requests;
}

export function updateRequest(id, patch) {
  const store = load();
  store.requests = store.requests.map(r => r.id === id ? { ...r, ...patch } : r);
  save(store);
  return store.requests.find(r => r.id === id);
}

export function getProfile() {
  return load().profile;
}

export function saveProfile(profile) {
  const store = load();
  store.profile = { ...store.profile, ...profile };
  save(store);
  return store.profile;
}

export function listTemplates() {
  return load().templates;
}

export function saveTemplate(tpl) {
  const store = load();
  const withId = { id: Date.now(), ...tpl };
  store.templates.unshift(withId);
  save(store);
  return withId;
}
