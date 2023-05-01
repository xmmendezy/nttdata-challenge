import Redis, { RedisOptions } from 'ioredis';
import { DynamicModule, Global, Module, Inject, OnModuleDestroy } from '@nestjs/common';
import { createClient } from './provider';

import { REDIS_MODULE_OPTIONS, REDIS_CLIENT } from './constants';

@Global()
@Module({})
export class RedisModule implements OnModuleDestroy {
	constructor(
		@Inject(REDIS_CLIENT)
		private readonly redisClient: Redis,
	) {}

	static forRoot(options: RedisOptions): DynamicModule {
		const providers = [createClient(), { provide: REDIS_MODULE_OPTIONS, useValue: options }];
		return {
			module: RedisModule,
			providers: providers,
			exports: providers,
		};
	}

	onModuleDestroy() {
		this.redisClient.disconnect();
	}
}
