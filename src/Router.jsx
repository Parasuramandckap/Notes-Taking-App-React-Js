import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import App from "./App";
import Edittodo from './Edit';
import Addtodo from './Addtodo';
import Deletetodo from './Delete';
const Router = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}/>
                <Route path='/add-todo' element={<Addtodo />}/>
                <Route path='/edit/:id' element={<Edittodo />}/>
                <Route path='/delete/:id' element={<Deletetodo />}/>
            </Routes>
        </BrowserRouter>
     );
}
 
export default Router;