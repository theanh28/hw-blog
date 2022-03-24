import { Link } from "react-router-dom";

import { ReactComponent as LogoIcon } from "./logo.svg";
import { ReactComponent as MenuIcon } from "./menu-icon.svg";

const Header = () => {
  return (
    <div className="container-fluid bg-cover py-1" id="home">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-sm-3">
            <Link to="/">
              <LogoIcon className="text-light" />
            </Link>
          </div>
          <h2 className="d-none d-sm-flex col-sm-6 justify-content-center font-weight-bold text-light font-size">
            Quik bloG
          </h2>
          <div className="col-6 col-sm-3 d-flex justify-content-end">
            <div class="dropdown">
              <button class="btn" type="button" data-toggle="dropdown">
                <MenuIcon className="text-light" />
              </button>
              <div class="dropdown-menu mt-2">
                <Link class="dropdown-item" to='/blog-create'>
                  New Blog
                </Link>
                <Link class="dropdown-item" to='profile'>
                  Your Profile
                </Link>
                <Link class="dropdown-item" to=''>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
