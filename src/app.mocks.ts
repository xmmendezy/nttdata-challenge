export const RedisMock = {
	set: async (t: string) => t,
	get: async (t: string) => {
		if (t === 'token') {
			return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im50dGRhdGEiLCJkYXRldGltZSI6MTY4Mjk2NDQ5OCwiaWF0IjoxNjgyOTY0NDk4LCJleHAiOjE2OTI5NjQ0OTh9.4-QOMUN5icnIUYM3aFYkh-qJWrSP_k5tAIWQneF1AMA';
		} else if (t === 'password') {
			return '$2a$10$IWFdpt8MOfyk0HrjtN.Nje5nJCH7/NhAnkUqctnRQP3/.LCfb53Wu';
		} else {
			return '';
		}
	},
};
