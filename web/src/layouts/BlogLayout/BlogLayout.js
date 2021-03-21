import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const BlogLayout = ({ children }) => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()

  return (
    <>
      <header className="relative flex justify-between items-center py-4 px-8 bg-gray-700 text-white">
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
                className="hover:text-gray-300 transition duration-100"
                to={routes.about()}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-gray-300 transition duration-100"
                to={routes.contact()}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-gray-300 transition duration-100"
                to={routes.posts()}
              >
                Posts
              </Link>
            </li>
            <li>
              <button
                className="hover:text-gray-300 transition duration-100"
                onClick={isAuthenticated ? logOut : logIn}
              >
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </button>
            </li>
            {isAuthenticated && (
              <li className="text-center w-6 h-6 bg-green-500 rounded-full border border-gray-100 shadow-sm">
                {currentUser?.email?.toString()?.toUpperCase()?.slice(0, 2)}
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
