import { postagem } from "./postagem"

export class usuario {
    public id: number
    public nome: string
    public usuario: string
    public senha: string
    public foto: string
    public tipo: string
    public postagem: postagem[]
}