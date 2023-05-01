import { Test, TestingModule } from '@nestjs/testing';
import { REDIS_CLIENT } from './redis/constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { plainToInstance } from 'class-transformer';
import { AuthDto } from './app.dto';
import { RedisMock } from './app.mocks';

// process.env.PASSWORD: Hola1234 --- bcryptjs
process.env.JWT = 'secret';
process.env.REDIS_HOST = 'localhost';
process.env.REDIS_PORT = '6379';
process.env.API_KEY = '2f5ae96c-b558-4c7b-a590-a501ae1c3f6c';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		})
			.useMocker((token) => {
				if (token === REDIS_CLIENT) {
					return RedisMock;
				}
			})
			.compile();

		appController = app.get<AppController>(AppController);
	});

	it('auth - valid', async () => {
		const res = await appController.auth(
			plainToInstance(AuthDto, {
				username: 'nttdata',
				password: 'Hola1234',
			}),
		);

		expect(res).toHaveProperty('token');
		console.log(res);
		expect(res.token).not.toBe('');
	});

	it('auth - no valid', async () => {
		const res = await appController.auth(
			plainToInstance(AuthDto, {
				username: 'nttdata',
				password: 'Hola12345',
			}),
		);

		expect(res).toHaveProperty('token');
		expect(res.token).toBe('');
	});

	it('DevOps', () => {
		const res = appController.devOps();

		expect(res).toHaveProperty('message');
		expect(res.message).toBe('Hello Juan Perez your message will be send');
	});
});
