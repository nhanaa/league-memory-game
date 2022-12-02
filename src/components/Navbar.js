// import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (  
        <div className="navbar">
            <div className="logo-title">
                <img className="logo" src={process.env.PUBLIC_URL + "/img/logo.png"} alt="league logo"/>
                <span>Memory Match</span>
            </div>
            <div className="panel">
                <a href="/">Home</a>
                <a href="/options">Options</a>
                <a href="/about">About</a>
            </div>
        </div>
    );
}
 
export default Navbar;