import { useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm.jsx'
import { createStudent } from '../api/studentApi.js'

function AddStudent() {
  const navigate = useNavigate()

  async function handleSubmit(values) {
    await createStudent(values)
    navigate('/students')
  }

  return (
    <section className="form-page">
      <h1>Add Student</h1>
      <StudentForm submitLabel="Add Student" onSubmit={handleSubmit} />
    </section>
  )
}

export default AddStudent
