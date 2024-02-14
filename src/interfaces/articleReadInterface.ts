export interface ArticleReadInterface {
   content:{
        counters:{
            comment: number;
            view: number;
        }
        dates:{
            posted: string;
            postedSeparator: string;
            postedTs: string;
        }
        description:{
            intro: string;
            long: string;
            thumbnail: string;
        }
        parents:{
            attachment: string;
            id: string;
            type: string;
        }[]
        thumbnail: string;
        title:{
            long: string;
        }
   }
}