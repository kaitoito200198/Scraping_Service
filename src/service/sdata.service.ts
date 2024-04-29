/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SData,  SDataDocument} from 'src/model/sdata.schema';
import { JwtService } from '@nestjs/jwt';


interface SDataType {
    site: string;
    ip: string;
    company: string;
    country: string;
    pop:string;
  }
@Injectable()
export class SDataService {
  constructor(@InjectModel(SData.name) private dataModel: Model<SDataDocument>) {}

  async pushData(data: SDataType[]): Promise<any> {
   
    for(let i =0; i<data.length; i ++ ) {
        const reqBody = {
            site: data[i][1],
            ip: data[i][2],
            company: data[i][3],
            country: data[i][4],
            pop: data[i][6]
          }
         await this.dataModel.create(reqBody);
    }
     
      return true;
  }
  async getAllData(): Promise<SData[]> {
    return await this.dataModel.find().exec();
  }

}
