import React from "react"
import { Link } from "react-router-dom"

function navBar({ page }) {
  const name = page
  return (
    <div>
      <nav>
        <Link to={`/${page}`}>{name}</Link>
      </nav>
    </div>
  )
}

export default navBar
