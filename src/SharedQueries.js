import { gql } from "apollo-boost";

export const ME = gql`
{
me{
    user{
        userName
    }
}
}
`