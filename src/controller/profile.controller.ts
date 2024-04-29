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
  import { ProfileService } from '../service/profile.service';
  import { JwtService } from '@nestjs/jwt';
  
  @Controller('/api/v1/profile')
  export class ProfileController {
    constructor(
      private readonly dataServerice: ProfileService, // private jwtService: JwtService
    ) {}
  
    @Get(':id')
    getOne(@Param('id') id: string) {
      return this.dataServerice.getOneData(id);
    }
  
    @Get('')
    getAll() {
      console.log('all');
      return  this.dataServerice.getAllData();
    }
     
   
    //getOneData
  }