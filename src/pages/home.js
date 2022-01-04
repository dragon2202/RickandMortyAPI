import React from 'react'
import CHARACTER_FIRSTSEEN from '../components/character_firstseen'

export default function Home() {
    return (
        <main className="home">
            <section>
                <h4 className="home-header">Home</h4>
                <CHARACTER_FIRSTSEEN/>
            </section>
        </main>
    )
}