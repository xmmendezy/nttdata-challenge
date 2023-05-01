import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthDto, BodyDevOpsDto } from './app.dto';
import { Auth, Validate } from './app.decorator';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('/auth')
	@Validate(AuthDto)
	public auth(@Body() data: AuthDto) {
		return this.appService.auth(data);
	}

	@Post('/DevOps')
	@Validate(BodyDevOpsDto)
	@Auth()
	public devOps() {
		return this.appService.devOps();
	}
}
