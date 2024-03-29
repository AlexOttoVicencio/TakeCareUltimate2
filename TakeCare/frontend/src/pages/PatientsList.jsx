import React from 'react'
import AdminNav from '../components/navBars/AdminNavBar.jsx'
import MainFooter from '../components/footers/MainFooter'
import DisplayPatientsList from '../components/main/DisplayPatientsList.jsx'

function PatientsList() {
    return (
        <>
            <AdminNav />
            <DisplayPatientsList />
            <MainFooter />
        </>
    )
}

export default PatientsList