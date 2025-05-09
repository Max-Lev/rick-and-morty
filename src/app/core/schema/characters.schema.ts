import { gql } from "apollo-angular"

export const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $name: String, $status: String, 
  $gender: String, $species: String, $type: String) {
    characters(page: $page,filter:{name:$name,status:$status, gender:$gender,
    species:$species,type:$type}) {
      info{
      count,
      pages,
      prev,
      next,
    },
      results {
        id
        name
        status
        species
        gender
        image,
        type
      }
    }
  }`;

