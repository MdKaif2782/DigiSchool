import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req
} from "@nestjs/common";
import { InstructorService } from "./instructor.service";
import { CreateInstructorDto } from "./dto/create-instructor.dto";
//import { UpdateInstructorDto } from "./dto/update-instructor.dto";
import { Request } from "express";

@Controller("instructor")
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  async create(
    @Body() createInstructorDto: CreateInstructorDto,
    @Req() req: Request
  ) {
    const user = req.user as { id: string };
    return this.instructorService.create(createInstructorDto, user.id);
  }

  @Get()
  async findAll() {
    return this.instructorService.findAll();
  }

  @Get("/:id/approve")
  async approve(@Param("id") id: string) {
    return this.instructorService.approveInstructor(id);
  }

  @Get("/:managerId/upapproved")
  async getAprroved(@Param("managerId") managerId: string) {
    return this.instructorService.findAllUnvarifiedInstructors(managerId);
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.instructorService.findOne(id);
  // }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateInstructorDto: UpdateInstructorDto
  // ) {
  //   return this.instructorService.update(id, updateInstructorDto);
  // }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.instructorService.remove(+id);
  }
}
