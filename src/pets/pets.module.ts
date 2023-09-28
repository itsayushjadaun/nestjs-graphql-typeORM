import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets.entity';
import { OwnersModule } from '../owners/owners.module';

@Module({
      imports : [TypeOrmModule.forFeature([Pet]),OwnersModule],
       providers: [PetsService,PetResolver]
})
export class PetsModule {}
