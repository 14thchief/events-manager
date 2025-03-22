import { Link } from "react-router";

function Header({ openMenu, setOpenMenu, isUser }) {
  return (
    <div className="hero bg-blend-multiply bg-black bg-opacity-[0.3] h-[60vh] md:h-[99vh]">
      <header className="lg:max-w-[1240px] mx-auto header-wrap bg-transparent text-white">
        <div className="header-wrap-inner flex items-center justify-between px-4 py-3 md:px-8">
          {/* Left Part: Logo and Mobile Hamburger */}
          <div className="left-part flex items-center">
            <button
              className="mobile-hamburger block lg:hidden text-white focus:outline-none"
              aria-controls="site-menu"
              aria-expanded="false"
              onClick={() => setOpenMenu(true)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <a
              href="https://ap-lbc.com/"
              className="branding-title ml-3 text-lg font-bold"
            >
              <img
                className="w-36"
                src="https://ap-lbc.com/wp-content/uploads/2023/07/APLBC-Logos-2022-Half-White-1.png"
                alt="APLBC"
              />
            </a>
          </div>

          {/* Right Part: Navigation */}
          <div className="flex-1 px-4 right-part hidden lg:block">
            <nav className="flex items-center justify-between gap-2 text-right">
              <a
                href="https://ap-lbc.com/about-us/"
                className="!text-white hover:text-gray-400 font-bold transition"
              >
                01
                <br />
                About Us
              </a>
              <a
                href="https://ap-lbc.com/solutions/"
                className="!text-white hover:text-gray-400 font-bold transition"
              >
                02
                <br />
                Solutions
              </a>
              <a
                href="https://ap-lbc.com/hotels-and-apartments/"
                className="!text-white hover:text-gray-400 font-bold transition"
              >
                03
                <br />
                Hotels and Apartments
              </a>
              <a
                href="https://ap-lbc.com/blog-resources/"
                className="!text-white hover:text-gray-400 font-bold transition"
              >
                04
                <br />
                Blog & Resources
              </a>
              <a
                href="https://ap-lbc.com/contact-us/"
                className="!text-white hover:text-gray-400 font-bold transition"
              >
                05
                <br />
                Contact Us
              </a>
            </nav>
          </div>

          {/* Optional CTA with Sign In */}
          <div className="menu-optional hidden lg:flex gap-4">
            <a
              href="http://properties.ap-lbc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button btn-optional ml-2 bg-black text-white hover:text-white px-4 py-3 rounded hover:bg-primary !min-w-max transition"
            >
              Explore our properties
            </a>
            <Link
              to={"/auth/cms"}
              className="button btn-signin bg-transparent border border-white text-white hover:text-gray-400 px-4 py-3 rounded transition"
            >
              {isUser ? "Portal" : "Sign In"}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          id="site-menu"
          className={`mobile-overlay ${
            openMenu ? "block" : "hidden"
          } lg:hidden fixed inset-0 bg-gray-900 bg-opacity-80 z-50`}
        >
          <div className="close-bar flex justify-end p-4">
            <button
              className="icon-button text-white"
              aria-label="Close"
              onClick={() => setOpenMenu(false)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="holder text-center text-white space-y-6 mt-8">
            <a
              href="https://ap-lbc.com/about-us/"
              className="block text-lg !text-white hover:text-gray-400 font-bold transition"
            >
              About Us
            </a>
            <a
              href="https://ap-lbc.com/solutions/"
              className="block text-lg !text-white hover:text-gray-400 font-bold transition"
            >
              Solutions
            </a>
            <a
              href="https://ap-lbc.com/hotels-and-apartments/"
              className="block text-lg !text-white hover:text-gray-400 font-bold transition"
            >
              Hotels and Apartments
            </a>
            <a
              href="https://ap-lbc.com/blog-resources/"
              className="block text-lg !text-white hover:text-gray-400 font-bold transition"
            >
              Blog & Resources
            </a>
            <a
              href="https://ap-lbc.com/contact-us/"
              className="block text-lg !text-white hover:text-gray-400 font-bold transition"
            >
              Contact Us
            </a>
            <a
              href="/auth/cms"
              className="block text-lg !text-white hover:text-gray-400 font-bold transition"
            >
              Sign In
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="lg:max-w-[1240px] mx-auto h-[75%] flex items-center bg-opacity-[0.8] px-4 py-6">
        <div className="bg-black bg-opacity-[0.7] px-10 py-4 lg:max-w-[600px] font-semibold mx-auto">
          <h1 className="text-[22px] md:text-[28px] leading-relaxed text-center text-white">
            APLBC 2025:
            <br />
            Where Business Meets Opportunity
            <br />
            Global Event Schedule & Strategic Initiatives
          </h1>
        </div>
      </section>
    </div>
  );
}

export default Header;
