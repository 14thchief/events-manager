import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [events, setEvents] = useState([]);
  useEffect(()=> {
    getEvents()
  }, []);

  const getEvents = async ()=> {
    const result = await fetch(`https://api.aplbcevents.com:8080/events`, {
      method: 'GET',
    });

    const {data} = await result.json();
    console.log(data);
    setEvents(data);
  }
  
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

      return [...prev, data];
    })
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
      <header className="border h-[60px] min-h-max p-4 w-full">
      {

      }
      </header>
      <section className="hero h-[75%] max-h-[500px] flex items-center border bg-gray-100 bg-opacity-[0.8] px-4 py-6">
        <div className="bg-black bg-opacity-[0.7] px-10 py-4 lg:max-w-[500px] font-semibold mx-auto">
          <h1 className="text-[22px] text-center text-white">
            APLBC 2025:
            <br />
            Where Business Meets Opportunity
            <br />
            Global Event Schedule & Strategic Initiatives
          </h1>
        </div>
      </section>
      <section className='px-4 py-6 flex flex-col gap-4'>
        <p className='text-center font-bold'>
          Welcome to APLBC's 2025 events calendar!
          <br />
          We invite you top explore our calendar of tradeshows, events, and sales blitz initiatives.
          <br />
          With limited spots available for enrollment, act quickly to:
        </p>

        <div className='bg-yellow-600 mx-auto w-max px-12 py-2'>
          <ul className='list-disc text-white font-bold'>
            <li>Elevate your brand's visibility</li>
            <li>Expand market presence</li>
            <li>Connect with targeted audiences</li>
          </ul>
        </div>
      </section>
      <hr className='border-black my-10'/>
      <section className='text-center px-4 py-6 flex flex-col gap-4'>
        <p className=''>
          Don't miss out! Secure your spot on a first-come, first-served basis and join us in driving business success.
          <br />
          <strong>Enrollments are open till December 20th 2024.</strong>
        </p>
        <p className='text-yellow-500 italic text-[17px] font-bold'>
          Choose your events: Select the events you are interested in and click "Accept" to secure your spot.
        </p>
      </section>

      <section className='px-4 py-6 flex flex-col gap-6'>
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
            <h2 className='font-bold text-lg'>
              Subtotal:
              ${total}
            </h2>
            <button 
              className={`w-full md:w-[100px] ${total? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
              onClick={()=> {
                total?
                alert(`You are going to pay ${total}`)
                : alert('You must select atleat one event to continue.')
              }}
              disabled={total === 0}
            >
              Accept
            </button>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
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
                  className={`rounded border h-5 w-5 ${selectedRegions?.includes(item)? 'bg-blue-500' : 'bg-gray-200'}`}
                />
                {item}
              </label>
            ))}
            </div>
          </div>
          
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <div 
                type="checkbox"
                onClick={()=> selectedEvents.length === filteredEvents.length? setSelectedEvents([]) : setSelectedEvents(filteredEvents)}
                className={`rounded border h-5 w-5 ${selectedEvents.length === filteredEvents.length? 'bg-blue-500' : 'bg-gray-200'}`}
              />
              <h2 className='font-bold text-lg'>Select All</h2>
            </div>
            <div className='flex flex-col gap-4 max-h-[50vh] overflow-auto border-box'>
            {filteredEvents.map((item, i) => {
              
              return (
                <div 
                  key={i} 
                  className='flex bg-zinc-200 p-4'
                  onClick={()=> handleSelectEvent(item)}
                >
                  <div className='flex flex-col gap-4 basis-[100px]'>
                    <div 
                      type="checkbox" 
                      name={item} 
                      className={`
                        rounded border h-5 w-5 
                        ${selectedEvents?.find(i=> i.event === item.event)
                        ? 'bg-gray-800' : 'bg-white'}
                      `}
                    />
                    <p className='text-yellow-600 text-[15px] font-bold'>
                    {mS[mL.findIndex((i)=> i.toLowerCase() == item.month.toLowerCase())]}
                    <br />
                    {(new Date(item.start_date)).getDay()+1} 
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
                    <p className='relative bottom-0 mt-4'><strong>${item.hotel_cost}</strong></p>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
