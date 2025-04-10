import { gql } from "apollo-angular"

export const GET_CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
      info {
        pages
        next
      }
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }`;

  