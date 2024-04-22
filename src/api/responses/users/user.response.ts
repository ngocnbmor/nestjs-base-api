import { ApiProperty } from '@nestjs/swagger';
import UserModel from '../../../database/models/user.model';
import * as moment from 'moment';
import { DefaultFormat } from '../../../common/constants/format.const';
export class UserResponse {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public phone: string;

	@ApiProperty()
	public name?: string;

	@ApiProperty()
	public email?: string;

	@ApiProperty()
	public address?: string;

	@ApiProperty()
	public nickname?: string;

	@ApiProperty()
	public gender?: string;

	@ApiProperty()
	public image?: string;

	@ApiProperty()
	public introduction?: string;

	@ApiProperty()
	public is_owner_store?: boolean;

	@ApiProperty()
	public area_id: string;

	@ApiProperty()
	public status?: boolean;

	@ApiProperty()
	public created_at?: Date | string | null;

	@ApiProperty()
	public order_count_booked?: number;

	@ApiProperty()
	public order_count_book_approve?: number;

	@ApiProperty()
	public has_block?: boolean;

	constructor(user: UserModel) {
		if (user) {
			this.id = user.id;
			this.phone = user.phone;
			this.image = user.image;
			this.name = user.name;
			this.email = user.email;
			this.address = user.address;
			this.nickname = user.nickname;
			this.gender = user.gender;
			this.status = user.status;
			this.introduction = user.introduction;
			this.is_owner_store = user.is_owner_store;
			this.has_block = false;
			this.created_at = !user.created_at
				? null
				: moment(user.created_at).format(DefaultFormat.DATETIME);
		}
	}
}
