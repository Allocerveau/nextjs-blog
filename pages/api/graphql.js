
import { ApolloServer, gql } from 'apollo-server-micro'
import cors from 'micro-cors'
import {
  MultiMatchQuery,
  SearchkitResolvers,
  SearchkitSchema,
  RefinementSelectFacet,
  DateRangeFacet,
  RangeFacet,
  SearchkitResolver,
  GeoBoundingBoxFilter
} from '@searchkit/apollo-resolvers'

const searchkitConfig = {
  host: 'https://zeedl6yqtm:3zk96wl5sb@sami-3600596188.eu-central-1.bonsaisearch.net:443',
  index: 'sami_site_v2',
  hits: {
    fields: ['vendeurs','product_names','product_imagelinks','marques','categories','product_links','product_prices']
  },
  sortOptions: [
    { id: 'product_prices', label: "Prix Produit", field: [{"product_prices": "asc"}], defaultOption: false}
  ],
  query: new MultiMatchQuery({ fields: ['product_names','categories','vendeurs'] }),
  facets: [
    
    new RefinementSelectFacet({
      field: 'vendeurs',
      identifier: 'vendeurs',
      label: 'vendeurs'
    }),
        
    new RefinementSelectFacet({
      field: 'marques',
      identifier: 'marques',
      label: 'marques'
    }),
        
    new RefinementSelectFacet({
      field: 'categories.keyword',
      identifier: 'categories',
      label: 'categories'
    }),
        
    new RangeFacet({
      field: 'product_prices',
      identifier: 'product_prices',
      label: 'product_prices',
      range: {
        min: 0,
        max: 750000,
        interval: 15000
      }
    }),
        
  ]
}

const typeDefs = [
  gql`
    type Query {
      root: String
    }

    type Mutation {
      root: String
    }

    type HitFields {
      vendeurs: String
      product_names: String
      product_imagelinks: String
      marques: String
      categories: [String]
      product_links: String
      product_prices: String
    }
  `,
  SearchkitSchema
]

export const config = {
  api: {
    bodyParser: false
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...SearchkitResolvers(searchkitConfig)
  },
  introspection: true,
  playground: true,
  context: {}
})

export default server.createHandler({ path: '/api/graphql' })
