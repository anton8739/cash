import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from "./components/pages/LoginPage/LoginPage";
import MainPage from "./components/pages/MainPage/MainPage";
import NewTransaction from "./components/pages/NewTransaction/NewTransaction";
import RequireAuth from "./hoc/RequireAuth";
import WelcomPage from "./components/pages/WelcomPage/WelcomPage";

const Rutes = () => {


    return (<Routes>

        <Route path="/" exact element={
            <RequireAuth>
                <MainPage/>
            </RequireAuth>
        }/>
        <Route path="/login" exact element={<LoginPage/>}/>
        <Route path="/addExperse" exact element={
            <RequireAuth>
                <NewTransaction type="experce"/>
            </RequireAuth>
        }/>
        <Route path="/addIncome" exact element={
            <RequireAuth>
                <NewTransaction type="income"/>
            </RequireAuth>
        }/>
        <Route path="/welcom" exact element={
            <RequireAuth>
                <WelcomPage/>
            </RequireAuth>
        }/>
        <Route
            path="*"
            element={<Navigate to="/" />}
        />
    </Routes>)

}
export default Rutes;