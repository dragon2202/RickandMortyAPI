import React, { useState, useEffect } from 'react'
import CHARACTER_FIRSTSEEN from '../components/character_firstseen'

export default function Home() {
    const url = "https://rickandmortyapi.com/api/character"
    const [totalCharacters, setTotalCharacters] = useState(null)
    useEffect(() => {
        fetch(url).then(res => {
            if (res.status >= 400 && res.status < 600) {
                throw new Error("Bad response from server");
            }
              return res.json()
        }).then((result) => {
            setTotalCharacters(result.info.count)
        })
    }, [])

    if (totalCharacters === null) {
        return (
            <main className="home">
                <section>
                    <h4 className="home-header">Home</h4>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </section>
            </main>
        )
    }

    return (
        <main className="home">
            <section>
                <h4 className="home-header">Home</h4>
                <div className='card-grid'>
                    <div className="group-one">
                        <div className='item-one'>
                            <CHARACTER_FIRSTSEEN id={Math.floor(Math.random() * totalCharacters) + 1} />
                        </div>
                        <div className='item-two'>
                            <CHARACTER_FIRSTSEEN id={Math.floor(Math.random() * totalCharacters) + 1} />
                        </div>
                    </div>
                    <div className="group-two">
                        <div className='item-one'>
                            <CHARACTER_FIRSTSEEN id={Math.floor(Math.random() * totalCharacters) + 1} />
                        </div>
                        <div className='item-two'>
                            <CHARACTER_FIRSTSEEN id={Math.floor(Math.random() * totalCharacters) + 1} />
                        </div>
                    </div>
                    <div className="group-three">
                        <div className='item-one'>
                            <CHARACTER_FIRSTSEEN id={Math.floor(Math.random() * totalCharacters) + 1} />
                        </div>
                        <div className='item-two'>
                            <CHARACTER_FIRSTSEEN id={Math.floor(Math.random() * totalCharacters) + 1} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}