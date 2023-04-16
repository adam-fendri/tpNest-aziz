import {  PickType } from '@nestjs/mapped-types';
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength, isInt } from 'class-validator';
import { TodoStatusEnum } from '../todo.statusenum';
import { TodoUpdateDTO } from './todoUpdateDTO';
import { Type } from 'class-transformer';


export class pageDTO {//extends PickType(TodoUpdateDTO,['status']) {
  @IsOptional()
  @Type(() => Number )
  @IsNumber()
  page:number;
  
  @IsOptional()
  @Type(() => Number )
@IsNumber()
  nb: number;
}
