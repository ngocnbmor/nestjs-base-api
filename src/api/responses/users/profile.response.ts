import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { DefaultFormat } from '../../../common/constants/format.const';
import UserModel from '../../../database/models/user.model';

export class ProfileResponse {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public phone: string;

	@ApiProperty()
	public name?: string;

	@ApiProperty()
	public image?: string;

	@ApiProperty()
	public introduction?: string;

	@ApiProperty()
	public is_owner_store?: boolean;

	@ApiProperty()
	public status_of_store?: boolean;

	@ApiProperty()
	public store_id: string;

	@ApiProperty()
	public area_id: string;

	@ApiProperty()
	public created_at?: Date | string | null;

	constructor(user: UserModel, storeId?: string) {
		this.id = user.id;
		this.phone = user.phone;
		this.image = user.image;
		this.name = user.name;
		this.introduction = user.introduction;
		this.is_owner_store = user.is_owner_store;
		this.store_id = storeId;
		this.status_of_store = false;
		this.created_at = !user.created_at
			? null
			: moment(user.created_at).format(DefaultFormat.DATETIME);
	}
}
