import BlogLayout from 'src/layouts/BlogLayout/BlogLayout'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { Calculator, Money } from 'src/components/Misc/svg'
import { useAuth } from '@redwoodjs/auth'
import Footer from 'src/layouts/CommonLayout/Footer'
import { LandingPageTag } from 'src/components/Misc/UtilityFunc'
import {
  BiCart,
  BiCoffee,
  BiGasPump,
  BiDollarCircle,
  BiDesktop,
  BiTrophy,
} from 'react-icons/bi'
import { FcComboChart, FcInspection, FcDoughnutChart } from 'react-icons/fc'

const AboutPage = () => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()

  //* testing logged-in user

  return (
    <CommonLayout
      isLandingPage={true}
      showSidebar={{}}
      setShowSidebar={() => {}}
      maxWidth="1"
      logIn={logIn}
      logOut={logOut}
      isAuthenticated={isAuthenticated}
      currentUser={currentUser}
    >
      <div className="aboutPageContainer max-w-5xl mx-auto px-2 overflow-hidden text-white min-h-screen select-none">
        <section className="aboutPageTextContainer pt-10 sm:px-0 flex flex-col">
          <div className="welcomeMessageAndHeading">
            <p className="font-light font-bold text-5xl mb-2">
              Welcome To ExpInsight
            </p>
            <p className="text-lg">
              This is a site written with some cool new tools to
              <span>
                <Calculator className="h-6 w-6 inline" />
              </span>
              how much
              <span>
                <Money className="h-6 w-6 inline" />
              </span>
              you spend on gummybears :D
            </p>
          </div>
        </section>

        <section className="features mt-10">
          <p className="text-3xl">Features & Notes:</p>
          <div className="expLine w-full flex h-12">
            <div className="h-full my-auto flex flex-col justify-center">
              <p className="text-md sm:text-xl"> - Create Your Expense Type</p>
            </div>
            <div className="wrapper h-full flex flex-col justify-center">
              <BiCart className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="wrapper h-full flex flex-col justify-center">
              <BiCoffee className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="wrapper h-full flex flex-col justify-center">
              <BiGasPump className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          </div>
          <div className="incomeLine w-full flex h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl"> - Create Your Income Type</p>
            </div>

            <div className="wrapper h-full flex flex-col justify-center">
              <BiDollarCircle className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="wrapper h-full flex flex-col justify-center">
              <BiDesktop className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="wrapper h-full flex flex-col justify-center">
              <BiTrophy className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          </div>
          <div className="tagLine w-full flex h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl">
                {' '}
                - Attach Your Customized Tags
              </p>
            </div>
            <LandingPageTag content="My Tag" />
          </div>
          <div className="graphLine w-full flex h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl">
                {' '}
                - Enter Dollar Amount & Pick Date
              </p>
            </div>
            <div className="wrapper h-full flex flex-col justify-center">
              <FcInspection className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          </div>
          <div className="graphLine w-full flex h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl"> - View Your Cash Balance</p>
            </div>
            <div className="wrapper h-full flex flex-col justify-center">
              <FcComboChart className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          </div>
          <div className="graphLine w-full flex h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl">
                {' '}
                - View Your Income/Exp Breakdown
              </p>
            </div>
            <div className="wrapper h-full flex flex-col justify-center">
              <FcDoughnutChart className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          </div>
        </section>

        <section className="incomingFeatures my-10 flex flex-col">
          <p className="text-3xl">Incoming Features:</p>
          <div className="h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl">
                - Global State Management w/ Redux Saga
              </p>
            </div>
          </div>
          <div className="h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl">- CSV File Upload</p>
            </div>
          </div>
          <div className="h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl">- Multi-Entry Input</p>
            </div>
          </div>
          <div className="h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl">- Connection Pooling</p>
            </div>
          </div>
          <div className="h-12">
            <div className="h-full flex flex-col justify-center">
              <p className="text-md sm:text-xl">- User Profile Management</p>
            </div>
          </div>
        </section>
      </div>

      {/*
       */}
      <Footer />
    </CommonLayout>
  )
}

export default AboutPage

/*
 */
