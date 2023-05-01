import { Inject, Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getUnixTime } from 'date-fns';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis/constants';
import { AuthDto } from './app.dto';

@Injectable()
export class AppService {
	@Inject(REDIS_CLIENT)
	private redis: Redis;

	public async auth(data: AuthDto) {
		if (data.username === 'nttdata') {
			const password = await this.redis.get('password');
			if (compareSync(data.password, password)) {
				const token = sign(
					{
						username: data.username,
						datetime: getUnixTime(new Date()),
					},
					process.env.JWT,
					{
						expiresIn: 10000000,
					},
				);
				await this.redis.set('token', token);
				return {
					token,
				};
			}
		}
		return { token: '' };
	}

	public devOps() {
		return { message: 'Hello Juan Perez your message will be send' };
	}
}
