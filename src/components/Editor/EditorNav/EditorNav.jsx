import React from 'react'
import { NavLink } from 'react-router-dom';

export default function EditorNav() {
    return (
        <div className="cms-navbar">
            <ul>
                <li>
                    <NavLink to="/editor/home">Lead</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/about">About Us</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/projects">Projects</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/news">News</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/careers">Careers</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/assets">Asssets</NavLink>
                </li>
            </ul>
        </div>
    )
}
