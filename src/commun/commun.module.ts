import { Global, Module } from '@nestjs/common';
import { v4 } from 'uuid';

const v4Provider={ provide: 'randomID', useValue: v4 }
@Global()
@Module({
  providers: [v4Provider],
  exports: [v4Provider],
})
export class CommunModule {}
