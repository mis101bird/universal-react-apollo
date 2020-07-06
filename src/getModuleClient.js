import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

/**
 * get module's apollo client with server side prefetched state in client side
 * @param {String} moduleId: The module id for identity
 * @param {Object} httpLinkConfig apollo-link-http constructor config object (available options: https://www.apollographql.com/docs/link/links/http/#options) - optional
 * @param {Object} inMemoryCacheConfig apollo client InMemoryCache constructor config object (available options: https://www.apollographql.com/docs/react/advanced/caching/#configuration) - optional
 */
export default function getModuleClient(
  moduleId,
  httpLinkConfig,
  inMemoryCacheConfig
) {
  // create apollo client
  const client = new ApolloClient({
    link: createHttpLink(
      httpLinkConfig || {
        uri: "/graphql",
        credentials: "same-origin"
      }
    ),
    cache: new InMemoryCache(inMemoryCacheConfig).restore(
      window[moduleId] || {}
    ),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all"
      },
      query: {
        errorPolicy: "all"
      },
      mutate: {
        errorPolicy: "all"
      }
    }
  });

  return client;
}
