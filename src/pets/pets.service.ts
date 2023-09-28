import { Injectable } from '@nestjs/common';
import { Pet } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { createPetInput } from './dto/create-pets.input';
import { OwnersService } from '../owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
      constructor(@InjectRepository(Pet) private petRepository : Repository<Pet>,private ownerservice : OwnersService){}


      createPet(createPetInput : createPetInput): Promise<Pet> {
            const newPet = this.petRepository.create(createPetInput);

            return this.petRepository.save(newPet);
      }

      async findAll(): Promise<Pet[]>{
          return this.petRepository.find();
      }


      findOne(id: number): Promise<Pet> {
            const options: FindOneOptions<Pet> = { where: { id } };
            return this.petRepository.findOneOrFail(options);
          }


          getOwner(ownerId : number): Promise<Owner>{
              
            return this.ownerservice.findOne(ownerId);
          }
}
