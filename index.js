// Вынес resultContainer за MyForm, потому что он структурно к ней не относится
let MyForm = ((resultContainerId) => {
	this.form = document.getElementById('myform');
	this.fio = document.getElementsByName('fio')[0];
	this.email = document.getElementsByName('email')[0];
	this.phone = document.getElementsByName('phone')[0];
	this.resultContainer = document.getElementById(resultContainerId);

	let isFioValid = (fio) => {
		// Проверка, что строка состоит из 3х слов, записанных кириллицей или латиницей. Каждое слово может содержать дефис и апостроф.
		// Слова, записанные юникодными символами не проверяю, сходу этого не сделать, в ТЗ требования нет, надо уточнять
		let haveThreeWords = /^\s*([a-zа-я-']+\s+){2}[a-zа-я-']+\s*$/i.test(fio); 
		// Проврка, что дефис или апостроф являются первым или последним символами в словах (такого быть не должно)
		let haveSurrSymbols = /^[-']|\s[-']|[-']\s|[-']$/.test(fio);
		return haveThreeWords && !haveSurrSymbols;
	};

	let isEmailValid = (email) => {
		return /^[A-Za-z0-9_.+-]+@ya(\.ru|ndex\.(ru|ua|by|kz|com))$/i.test(email);
	};

	let isPhoneValid = function(phone) {
		let isMatch = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/i.test(phone);
		if (isMatch) {
			let digitArray = phone.match(/\d/g);
			let summ = 0;
			for (let i = 0; i < digitArray.length; i++) {
				summ += +digitArray[i];
			}
			return summ <= 30;
		}
		return false;
	};

	// Возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields)
	/*
	- ФИО: Ровно три слова.
	- Email: Формат email-адреса, но только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com.
	- Телефон: Номер телефона, который начинается на +7, и имеет формат +7(999)999-99-99.
			Кроме того, сумма всех цифр телефона не должна превышать 30.
			Например, для +7(111)222-33-11 сумма равняется 24, а для +7(222)444-55-66 сумма равняется 47.
	*/
	this.validate = () => {
		let result = {
			isValid: true,
			errorFields: []
		};
		if (!isFioValid(this.fio.value)) {
			result.isValid = false;
			result.errorFields.push('fio');
		}
		if (!isEmailValid(this.email.value)) {
			result.isValid = false;
			result.errorFields.push('email');
		}
		if (!isPhoneValid(this.phone.value)) {
			result.isValid = false;
			result.errorFields.push('phone');
		}
		return result;
	}

	// Возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
	this.getData = () => {
		return {
			'fio': this.fio.value,
			'email': this.email.value,
			'phone': this.phone.value
		}
	}

	// Принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
	this.setData = (obj) => {
		if (obj.hasOwnProperty('fio')){
			this.fio.value = obj['fio'];
		}
		if (obj.hasOwnProperty('email')){
			this.email.value = obj['email'];
		}
		if (obj.hasOwnProperty('phone')){
			this.phone.value = obj['phone'];
		}
	}

	// Выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена. Вызывается по клику на кнопку отправить.
	this.submit = () => {
		// Сброс подсветки неверно заполенных полей
		let errorNodes = this.form.getElementsByClassName('error');
		for (let i = 0; i < errorNodes.length; i++) {
			errorNodes[i].classList.remove('error');
		}
		let validationResult = this.validate();
		if (!validationResult.isValid) {
			for (let i = 0; i < validationResult.errorFields.length; i++) {
				if (this[validationResult.errorFields[i]]) {
					this[validationResult.errorFields[i]].classList.add('error');
				}
			}
			// TODO: Если запрос невалиден, нужно выдавать причину
			return;
		}
		// ajax-запрос
		//this.form.submit();
	}
	return this;
})('resultContainer')
