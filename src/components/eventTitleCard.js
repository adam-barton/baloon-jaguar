import * as React from 'react'

const EventTitleCard = ({ eventTitle, eventDate, eventImage, button, children }) => {

  return (
      <article className="bg-white shadow-md m-4 basis-3/4 flex flex-row-reverse justify-end flex-1">
        {button}
        <header className="flex flex-col justify-center max-w-[70%]">
            <h2 className="text-2xl font-bold"> {eventTitle} </h2>
            <p>{eventDate}</p>
        </header>
     
        {children}
      </article>
  )
}
export default EventTitleCard