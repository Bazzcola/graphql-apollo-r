import { gql } from "@apollo/client";

export const GET_ARTICLE_ITEM = gql`
    query GET_ARTICLE_ITEM($id: String!) {
        content(
            id:$id,
            project_id:"5107de83-f208-4ca4-87ed-9b69d58d16e1",
            full_url:"business/simpals-novye-rabochie-mesta-dlia-vsekh-zhelaiushchikh"
        ) {
            title {
                long
            }
            description {
                intro
                long
                thumbnail
            }
            thumbnail
            dates {
                posted: posted(format: "2 $$Jan$$. 15:04", lang: "ru", getDiff: true)
                postedTs: posted
                postedSeparator: posted(format: "2 $$January$$ 2006", lang: "ru")
            }
            parents {
                id
                type
                attachment
            }
            counters {
                comment
                view
            }
        }
    }
`