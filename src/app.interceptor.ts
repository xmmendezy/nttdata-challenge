import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable, of, from, mergeMap } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { BaseDto } from './app.dto';
import { Request } from 'express';
import { REDIS_CLIENT } from './redis/constants';
import Redis from 'ioredis';

@Injectable()
export class ValidatorInterceptor<T> implements NestInterceptor {
	constructor(private ClassTransform: ClassConstructor<T & BaseDto>) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req: Request = context.switchToHttp().getRequest();
		const data = plainToInstance(this.ClassTransform, req.body);
		req.body = data;
		const errors = data.errors();
		if (errors.length) {
			return of({ errors });
		}
		return next.handle();
	}
}

@Injectable()
export class AuthInterceptor implements NestInterceptor {
	constructor(@Inject(REDIS_CLIENT) public redis: Redis) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req: Request = context.switchToHttp().getRequest();
		const apiKey = req.headers['x-parse-rest-api-key'] || req.headers['X-Parse-REST-API-Key'];
		if (apiKey && apiKey === process.env.API_KEY) {
			const jwt = req.headers['x-jwt-kwy'] || req.headers['X-JWT-KWY'];
			if (jwt) {
				return from(this.redis.get('token')).pipe(
					mergeMap((token) => {
						if (token === jwt) {
							this.redis.set('token', null);
							return next.handle();
						} else {
							return of('ERROR');
						}
					}),
				);
			}
		}
		return of('ERROR');
	}
}
