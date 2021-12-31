import { IsNotEmpty } from "class-validator";
import { PostEntity } from '../../Post/post.entity';
import { User } from '../../User/user.entity'

export class CommentaireDTO {
    idCommentaire : number;

    @IsNotEmpty({message : 'Text must be fullfilled !'}) text : string;

    @IsNotEmpty({message : 'user must be fullfilled !'}) user : User;

    @IsNotEmpty({message : 'Post must be fullfilled !'}) post : PostEntity;

    created_at : string;

    updated_at : string;


    constructor (text : string, user : User, post : PostEntity) {
        this.text = text;
        this.user = user;
        this.post = post;
    }

}