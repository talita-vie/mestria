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

export function useLessonPreview(lessonId) {
  const [lesson, setLesson]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
 
  useEffect(() => {
    if (!lessonId) return;
    let cancelled = false;
 
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await lessonService.getLesson(lessonId);
        if (!cancelled) setLesson(data);
      } catch (err) {
        if (!cancelled)
          setError(err.response?.data?.message ?? "Não foi possível carregar a aula.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
 
    fetch();
    return () => { cancelled = true; };
  }, [lessonId]);
 
  return { lesson, loading, error };
}
 