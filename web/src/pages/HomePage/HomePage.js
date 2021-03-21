import BlogLayout from '../../layouts/BlogLayout'
import { useAuth } from '@redwoodjs/auth'
// import BlogPostsCell from '../../resource/background.mp4'

const HomePage = () => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()

  const logInRevised = () => {
    logIn()
    localStorage.setItem('user', currentUser?.email)
  }

  const logOutRevised = () => {
    logOut()
    localStorage.removeItem('user')
  }

  console.log(currentUser)

  return (
    <>
      <BlogLayout
        logInRevised={logInRevised}
        logOutRevised={logOutRevised}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        className="z-10"
      ></BlogLayout>
      {isAuthenticated || currentUser?.email || (
        <div id="container relative">
          <video autoPlay="true" loop playsInline muted id="video">
            <source
              src="https://www.expenseinsight.ca/resource/background.mp4"
              type="video/mp4"
            />
          </video>
          <button
            onClick={logIn}
            className="text-4xl absolute z-10 text-white hover:text-gray-500 transition duration-100 inset-1/2"
            id="btn"
          >
            Log In Here...
          </button>
        </div>
      )}
    </>
  )
}
export default HomePage
