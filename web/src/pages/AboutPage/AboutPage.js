import BlogLayout from 'src/layouts/BlogLayout/BlogLayout'
import { Calculator, Money } from 'src/components/Misc/svg'

const AboutPage = () => {
  return (
    <BlogLayout>
      <div className="p-20">
        <div>
          <p className="font-light font-bold text-gray-500">
            Welcome To the Site
          </p>
          <p className="text-gray-400">
            This is a demo site written with some cool new tools to
            <span>
              <Calculator className="h-6 w-6 inline" />
            </span>
            how much
            <span>
              <Money className="h-6 w-6 inline" />
            </span>
            you spend on things :D
          </p>
        </div>
      </div>
    </BlogLayout>
  )
}

export default AboutPage
