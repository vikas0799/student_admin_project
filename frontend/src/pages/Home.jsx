import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="home">
      <h1>Student Admin</h1>
      <p>Manage student records stored in MongoDB.</p>

      <div className="home-actions">
        <Link to="/students" className="btn">
          All student data
        </Link>
        <Link to="/students/new" className="btn btn-outline">
          Add student data
        </Link>
      </div>
    </section>
  )
}

export default Home
