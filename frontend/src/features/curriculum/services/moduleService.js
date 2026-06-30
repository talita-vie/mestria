// src/services/moduleService.js
import api from "@/lib/api";

export const moduleService = {
  async createModule(courseId, data) {
    const { data: res } = await api.post(
      `/api/instructor/courses/${courseId}/modules`,
      data
    );
    return res.module ?? res;
  },

  async updateModule(moduleId, data) {
    const { data: res } = await api.put(
      `/api/instructor/modules/${moduleId}`,
      data
    );
    return res.module ?? res;
  },

  async deleteModule(moduleId) {
    await api.delete(`/api/instructor/modules/${moduleId}`);
  },

  async reorderModules(courseId, position) {
    await api.patch(
      `/api/instructor/courses/${courseId}/modules/reorder`,
      { modules: position}
    );
  },
};