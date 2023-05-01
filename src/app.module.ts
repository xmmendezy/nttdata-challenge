import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis';

@Module({
	imports: [
		RedisModule.forRoot({
			host: process.env.REDIS_HOST,
			port: parseInt(process.env.REDIS_PORT) || 6379,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
