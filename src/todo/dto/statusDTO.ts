import {  PickType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, Length, MinLength } from 'class-validator';
import { TodoStatusEnum } from '../todo.statusenum';
import { TodoUpdateDTO } from './todoUpdateDTO';


export class StatusDTO {//extends PickType(TodoUpdateDTO,['status']) {



  @IsIn(['En cours','En attente','Finalisé', ])
  status: TodoStatusEnum;
}
