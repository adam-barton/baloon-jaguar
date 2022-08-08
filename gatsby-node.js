const fetch = (args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(args))
  const crypto = require('crypto');
exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from TicketMaster API at build time
//   const result = await fetch(`${process.env.TICKETMASTER_API_URL}${process.env.TICKETMASTER_API_KEY}`)
   const result = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=AhGzIoEyHNVTJJCq2tCfIRc9clVKhYx3`)
  const resultData = await result.json()

  resultData._embedded.events.forEach (event => {
    const eventNode = {
        id: event.id,
        parent: null,
        children: [],
        internal: {
          type: `Event`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(event))
            .digest(`hex`),
            content: JSON.stringify(event),
        },
        name: event.name,
        startDate: event.dates.start.localDate,
        images: event.images,
        prices:  event.priceRanges,
        originalURL: event.url,
  }
  createNode(eventNode)
  })
}






// const axios = require('axios').default;
//   const crypto = require('crypto');
// exports.sourceNodes = async ({
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   // get data from TicketMaster API at build time
//  axios.get(`${process.env.TICKETMASTER_API_URL}${process.env.TICKETMASTER_API_KEY}`)
//  .then(function (response) {
//     // handle success
//     debugger;
//     console.log('Response', response);
//     response._embedded.events.forEach (event => {
//         const eventNode = {
//             id: event.id,
//             parent: null,
//             children: [],
//             internal: {
//               type: `Event`,
//               contentDigest: crypto
//                 .createHash(`md5`)
//                 .update(JSON.stringify(event))
//                 .digest(`hex`),
//                 content: JSON.stringify(event),
//             },
//             name: event.name,
//             startDate: event.dates.start.localDate,
//             images: event.images,
//             prices:  event.priceRanges,
//             originalURL: event.url,
//       }
//       createNode(eventNode)
//       })

//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
//   const resultData = await result.json()
// }








// Create event pages
const path = require(`path`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const eventPageTemplate = path.resolve(`src/templates/event-page.js`)

  return graphql(`
    query loadPagesQuery ($limit: Int!) {
      allEvent(limit: $limit) {
        edges {
          node {
              id
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create event pages.
    result.data.allEvent.edges.forEach(edge => {
      createPage({
        path: `/events/${edge.node.id}`,
        component: eventPageTemplate,
        context: {
            eventId: edge.node.id
        },
      })
    })
  })
}