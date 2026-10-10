// Every call goes through the Vite proxy: /api/<route> -> http://localhost:3000/<route>
//
// The backend renders EJS pages (HTML), it has no JSON API. So:
//   - reads:  fetch the HTML page and pull the data out of it with DOMParser
//   - writes: send the same request the EJS form sends; the backend answers
//             with a redirect to /getdata, which we treat as "success"

const API = '/api'

async function request(path, options = {}) {
  let res
  try {
    // 'manual' = don't follow the backend's redirect, just tell us it happened
    res = await fetch(API + path, { redirect: 'manual', ...options })
  } catch {
    throw new Error('Could not reach the server.')
  }

  if (res.type === 'opaqueredirect') return null
  if (!res.ok) {
    throw new Error(`Backend error (${res.status}). Is the backend running on port 3000?`)
  }
  return res.text()
}

// Only the fields of the Student model (backend/models/Student.js)
const pickFields = ({ name, age, course, email }) => ({ name, age, course, email })

const postJson = (data) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(pickFields(data)),
})

// students.ejs renders one .card per student:
//   <p><strong>Name:</strong> Rahul</p> ... <a href="/edit/<id>" class="edit">
function parseStudents(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  return [...doc.querySelectorAll('.card')].map((card) => {
    const student = {
      _id: card.querySelector('a.edit').getAttribute('href').split('/').pop(),
    }

    card.querySelectorAll('p').forEach((p) => {
      const label = p.querySelector('strong').textContent // "Name:"
      const key = label.replace(':', '').trim().toLowerCase() // "name"
      student[key] = p.textContent.slice(label.length).trim()
    })

    return student
  })
}

export async function getStudents() {
  return parseStudents(await request('/getdata'))
}

// The /edit/:id page does not show the course, so pick the student from the list
export async function getStudent(id) {
  const student = (await getStudents()).find((s) => s._id === id)
  if (!student) throw new Error('Student not found.')
  return student
}

export function createStudent(student) {
  return request('/createdata', postJson(student))
}

export function updateStudent(id, student) {
  return request(`/update/${encodeURIComponent(id)}`, postJson(student))
}

export function deleteStudent(id) {
  return request(`/delete/${encodeURIComponent(id)}`)
}
