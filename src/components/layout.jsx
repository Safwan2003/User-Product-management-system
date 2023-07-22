import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    
    <div className="flex" >
      <div className=" w-1/5  h-screen bg-gray-200">
      <nav>
        <ul className='m-10 '>
          <li className='m-3 '>
            <Link to="/">Home</Link>
          </li>
          <li className='m-3 '>
            <Link to="/Productmanagement">Product Management</Link>
          </li>
          <li className='m-3 '>
            <Link to="/Usermanagement">User Management</Link>
          </li>
        </ul>
      </nav>
      </div>

    
<div className="w-4/5 flex  justify-center p-12 m-12 ">
      <Outlet />
      </div>
      </div>
    </>
  )
};

export default Layout;