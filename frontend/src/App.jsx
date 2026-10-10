import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import StudentList from './pages/StudentList.jsx'
import AddStudent from './pages/AddStudent.jsx'
import EditStudent from './pages/EditStudent.jsx'

function App() {
  return (
    <>
      <header className="navbar">
        <NavLink to="/" className="brand" end>
          Student Admin
        </NavLink>
        <nav>
          <NavLink to="/students" end>
            All Students
          </NavLink>
          <NavLink to="/students/new">Add Student</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/new" element={<AddStudent />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
          <Route path="*" element={<p className="status">Page not found.</p>} />
        </Routes>
      </main>
    </>
  )
}

export default App
