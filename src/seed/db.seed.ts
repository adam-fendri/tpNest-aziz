import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';
import {
  randEmail,
  randFilePath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randSkill,
  randUserName,
} from '@ngneat/falso';
import { Skill } from '../skill/entities/skill.entity';
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const skillService = app.get(SkillService);
  const userService = app.get(UserService);
  const cvService = app.get(CvService);

  const skills = [];

  for (let i = 0; i < 12; i++) {
    const skill = new Skill();
    skill.designation = randSkill();
    await skillService.addSkill(skill);
    skills.push(skill);
  }

  for (let j = 0; j < 50; j++) {
    const user = new User();
    user.email = randEmail();
    user.username = randUserName();
    user.password = randPassword();
    const cv = new Cv();
    cv.firstname = randFirstName();
    cv.name = randLastName();
    cv.job = randJobTitle();
    cv.age = j + 18;
    cv.path = randFilePath();
    cv.cin = randNumber().toString();
    cv.user = user;
    cv.skills = [skills[j]];
    await userService.addUser(user);
    await cvService.addCv(cv);
  }
  await app.close();
}
bootstrap();
