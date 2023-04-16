import { IsString } from "class-validator";
import { IsNotEmpty, Length, MinLength } from "class-validator";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { ErrorMsg } from "../../helpers/ErrorMsg.helper";

export class TodoAddDTO {

  @IsString()
  @IsNotEmpty({
    message:"vous devez specifier une description"
  })
  @Length(3,10,{message:(validationData:ValidationArguments)=>{
    return ErrorMsg.lenght_error_message(true,true,validationData)}})
  name: string;

  @IsString()
  @IsNotEmpty({
    message:"vous devez specifier une description"
  })
  @MinLength(10,{message:(validationData:ValidationArguments)=>{
    return ErrorMsg.lenght_error_message(true,false,validationData)}})
  description: string;
}
