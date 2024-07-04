import "./header.css";
import { Link } from "react-router-dom";

function Header() {
    return(
        <header>
            <Link className="logo" to="/">React Movies</Link>
            <Link className="my-movies" to="/my-movies">Meus filmes</Link>
        </header>
    );
}

export default Header;