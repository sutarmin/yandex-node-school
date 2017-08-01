// Вынес resultContainer за MyForm, потому что он структурно к ней не относится
var MyForm = (function (resultContainerId) {
	this.form = document.getElementById('myform');
	this.name = document.getElementsByName('name');
	this.email = document.getElementsByName('email');
	this.phone = document.getElementsByName('phone');
	this.resultContainer = document.getElementById(resultContainerId);

	// Возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields)
	/*
	- ФИО: Ровно три слова.
	- Email: Формат email-адреса, но только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com.
	- Телефон: Номер телефона, который начинается на +7, и имеет формат +7(999)999-99-99.
			Кроме того, сумма всех цифр телефона не должна превышать 30.
			Например, для +7(111)222-33-11 сумма равняется 24, а для +7(222)444-55-66 сумма равняется 47.
	*/
	this.validate = function () {
		var result = {
			isValid: true,
			errorFields: []
		};

		return result;
	}

	// Возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
	this.getData = function () {
		return {
			'name': this.name.value,
			'email': this.email.value,
			'phone': this.phone.value
		}
	}

	// Принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
	this.setData = function (obj) {
		this.name.value['name'] = obj['name'];
		this.email.value['email'] = obj['email'];
		this.phone.value['phone'] = obj['phone'];
	}

	// Выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена. Вызывается по клику на кнопку отправить.
	this.submit = function () {
		if (!this.validate().isValid) {
			return;
		}
		this.form.submit();
	}
})('resultContainer')
