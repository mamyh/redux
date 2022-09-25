export const getPartner=(users,email)=>{
   
   return users.find(user=>user.email !==email);
}
