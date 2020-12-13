import { graphql, useStaticQuery } from 'gatsby';

const useNavbarLinks = () => {
  const results = useStaticQuery(
    graphql`
      query NAVBAR_LINKS_QUERY {
        allConfigJson {
          nodes {
            links {
              index
              name
              to
            }
          }
        }
      }
    `
  );

  const links = results.allConfigJson.nodes[0].links;

  return links;
};

export default useNavbarLinks;