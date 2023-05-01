import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './app.exception';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalFilters(new NotFoundExceptionFilter());
	await app.listen(3000);
}

bootstrap();
