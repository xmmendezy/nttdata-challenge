import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ValidatorInterceptor, AuthInterceptor } from './app.interceptor';
import { AuthDto, BodyDevOpsDto } from './app.dto';
import * as httpMock from 'node-mocks-http';
import { firstValueFrom, of } from 'rxjs';
import { RedisMock } from './app.mocks';

let interceptor_1: ValidatorInterceptor<AuthDto>;
let interceptor_2: ValidatorInterceptor<BodyDevOpsDto>;
let interceptor_3: AuthInterceptor;
let req: httpMock.MockRequest<any>;
let res: httpMock.MockResponse<any>;

const callHandler = {
	handle: () => of({ message: 'test' }),
};

describe('AppInterceptor', () => {
	describe('ValidatorInterceptor(AuthDto)', () => {
		beforeEach(() => {
			interceptor_1 = new ValidatorInterceptor(AuthDto);
			req = httpMock.createRequest();
			res = httpMock.createResponse();
		});

		it('valid', async () => {
			req.body = {
				username: 'nttdata',
				password: 'nttdata',
			};

			const ctx = new ExecutionContextHost([req, res]);

			const spy = jest.spyOn(interceptor_1, 'intercept');

			const response = await firstValueFrom(interceptor_1.intercept(ctx, callHandler));

			expect(response).toHaveProperty('message');
			expect(spy).toHaveBeenCalled();
		});

		it('no valid', async () => {
			req.body = {
				username: 'nttdata',
				password: 5,
			};

			const ctx = new ExecutionContextHost([req, res]);

			const spy = jest.spyOn(interceptor_1, 'intercept');

			const response = await firstValueFrom(interceptor_1.intercept(ctx, callHandler));

			expect(response).toHaveProperty('errors');
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('ValidatorInterceptor(BodyDevOpsDto)', () => {
		beforeEach(() => {
			interceptor_2 = new ValidatorInterceptor(BodyDevOpsDto);
			req = httpMock.createRequest();
			res = httpMock.createResponse();
		});

		it('valid', async () => {
			req.body = {
				message: 'This is a test',
				to: 'Juan Perez',
				from: 'Rita Asturia',
				timeToLifeSec: 45,
			};

			const ctx = new ExecutionContextHost([req, res]);

			const spy = jest.spyOn(interceptor_2, 'intercept');

			const response = await firstValueFrom(interceptor_2.intercept(ctx, callHandler));

			expect(response).toHaveProperty('message');
			expect(spy).toHaveBeenCalled();
		});

		it('no valid', async () => {
			req.body = {
				message: 'This is not a test',
				to: 'Juan Asturia',
				from: 'Rita Perez',
				timeToLifeSec: 47,
			};

			const ctx = new ExecutionContextHost([req, res]);

			const spy = jest.spyOn(interceptor_2, 'intercept');

			const response = await firstValueFrom(interceptor_2.intercept(ctx, callHandler));

			expect(response).toHaveProperty('errors');
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('AuthInterceptor', () => {
		beforeEach(() => {
			interceptor_3 = new AuthInterceptor(RedisMock as any);
			req = httpMock.createRequest();
			res = httpMock.createResponse();
		});

		it('valid', async () => {
			req.body = {
				message: 'This is a test',
				to: 'Juan Perez',
				from: 'Rita Asturia',
				timeToLifeSec: 45,
			};

			req.headers = {
				'X-Parse-REST-API-Key': '2f5ae96c-b558-4c7b-a590-a501ae1c3f6c',
				'X-JWT-KWY':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im50dGRhdGEiLCJkYXRldGltZSI6MTY4Mjk1NzEwMCwiaWF0IjoxNjgyOTU3MTAwLCJleHAiOjE2OTI5NTcxMDB9.-Edj7kFDhxAC9lwLw6Pz-yxu7xLDFUngfyOOgsZX9pU',
			};

			const ctx = new ExecutionContextHost([req, res]);

			const spy = jest.spyOn(interceptor_3, 'intercept');

			await firstValueFrom(interceptor_3.intercept(ctx, callHandler));

			expect(spy).toHaveBeenCalled();
		});

		it('no valid', async () => {
			req.body = {
				message: 'This is a test',
				to: 'Juan Perez',
				from: 'Rita Asturia',
				timeToLifeSec: 45,
			};

			const ctx = new ExecutionContextHost([req, res]);

			const spy = jest.spyOn(interceptor_3, 'intercept');

			const response = await firstValueFrom(interceptor_3.intercept(ctx, callHandler));

			expect(response).toBe('ERROR');
			expect(spy).toHaveBeenCalled();
		});
	});
});
