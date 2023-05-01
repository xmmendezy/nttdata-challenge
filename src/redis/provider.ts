import Redis, { RedisOptions } from 'ioredis';
import { Provider } from '@nestjs/common';

import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './constants';

export const createClient = (): Provider => ({
	provide: REDIS_CLIENT,
	useFactory: async (options: RedisOptions): Promise<Redis> => {
		return new Redis(options);
	},
	inject: [REDIS_MODULE_OPTIONS],
});
