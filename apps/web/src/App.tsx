import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { MainLayout } from './layouts/MainLayout'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { CreateActivityPage } from './pages/CreateActivityPage'
import { EditActivityPage } from './pages/EditActivityPage'
import { ActivityDetailsPage } from './pages/ActivityDetailsPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { CreateProjectPage } from './pages/CreateProjectPage'
import { EditProjectPage } from './pages/EditProjectPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ActivitiesPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/activities/new"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CreateActivityPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/activities/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ActivityDetailsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/activities/:id/edit"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <EditActivityPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProjectsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CreateProjectPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id/edit"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <EditProjectPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
