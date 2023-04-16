import { PartialType } from '@nestjs/mapped-types';
import { ValidationArguments } from 'class-validator';
import { IsIn, IsOptional, Length, MinLength } from 'class-validator';
import { ErrorMsg } from '../../helpers/ErrorMsg.helper';
import { TodoStatusEnum } from '../todo.statusenum';
import { TodoAddDTO } from './todoAddDTO';


export class TodoUpdateDTO extends PartialType(TodoAddDTO) {


  @IsOptional()
  @IsIn(['En cours','En attente','Finalisé', ])
  status: TodoStatusEnum;
}
