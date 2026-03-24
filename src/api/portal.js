import { apiRequest } from "./client.js";
import { getToken } from "../auth/auth.js";

function authOptions(method = "GET", body = null) {
  return {
    method,
    token: getToken(),
    ...(body !== null ? { body } : {}),
  };
}

function listData(response) {
  if (response && Array.isArray(response.data)) return response.data;
  return Array.isArray(response) ? response : [];
}

export const portalApi = {
  admin: {
    users: async () => listData(await apiRequest("/admin/users", authOptions())),
    verifyUser: (userId, value) => apiRequest(`/admin/users/${userId}/verify`, authOptions("PATCH", { value })),
    banUser: (userId, value) => apiRequest(`/admin/users/${userId}/ban`, authOptions("PATCH", { value })),
    logs: async () => listData(await apiRequest("/admin/logs", authOptions())),
    addLog: (payload) => apiRequest("/admin/logs", authOptions("POST", payload)),
    models: () => apiRequest("/admin/models", authOptions()),
    updateModel: (id, enabled) => apiRequest(`/admin/models/${id}`, authOptions("PATCH", { enabled })),
    laws: () => apiRequest("/admin/content/laws", authOptions()),
    addLaw: (title) => apiRequest("/admin/content/laws", authOptions("POST", { title })),
    cases: async () => listData(await apiRequest("/admin/content/cases", authOptions())),
    addCase: (title) => apiRequest("/admin/content/cases", authOptions("POST", { title })),
  },
  advocate: {
    profile: () => apiRequest("/advocate/profile", authOptions()),
    saveProfile: (payload) => apiRequest("/advocate/profile", authOptions("PUT", payload)),
    requests: () => apiRequest("/advocate/requests", authOptions()),
    updateRequest: (id, status) => apiRequest(`/advocate/requests/${id}`, authOptions("PATCH", { status })),
    templates: () => apiRequest("/advocate/templates", authOptions()),
    addTemplate: (payload) => apiRequest("/advocate/templates", authOptions("POST", payload)),
  },
  student: {
    topics: () => apiRequest("/student/topics", authOptions()),
    caseStudies: () => apiRequest("/student/case-studies", authOptions()),
    quizzes: () => apiRequest("/student/quizzes", authOptions()),
  },
};
