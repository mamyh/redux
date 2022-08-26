import { ARTICLESEARCH, AUTHORSEARCH, TITLESEARCH } from "./actiontypes"

export const authorSearch =(authorName)=>{
    return {
        type:AUTHORSEARCH,
        payload:authorName
    }
}

export const titleSearch =(titleText)=>{
    return {
        type:TITLESEARCH,
        payload : titleText,
    }
}

export const articleSearch=(article)=>{
    return {
        type:ARTICLESEARCH,
        payload:article
    }
}

// export const allCards = ()=>{
//     return {
//         type:ALLCARDS
//     }
// }