import { ValidationArguments } from "class-validator"


export class ErrorMsg {
 
  static lenght_error_message(min:boolean,max:boolean,validationData:ValidationArguments):string{
    let i=0;
    let msg=`la taille de votre ${validationData.property} ${validationData.value} ne respecte pas les contraintes,`
    if(min){
     msg+=`taille minimale:${validationData.constraints[i]} `;
     i++;
    }
    if(max){
      msg+=`taille minimale:${validationData.constraints[i]} `;
     i++;}

    return msg;
  }
  /*message:(validationData:ValidationArguments)=>{
    return `la taille de votre ${validationData.property} ${validationData.value} ne respecte pas les contraintes, 
    la taille de ${validationData.property} doit etre entre ${validationData.constraints[0]} et ${validationData.constraints[1]} `*/
  

}
