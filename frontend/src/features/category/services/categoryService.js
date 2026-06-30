// services/categoryService.js

import api from "@/lib/api";

export const categoryService = {
  async getCategories() {
    const {data} = await api.get(
      "/api/categories"
    );

    return data.data|| data;
  },
};