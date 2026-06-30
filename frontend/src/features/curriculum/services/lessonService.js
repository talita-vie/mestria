// src/services/lessonService.js
import api from "@/lib/api";

export const lessonService = {

  async getMyLessons(
    courseId, 
    moduleId,
  ) {
    const { data } = await api.get(
      `/api/instructor/courses/${courseId}/modules/${moduleId}`
    );

    return data;
  },

  
  async createLesson(moduleId, data) {
  let content = null;

  if (data.type === "video") content = { url: data.video_url || "" };
  if (data.type === "attachment") content = { file_url: data.file_url || "" };
  if (data.type === "text") content = { text: data.text|| "" };

  const payload = {
    title:    data.title,
    type:     data.type,
    content,
  };

  const { data: res } = await api.post(
    `/api/instructor/modules/${moduleId}/lessons`,
    payload
  );
  return res.lesson ?? res;
},
  async updateLesson(lessonId, data) {
    let content = null;

  if (data.type === "video") content = { url: data.video_url || "" };
  if (data.type === "attachment") content = { file_url: data.file_url || "" };
  if (data.type === "text") content = { text: data.text || "" };

  const payload = {
    title:    data.title,
    type:     data.type,
    content,
  };

  const { data: res } = await api.put(
    `/api/instructor/lessons/${lessonId}`,
    payload
  );
  return res.lesson ?? res;
},


  async deleteLesson(lessonId) {
    await api.delete(`/api/instructor/lessons/${lessonId}`);
  },

  async reorderLessons(moduleId, position) {
    await api.patch(
      `/api/instructor/modules/${moduleId}/lessons/reorder`,
      { lessons: position }
    );
  },
};