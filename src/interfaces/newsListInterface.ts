export interface NewsListInterface {
    cparent:{
        id:string;
        url:{
            ru:string;
        }
    }
    dates:{
        postedTs:string;
        posted: string;
    }
    description:{
        intro:string;
    }
    parents:{
        attachment:string;
        id:string;
        type:string;
    }[]
    thumbnail:string;
    title:{
        short:string;
    }
    url:string;
    id:string;
}