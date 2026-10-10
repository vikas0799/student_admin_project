import { useState } from 'react'
import { Link } from 'react-router-dom'

const EMPTY = { name: '', age: '', course: '', email: '' }

// Shared by the Add and Edit pages
function StudentForm({ initialValues = EMPTY, submitLabel, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      await onSubmit(values)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="alert">{error}</p>}

      <label>
        Name
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Age
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          min="1"
          value={values.age}
          onChange={handleChange}
        />
      </label>

      <label>
        Course
        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={values.course}
          onChange={handleChange}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <div className="actions">
        <button type="submit" className="btn" disabled={saving}>
          {saving ? 'Saving…' : submitLabel}
        </button>
        <Link to="/students" className="btn btn-outline">
          Cancel
        </Link>
      </div>
    </form>
  )
}

export default StudentForm
