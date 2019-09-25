//The search term (e.g. python | piano)
export const params ={ 
 q : {
    PARAM_NAME: 'q'
},
 postType : {
    PARAM_NAME: 'postType',
    REQUEST: 'request',
    OFFER: 'offer',
    ALL : 'all'
},
category : {
    PARAM_NAME: 'cat'
},
by:{
    PARAM_NAME: 'by'
}
}

//options {paramName: value, ...}
export function buildQueryString(oldQueryString,options){

    let params = new URLSearchParams(oldQueryString);

    Object.keys(options).forEach((key)=>{
        if (options[key]){
        params.set(key,options[key])
        }
        else{
            params.delete(key)
        }
    })
     return "?" + params.toString();
}

export function getSearchParams(queryString,...paramNames){

    let params = new URLSearchParams(queryString);

    const result = {};

    paramNames.forEach((name)=>{
        const value= params.get(name);
        result[name]= value
    });

    return result
}