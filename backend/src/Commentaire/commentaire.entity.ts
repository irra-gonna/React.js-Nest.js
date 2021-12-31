import { PostEntity } from '../Post/post.entity';
import {
    Entity,
    Column,
    PrimaryColumn,
    ObjectIdColumn,
    ObjectID,
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { User } from '../User/user.entity'
import { PostService } from 'src/Post/post.service';

@Entity({name : 'Commentaire'})
export class Commentaire {

    @PrimaryGeneratedColumn()
    idCommentaire? : number | null;

    @Column({nullable : false})
    text : string

    @ManyToOne (_ => User)
    @JoinColumn({name : 'idUser'})
    user : User

    @ManyToOne (_ => PostEntity)
    @JoinColumn({name : 'id'})
    post : PostEntity

    @Column ( { nullable : false } )
    created_at : string

    @Column ( { nullable : false } )
    updated_at : string

}