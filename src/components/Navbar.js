import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faMessage, faList, faRightFromBracket, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { useHttp } from '../hooks/http.hook'
import '../css/navbar.css'
import { useDispatch, useSelector } from 'react-redux'


export const Navbar = (chat = null) => {
    const navigate = useNavigate()
    const { request } = useHttp()
    const [newMessageP, setNewMessage] = useState(false)
    const token = useSelector(state => state.token)
    const logout = useSelector(state => state.logout)
    const socket = useSelector(state => state.socket)
    const newMessage = useSelector(state => state.newMessage)
    const newMessageFlag = useSelector(state => state.newMessageFlag)
    const dispatch = useDispatch()

    const logoutHandler = event => {
        if (Object.keys(chat).length) {
            console.log(chat)
            socket.emit('leave-chat', { chatId: chat.chat })
        }
        event.preventDefault()
        logout()
        navigate('/')
    }

    const navigateTo = (event) => {
        if (Object.keys(chat).length) {
            socket.emit('leave-chat', { chatId: chat.chat }, { token: token })
        }
    }

    useEffect(() => {
        request("/api/chats/get-unread-messages", "POST", {}, { token: token }).then(data => data.json()).then(
            msgData => {
                if (msgData.unreadExists) {
                    setNewMessage(true)
                }
            }
        )
    }, [request, window.location.href])

    useEffect(() => {
        const M = window.M;
        window.document.addEventListener("DOMContentLoaded", function () {
            var elems = window.document.querySelectorAll(".sidenav");
            var instances = M.Sidenav.init(elems, {});
        });
    }, [])

    return (
        <>
            <div className='navbar-fixed'>
                <nav className='materialize-nav'>
                    <div className="nav-wrapper">
                        <a role='button' className="brand-logo cursor-pointer" id="/advertisements-list" onClick={() => { navigateTo(); navigate("/advertisements-list") }}>
                            <FontAwesomeIcon icon={faShop} className="favicon" />
                            various
                        </a>
                        {/* <a href="#" data-target="mobile-demo" className="sidenav-trigger"><FontAwesomeIcon icon={faShop} className="favicon" /></a> */}
                        <ul className="right">
                            <li><a role='button' id="/chat" onClick={() => { setNewMessage(false); dispatch({type: "SET_MSG", payload: {newMessage: null, newMessageFlag: false}}); navigateTo(); navigate("/chat") }}>
                                <FontAwesomeIcon icon={faMessage} className="favicon" />
                                <span className='navbar-text'>
                                    <span className='navbar-new-msg-txt'>{newMessageP ? "New " : (newMessage ? "New " : "")}</span>
                                    Messages
                                </span>
                            </a></li>
                            <li><a role='button' id="/advertisements-list" onClick={() => { navigateTo(); navigate("/advertisements-list") }}>
                                <FontAwesomeIcon icon={faList} className="favicon" />
                                <span className='navbar-text'>
                                    Advertisements
                                </span>

                            </a></li>
                            <li><a role='button' id="/profile" onClick={() => { navigateTo(); navigate("/profile") }}>
                                <FontAwesomeIcon icon={faUserTie} className="favicon" />
                                <span className='navbar-text'>
                                    Profile
                                </span>
                            </a></li>
                            <li><a role='button' onClick={logoutHandler}>
                                <FontAwesomeIcon icon={faRightFromBracket} className="favicon" />
                                <span className='navbar-text'>
                                    Logout
                                </span>
                            </a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <style>
                {
                    `
                     body{
                        background-color: white;
                     }
                    `
                }
            </style>
        </>
    )
}