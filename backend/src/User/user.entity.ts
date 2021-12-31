import { PostEntity } from '../Post/post.entity';
import { Commentaire } from '../Commentaire/commentaire.entity'
import {
  Entity,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
  ObjectID,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  foto: string;

  @OneToMany((type) => PostEntity, (post) => post.user, {nullable: false})
  posts: PostEntity[];

  @OneToMany ((type) => Commentaire, commentaires => commentaires.user, {nullable: false})
  commentaires : Commentaire[];

  @Column({ nullable: true })
  created_at: string;

  @Column({ nullable: false })
  updated_at: string;
}
