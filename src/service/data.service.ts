/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data, DataDocument } from '../model/data.schema';
import { JwtService } from '@nestjs/jwt';

interface DataType {
  ProductNumber: string;
  ProductDescription: string;
  date: string;
  image: string;
  PriceData: string[];
  Lowest: string;
  MsaleMoney: string;
  MSalePercent: string;
  MHopeMoney: string;
  MHopePercent: string;
}
@Injectable()
export class DataService {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}

  // async pushData(data: DataType): Promise<Data> {

  //     const reqBody = {
  //         productNumber: data.ProductNumber,
  //         firstImage: data.first.image,
  //         secondImage: data.second.image
  //     }
  //     const newData = new this.dataModel(reqBody);
  //     return newData.save();
  // }

  async pushData(data: DataType): Promise<Data> {
    // Find existing document by productNumber
    const existingDoc = await this.dataModel.findOne({
      productNumber: data.ProductNumber,
    });

    if (existingDoc) {
      // Document already exists, update it
      return this.dataModel.findOneAndUpdate(
        { productNumber: data.ProductNumber },
        {
          $set: {
            date: data.date,
            ProductDescription: data.ProductDescription,

            image: data.image,
            PriceData: data.PriceData,
            Lowest: data.Lowest,
            MsaleMoney: data.MsaleMoney,
            MSalePercent: data.MSalePercent,
            MHopeMoney: data.MHopeMoney,
            MHopePercent: data.MHopePercent,
          },
        },
        { new: true }, // Return updated doc
      );
    } else {
      // No existing document, create a new one
      return this.dataModel.create({
        productNumber: data.ProductNumber,
        date: data.date,
        ProductDescription: data.ProductDescription,

        image: data.image,
        PriceData: data.PriceData,
        Lowest: data.Lowest,
        MsaleMoney: data.MsaleMoney,
        MSalePercent: data.MSalePercent,
        MHopeMoney: data.MHopeMoney,
        MHopePercent: data.MHopePercent,
      });
    }
  }
  async getOneData(productNumber): Promise<Data> {
    return await this.dataModel.findOne({ productNumber }).exec();
  }
  async getAllData(): Promise<Data[]> {
    return await this.dataModel.find().exec();
  }

  async testAll(): Promise<Data[]> {
    console.log('tttttt')
    return await this.dataModel.find().exec();
  }
}
