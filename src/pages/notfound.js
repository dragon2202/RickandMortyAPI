import React from 'react'
import { Link } from 'react-router-dom'

export default function notFound () {
    return (
        <main className="not-found">
            <section>
                <h3 className="not-found-header">Rick and Morty</h3>
                <div className="text">
                    Page you are looking for is not here
                    <br/>
                    <Link to="/">Return to home</Link>
                </div>
            </section>
        </main>
    )
}