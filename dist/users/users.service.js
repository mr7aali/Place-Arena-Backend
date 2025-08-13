"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./schemas/users.schema");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    usersModel;
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async create(user) {
        const isUserExist = await this.usersModel.findOne({ email: user.email });
        if (!!isUserExist) {
            throw new common_1.ConflictException('User with this email already exists.');
        }
        const newUser = await this.usersModel.create(user);
        return newUser;
    }
    async getSingle(id) {
        const result = await this.usersModel.findById(id);
        if (!result) {
            throw new common_1.NotFoundException('Not Found');
        }
        return result;
    }
    async getByEmail(email) {
        return await this.usersModel.findOne({ email: email });
    }
    async findByEmailAndPassword({ email, password, }) {
        return await this.usersModel
            .findOne({ email: email, password: password })
            .select('+password');
    }
    async getAllUser() {
        return await this.usersModel.find({});
    }
    async findByEmail(email) {
        const result = await this.usersModel
            .findOne({ email: email })
            .select('+password');
        if (!result) {
            throw new common_1.ConflictException('User with this email already exists.');
        }
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map