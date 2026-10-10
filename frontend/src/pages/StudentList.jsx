import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteStudent, getStudents } from '../api/studentApi.js'

function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(student) {
    if (!window.confirm(`Delete ${student.name || 'this student'}?`)) return

    try {
      await deleteStudent(student._id)
      setStudents((list) => list.filter((s) => s._id !== student._id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section>
      <div className="page-head">
        <h1>Students Data Profile</h1>
        <Link to="/students/new" className="btn">
          + Add Student
        </Link>
      </div>

      {error && <p className="alert">{error}</p>}
      {loading && <p className="status">Loading students…</p>}
      {!loading && !error && students.length === 0 && (
        <p className="status">No students yet. Add the first one.</p>
      )}

      <div className="grid">
        {students.map((student) => (
          <article key={student._id} className="card">
            <h2>{student.name || 'Unnamed'}</h2>

            <dl>
              <dt>Age</dt>
              <dd>{student.age || '—'}</dd>
              <dt>Course</dt>
              <dd>{student.course || '—'}</dd>
              <dt>Email</dt>
              <dd>{student.email || '—'}</dd>
            </dl>

            <div className="actions">
              <Link to={`/students/${student._id}/edit`} className="btn btn-small">
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-small btn-danger"
                onClick={() => handleDelete(student)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StudentList
