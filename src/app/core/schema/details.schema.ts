import { gql } from "apollo-angular"

export const GET_DETAILS = gql`
query GetMultipleCharacters($ids: [ID!]!) {
  charactersByIds(ids: $ids) {
    id
    name
    status
    species
    type
    gender
    image,
    origin {
      id
      name,
      dimension
    },
    location{
      id,
      name,
      dimension
    },
    episode{
      id,
      name,
      episode,
      # characters{
      #   id,
      #   name,
      #   gender
      # }
    }
  }
}`;
