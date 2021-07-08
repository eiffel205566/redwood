import { Fragment } from 'react'

const Footer = () => {
  return (
    <Fragment>
      <footer className="w-screen h-14 bg-sideDark footerGradient">
        <div className="max-w-5xl mx-auto footerTextContainer h-full text-white text-xs sm:text-sm select-none">
          <div className="h-full flex flex-col justify-center">
            <h3 className="w-full text-center">
              ExpInsight is a web application helping user to track expense and
              record income
            </h3>
            <h3 className="w-full text-center">
              <a className="hover:text-green-300" href="https://redwoodjs.com/">
                Redwood{' '}
              </a>
              |{' '}
              <a className="hover:text-green-300" href="https://reactjs.org/">
                React{' '}
              </a>{' '}
              |{' '}
              <a className="hover:text-green-300" href="https://graphql.org/">
                Graphql{' '}
              </a>{' '}
              |{' '}
              <a
                className="hover:text-green-300"
                href="https://tailwindcss.com/"
              >
                Tailwind{' '}
              </a>{' '}
              |{' '}
              <a className="hover:text-green-300" href="https://railway.app/">
                Postgres{' '}
              </a>{' '}
              |{' '}
              <a className="hover:text-green-300" href="https://www.prisma.io/">
                Prisma{' '}
              </a>{' '}
            </h3>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer
