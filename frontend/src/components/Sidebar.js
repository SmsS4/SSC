import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import {useState } from "react";


import { useHistory } from "react-router-dom";

const StyledSideNav = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    width: 75px;     /* Set the width of the sidebar */
    z-index: 1;      /* Stay on top of everything */
    top: 0;      /* Stay at the top */
    background-color: #222; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 5em;
`;

function SideNav(props) {
    const [activePath, updateActivePath] = useState(props.location.pathname);
    const state = {
        items: [
            {
              path: '/', /* path is used as id to check which NavItem is active basically */
              name: 'Home',
              css: 'fa fa-fw fa-home',
              key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
            },
            {
              path: '/writers',
              name: 'Writers',
              css: 'fas fa-chalkboard-teacher',
              key: 2
            },
            {
              path: '/tags',
              name: 'Tags',
              css: 'fas fa-hashtag',
              key: 3
            },
          ]
    }
    const items = state.items;
    const history = useHistory()
    const onItemClick = (path) => {
        updateActivePath(path);
        props.onPathChanged(path)
    }
    return (
        <StyledSideNav>
            {
                items.map((item) => {
                    return (
                        <NavItem 
                            path={item.path}
                            name={item.name}
                            css={item.css}
                            onItemClick={onItemClick}
                            active={item.path === activePath}
                            key={item.key}
                        />
                    );
                })
            }
        </StyledSideNav>
    )
}



const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 70px;
    width: 75px; /* width must be same size as NavBar to center */
    text-align: center; /* Aligns <a> inside of NavIcon div */
    margin-bottom: 0;   /* Puts space between NavItems */
    a {
        font-size: 2.7em;
        color: ${(props) => props.active ? "white" : "#9FFFCB"};
        :hover {
            opacity: 0.7;
            text-decoration: none; /* Gets rid of underlining of icons */
        }  
    }
`;

function NavItem(props){
    const handleClick = () => {
        props.onItemClick(props.path);
    }
    const { active } = props;
    return (
        <StyledNavItem active={active}>
            <Link 
                to={props.path}
                className={props.css}
                onClick={handleClick}
            >
                <NavIcon></NavIcon>
            </Link>
        </StyledNavItem>
    )
}

const NavIcon = styled.div``;

function Sidebar({onPathChanged}) {
    return (
        <RouterSideNav onPathChanged={onPathChanged} ></RouterSideNav>
    );
}

export default Sidebar;