import {
	IsNotEmpty,
	IsEmail,
	ValidationArguments,
	IsJSON,
	IsMongoId,
	IsPhoneNumber,
	IsAlpha,
	IsAlphanumeric,
	IsFullWidth,
	IsHalfWidth,
	IsNumberString,
	Length,
	MaxLength,
	MinLength,
	Matches,
	IsDateString,
	IsIn,
	registerDecorator,
	IsDate,
	IsBoolean,
	IsString,
	IsNumber,
	IsNumberOptions,
	IsAscii,
	IsOptional,
	IsEnum,
	IsInt,
	Min,
	Max,
	IsArray,
	ValidationOptions,
} from 'class-validator';
import * as moment from 'moment';
import { Message } from './../constants/message.const';
import { DefaultFormat } from '../constants/format.const';
import { ConstansColumns } from '../constants/columns.const';
import { IsEmailOptions, IsISO8601Options } from 'validator';

interface IValidate {
	type?: 'select' | 'input';
	format?: string;
	compare?: ICompare;
	validationOptions?: ValidationOptions;
}

interface ICompare {
	operator: '<' | '<=' | '>' | '>=';
	propertyCompare?: string;
}

/**
 * Allow  null or not exist key
 * @param param
 * @returns
 */
export function isNotRequire(param?: IValidate): PropertyDecorator {
	return IsOptional({
		...param?.validationOptions,
	});
}

/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
export function isNotEmpty(param?: IValidate): PropertyDecorator {
	return IsNotEmpty({
		message: (args: ValidationArguments) => {
			return Message.getMessage(
				param?.type === 'select' ? Message.MSE00002 : Message.MSE00001,
				ConstansColumns[args.property] || args.property
			);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
export function isEmail(
	param?: IValidate,
	options?: IsEmailOptions
): PropertyDecorator {
	return IsEmail(options, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
		context: null,
		always: false,
	});
}

/**
 * Checks if the string is valid JSON (note: uses JSON.parse).
 * If given value is not a string, then it returns false.
 */
export function isJSON(param?: IValidate): PropertyDecorator {
	return IsJSON({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 * If given value is not a string, then it returns false.
 */
export function isMongoId(param?: IValidate): PropertyDecorator {
	return IsMongoId({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string is a valid phone number. To successfully validate any phone number the text must include
 * the intl. calling code, if the calling code wont be provided then the region must be set.
 *
 * @param region default JP
 * If text doesn't start with the international calling code (e.g. +81), then you must set this parameter.
 */
export function isPhoneNumber(param?: IValidate): PropertyDecorator {
	return IsPhoneNumber('JP', {
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string contains only letters (a-zA-Z).
 * If given value is not a string, then it returns false.
 */
export function isAlpha(param?: IValidate): PropertyDecorator {
	return IsAlpha('en-US', {
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00023, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
export function isAlphanumeric(param?: IValidate): PropertyDecorator {
	return IsAlphanumeric('en-US', {
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00022, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

export function isAscii(param?: IValidate): PropertyDecorator {
	return IsAscii({
		message: (args: ValidationArguments) => {
			return Message.getMessage(
				param?.format ? Message.MSE00017 : Message.MSE00060,
				ConstansColumns[args.property] || args.property,
				param?.format
			);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
export function isFullWidth(param?: IValidate): PropertyDecorator {
	return IsFullWidth({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00018, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string contains any half-width chars.
 * If given value is not a string, then it returns false.
 */
export function isHalfWidth(param?: IValidate): PropertyDecorator {
	return IsHalfWidth({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00021, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string is numeric.
 * If given value is not a string, then it returns false.
 */
// export function isNumberString(param?: IValidate): PropertyDecorator {
// 	return IsNumberString({
// 		message: (args: ValidationArguments) => {
// 			return Message.getMessage(Message.MSE00024, ConstansColumns[args.property] || args.property);
// 		},
// 		...param?.validationOptions,
// 	});
// }

/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
export function length(min: number, max?: number, param?: IValidate): PropertyDecorator {
	return Length(min, max, {
		message: (args: ValidationArguments) => {
			if (args.value < min) {
				return Message.getMessage(
					Message.MSE00056,
					ConstansColumns[args.property] || args.property,
					min.toString()
				);
			}
			if (max !== undefined && args.value > max) {
				return Message.getMessage(
					Message.MSE00055,
					ConstansColumns[args.property] || args.property,
					max.toString()
				);
			}
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string's length is not more than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export function maxLength(max: number, param?: IValidate): PropertyDecorator {
	return MaxLength(max, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(
				Message.MSE00055,
				ConstansColumns[args.property] || args.property,
				max.toString()
			);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export function minLength(min: number, param?: IValidate): PropertyDecorator {
	return MinLength(min, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(
				Message.MSE00056,
				ConstansColumns[args.property] || args.property,
				min.toString()
			);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the first number is greater than or equal to the second.
 */
export function min(min: number, param?: IValidate): PropertyDecorator {
	return Min(min, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(
				Message.MSE00056,
				ConstansColumns[args.property] || args.property,
				min.toString()
			);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if the first number is less than or equal to the second.
 */
export function max(max: number, param?: IValidate): PropertyDecorator {
	return Max(max, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(
				Message.MSE00055,
				ConstansColumns[args.property] || args.property,
				max.toString()
			);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if string matches the pattern. Either matches('foo', /foo/i)
 * If given value is not a string, then it returns false.
 */
export function matches(pattern: RegExp, param?: IValidate): PropertyDecorator {
	return Matches(pattern, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if given value not in a array of allowed values.
 */
export function isIn(values: readonly any[], param?: IValidate): PropertyDecorator {
	return IsIn(values, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Alias for IsISO8601 validator YYYY-MM-DD
 */
export function isDateString(
	options?: IsISO8601Options,
	param?: IValidate
): PropertyDecorator {
	return IsDateString(options, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(
				param?.format ? Message.MSE00017 : Message.MSE00060,
				ConstansColumns[args.property] || args.property,
				param?.format
			);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if a value is a date.
 */
export function isDate(param?: IValidate): PropertyDecorator {
	return IsDate({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if a value is a boolean.
 */
export function isBoolean(param?: IValidate): PropertyDecorator {
	return IsBoolean({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if a value is a ennum.
 */
export function isEnnum(entity: object, param?: IValidate): PropertyDecorator {
	return IsEnum(entity, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if a given value is a real string.
 */
export function isString(param?: IValidate): PropertyDecorator {
	return IsString({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if a value is a number.
 */
export function isNumber(options?: IsNumberOptions, param?: IValidate): PropertyDecorator {
	return IsNumber(options, {
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if value is an integer.
 */
export function isInt(param?: IValidate, options?: IsNumberOptions): PropertyDecorator {
	return IsInt({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Check character full width hiragana
 * @param param
 * @returns
 */
export function isFullWidthHiragana(param?: IValidate): PropertyDecorator {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isFullWidthHiragana',
			target: object.constructor,
			propertyName: propertyName,
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return value && /^[ぁ-ん]+$/.test(value);
				},

				defaultMessage(args: ValidationArguments) {
					return Message.getMessage(
						Message.MSE00019,
						ConstansColumns[args.property] || args.property
					);
				},
			},
		});
	};
}

/**
 * Check FullWidthKatakana
 * @param param
 * @returns
 */
export function isFullWidthKatakana(param?: IValidate): PropertyDecorator {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isFullWidthKatakana',
			target: object.constructor,
			propertyName: propertyName,
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return value && /^([ァ-ン]|ー)+$/.test(value);
				},

				defaultMessage(args: ValidationArguments) {
					return Message.getMessage(
						Message.MSE00020,
						ConstansColumns[args.property] || args.property
					);
				},
			},
		});
	};
}

/**
 * Check HalfWidthKatakana
 * @param param
 * @returns
 */
export function isHalfWidthKatakana(param?: IValidate): PropertyDecorator {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isFullWidthKatakana',
			target: object.constructor,
			propertyName: propertyName,
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return value && /^[ｧ-ﾝﾞﾟ]+$/.test(value);
				},

				defaultMessage(args: ValidationArguments) {
					return Message.getMessage(
						Message.MSE00025,
						ConstansColumns[args.property] || args.property
					);
				},
			},
		});
	};
}

/**
 * Compare two date
 * @param param
 * @returns
 */

export function compareDate(param?: IValidate): PropertyDecorator {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'compareDate',
			target: object.constructor,
			propertyName: propertyName,
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (
						!param?.compare ||
						!value ||
						!args.object[param?.compare.propertyCompare] ||
						!moment(value, 'YYYY-MM-DD').isValid() ||
						!moment(args.object[param?.compare.propertyCompare], 'YYYY-MM-DD').isValid()
					) {
						return false;
					}
					switch (param.compare.operator) {
						case '<':
							return (
								moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') <
								moment(args.object[param?.compare.propertyCompare], 'YYYY-MM-DD').format(
									'YYYY-MM-DD'
								)
							);
						case '<=':
							return (
								moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') <=
								moment(args.object[param?.compare.propertyCompare], 'YYYY-MM-DD').format(
									'YYYY-MM-DD'
								)
							);
						case '>':
							return (
								moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') >
								moment(args.object[param?.compare.propertyCompare], 'YYYY-MM-DD').format(
									'YYYY-MM-DD'
								)
							);
						case '>=':
							return (
								moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') >=
								moment(args.object[param?.compare.propertyCompare], 'YYYY-MM-DD').format(
									'YYYY-MM-DD'
								)
							);
					}
				},

				defaultMessage(args: ValidationArguments) {
					if (
						!param?.compare ||
						!args.value ||
						!args.object[param?.compare?.propertyCompare] ||
						!moment(args.value, 'YYYY-MM-DD').isValid() ||
						!moment(args.object[param?.compare?.propertyCompare], 'YYYY-MM-DD').isValid()
					) {
						return Message.getMessage(
							Message.MSE00033,
							ConstansColumns[args.property] || args.property
						);
					}

					switch (param.compare.operator) {
						case '<':
							return Message.getMessage(
								Message.MSE00009,
								ConstansColumns[args.property] || args.property,
								ConstansColumns[param.compare.propertyCompare] || param.compare.propertyCompare
							);
						case '<=':
							return Message.getMessage(
								Message.MSE00012,
								ConstansColumns[args.property] || args.property,
								ConstansColumns[param.compare.propertyCompare] || param.compare.propertyCompare
							);
						case '>':
							return Message.getMessage(
								Message.MSE00011,
								ConstansColumns[args.property] || args.property,
								ConstansColumns[param.compare.propertyCompare] || param.compare.propertyCompare
							);
						case '>=':
							return Message.getMessage(
								Message.MSE00010,
								ConstansColumns[args.property] || args.property,
								ConstansColumns[param.compare.propertyCompare] || param.compare.propertyCompare
							);
					}
				},
			},
		});
	};
}

/**
 * Compare with current date
 * @param param
 * @returns
 */
export function compareWidthCurrenDate(param?: IValidate): PropertyDecorator {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'compareWidthCurrenDate',
			target: object.constructor,
			propertyName: propertyName,
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (!param?.compare || !value || !moment(value, 'YYYY-MM-DD').isValid()) {
						return false;
					}
					switch (param.compare.operator) {
						case '<':
							return (
								moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') <
								moment(Date.now()).format('YYYY-MM-DD')
							);
						case '<=':
							return (
								moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') <=
								moment(Date.now()).format('YYYY-MM-DD')
							);
						case '>':
							return (
								moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') >
								moment(Date.now()).format('YYYY-MM-DD')
							);
						case '>=':
							return (
								moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') >=
								moment(Date.now()).format('YYYY-MM-DD')
							);
					}
				},

				defaultMessage(args: ValidationArguments) {
					if (!param?.compare || !args.value || !moment(args.value, 'YYYY-MM-DD').isValid()) {
						return Message.getMessage(
							Message.MSE00033,
							ConstansColumns[args.property] || args.property
						);
					}

					switch (param.compare.operator) {
						case '<':
							return Message.getMessage(
								Message.MSE00005,
								ConstansColumns[args.property] || args.property
							);
						case '<=':
							return Message.getMessage(
								Message.MSE00008,
								ConstansColumns[args.property] || args.property
							);
						case '>':
							return Message.getMessage(
								Message.MSE00007,
								ConstansColumns[args.property] || args.property
							);
						case '>=':
							return Message.getMessage(
								Message.MSE00006,
								ConstansColumns[args.property] || args.property
							);
					}
				},
			},
		});
	};
}

/**
 * Checks if value is an array.
 *
 * @param param
 * @returns
 */
export function isArray(param?: IValidate): PropertyDecorator {
	return IsArray({
		message: (args: ValidationArguments) => {
			return Message.getMessage(Message.MSE00060, ConstansColumns[args.property] || args.property);
		},
		...param?.validationOptions,
	});
}

/**
 * Checks if value equals ("===") comparison.
 *
 * @param param
 * @returns
 */
export function isEqual(property: string, param?: IValidate) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			name: 'isEqual',
			target: object.constructor,
			propertyName,
			constraints: [property],
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments): boolean {
					const [comparativePropertyName] = args.constraints;
					const comparativeValue = args.object[comparativePropertyName];
					return value === comparativeValue;
				},

				defaultMessage(args: ValidationArguments) {
					return Message.getMessage(
						Message.MSE00030,
						ConstansColumns[args.property] || args.property,
						ConstansColumns[property] || property
					);
				},
			},
		});
	};
}

/**
 * Checks if password must contain uppercase, lowercase and number.
 *
 * @param param
 * @returns
 */
export function isPassword(param?: IValidate) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			name: 'isPassword',
			target: object.constructor,
			propertyName,
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return (
						value &&
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[\.\/\+\;\'\[\]\=\-\_\)\(\*\&\^\%\$\#\@\!\~\`\<\>\?\"\:\}\{\|\\]).{8,16}$/.test(
							value
						)
					);
				},

				defaultMessage(args: ValidationArguments) {
					return Message.getMessage(Message.MSE00029);
				},
			},
		});
	};
}

/**
 * Checks if a value is a date with format yyyy/dd/mm.
 *
 * @param param
 * @returns
 */
export function isDateFormat(param?: IValidate) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			name: 'isDateFormat',
			target: object.constructor,
			propertyName,
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (!value || !moment(value, 'YYYY-MM-DD').isValid()) {
						return false;
					}

					return /^([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))$/.test(value);
				},

				defaultMessage(args: ValidationArguments) {
					if (!args.value || !moment(args.value, 'YYYY-MM-DD').isValid()) {
						return Message.getMessage(
							Message.MSE00033,
							ConstansColumns[args.property] || args.property
						);
					}

					return Message.getMessage(
						Message.MSE00017,
						ConstansColumns[args.property] || args.property,
						DefaultFormat.DATE
					);
				},
			},
		});
	};
}

/**
 * Checks if a value is a date with format yyyy/dd.
 *
 * @param param
 * @returns
 */
export function isMonth(param?: IValidate) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			name: 'isMonth',
			target: object.constructor,
			propertyName,
			options: param?.validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (value && moment(value, 'YYYY/MM', true).isValid()) {
						return true;
					}
				},
				defaultMessage(args: ValidationArguments) {
					if (!args.value || !moment(args.value, 'YYYY/MM').isValid()) {
						return Message.getMessage(
							Message.MSE00033,
							ConstansColumns[args.property] || args.property
						);
					}
				},
			},
		});
	};
}
