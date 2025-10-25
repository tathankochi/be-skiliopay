import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashPassword = this.getHashPassword(password);
    const newUser = await this.userModel.create({ email, password: hashPassword });
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  async register(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;
    const hashPassword = this.getHashPassword(password);

    //check email
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email ${email} đã tồn tại trên hệ thống`);
    }

    const user = await this.userModel.create({ email, password: hashPassword });
    return user;
  }
}
