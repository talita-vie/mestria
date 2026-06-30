import { useCallback, useEffect, useState } from "react";
import { lessonService } from "@/features/curriculum/services/lessonService";

export function useLessons(courseId, moduleId) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await lessonService.getMyLessons();

      setLessons(data);
    } catch (err) {
      setError(
        err.response?.data?.message ??
          "Não foi possível carregar as aulas."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return {
    lessons,
    loading,
    error,
    refresh: fetchLessons,
  };
}