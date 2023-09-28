import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from "@nestjs/graphql";
import { PetsService } from "./pets.service";
import { Pet } from "./pets.entity";
import { createPetInput } from "./dto/create-pets.input";
import { Owner } from "src/owners/entities/owner.entity";

@Resolver(of => Pet)
export class PetResolver {

  constructor(private petservice : PetsService) {}


  @Query(returns => Pet)
  getPet(@Args('id',{type :()=>Int}) id :number) :Promise<Pet> {
      return this.petservice.findOne(id)
  }

  @Query(returns => [Pet])
  pets(): Promise<Pet[]> {
      return this.petservice.findAll();
  }


  @ResolveField(returns => Owner)
  owner(@Parent() pet : Pet): Promise<Owner> {

    return this.petservice.getOwner(pet.ownerId);
  }


  @Mutation(returns  => Pet)
  createPet(@Args('createPetInput') createpetinput : createPetInput) : Promise<Pet>{
    return this.petservice.createPet(createpetinput);
  }

}
