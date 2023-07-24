import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { Roles } from 'src/roles/roles.entity';
import { getUserDto } from './dto/get-user.dto';
import { conditionUtils } from '../utils/db.helper';
import * as argon2 from 'argon2';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  // 增
  // Partial使user的所有属性变为可选属性
  async create(user: Partial<User>) {
    if (!user.roles) {
      // 新注册的用户角色赋默认值
      const role = await this.rolesRepository.findOne({ where: { id: 2 } });
      user.roles = [role];
    }

    if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
      // {id, name} -> { id } -> [id]
      // 查询所有的用户角色
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles), // user.roles为数组，相当于includes
        },
      });
    }

    const userTmp = await this.userRepository.create(user);
    // 对用户密码使用argon2加密
    userTmp.password = await argon2.hash(userTmp.password);
    const res = await this.userRepository.save(userTmp);
    return res;
  }

  // 删
  async remove(id: number) {
    const data = await this.userRepository.delete(id);
    return data;
  }

  // 改
  async update(id: number, user: User) {
    await this.userRepository.update(id, user);
  }

  // 查
  async findAll(query: getUserDto) {
    const { page_size = 10, page = 1, keyword, gender, role } = query;
    const take = page_size;
    const skip = (page - 1) * take;

    // const data = await this.userRepository.find({
    //   // 只返回需要的字段
    //   select: {
    //     id: true,
    //     username: true,
    //     profile: {
    //       gender: true,
    //     },
    //   },
    //   // 关联的表
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   // 查询条件
    //   where: {
    //     username,
    //     profile: {
    //       gender,
    //     },
    //     roles: {
    //       id: role,
    //     },
    //   },
    //   // 分页条件
    //   take,
    //   skip,
    // });
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');

    const obj = {
      'user.username': keyword,
      'profile.gender': gender,
      'roles.id': role,
    };
    const newQuery = conditionUtils<any>(queryBuilder, obj);
    return await newQuery.take(take).skip(skip).getMany();
  }

  async getList(query: getUserDto) {
    const { page_size = 10, page = 1, keyword, gender, role } = query;
    const take = page_size;
    const skip = (page - 1) * take;
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');
    const obj = {
      'user.username': keyword,
      'profile.gender': gender,
      'roles.id': role,
    };
    const newQuery = conditionUtils<any>(queryBuilder, obj);
    // eslint-disable-next-line prefer-const
    let [list, total] = await newQuery.take(take).skip(skip).getManyAndCount();

    list = list.map((item) => {
      // eslint-disable-next-line prefer-const
      let { id, username, roles, profile, createdTime } = item;
      roles = roles.map((item) => item.name).join(',') || '--';
      let gender;
      if (profile) {
        gender = profile.gender == 1 ? '男' : '女';
      } else {
        gender = '--';
      }
      return {
        id,
        username,
        roles,
        gender,
        createdTime: moment(createdTime)
          .utcOffset('+16:00')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
    });

    return {
      list,
      total,
    };
  }

  async findOne(username: string) {
    const data = await this.userRepository.findOne({ where: { username } });
    return data;
  }

  // 关联查询
  findProfile(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }

  // 汇总查询
  findLogsByGroup(id: number) {
    return this.userRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT("logs.result")', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id=:id', { id })
      .groupBy('logs.result')
      .orderBy('count', 'DESC') // 先以count降序
      .addOrderBy('result', 'DESC') // 再以result降序
      .limit(3)
      .getRawMany(); // 返回数据扁平化，如profile.xxx
  }
}
