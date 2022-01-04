import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CHARACTER_LIST_PAGINATION from '../components/character_list_pagination'

const SearchandFilter = ({ setSearch, setStatus, setGender, setSpecies, setType }) => {
    return (
        <div>
            <div className='input-search'>
                Name: <input type="text" maxLength="8" size="20" onChange={(e) => { setSearch(e.target.value) }} />
            </div>
            <div className="nested-select">
                <div className='select-status'>
                    <label>Status: </label>
                    <select className="select">
                        <option value="None" onClick={() => { setStatus('') }}>None</option>
                        <option value="alive" onClick={() => { setStatus('alive') }}>Alive</option>
                        <option value="dead" onClick={() => { setStatus('dead') }}>Dead</option>
                        <option value="unknown" onClick={() => { setStatus('unknown') }}>Unknown</option>
                    </select>
                </div>
                <div className='select-gender'>
                    <label>Gender: </label>
                    <select className="select">
                        <option value="None" onClick={() => { setGender('') }}>None</option>
                        <option value="male" onClick={() => { setGender('male') }}>Male</option>
                        <option value="female" onClick={() => { setGender('female') }}>Female</option>
                        <option value="genderless" onClick={() => { setGender('genderless') }}>Genderless</option>
                        <option value="unknown" onClick={() => { setGender('unknown') }}>Unknown</option>
                    </select>
                </div>
            </div>
            <div className='species-search'>
                Species: <input type="text" maxLength="8" size="20" onChange={(e) => { setSpecies(e.target.value) }} />
            </div>
            <div className='type-search'>
                Subspecies: <input type="text" maxLength="8" size="20" onChange={(e) => { setType(e.target.value) }} />
            </div>
        </div>
    )
}

export default function Character_List() {
    const [url, setUrl] = useState("https://rickandmortyapi.com/api/character")
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const [gender, setGender] = useState('')
    const [species, setSpecies] = useState('')
    const [type, setType] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [allCharacters, setAllAcharacters] = useState(null)

    useEffect(() => {
        fetch(url + "?page=" + currentPage + "&name=" + search + "&status=" + status + "&gender=" + gender + "&species=" + species + "&type=" + type).then(res => {
            if (res.status >= 400 && res.status < 600) {
                setCurrentPage(1)
            }
            return res.json()
        }).then((result) => {
            setAllAcharacters(result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, currentPage, search, status, gender, species, type])

    if (allCharacters === null) {
        return (
            <main className="characters">
                <section>
                    <h4 className="characters-header">Characters</h4>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </section>
            </main>
        )
    }
    //handles bad query strings involving name
    if (allCharacters.error === "There is nothing here") {
        return (
            <main className="characters">
                <section>
                    <h4 className="characters-header">Characters</h4>
                    <SearchandFilter setSearch={setSearch} setStatus={setStatus} setGender={setGender} setSpecies={setSpecies} setType={setType}/>
                    <p style={{ textAlign: 'center' }}>No Results Found</p>
                </section>
            </main>
        )
    }

    return (
        <main className="characters">
            <section>
                <h4 className="characters-header">Characters</h4>
                <SearchandFilter setSearch={setSearch} setStatus={setStatus} setGender={setGender} setSpecies={setSpecies} setType={setType}/>
                <CHARACTER_LIST_PAGINATION currentPage={currentPage} setCurrentPage={setCurrentPage} numofPages={allCharacters.info.pages} setUrl={setUrl} next={allCharacters.info.next} prev={allCharacters.info.prev} />
                <Row xl={5} lg={5} md={3} sm={2} xs={1} className="g-4">
                    {
                        allCharacters.results.map(item => {
                            return (
                                <Col key={item.id}>
                                    <Card className="text-center">
                                        <Card.Header><Link to={"/character/" + item.id}>{item.name}</Link></Card.Header>
                                        <Card.Img src={item.image} className="image" />
                                        <Card.Body>
                                            <Card.Text>
                                                Status - {item.status}
                                            </Card.Text>
                                            <Card.Text>
                                                Species - {item.species}
                                            </Card.Text>
                                            {(item.type !== "") ? <Card.Text> Subspecies - {item.type} </Card.Text> : <Card.Text> Subspecies - None </Card.Text>}
                                            <Card.Text>
                                                Gender - {item.gender}
                                            </Card.Text>
                                            <Card.Text>
                                                Origin - {item.origin.name}
                                            </Card.Text>
                                            <Card.Text>
                                                Current Location (as of the most current episode) - {item.location.name}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            )
                        })
                    }
                </Row>
                <CHARACTER_LIST_PAGINATION currentPage={currentPage} setCurrentPage={setCurrentPage} numofPages={allCharacters.info.pages} setUrl={setUrl} next={allCharacters.info.next} prev={allCharacters.info.prev} />
            </section>
        </main>
    )

}