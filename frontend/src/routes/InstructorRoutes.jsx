import { Route } from 'react-router-dom';
import RoleRoute from '@/routes/RoleRoute';
import MyCourses from '@/features/instructor/pages/MyCourses';
import CreateCourse from '@/features/instructor/pages/CreateCourse';
import LessonPreview from '@/features/instructor/pages/LessonPreview';

export default function InstructorRoutes() {
  return (
    <Route element={<RoleRoute role="instructor" />}>
      <Route path="/instrutor/cursos" element={<MyCourses />} />
      <Route path="/instrutor/cursos/criar" element={<CreateCourse />} />
      <Route path="/instrutor/cursos/:courseId/modulos/:moduleId/aulas/:lessonId/previa" element={<LessonPreview />} /> 
    </Route>
  );
}