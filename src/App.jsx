import { useEffect, useRef, useState } from 'react'
import './App.css'
import FormDialog from './components/Dialogue';

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(()=> {
    getEvents()
  }, []);

  const getEvents = async ()=> {
    const result = await fetch(`https://api.aplbcevents.com:8080/events`, {
      method: 'GET',
    });

    const {data} = await result.json();
    setEvents(data);
  }

  const acceptEvents = async (formJSON)=> {
    console.log({...formJSON, events: selectedEvents})
    const result = await fetch(`https://api.aplbcevents.com:8080/events`, {
      method: 'POST',
      body: JSON.stringify({...formJSON, events: selectedEvents}),
    });

    const {data} = await result.json();
    console.log(data);
  }
  
  const acceptRef = useRef(null);
  const [month, setMonth] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedRegions, setSelectedRegion] = useState([]);
  const handleSelectRegion = (region) => {
    setSelectedRegion(prev=> {
      if (prev.includes(region)) {
        return prev.filter(item=> item !== region);
      } 

      return [...prev, region];
    })
  }

  const handleSelectEvent = (data) => {
    setSelectedEvents(prev=> {
      if (prev.find(item=> item.event === data.event)) {
        return prev.filter(item=> item.event !== data.event);
      } 
      acceptRef.current?.scrollIntoView({
        behavior: 'smooth',
      })

      return [...prev, data];
    });
  }

  const total = selectedEvents?.map(x=> x.hotel_cost)?.reduce((a, b)=> a + b, 0);
  
  const navList = [
    {
      title: 'About Us',
      url: '/about-us',
    }
  ]

  const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const filteredEvents = events?.filter(item=> {
    return (
      (!month || item.month === month) 
      && 
      (!selectedRegions.length || selectedRegions.includes(item.region))
    )
  })

  return (
    <div className="w-screen max-w-full h-screen">
      <div className='hero bg-blend-multiply bg-black bg-opacity-[0.3] h-[60vh] md:h-[99vh]'>
        <header className="lg:max-w-[1240px] mx-auto header-wrap bg-transparent text-white">
          <div className="header-wrap-inner flex items-center justify-between px-4 py-3 md:px-8">
            {/* Left Part: Logo */}
            <div className="left-part flex items-center">
              <button
                className="mobile-hamburger block md:hidden text-white focus:outline-none"
                aria-controls="site-menu"
                aria-expanded="false"
                onClick={()=> setOpenMenu(true)}
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
              <a href="https://ap-lbc.com/" className="branding-title ml-3 text-lg font-bold">
                <img
                  className="w-36"
                  src="https://ap-lbc.com/wp-content/uploads/2023/07/APLBC-Logos-2022-Half-White-1.png"
                  alt="APLBC"
                />
              </a>
            </div>

            {/* Right Part: Navigation */}
            <div className="flex-1 px-4 right-part hidden md:block">
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

            {/* Optional CTA */}
            <div className="menu-optional hidden md:block">
              <a
                href="http://properties.ap-lbc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="button btn-optional ml-2 bg-black text-white hover:text-white px-4 py-3 rounded hover:bg-[#b49c4f] !min-w-max transition"
              >
                Explore our properties
              </a>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            id="site-menu"
            className={`mobile-overlay ${openMenu? "block" : "hidden"} md:hidden fixed inset-0 bg-gray-900 bg-opacity-80 z-50`}
          >
            <div className="close-bar flex justify-end p-4">
              <button
                className="icon-button text-white"
                aria-label="Close"
                onClick={()=> setOpenMenu(true)}
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
            </div>
          </div>
        </header>

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

      <section className='lg:max-w-[1240px] mx-auto md:px-16 md:py-12 px-6 py-6 flex flex-col gap-8'>
        <p className='text-center font-bold'>
          Welcome to APLBC's 2025 events calendar!
          <br />
          We invite you to explore our calendar of tradeshows, events, and sales blitz initiatives.
          <br />
          With limited spots available for enrollment, act quickly to:
        </p>

        <div className='bg-[#b49c4f] mx-auto w-max px-12 py-2'>
          <ul className='list-disc text-white font-bold'>
            <li>Elevate your brand's visibility</li>
            <li>Expand market presence</li>
            <li>Connect with targeted audiences</li>
          </ul>
        </div>
      </section>

      <hr className='border-black my-4'/>

      <section className='lg:max-w-[1240px] mx-auto text-center md:px-16 px-6 py-6 flex flex-col gap-4'>
        <p className=''>
          Don't miss out! Secure your spot on a first-come, first-served basis and join us in driving business success.
          <br />
          <strong>Enrollments are open till December 20th 2024.</strong>
        </p>
        <p className='text-[#b49c4f] italic text-[17px]'>
          Choose your events: Check the boxes next to the events you are interested in and click <span className='font-bold'>"Accept"</span> to secure your spot.
        </p>
      </section>

      <section className='lg:max-w-[1240px] mx-auto md:px-16 px-6 py-6 flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-4 flex-wrap-reverse'>
          <label className='flex flex-col gap-1'>
            Select Month
            <select 
              className='w-[200px] p-2 rounded border'
              value={month}
              onChange={({target})=> setMonth(target.value)}
            >
              <option value="">All</option>
              {mL.map((item, i)=> {

                return <option  key={i} value={item}>{item}</option>
              })}
            </select>
          </label>
          <div className='flex-1 flex gap-2 items-center justify-between md:justify-end flex-wrap md:flex-nowrap min-w-full md:min-w-max'>
            <h2 className='font-bold text-lg md:text-right'>
              Subtotal
              <br />
              <span className='font-light'>£{total/100}.00</span>
            </h2>
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:justify-between gap-4'>
          <div className='w-max h-max flex flex-col gap-4 md:basis-[28%] xl:basis-[20%]'>
            <h2 className='font-bold text-lg'>Region</h2>
            
            <div className='flex flex-col gap-1'>
            {["Africa", "Asia", "America", "EMEA", "UK"].map((item, i)=> (
              <label 
                key={i} 
                className='flex gap-4'
                onClick={()=> handleSelectRegion(item)}
              >
                <div 
                  type="checkbox" 
                  name={item} 
                  className={`rounded border h-5 w-5 ${selectedRegions?.includes(item)? 'bg-[#b49c4f]' : 'bg-gray-200'}`}
                />
                {item}
              </label>
            ))}
            </div>
          </div>
          
          <div className='flex-1 flex flex-col items-end gap-4 max-w-max'>
            <div 
              className='flex items-center gap-4 w-full'
              onClick={()=> {
                if (selectedEvents.length === filteredEvents.length) {
                  setSelectedEvents([]) 
                } else {
                  setSelectedEvents(filteredEvents);
                  acceptRef.current?.scrollIntoView({
                    behavior: 'smooth',
                  });
                } 
              }}
            >
              <div 
                type="checkbox"
                className={`rounded border h-5 w-5 ${selectedEvents.length === filteredEvents.length? 'bg-[#b49c4f]' : 'bg-gray-200'}`}
              />
              <h2 className='text-lg cursor-pointer'>Select All</h2>
            </div>
            <div className='flex flex-col gap-4 max-h-[80vh] overflow-auto border-box'>
            {filteredEvents.map((item, i) => {
              
              return (
                <div 
                  key={i} 
                  className={`
                    flex bg-gray-200 p-4 lg:w-[700px] max-w-[100%] min-h-max overflow-auto
                    cursor-pointer active:scale-[101%]
                  `}
                  onClick={()=> handleSelectEvent(item)}
                >
                  <div className='flex flex-col gap-4 basis-[100px]'>
                    <div 
                      type="checkbox" 
                      name={item} 
                      className={`
                        rounded border h-5 w-5 
                        ${selectedEvents?.find(i=> i.event === item.event)
                        ? 'bg-[#b49c4f]' : 'bg-white'}
                      `}
                    />
                    <p className='text-[#b49c4f] text-[15px] font-bold'>
                    {mS[mL.findIndex((i)=> i.toLowerCase() == item.month.toLowerCase())] || "TBA"}
                    <br />
                    {mS[mL.findIndex((i)=> i.toLowerCase() == item.month.toLowerCase())] && (new Date(item.start_date)).getDay()+1} 
                    {item.end_date !== item.start_date? 
                    <span>
                      - {(new Date(item.end_date)).getDay()+1}
                      <br />
                      {mS[(new Date(item.end_date)).getMonth()]}
                    </span>
                    : ""}
                    </p>
                  </div>
                  <div className='relative'>
                    <p><strong>{item.event}</strong></p>
                    <p><small>{item.segment}</small></p>
                    <p><small><strong>{item.city}</strong></small></p>
                    <p className='relative bottom-0 mt-4'><strong>£{item.hotel_cost/100}.00</strong></p>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        </div>

        <button 
          ref={acceptRef}
          className={`
            w-full md:w-[400px] md:h-[60px] mx-auto
            flex justify-between items-center gap-2 font-bold text-[20px]
            ${total? "bg-[#b49c4f]" : "bg-gray-200"}
          `}
          onClick={()=> {
            total?
            setOpen(true)
            : alert('You must select atleat one event to continue.')
          }}
          disabled={total === 0}
        >
          Accept
          <span className='font-normal'>£{total/100}.00</span>
        </button>
      </section>

      <FormDialog total={`£${total/100}.00`} open={open} setOpen={setOpen} handleSubmit={acceptEvents} />
    </div>
  )
}

export default App
