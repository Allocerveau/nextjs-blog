"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.config = void 0;

var _apolloServerMicro = require("apollo-server-micro");

var _apolloResolvers = require("@searchkit/apollo-resolvers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    type Query {\n      root: String\n    }\n\n    type Mutation {\n      root: String\n    }\n\n    type HitFields {\n      vendeurs: String\n      product_names: String\n      product_imagelinks: String\n      marques: String\n      categories: [String]\n      product_links: String\n      product_prices: String\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var searchkitConfig = {
  host: 'http://localhost:9200/',
  index: 'sami_site_v2',
  hits: {
    fields: ['vendeurs', 'product_names', 'product_imagelinks', 'marques', 'categories', 'product_links', 'product_prices']
  },
  sortOptions: [{
    id: 'relevance',
    label: "Relevance",
    field: [{
      "product_prices": "asc"
    }],
    defaultOption: true
  }],
  query: new _apolloResolvers.MultiMatchQuery({
    fields: ['product_names', 'categories']
  }),
  facets: [new _apolloResolvers.RefinementSelectFacet({
    field: 'vendeurs',
    identifier: 'vendeurs',
    label: 'vendeurs'
  }), new _apolloResolvers.RefinementSelectFacet({
    field: 'marques',
    identifier: 'marques',
    label: 'marques'
  }), new _apolloResolvers.RefinementSelectFacet({
    field: 'categories.keyword',
    identifier: 'categories',
    label: 'categories'
  }), new _apolloResolvers.RangeFacet({
    field: 'product_prices',
    identifier: 'product_prices',
    label: 'product_prices',
    range: {
      min: 0,
      max: 500000,
      interval: 15000
    }
  })]
};
var typeDefs = [(0, _apolloServerMicro.gql)(_templateObject()), _apolloResolvers.SearchkitSchema];
var config = {
  api: {
    bodyParser: false
  }
};
exports.config = config;
var server = new _apolloServerMicro.ApolloServer({
  typeDefs: typeDefs,
  resolvers: _objectSpread({}, (0, _apolloResolvers.SearchkitResolvers)(searchkitConfig)),
  introspection: true,
  playground: true,
  context: {}
});

var _default = server.createHandler({
  path: '/api/graphql'
});

exports["default"] = _default;