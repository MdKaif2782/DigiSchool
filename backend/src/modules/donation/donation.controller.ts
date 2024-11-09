import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req
} from "@nestjs/common";
import { DonationService } from "./donation.service";
import { CreateDonationDto } from "./dto/create-donation.dto";
//import { UpdateDonationDto } from "./dto/update-donation.dto";
import { Request } from "express";

@Controller("donation")
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post("/:materialReqId")
  async create(
    @Param("materialReqId") materialReqId: string,
    @Body() createDonationDto: CreateDonationDto,
    @Req() req: Request
  ) {
    const user = req.user as { id: string };
    return this.donationService.create(
      createDonationDto,
      user.id,
      materialReqId
    );
  }

  @Get()
  async findAll() {
    return this.donationService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.donationService.findOne(id);
  }

  @Get(":id/material-request")
  async findOneMaterialRequest(@Param("id") id: string) {
    return this.donationService.findOne(id);
  }

  @Get("material-request/all")
  async findAllMaterialReq() {
    return this.donationService.findAllMaterialRequests();
  }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateDonationDto: UpdateDonationDto
  // ) {
  //   return this.donationService.update(id, updateDonationDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.donationService.remove(+id);
  // }
}
