export default interface IUserRepository {
    getUserById(id:string): Promise<void>
}
