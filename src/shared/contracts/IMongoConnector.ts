export default interface IMongoConnector {
    initializeDatabase(): Promise<void>;
}