import { UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor, AuthInterceptor } from './app.interceptor';
import { ClassConstructor } from 'class-transformer';
import { BaseDto } from './app.dto';

export const Validate = <T>(ClassTransform: ClassConstructor<T & BaseDto>): MethodDecorator => {
	return <T>(target: unknown, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<T>) => {
		UseInterceptors(new ValidatorInterceptor(ClassTransform))(target, propertyKey, descriptor);
	};
};

export const Auth = (): MethodDecorator => {
	return <T>(target: unknown, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<T>) => {
		UseInterceptors(AuthInterceptor)(target, propertyKey, descriptor);
	};
};
