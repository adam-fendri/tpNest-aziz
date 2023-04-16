import { Entity, SelectQueryBuilder } from "typeorm";

export function paginate<Entity>(
  querybuilder : SelectQueryBuilder<Entity>,
  page=1,
  nb=10): SelectQueryBuilder<Entity> {
   if(nb>0){
    if(!page) page=1;
    querybuilder.skip((page-1)*nb);
    querybuilder.take(nb);
   }  
  
  return querybuilder;

}