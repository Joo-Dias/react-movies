import "./header.css";

import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        React Movies
      </Link>

      <Button variant="outlined" component={RouterLink} to="/my-movies">
        Meus Filmes
      </Button>
    </header>
  );
}

export default Header;
