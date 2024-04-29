/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Data } from '../model/data.schema';
import { DataService } from '../service/data.service';
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
interface SDataType {
  site: string;
  ip: string;
  company: string;
  country: string;
  pop:string;
}
@Controller('/api/v1/data')
export class DataController {
  constructor(
    private readonly dataServerice: DataService, // private jwtService: JwtService
  ) {}

  @Post('/push')
  async pushData(@Res() response, @Body() data: DataType) {
    console.log(data);
    const newData = await this.dataServerice.pushData(data);
    return response.status(HttpStatus.CREATED).json({
      newData,
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.dataServerice.getOneData(id);
  }

  // @Post('/data')
  // async pushData1(@Res() response, @Body() data: any) {
  //   console.log(data);
  //   return  true;
  // }
   
 
  //getOneData
}

@Controller('/api/v1/profile')
export class ScrapingController {
  constructor(
  
  ) {}
  @Get('')
  test() {
    console.log('testmode');
       return "test";
  }

}