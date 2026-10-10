import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StudentForm from '../components/StudentForm.jsx'
import { getStudent, updateStudent } from '../api/studentApi.js'

function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getStudent(id)
      .then(setStudent)
      .catch((err) => setError(err.message))
  }, [id])

  async function handleSubmit(values) {
    await updateStudent(id, values)
    navigate('/students')
  }

  return (
    <section className="form-page">
      <h1>Edit Student</h1>

      {error && <p className="alert">{error}</p>}
      {!error && !student && <p className="status">Loading student…</p>}
      {student && (
        <StudentForm initialValues={student} submitLabel="Save Changes" onSubmit={handleSubmit} />
      )}
    </section>
  )
}

export default EditStudent
