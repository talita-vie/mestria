// services/courseService.js

import api from "@/lib/api";

export const courseService = {
  async getMyCourses() {
    const { data } = await api.get(
      "/api/instructor/courses"
    );

    return data;
  },

  async createCourse(formData) {
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('category_id', formData.category);
    payload.append('description', formData.description);

    if (formData.thumbnail) {
      payload.append('thumbnail', formData.thumbnail);
    }

    const {data} = await api.post("/api/instructor/courses", payload, {
      headers: {"Content-Type": "multipart/form-data"},
    });

    return data;

  },

  async deleteCourse(courseId) {
    await api.delete(`/api/instructor/courses/${courseId}`);
  }
};

