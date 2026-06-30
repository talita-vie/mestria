import { useCallback, useEffect, useState } from "react";
import { categoryService } from "@/features/category/services/categoryService";

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await categoryService.getCategories();
      
      const formattedOptions = data.map((cat) => ({
        value: cat.id, 
        label: cat.name || cat.title,
      }));

      setCategories(formattedOptions);
    } catch (err) {
      setError(
        err.response?.data?.message ??
        "Não foi possível carregar as categorias."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refresh: fetchCategories,
  };
}