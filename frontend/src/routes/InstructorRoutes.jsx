import { Route } from 'react-router-dom';
import RoleRoute from '@/routes/RoleRoute';
import MyCourses from '@/features/instructor/pages/MyCourses';
import CreateCourse from '@/features/instructor/pages/CreateCourse';

export default function InstructorRoutes() {
  return (
    <Route element={<RoleRoute role="instructor" />}>
      <Route path="/instrutor/cursos" element={<MyCourses />} />
      <Route path="/instrutor/cursos/criar" element={<CreateCourse />} /> 
    </Route>
  );
}