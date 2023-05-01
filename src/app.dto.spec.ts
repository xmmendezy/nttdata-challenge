import { plainToInstance } from 'class-transformer';
import { AuthDto, BodyDevOpsDto } from './app.dto';

describe('AppDTO', () => {
	describe('AuthDto', () => {
		it('valid data', () => {
			const data = plainToInstance(AuthDto, {
				username: 'nttdata',
				password: 'password',
			});

			const errors = data.errors();

			expect(errors.length).toBe(0);
		});

		it('no valid data', () => {
			const data = plainToInstance(AuthDto, {
				username: 5,
				password: 'password',
			});

			const errors = data.errors();

			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('BodyDevOpsDto', () => {
		it('valid data', () => {
			const data = plainToInstance(BodyDevOpsDto, {
				message: 'This is a test',
				to: 'Juan Perez',
				from: 'Rita Asturia',
				timeToLifeSec: 45,
			});

			const errors = data.errors();

			expect(errors.length).toBe(0);
		});

		it('no valid data', () => {
			const data = plainToInstance(BodyDevOpsDto, {
				message: 'This is not a test',
				to: 'Juan Asturia',
				from: 'Rita Perez',
				timeToLifeSec: 47,
			});

			const errors = data.errors();

			expect(errors.length).toBeGreaterThan(0);
		});
	});
});
