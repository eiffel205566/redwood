import { Link, routes } from '@redwoodjs/router'

const BlogLayout = ({ children }) => {
  return (
    <>
      <h1>
        <Link to={routes.home()}>Redwood Blog</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to={routes.about()}>About</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout

// const BlogLayout = ({ children }) => {
//   return (
//     <>
//       {children}
//       <h1>xxx</h1>
//     </>
//   )
// }
