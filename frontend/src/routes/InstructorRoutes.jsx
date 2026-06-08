import { Route } from 'react-router-dom';
import RoleRoute from '../components/RoleRoute';
import MyCourses from '@/pages/instructor/MyCourses';

export default function InstructorRoutes() {
  return (
    <Route element={<RoleRoute role="instructor" />}>
      <Route path="/instrutor/cursos" element={<MyCourses />} /> 
    </Route>
  );
}