const KEY = "lawbridge_store";

function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { documents: [], activities: [], tickets: [] };
  try {
    return JSON.parse(raw);
  } catch {
    return { documents: [], activities: [], tickets: [] };
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addActivity(type, title) {
  const store = load();
  store.activities.unshift({ id: Date.now(), type, title, date: new Date().toISOString() });
  save(store);
  return store.activities;
}

export function addDocument(doc) {
  const store = load();
  store.documents.unshift({ id: Date.now(), ...doc });
  addActivity("document", doc.name);
  save(store);
  return store.documents;
}

export function listDocuments() {
  return load().documents;
}

export function listActivities() {
  return load().activities.slice(0, 8);
}

export function addTicket(ticket) {
  const store = load();
  store.tickets.unshift({ id: Date.now(), status: "open", ...ticket });
  addActivity("ticket", ticket.subject);
  save(store);
  return store.tickets;
}

export function seedIfEmpty() {
  const store = load();
  if (store.documents.length === 0 && store.activities.length === 0) {
    store.documents = [
      { id: Date.now() - 1, name: "Lease_Agreement.pdf", size: 234556, analyzed: true },
      { id: Date.now() - 2, name: "Employment_NDA.pdf", size: 145331, analyzed: true },
    ];
    store.activities = [
      { id: Date.now() - 3, type: "document", title: "Uploaded Lease_Agreement.pdf", date: new Date().toISOString() },
      { id: Date.now() - 4, type: "qa", title: "Asked: Can I terminate early?", date: new Date().toISOString() },
    ];
    save(store);
  }
}
