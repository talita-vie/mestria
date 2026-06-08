import { useCallback, useEffect, useState } from "react";
import { courseService } from "@/services/courseService";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const courses =
        await courseService.getMyCourses();

      setCourses(courses);
    } catch (err) {
      setError(
        err.response?.data?.message ??
        "Não foi possível carregar os cursos."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    refresh: fetchCourses,
  };
}