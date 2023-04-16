import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Time{
    
  @CreateDateColumn({update:false})
  createdat:Date;

  @UpdateDateColumn()
  updatedat:Date;
  @DeleteDateColumn()
  deletedat:Date;

}