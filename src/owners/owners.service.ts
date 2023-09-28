import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class OwnersService {

  constructor(@InjectRepository(Owner) private ownerRepository : Repository<Owner>){}

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerInput);
    return await this.ownerRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    const options: FindOneOptions<Owner> = { where: { id } };
    return this.ownerRepository.findOneOrFail(options);  }
}
