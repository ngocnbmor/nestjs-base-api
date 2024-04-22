export enum Message {
	MSG001 = 'User is not found',
	MSG002 = 'User get successfully.',
	MSG003 = 'Get profile successfully.',
	MSG004 = 'Update profile successfully.',
	MSG005 = 'Invalid email or password',
	MSG006 = 'Login successfully',

	MSI00001 = '表示するデータはありません。', // No data display.
	MSI00002 = '削除しました。', // Deleted successfully.
	MSI00003 = '編集しました。', // Edited successfully.
	MSI00004 = '登録しました。', // Registered successfully.
	MSI00005 = '{0}を{1}に送信しました。', // The {0} was sent to {1}.
	// You have submitted a password change request.
	// A password recovery link has been sent to you by email.
	// Please check your email now.
	MSI00006 = `パスワード変更の依頼を受け付けました。
	パスワード変更用のリンクをメールで送信しました。
	今すぐメールをご確認ください。`,

	MSI00008 = 'パスワードがリセットされました。ログインを続行してください。', // The password has reseted successfully.  Please continue to login.
	MSI00010 = 'ここにメッセージを入力してください。', // Type a message here
	MSI00011 = 'パスワード再設定を要求していますか。', // Are you requesting a password reset?

	MSW00001 = 'このファイルを削除してもよろしいですか。', // Are you sure you want to delete this file?
	MSW00002 = 'データが変更されました。ページをリロードしてください。', // Data has been changed. Please reload the page.
	MSW00003 = '本当に削除しますか。', // Are you sure you want to delete this record?
	MSW00004 = '実行した変更は保存されない場合があります。続行してもよろしいですか。', // Changes you made may not be saved. Are you sure you want to continue?
	// You have sent a password reset request.
	// Please try again in {0} minutes
	MSW00005 = `パスワード再設定を送信しました。
	{0}分後にもう一度お試しください。`,
	MSW00006 = '{0}を削除しますか。', // Do you want to delete the {0}.
	MSW00007 = '{1} に{0}を辞退しますか。', // Do you want to reject {0} out of {1}.

	MSE00001 = '{0}を入力してください。', // Please enter {0}.
	MSE00002 = '{0}を選択してください。', // Please choose {0}.
	MSE00003 = '{0}は{1}桁以上で入力してください。', // Please enter {0} at least {1} characters.
	MSE00004 = '{0}は{1}桁以下で入力してください。', // Please enter {0} with {1} characters or less.
	MSE00005 = '{0}は現在日より後の日付を指定してください。', // Please choose {0} a date after the current date.
	MSE00006 = '{0}は現在日以上の日付を指定してください。', // Please choose {0} a date more than or equal to the current date.
	MSE00007 = '{0}は現在日より前の日付を指定してください。', // Please choose {0} a date before the current date.
	MSE00008 = '{0}は現在日以下の日付を指定してください。', // Please choose {0} a date less than or equal to the current date.
	MSE00009 = '{0}は{1}より後の日付を指定してください。', // Please choose {0} a date after {1}.
	MSE00010 = '{0}は{1}以上の日付を指定してください。', // Please choose {0} a date more than or equal to {1}.
	MSE00011 = '{0}は{1}より前の日付を指定してください。', // Please choose {0} a date before {1}.
	MSE00012 = '{0}は{1}以下の日付を指定してください。', // Please choose {0} a date less than or equal to {1}.
	MSE00013 = '{0}は{1}より大きい値を指定してください。', // Please specify {0} more than {1}.
	MSE00014 = '{0}は{1}以上の値を指定してください。', // Please specify {0} more than or equal to {1}.
	MSE00015 = '{0}は{1}より小さい値を指定してください。', // Please specify {0} less than {1}.
	MSE00016 = '{0}は{1}以下の値を指定してください。', // Please specify {0} less than or equal to {1}.
	MSE00017 = '{0}の形式が正しくありません。{1}の形式で指定してください。', // The format of {0} is incorrect. Please specify in {1} format.
	MSE00018 = '全角文字で入力してください。', // Please inter Fullsize character.
	MSE00019 = '全角ひらがなで入力してください。', // Please inter Fullsize hiragana character.
	MSE00020 = '全角カタカナで入力してください。', // Please inter Fullsize katakana character.
	MSE00021 = '半角文字で入力してください。', // Please inter Halfsize character.
	MSE00022 = '半角英数で入力してください。', // Please inter Halfsize alphanumerical character.
	MSE00023 = '半角英字で入力してください。', // Please inter Alphabetic characters.
	MSE00024 = '半角数字で入力してください。', // Please inter Halfsize numbers character.
	MSE00025 = '半角カタカナで入力してください。', // Please inter Halfsize Katakana character.
	MSE00026 = '{0}ファイルを読み込めません。', // Could not read file {0}.
	MSE00027 = '{0}は既に存在します。', // {0} already exists.
	MSE00028 = '{0}は削除されたか存在していません。ページをリロードしてください。', // {0} has been deleted or does not exist.
	MSE00029 = '英大文字、英小文字、および数字すべて１文字以上含む8～16文（すべて半角）。', // The {0} must contain 3 or more letters, numbers and capital letters and must be between {1} and {2} characters.
	MSE00030 = '{0}と{1}が一致していません。同じ内容を入力してください。', // The {0} does not match the {1}. Please enter the same content.
	MSE00031 = '{0}は{1}と違うものにしてください。', // The {0} must be different from the {1}.
	MSE00032 = 'アカウントはロックされました。管理者にご連絡ください。', // Your{0} has been locked. Please contact the administrator.
	MSE00033 = '{0}が正しくありません。', // The {0} is incorrect.
	MSE00034 = '{0}は{1}桁〜{2}桁の範囲で入力してください。', // Please enter {0} in the range from {1} to {2} digits.
	MSE00035 = '{0}ファイルを選択してください。', // Please select the {0} file.
	MSE00036 = 'サーバーでエラーが発生しました。管理者に問い合わせてください。', // The server encountered an error. Please contact your administrator.
	MSE00037 = 'サーバーにファイルをアップロードできません。', // Cannot upload file to the server.
	MSE00038 = 'データが存在しません。', // No data exists.
	MSE00039 = '半角数字または「-」記号を入力してください。', // Please input Halfsize number characters or the hyphen "-".
	MSE00040 = '英数字またはハイフン「-/+」を入力してください。', // Please input Halfsize number characters or the hyphen "-/+".
	MSE00041 = 'アクティベーションのリクエストが無効です。 メールを再度確認してください。', // Activation request is invalid. Please check your email again.
	MSE00042 = '要求が失敗しました。', // Request failed
	MSE00043 = '無効なリクエスト。', // Invalid request
	MSE00044 = 'ファイル形式が正しくありません。ファイル形式は{0}を選択してください。', // File format is incorrect. Please select the file format is {0}.
	MSE00045 = '{0}MBから{1}MBより大きいサイズのファイルを選択してください。', // Please choose a file with size larger than {0}MB to {1}MB.
	MSE00046 = '少なくとも{0}以上の{1}を選択してください。', // Please select at least {0} {1}.
	MSE00047 = '最大{0}以内の{1}を選択してください。', // Please select up to {0} {1}.
	MSE00048 = 'このリクエストは期限切れになりました。 パスワードを忘れた場合の画面に戻り、再送してください。', // This request was expired. Please return to the forgot password screen and resend.
	MSE00049 = '入力した{0}または{1}が正しくありません。', // The {0} or {1} you entered is incorrect.
	MSE00050 = '認証コードが無効です。もう一度お試しください。', // Invalid Verification Code. Please try again.
	MSE00053 = '{1}がすでに存在するため、{0}を削除できません。', // The {0} cannot be deleted because the {1} already exists.
	MSE00054 = '最大選択期間は12か月です。', // Maximum selection period is 12 months
	MSE00055 = '{1}値以下の{0}値を入力してください。', // Please enter {0} less than or equal to {1}.
	MSE00056 = '{1}値以上の{0}値を入力してください。', // Please enter {0} bigger or equal to {1}.
	MSE00057 = 'アカウントが削除されました。管理者に連絡してください。', // Your account has been deleted. Please contact the administrator.
	MSE00058 = 'このリクエストは期限切れになりました。リクエストを再送してください。', // This request has expired. Please resend the request.
	MSE00059 = 'Please choose {0} user.', // Please choose {0} user.
	MSE00060 = '{0}の形式が正しくありません。', // The format of {0} is incorrect.
	MSE00061 = '{0}を削除できません。', //{0} cannot be deleted..
}
