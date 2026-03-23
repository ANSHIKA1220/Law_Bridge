import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import About from './pages/About.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import RoleAuth from './pages/RoleAuth.jsx'
import StudentLayout from './features/student/StudentLayout.jsx'
import StudentHome from './features/student/StudentHome.jsx'
import MockCaseSimulator from './features/student/MockCaseSimulator.jsx'
import CaseStudies from './features/student/CaseStudies.jsx'
import LearningHub from './features/student/LearningHub.jsx'
import PracticeQuiz from './features/student/PracticeQuiz.jsx'
import CitizenLayout from './features/citizen/CitizenLayout.jsx'
import CitizenHome from './features/citizen/CitizenHome.jsx'
import DocumentAnalyzer from './features/citizen/DocumentAnalyzer.jsx'
import DocumentUnderstanding from './features/citizen/DocumentUnderstanding.jsx'
import LegalQA from './features/citizen/LegalQA.jsx'
import CaseExplorer from './features/citizen/CaseExplorer.jsx'
import CourtPrep from './features/citizen/CourtPrep.jsx'
import AdvocateConnect from './features/citizen/AdvocateConnect.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import AdvocateLayout from './features/advocate/AdvocateLayout.jsx'
import AdvocateHome from './features/advocate/AdvocateHome.jsx'
import Requests from './features/advocate/Requests.jsx'
import Workspace from './features/advocate/Workspace.jsx'
import Templates from './features/advocate/Templates.jsx'
import Profile from './features/advocate/Profile.jsx'
import AdminLayout from './features/admin/AdminLayout.jsx'
import AdminHome from './features/admin/AdminHome.jsx'
import Users from './features/admin/Users.jsx'
import Content from './features/admin/Content.jsx'
import Logs from './features/admin/Logs.jsx'
import Models from './features/admin/Models.jsx'
import FindLawyers from './pages/FindLawyers.jsx'
import PostCase from './pages/PostCase.jsx'
import Resources from './pages/Resources.jsx'

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/login" element={<Navigate to="/auth/select" replace />} />
          <Route path="/signup" element={<Navigate to="/auth/select" replace />} />
          <Route path="/auth/select" element={<RoleSelect />} />
          <Route path="/auth/:role" element={<RoleAuth />} />
          <Route path="/find-lawyers" element={<FindLawyers />} />
          <Route path="/post-case" element={<PostCase />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/dashboard/citizen" element={<ProtectedRoute role="Citizen"><CitizenLayout /></ProtectedRoute>}>
            <Route index element={<CitizenHome />} />
            <Route path="document" element={<DocumentAnalyzer />} />
            <Route path="understanding" element={<DocumentUnderstanding />} />
            <Route path="legal-qa" element={<LegalQA />} />
            <Route path="cases" element={<CaseExplorer />} />
            <Route path="court-prep" element={<CourtPrep />} />
            <Route path="advocate-connect" element={<AdvocateConnect />} />
          </Route>
          <Route path="/dashboard/advocate" element={<ProtectedRoute role="Advocate"><AdvocateLayout /></ProtectedRoute>}>
            <Route index element={<AdvocateHome />} />
            <Route path="requests" element={<Requests />} />
            <Route path="workspace" element={<Workspace />} />
            <Route path="templates" element={<Templates />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard/student" element={<ProtectedRoute role="Student"><StudentLayout /></ProtectedRoute>}>
            <Route index element={<StudentHome />} />
            <Route path="simulator" element={<MockCaseSimulator />} />
            <Route path="library" element={<CaseStudies />} />
            <Route path="learning" element={<LearningHub />} />
            <Route path="quiz" element={<PracticeQuiz />} />
          </Route>
          <Route path="/dashboard/admin" element={<ProtectedRoute role="Admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<Users />} />
            <Route path="content" element={<Content />} />
            <Route path="logs" element={<Logs />} />
            <Route path="models" element={<Models />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
