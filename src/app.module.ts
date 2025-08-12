import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,

    UsersModule,

    AuthModule,

    PropertyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
