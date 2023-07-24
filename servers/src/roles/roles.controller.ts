import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/enum/roles.enum';
// import { RoleGuard } from 'src/guards/role.guard';
// import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('roles')
// @Roles(Role.Admin)
// @UseGuards(JwtGuard, RoleGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/add')
  create(@Query() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('/list')
  // @Roles(Role.User)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: any) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
