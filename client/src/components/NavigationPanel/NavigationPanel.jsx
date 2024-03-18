import { useState } from "react"
import { Link } from "react-router-dom"

export function NavigationPanel({ setUser, setActiveComponent, activeComponent }) {
    function handleOnClick(event) {
        console.log(event)
        setActiveComponent()
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    {links.map((link) => (
                        <div key={link.path} className="card" onClick={(event) => {handleOnClick(event)}}>
                            <div className="card-title">{link.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const links = [
    {
        path: '/map/explore',
        title: 'Explore Map',
        icon: '',
    },
    {
        path: '/home/saved',
        title: 'Saved Locations',
        icon: '',
    },
    {
        path: '/search',
        title: 'Search',
        icon: '',
    },
    {
        path: '/home/add-location',
        title: 'Add Location',
        icon: '',
    },
    {
        path: '/home/history',
        title: 'History',
        icon: '',
    },
    {
        path: '/',
        title: 'Log Out',
        icon: '',
    },
]