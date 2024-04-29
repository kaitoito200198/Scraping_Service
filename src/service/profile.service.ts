import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data, DataDocument } from '../model/data.schema';
import { Profile, ProfileDocument } from '../model/profile.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private dataModel: Model<ProfileDocument>) {}

 
  async getOneData(account): Promise<Profile> {
    return await this.dataModel.findOne({ account }).exec();
  }
  async getAllData(): Promise<Profile[]> {
    return await this.dataModel.find().exec();
  }

  async testAll(): Promise<Profile[]> {
    console.log('tttttt')
    return await this.dataModel.find().exec();
  }
}
