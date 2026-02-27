import type { LinkResolverFunction } from "@prismicio/client";

/**
 * Link resolver for Prismic documents. Must match routes in nuxt.config.ts
 * (clientConfig.routes) so that PrismicLink and asLinkAttrs resolve hrefs.
 */
const linkResolver: LinkResolverFunction = (doc) => {
  if (doc.type === "page" && doc.uid === "home") {
    return "/";
  }
  if (doc.type === "page") {
    return `/${doc.uid ?? ""}`;
  }
  if (doc.type === "case_study" && doc.uid) {
    return `/case-study/${doc.uid}`;
  }
  return "/";
};

export default linkResolver;
