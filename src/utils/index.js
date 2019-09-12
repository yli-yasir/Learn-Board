import { Q, POST_TYPE } from "../values/searchParams";

export function getSearchParams(queryString){
    let params = new URLSearchParams(queryString);
    let q = params.get(Q.PARAM_NAME);
    let postType = params.get(POST_TYPE.PARAM_NAME);
    return {q,postType};

}

