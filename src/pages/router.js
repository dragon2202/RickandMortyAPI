import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Home from './home'
import Characters from './character_list'
import CharacterOverview from './character_overview'
import Location from './location_list'
import LocationOverview from './location_overview'
import NotFound from './notfound'

//This page serves Single Pages
//Designed this way in case I need more pages
export default function Router() {
    return (
        <Routes>
            <Route path="/character/:id" element={<CharacterOverview />}></Route>
            <Route exact path="/characters" element={<Characters />}></Route>
            <Route exact path="/location/:id" element={<LocationOverview />}></Route>
            <Route exact path="/locations" element={<Location />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route path='/*' element={<NotFound />} > </Route>
        </Routes>
    )
}