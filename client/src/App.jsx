import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import GuestRoute from './components/admin/GuestRoute'
import { ProfileProvider } from './context/ProfileContext'
import { ToastProvider } from './context/ToastContext'
import { ConfirmProvider } from './context/ConfirmContext'

import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import NotFound from './pages/NotFound'

import Login from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import ProjectsList from './admin/pages/ProjectsList'
import AddProject from './admin/pages/AddProject'
import EditProject from './admin/pages/EditProject'
import SkillsManager from './admin/pages/SkillsManager'
import ExperienceManager from './admin/pages/ExperienceManager'
import ProfileManager from './admin/pages/ProfileManager'
import Messages from './admin/pages/Messages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:slug', element: <ProjectDetails /> },
      { path: 'experience', element: <Experience /> },
      { path: 'skills', element: <Skills /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin/login',
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'projects', element: <ProjectsList /> },
      { path: 'projects/create', element: <AddProject /> },
      { path: 'projects/edit/:id', element: <EditProject /> },
      { path: 'skills', element: <SkillsManager /> },
      { path: 'experience', element: <ExperienceManager /> },
      { path: 'profile', element: <ProfileManager /> },
      { path: 'messages', element: <Messages /> },
    ],
  },
])

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ToastProvider>
          <ConfirmProvider>
            <RouterProvider router={router} />
          </ConfirmProvider>
        </ToastProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App