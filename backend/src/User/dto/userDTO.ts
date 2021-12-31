import { IsEmail, IsNotEmpty } from "class-validator";
import { PostEntity } from "../../Post/post.entity";
import { Commentaire } from '../../Commentaire/commentaire.entity'

export class UserDTO  {

    idUser : number;

    @IsNotEmpty({message: "name must be fullfilled"}) name : string;

    @IsNotEmpty({message: "username must be fullfilled"}) username: string;

    @IsNotEmpty({message: "email must be fullfilled"}) @IsEmail({message: "email must match email type"}) email : string;

    @IsNotEmpty({message: "password must be fullfilled"}) password : string;

    foto : string;

    commentaires : Commentaire[]

    created_at : string;


    updated_at : string;


    posts : PostEntity[];

    constructor(name : string, email : string, username : string, password : string, foto : string) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.foto = foto;
        this.commentaires = []
        this.posts = []
        this.created_at = "null";
        this.updated_at = "null";
    }
}