import { Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Field()
    name: string;
}