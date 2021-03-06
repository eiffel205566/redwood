import { Link, routes } from '@redwoodjs/router'
import { Dots } from '../../components/Misc/svg'
// import { useAuth } from '@redwoodjs/auth'

const TypeLayout = ({
  children,
  logInRevised,
  logOutRevised,
  isAuthenticated,
  currentUser,
  setShowSidebar,
  showSidebar,
}) => {
  // const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  const { sideBarShowed } = showSidebar

  const onClick = (e) => {
    e.preventDefault()

    setShowSidebar((state) => {
      return {
        ...state,
        sideBarShowed: !state.sideBarShowed,
      }
    })
  }

  return (
    <>
      {/*

      */}
      <div className="absolute overflow-y-hidden bg-gray-700 -z-10 min-h-screen w-full"></div>
      <header className="relative flex justify-between items-center py-4 px-8 bg-gray-500 text-white">
        <h1 className="flex text-3xl font-semibold tracking-tight">
          <div
            className="border border-transparent hover:text-gray-300 cursor-pointer"
            onClick={onClick}
          >
            <Dots
              className={
                sideBarShowed
                  ? 'h-full w-6 transition duration-500 ease-in-out transform'
                  : 'h-full w-6 transition duration-500 ease-in-out transform rotate-90'
              }
            />
          </div>
          <Link
            className="hover:text-gray-300 transition duration-100 px-2 text-base md:text-xl"
            to={routes.home()}
          >
            Exp Insight
          </Link>
        </h1>
        <nav>
          <ul className="flex justify-end space-x-2">
            <li>
              <Link
                className="hover:text-gray-300 transition duration-100 mx-5 text-sm md:text-xl"
                to={routes.about()}
              >
                About
              </Link>
            </li>
            <li>
              <button
                className="hover:text-gray-300 transition duration-100 mx-5 text-sm md:text-xl"
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

export default TypeLayout
