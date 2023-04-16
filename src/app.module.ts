import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommunModule } from './commun/commun.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TodoModule,
    CommunModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', //process.env.DB_HOST,
      port: 3306, //parseInt(process.env.DB_PORT),
      username: 'root', //process.env.DB_USERNAME,
      password: 'root', //process.env.DB_PASSWORD,
      database: 'test', //process.env.DB_NAME,
      //entities: [], remplacer par autoloadentities
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthMiddleware).forRoutes(
      'todo-db',
      {
        path: 'todo-db*',
        method: RequestMethod.POST,
      },
      {
        path: 'todo-db*',
        method: RequestMethod.PUT,
      },
      {
        path: 'todo-db*',
        method: RequestMethod.PATCH,
      },
      {
        path: 'todo-db*',
        method: RequestMethod.DELETE,
      },
    );
  }
}
