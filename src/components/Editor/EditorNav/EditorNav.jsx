import React from 'react'
import { NavLink } from 'react-router-dom';

import MessagesNav from '../EditorNav/MessagesNav'

export default function EditorNav(props) {

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
                    <NavLink to="/editor/project">Project</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/news">News</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/article">Article</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/careers">Careers</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/editor/assets">Assets</NavLink>
                </li>
            </ul>
            <div>
                <MessagesNav/>
            </div>
        </div>
    )
}
