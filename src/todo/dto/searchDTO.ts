import {  PickType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';
import { TodoStatusEnum } from '../todo.statusenum';
import { TodoUpdateDTO } from './todoUpdateDTO';


export class SearchDTO {//extends PickType(TodoUpdateDTO,['status']) {
  @IsOptional()
  @IsString()
  critere:string;
  
  @IsOptional()
  @IsIn(['En cours','En attente','Finalisé', ])
  status: TodoStatusEnum;
}
