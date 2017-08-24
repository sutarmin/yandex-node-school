class Form {
	
	constructor(resultContainerId) {
		this.form = document.getElementById('myform');
		this.fio = document.getElementsByName('fio')[0];
		this.email = document.getElementsByName('email')[0];
		this.phone = document.getElementsByName('phone')[0];
		this.submitButton = document.getElementById('submitButton');
		this.resultContainer = document.getElementById(resultContainerId);

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			this.submit();
		});
	}

	isFioValid() {
		// Проверка, что строка состоит из 3х слов, записанных кириллицей или латиницей. Каждое слово может содержать дефис и апостроф.
		// Слова, записанные юникодными символами не проверяю, сходу этого не сделать, в ТЗ требования нет, надо уточнять
		let haveThreeWords = /^\s*([a-zёа-я-']+\s+){2}[a-zёа-я-']+\s*$/i.test(this.fio.value); 
		// Проврка, что дефис или апостроф являются первым или последним символами в словах (такого быть не должно)
		let haveSurrSymbols = /^[-']|\s[-']|[-']\s|[-']$/.test(this.fio.value);
		return haveThreeWords && !haveSurrSymbols;
	};

	isEmailValid()  {
		return /^[A-Za-z0-9_.+-]+@ya(\.ru|ndex\.(ru|ua|by|kz|com))$/i.test(this.email.value);
	};

	isPhoneValid() {
		let isMatch = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/i.test(this.phone.value);
		if (isMatch) {
			let digitArray = this.phone.value.match(/\d/g);
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
	validate() {
		let result = {
			isValid: true,
			errorFields: []
		};
		if (!this.isFioValid()) {
			result.isValid = false;
			result.errorFields.push('fio');
		}
		if (!this.isEmailValid()) {
			result.isValid = false;
			result.errorFields.push('email');
		}
		if (!this.isPhoneValid()) {
			result.isValid = false;
			result.errorFields.push('phone');
		}
		return result;
	}

	// Возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
	getData() {
		return {
			'fio': this.fio.value,
			'email': this.email.value,
			'phone': this.phone.value
		}
	}

	// Принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
	setData(obj) {
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

	// Выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена.
	submit() {
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
			this.showError("Вы неправильно заполнили форму. Проверьте значения полей, подсвеченных красным.");
			return;
		}
		this.ajaxQuery();
	}

	async ajaxQuery() {
		this.submitButton.disabled = true;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', this.form.action, true);
		let response = await (fetch(this.form.action).catch(ex => {
			this.submitButton.disabled = false;
			this.resultContainer.classList.remove("progress");
			this.showError("Беда. Мы не смогли получить ответ от сервера. \n"
			+ "Возможно, вы открыли страницу локально или " + this.form.action + " не существует. \n"
			+ "Попробуйте открыть текущую страницу с веб-сервера и проверьте запрашиваемый адрес.");
		}));
		if (!response || response.status != 200) {
			return;
		}
		let answer = await response.json();
		switch (answer.status) {
			case "progress":
				window.setTimeout(this.ajaxQuery.bind(this), +answer.timeout);
				this.resultContainer.classList.add("progress");
				this.resultContainer.innerText = "Ждём ответа от сервера";
				break;
			case "success":
				this.submitButton.disabled = false;
				this.resultContainer.classList.remove("progress");
				this.resultContainer.classList.add("success");
				this.resultContainer.innerText = "Success";
				break;
			case "error":
				this.submitButton.disabled = false;
				this.resultContainer.classList.remove("progress");
				this.showError(answer.reason);
				break;
		}
	}

	showError(errorText) {
		errorText = errorText || "Произошла неведомая ошибка";
		this.resultContainer.classList.add("error");
		this.resultContainer.innerText = errorText;		
	}
}

window.MyFrom = new Form('resultContainer');
