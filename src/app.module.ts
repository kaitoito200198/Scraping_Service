/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path';


import { isAuthenticated } from './app.middleware';
import { Data, DataSchema } from './model/data.schema';
import { DataController, ScrapingController } from './controller/data.controller';
import {ProfileController} from "./controller/profile.controller"
import { DataService } from './service/data.service';
import { ProfileService } from './service/profile.service';
import { SData , SDataSchema} from './model/sdata.schema';
import { SDataService } from './service/sdata.service';
import { SDataController } from './controller/sdata.controller';
@Module({
  imports: [
     MongooseModule.forRoot('mongodb://127.0.0.1:27017/Test'),

    MongooseModule.forFeature([{ name: SData.name, schema: SDataSchema }]),
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
   
     JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'public'),
    }),
  ],
 
controllers: [AppController, DataController, ScrapingController, SDataController],
providers: [AppService, DataService, SDataService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  
  }
}
