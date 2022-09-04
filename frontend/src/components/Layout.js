import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        {/* <ul>
          <li>
            <Link to="/graphlist">GraphList</Link>
          </li>
          <li>
            <Link to="/graphdetails">GraphDetails</Link>
          </li>
        </ul> */}
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
