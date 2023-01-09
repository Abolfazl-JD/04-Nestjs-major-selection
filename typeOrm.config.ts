import { DataSource } from "typeorm"
import { User } from "./src/users/user.entity"
import { config } from 'dotenv';
import { Major } from "./src/majors/major.entity";
import { ConfigService } from "@nestjs/config";
import { CreateTable1666421617021 } from './migrations/1666421617021-CreateTable';

 
config();

const configService = new ConfigService();


export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DATABASE'),
    entities : [User, Major],
    synchronize: false,
    migrations : [CreateTable1666421617021]
})