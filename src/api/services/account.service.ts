import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { ProfileResponse } from '../responses/users/profile.response';

@Injectable()
export class AccountService {
	constructor(
		private readonly userRepository: UserRepository,
	) {}

	public async getProfile(user_id: string): Promise<ProfileResponse> {
		const user = await this.userRepository.findUserById(user_id);
		let profileResponse = new ProfileResponse(user, null);
		return profileResponse;
	}
}
