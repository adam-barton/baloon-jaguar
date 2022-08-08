import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import EventTitleCard from '../components/eventTitleCard'

const EventPage = ({ data }) => {
  return (
    <Layout pageTitle={data.event.name}> 
            <EventTitleCard 
                eventTitle={data.event.name}
                eventImage={data.event.images[0].url} 
                eventDate={data.event.startDate} 
                button={<a className="text-2xl underline place-self-center p-4" href={data.event.originalURL} target="_blank" rel="noreferrer" >More Info</a>}
                >

                <div className="w-1/2" style={{width: "50%"}}>
                    <img src={data.event.images[0].url} alt={data.event.name} className="m-w-1/2"/>
                </div>
            </EventTitleCard>


        <button className="my-8"><Link className="text-xl leading-8 rounded-sm bg-cyan-200" to={'/'}>Back to Events</Link></button>
    </Layout>
  )
}

export const query = graphql`
  query ($eventId: String) {
    event(id: {eq: $eventId}) {
        name
        id
        startDate(formatString: "MMMM DD, YYYY")
        images {
            url
            attribution
          }
          originalURL
          prices {
            type
            currency
            min
            max
          }
      }
  }
`
export default EventPage