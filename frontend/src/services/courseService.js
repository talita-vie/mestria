// services/courseService.js

import api from "@/services/api";

export const courseService = {
  async getMyCourses() {
    const { data } = await api.get(
      "/api/instructor/courses"
    );

    return data;
  },
};