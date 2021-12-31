import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Home from './home'
import Characters from './character_list'
import CHARACTER_OVERVIEW from './character_overview'
import NotFound from './notfound'

//This page serves Single Pages
//Designed this way in case I need more pages
export default function Router() {
    return (
        <Routes>
            <Route path="/overview/:id" element={<CHARACTER_OVERVIEW />}></Route>
            <Route exact path="/characters" element={<Characters />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route path='/*' element={<NotFound />} > </Route>
        </Routes>
    )
}