import { User } from '../User/user.entity';
import { Entity, Column, PrimaryColumn, ObjectIdColumn, ObjectID, CreateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Commentaire } from '../Commentaire/commentaire.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(type => User, user => user.posts)  
  @JoinColumn({name : 'posts'})
  user : User

  @OneToMany ((type) => Commentaire, commentaires => commentaires.post) 
  @JoinColumn({name : 'post'})
  commentaires : Commentaire[]

  

}
