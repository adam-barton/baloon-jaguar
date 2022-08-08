import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import EventTitleCard from '../components/eventTitleCard'
import Link from 'gatsby-link'

const EventPage = ({data}) => {
  return (
    <Layout pageTitle="Events">
      <section className='eventListContainer flex-wrap flex space-evenly'>
        {
          data.allEvent.edges.map(({node}) => (
            <EventTitleCard key={node.id} eventTitle={<Link to={"/events/" + node.id} className="underline">{node.name}</Link>} eventDate={node.startDate} >
              <div className="img-container mr-8 h-40 w-60">
                  <img src={node.images[0].url} alt={node.name} className="w-full h-full object-cover"/>
              </div>
            </EventTitleCard>
          ))
        }
      </section>
    </Layout>
)}

export const query = graphql`
query {
  allEvent(sort: {fields: startDate}) {
    edges {
      node {
        id
        name
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
  }
}
`

export default EventPage