import { Link, routes } from '@redwoodjs/router'
// import { useAuth } from '@redwoodjs/auth'

const BlogLayout = ({
  children,
  logInRevised,
  logOutRevised,
  isAuthenticated,
  currentUser,
}) => {
  // const { logIn, logOut, isAuthenticated, currentUser } = useAuth()

  return (
    <>
      <header className="relative flex justify-between items-center py-4 px-8 bg-gray-500 text-white">
        <h1 className="text-3xl font-semibold tracking-tight">
          <Link
            className="hover:text-gray-300 transition duration-100"
            to={routes.home()}
          >
            Exp Insight
          </Link>
        </h1>
        <nav>
          <ul className="flex justify-end space-x-2">
            <li>
              <Link
                className="hover:text-gray-300 transition duration-100 mx-5"
                to={routes.about()}
              >
                About
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  className="hover:text-gray-300 transition duration-100 mx-5"
                  to={routes.expenses()}
                >
                  Enter New
                </Link>
              </li>
            )}
            <li>
              <button
                className="hover:text-gray-300 transition duration-100 mx-5"
                onClick={isAuthenticated ? logOutRevised : logInRevised}
              >
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </button>
            </li>
            {isAuthenticated && currentUser?.email && (
              <li className="text-sm text-center w-6 h-6 bg-green-500 rounded-full border border-gray-100 shadow-sm">
                <span>
                  {currentUser?.email?.toString()?.toUpperCase()?.slice(0, 2)}
                </span>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
