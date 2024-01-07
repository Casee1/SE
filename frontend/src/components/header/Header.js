import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink, Link} from "react-router-dom";
import { useUser } from '../context/UserContext';
import SearchBar  from "../SearchBar/SearchBar";

const Header = () => {
 const { username } = useUser();
return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" style={{"color":'gold'}}>
                <FontAwesomeIcon icon ={faVideoSlash}/>Gold
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className ="nav-link" to="/">Home</NavLink>
                    <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>
                    <SearchBar/>
                </Nav>
                <div className={"buttons"}>
                    {username === '' ? (
                        <>
                            <Link to="/login">
                                <Button variant="outline-info" className="me-2">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="outline-info">
                                    Register
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className={"username"}>
                                <span>{username}</span>
                            </div>
                            <Link to="/logout">
                                <Button variant="outline-info">
                                    Logout
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header