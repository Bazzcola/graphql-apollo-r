import { gql } from "@apollo/client";

export const GET_ARTICLE_LIST = gql`
  query GET_ARTICLE_LIST($postedDateTo: Int, $postedDateFrom: Int, $skip: Int)
    {
        contents(
            project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1", 
            lang: "ru", 
            skip: $skip,
            take: 30,
            posted_date_from: $postedDateFrom,
            posted_date_to: $postedDateTo,
        ) {
            id
            url
            title {
                short
            }
            thumbnail
            dates {
                posted: posted(format: "2 $$Jan$$. 15:04", lang: "ru", getDiff: true)
                postedTs: posted
            }
            description {
                intro
            }
            cparent {
                id
                url {
                    ru
                }
            }
            parents {
                id
                type
                attachment
            }
        }
    }
`