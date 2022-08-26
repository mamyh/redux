import { ARTICLESEARCH, AUTHORSEARCH, TITLESEARCH } from "./actiontypes";
import initialCards from "./initialCards";

const cardsReducer =(state=initialCards,action)=>{
   switch(action.type){
      case TITLESEARCH:{
          return state.filter(item=>item.title.includes(action.payload));
      }
      case ARTICLESEARCH:{
         return state.filter(item => item.articles.includes(action.payload));
      }
      case AUTHORSEARCH:{
          return state.filter(item=>item.author.name === action.payload);
      }
      // case ALLCARDS: {
      //    return 
      // }
      default: return state;
   }
}

export default cardsReducer;