import { IsEnum, IsInt, Min, Max, validateSync, ValidationError, IsString } from 'class-validator';

function extract_errors(obj: ValidationError): string[] {
	return (obj.constraints ? Object.values(obj.constraints) : []).concat(...obj.children.map(extract_errors));
}

export class BaseDto {
	public errors(): string[] {
		return ([] as string[]).concat(...validateSync(this).map(extract_errors));
	}
}

export class AuthDto extends BaseDto {
	@IsString()
	username: string;

	@IsString()
	password: string;
}

export class BodyDevOpsDto extends BaseDto {
	@IsEnum(['This is a test'], { message: 'message should be "This is a test"' })
	message: string;

	@IsEnum(['Juan Perez'], { message: 'to should be "Juan Perez"' })
	to: string;

	@IsEnum(['Rita Asturia'], { message: 'from should be "Rita Asturia"' })
	from: string;

	@IsInt()
	@Min(45, { message: 'timeToLifeSec should be 45' })
	@Max(45, { message: 'timeToLifeSec should be 45' })
	timeToLifeSec: number;
}
