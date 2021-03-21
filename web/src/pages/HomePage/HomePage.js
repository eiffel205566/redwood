import BlogLayout from '../../layouts/BlogLayout'
import { useAuth } from '@redwoodjs/auth'
// import BlogPostsCell from '../../resource/background.mp4'

const HomePage = () => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <BlogLayout
        logIn={logIn}
        logOut={logOut}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        className="z-10"
      ></BlogLayout>
      <div id="container relative">
        <video autoPlay="true" loop playsInline muted id="video">
<<<<<<< HEAD
          <source src="../../resource/background.mp4" type="video/mp4" />
=======
          <source src="/src/resource/background.mp4" type="video/mp4" />
>>>>>>> 63471085210bf05f50a842e57562558d411ee9c3
        </video>
        <button
          onClick={logIn}
          className="text-4xl absolute z-10 text-white hover:text-gray-500 transition duration-100 inset-1/2"
          id="btn"
        >
          Log In Here...
        </button>
      </div>
    </>
  )
}
export default HomePage
