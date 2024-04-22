export class Message {
	public static MSG001: string = 'User is not found';
	public static MSG002: string = 'User get successfully.';
	public static MSG003: string = 'Get profile successfully.';
	public static MSG004: string = 'Update profile successfully.';
	public static MSG005: string = 'Invalid email or password';
	public static MSG006: string = 'Login successfully';

	public static MSI00001: string = '表示するデータはありません。'; // No data display.
	public static MSI00002: string = '削除しました。'; // Deleted successfully.
	public static MSI00003: string = '編集しました。'; // Edited successfully.
	public static MSI00004: string = '登録しました。'; // Registered successfully.
	public static MSI00005: string = '{0}を{1}に送信しました。'; // The {0} was sent to {1}.
	// You have submitted a password change request.
	// A password recovery link has been sent to you by email.
	// Please check your email now.
	public static MSI00006: string = `パスワード変更の依頼を受け付けました。
	パスワード変更用のリンクをメールで送信しました。
	今すぐメールをご確認ください。`;

	public static MSI00008: string = 'パスワードがリセットされました。ログインを続行してください。'; // The password has reseted successfully.  Please continue to login.
	public static MSI00010: string = 'ここにメッセージを入力してください。'; // Type a message here
	public static MSI00011: string = 'パスワード再設定を要求していますか。'; // Are you requesting a password reset?

	public static MSW00001: string = 'このファイルを削除してもよろしいですか。'; // Are you sure you want to delete this file?
	public static MSW00002: string = 'データが変更されました。ページをリロードしてください。'; // Data has been changed. Please reload the page.
	public static MSW00003: string = '本当に削除しますか。'; // Are you sure you want to delete this record?
	public static MSW00004: string =
		'実行した変更は保存されない場合があります。続行してもよろしいですか。'; // Changes you made may not be saved. Are you sure you want to continue?
	// You have sent a password reset request.
	// Please try again in {0} minutes
	public static MSW00005: string = `パスワード再設定を送信しました。
	{0}分後にもう一度お試しください。`;
	public static MSW00006: string = '{0}を削除しますか。'; // Do you want to delete the {0}.
	public static MSW00007: string = '{1} に{0}を辞退しますか。'; // Do you want to reject {0} out of {1}.

	public static MSE00001: string = '{0}を入力してください。'; // Please enter {0}.
	public static MSE00002: string = '{0}を選択してください。'; // Please choose {0}.
	public static MSE00003: string = '{0}は{1}桁以上で入力してください。'; // Please enter {0} at least {1} characters.
	public static MSE00004: string = '{0}は{1}桁以下で入力してください。'; // Please enter {0} with {1} characters or less.
	public static MSE00005: string = '{0}は現在日より後の日付を指定してください。'; // Please choose {0} a date after the current date.
	public static MSE00006: string = '{0}は現在日以上の日付を指定してください。'; // Please choose {0} a date more than or equal to the current date.
	public static MSE00007: string = '{0}は現在日より前の日付を指定してください。'; // Please choose {0} a date before the current date.
	public static MSE00008: string = '{0}は現在日以下の日付を指定してください。'; // Please choose {0} a date less than or equal to the current date.
	public static MSE00009: string = '{0}は{1}より後の日付を指定してください。'; // Please choose {0} a date after {1}.
	public static MSE00010: string = '{0}は{1}以上の日付を指定してください。'; // Please choose {0} a date more than or equal to {1}.
	public static MSE00011: string = '{0}は{1}より前の日付を指定してください。'; // Please choose {0} a date before {1}.
	public static MSE00012: string = '{0}は{1}以下の日付を指定してください。'; // Please choose {0} a date less than or equal to {1}.
	public static MSE00013: string = '{0}は{1}より大きい値を指定してください。'; // Please specify {0} more than {1}.
	public static MSE00014: string = '{0}は{1}以上の値を指定してください。'; // Please specify {0} more than or equal to {1}.
	public static MSE00015: string = '{0}は{1}より小さい値を指定してください。'; // Please specify {0} less than {1}.
	public static MSE00016: string = '{0}は{1}以下の値を指定してください。'; // Please specify {0} less than or equal to {1}.
	public static MSE00017: string = '{0}の形式が正しくありません。{1}の形式で指定してください。'; // The format of {0} is incorrect. Please specify in {1} format.
	public static MSE00018: string = '全角文字で入力してください。'; // Please inter Fullsize character.
	public static MSE00019: string = '全角ひらがなで入力してください。'; // Please inter Fullsize hiragana character.
	public static MSE00020: string = '全角カタカナで入力してください。'; // Please inter Fullsize katakana character.
	public static MSE00021: string = '半角文字で入力してください。'; // Please inter Halfsize character.
	public static MSE00022: string = '半角英数で入力してください。'; // Please inter Halfsize alphanumerical character.
	public static MSE00023: string = '半角英字で入力してください。'; // Please inter Alphabetic characters.
	public static MSE00024: string = '半角数字で入力してください。'; // Please inter Halfsize numbers character.
	public static MSE00025: string = '半角カタカナで入力してください。'; // Please inter Halfsize Katakana character.
	public static MSE00026: string = '{0}ファイルを読み込めません。'; // Could not read file {0}.
	public static MSE00027: string = '{0}は既に存在します。'; // {0} already exists.
	public static MSE00028: string =
		'{0}は削除されたか存在していません。ページをリロードしてください。'; // {0} has been deleted or does not exist.
	public static MSE00029: string =
		'英大文字、英小文字、および数字すべて１文字以上含む8～16文（すべて半角）。'; // The {0} must contain 3 or more letters, numbers and capital letters and must be between {1} and {2} characters.
	public static MSE00030: string = '{0}と{1}が一致していません。同じ内容を入力してください。'; // The {0} does not match the {1}. Please enter the same content.
	public static MSE00031: string = '{0}は{1}と違うものにしてください。'; // The {0} must be different from the {1}.
	public static MSE00032: string = 'アカウントはロックされました。管理者にご連絡ください。'; // Your{0} has been locked. Please contact the administrator.
	public static MSE00033: string = '{0}が正しくありません。'; // The {0} is incorrect.
	public static MSE00034: string = '{0}は{1}桁〜{2}桁の範囲で入力してください。'; // Please enter {0} in the range from {1} to {2} digits.
	public static MSE00035: string = '{0}ファイルを選択してください。'; // Please select the {0} file.
	public static MSE00036: string = 'サーバーでエラーが発生しました。管理者に問い合わせてください。'; // The server encountered an error. Please contact your administrator.
	public static MSE00037: string = 'サーバーにファイルをアップロードできません。'; // Cannot upload file to the server.
	public static MSE00038: string = 'データが存在しません。'; // No data exists.
	public static MSE00039: string = '半角数字または「-」記号を入力してください。'; // Please input Halfsize number characters or the hyphen "-".
	public static MSE00040: string = '英数字またはハイフン「-/+」を入力してください。'; // Please input Halfsize number characters or the hyphen "-/+".
	public static MSE00041: string =
		'アクティベーションのリクエストが無効です。 メールを再度確認してください。'; // Activation request is invalid. Please check your email again.
	public static MSE00042: string = '要求が失敗しました。'; // Request failed
	public static MSE00043: string = '無効なリクエスト。'; // Invalid request
	public static MSE00044: string =
		'ファイル形式が正しくありません。ファイル形式は{0}を選択してください。'; // File format is incorrect. Please select the file format is {0}.
	public static MSE00045: string = '{0}MBから{1}MBより大きいサイズのファイルを選択してください。'; // Please choose a file with size larger than {0}MB to {1}MB.
	public static MSE00046: string = '少なくとも{0}以上の{1}を選択してください。'; // Please select at least {0} {1}.
	public static MSE00047: string = '最大{0}以内の{1}を選択してください。'; // Please select up to {0} {1}.
	public static MSE00048: string =
		'このリクエストは期限切れになりました。 パスワードを忘れた場合の画面に戻り、再送してください。'; // This request was expired. Please return to the forgot password screen and resend.
	public static MSE00049: string = '入力した{0}または{1}が正しくありません。'; // The {0} or {1} you entered is incorrect.
	public static MSE00050: string = '認証コードが無効です。もう一度お試しください。'; // Invalid Verification Code. Please try again.
	public static MSE00053: string = '{1}がすでに存在するため、{0}を削除できません。'; // The {0} cannot be deleted because the {1} already exists.
	public static MSE00054: string = '最大選択期間は12か月です。'; // Maximum selection period is 12 months
	public static MSE00055: string = '{1}値以下の{0}値を入力してください。'; // Please enter {0} less than or equal to {1}.
	public static MSE00056: string = '{1}値以上の{0}値を入力してください。'; // Please enter {0} bigger or equal to {1}.
	public static MSE00057: string = 'アカウントが削除されました。管理者に連絡してください。'; // Your account has been deleted. Please contact the administrator.
	public static MSE00058: string =
		'このリクエストは期限切れになりました。リクエストを再送してください。'; // This request has expired. Please resend the request.
	public static MSE00059: string = 'Please choose {0} user.'; // Please choose {0} user.
	public static MSE00060: string = '{0}の形式が正しくありません。'; // The format of {0} is incorrect.
	public static MSE00061: string = '{0}を削除できません。'; //{0} cannot be deleted..

	/**
	 * Get message
	 * @param CODE
	 * @param param
	 * @returns string
	 */
	public static getMessage(CODE: string, ...param: string[]): string {
		if (param.length === 0) {
			return CODE;
		}
		const args = param;
		return CODE.replace(/\{(\d+)\}/g, function () {
			return args[arguments[1]] || `${arguments[1]}`;
		});
	}
}
