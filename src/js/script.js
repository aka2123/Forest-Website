const offerChooseBtnBox = document.querySelector('.section-offer__choose-bar')
const offerChooseBtnDefault = document.querySelector('.section-offer__choose-btn:first-child')
const offerChooseBtnMonthly = document.querySelector('.section-offer__choose-btn:last-child')
const offerCardTitle = document.querySelectorAll('.section-offer__card-title')
const offerCardTitleMonthly = document.querySelectorAll('.section-offer__card-title--monthly')
const offerCardMoney = document.querySelectorAll('.section-offer__card-money--once')
const offerCardMoneySale = document.querySelectorAll('.section-offer__card-money--monthly')
const quoteIconLeft = document.querySelector('.section-quote__icon-arrow--left')
const quoteIconRight = document.querySelector('.section-quote__icon-arrow--right')
const quoteBoxes = document.querySelectorAll('.section-quote__box')
const quoteSection = document.querySelector('.section-quote')
const sections = document.querySelectorAll('.section')
const header = document.querySelector('.header')
const navItems = document.querySelectorAll('.nav-bar__list-item')
const navItemLinks = document.querySelectorAll('.nav-bar__list-item a')
const navBarMenu = document.querySelector('.nav-bar__menu')
const burgerBtn = document.querySelector('.nav-bar__btn-burger')
const burgerBtnBars = document.querySelector('.nav-bar__btn-burger i')
const footerYear = document.querySelector('.footer__text-year')
const msgStatus = document.querySelector('.msg-status')
const formBtn = document.querySelector('.section-contact__form-btn')
const formInputs = document.querySelectorAll('.section-contact__form-box input')
const formBoxes = document.querySelectorAll('.section-contact__form-box')
const formInputName = document.querySelector('.section-contact__form-box input#name')
const formInputSurname = document.querySelector('.section-contact__form-box input#surname')
const formInputEmail = document.querySelector('.section-contact__form-box input#email')
const formInputPhoneNumber = document.querySelector('.section-contact__form-box input#phone-number')

const formLabels = document.querySelectorAll('.section-contact__form-box label')
const formTextarea = document.querySelector('.section-contact__form-box textarea')
const formErrors = document.querySelectorAll('.section-contact__error')

let startX = 0
let currentX = 0
let isDragging = false

const handleElForCheckClickedButtonFunction = choosedBtn => {
	choosedBtn.classList.toggle(choosedBtn.classList[0] + '--choosed')
	if (choosedBtn.previousElementSibling === offerChooseBtnDefault) {
		choosedBtn.previousElementSibling.classList.toggle(choosedBtn.classList[0] + '--choosed')
	} else if (choosedBtn.nextElementSibling === offerChooseBtnMonthly) {
		choosedBtn.nextElementSibling.classList.toggle(choosedBtn.classList[0] + '--choosed')
	}

	offerCardTitleMonthly.forEach(el => el.classList.toggle('section-offer__card-title--monthly-unvisible'))
	offerCardMoneySale.forEach(el => el.classList.toggle('section-offer__card-money--monthly-unvisible'))
	offerCardMoney.forEach(el => el.classList.toggle('section-offer__card-money--once-decoration-none'))
}

const checkClickedButton = e => {
	if (
		e.target.classList[1] !== 'section-offer__choose-btn--choosed' &&
		e.target.classList[0] === 'section-offer__choose-btn'
	) {
		handleElForCheckClickedButtonFunction(e.target)
	}
}
const changeBurgerBtn = (section, scrollDistance, sectionTop) => {
	if (section.classList.contains('section--white') && sectionTop <= scrollDistance + 43) {
		burgerBtn.classList.add('nav-bar__btn-burger--on-white-section')
	} else if (!section.classList.contains('section--white') && sectionTop <= scrollDistance + 43) {
		burgerBtn.classList.remove('nav-bar__btn-burger--on-white-section')
	}
}
const scrollSpy = () => {
	let currentSection
	sections.forEach(section => {
		const scrollDistance = window.scrollY
		const sectionTop = section.offsetTop
		const sectionHeight = section.offsetHeight
		const sectionId = section.getAttribute('id')
		if (scrollDistance >= sectionTop - sectionHeight / 2.5) {
			currentSection = sectionId
		}
		changeBurgerBtn(section, scrollDistance, sectionTop)
	})
	navItemLinks.forEach(link => {
		link.classList.remove('nav-bar__list-link--active')
		link.parentElement.classList.remove('nav-bar__list-item--active')
		if (link.getAttribute('href').includes(currentSection)) {
			link.classList.add('nav-bar__list-link--active')
			link.parentElement.classList.add('nav-bar__list-item--active')
		}
	})
}

scrollSpy()

const changeQuoteRight = () => {
	quoteBoxes.forEach(box => {
		if (box.dataset.number < 3) {
			box.dataset.number = parseInt(box.dataset.number) + 1
		} else {
			box.dataset.number = 1
		}

		changeQuote(box)
	})
}
const changeQuoteLeft = () => {
	quoteBoxes.forEach(box => {
		if (box.dataset.number > 1) {
			box.dataset.number = parseInt(box.dataset.number) - 1
		} else {
			box.dataset.number = 3
		}

		changeQuote(box)
	})
}

const changeQuote = box => {
	if (box.dataset.number == 1) {
		box.classList.add('section-quote__box--left')
		box.classList.remove('section-quote__box--right')
		box.classList.remove('section-quote__box--visible')
	} else if (box.dataset.number == 2) {
		box.classList.remove('section-quote__box--left')
		box.classList.remove('section-quote__box--right')
		box.classList.add('section-quote__box--visible')
	} else if (box.dataset.number == 3) {
		box.classList.remove('section-quote__box--left')
		box.classList.add('section-quote__box--right')
		box.classList.remove('section-quote__box--visible')
	}
}

const checkStartDraggingPosition = e => {
	startX = e.touches[0].clientX
	isDragging = true
}
const checkCurrentDraggingPosition = e => {
	if (!isDragging) return
	// only when -- isDragging = true
	currentX = e.touches[0].clientX
}
const checkEndDraggingPosition = e => {
	if (!isDragging) return
	const differenceX = startX - currentX
	if (differenceX > 50) {
		changeQuoteLeft()
	} else if (differenceX < 50) {
		changeQuoteRight()
	}
	isDragging = false
}
//M  isDragging is only for future code, not needed now

const showNavMenu = () => {
	navBarMenu.classList.toggle('nav-bar__menu--visible')
	burgerBtnBars.classList.toggle('fa-xmark')
	burgerBtnBars.classList.toggle('nav-bar__btn-burger--black')
	burgerBtnBars.classList.toggle('fa-bars')
	document.body.classList.toggle('body--menu-open')
	navItems.forEach(el => {
		el.classList.toggle('nav-bar__list-item--animated')
	})
}
const closeNavMenu = () => {
	navBarMenu.classList.remove('nav-bar__menu--visible')
	burgerBtnBars.classList.remove('fa-xmark')
	burgerBtnBars.classList.remove('nav-bar__btn-burger--black')
	burgerBtnBars.classList.add('fa-bars')
	document.body.classList.remove('body--menu-open')
}

// form

const showEr = (input, msg) => {
	const inputBox = input.parentElement
	const inputError = inputBox.querySelector('.section-contact__error')
	inputBox.classList.add('section-contact__form-box--error')
	inputError.textContent = msg
}
const removeEr = input => {
	const inputBox = input.parentElement
	inputBox.classList.remove('section-contact__form-box--error')
}

const checkInputLenght = (input, minNum) => {
	if ((input.getAttribute('placeholder').includes('numer telefonu') && input.value.length !== minNum)) {
		const lengthMsg = `${input.previousElementSibling.innerHTML.slice(0, -1)} powinien zawierać ${minNum} liter`
		showEr(input, lengthMsg)
	} else if (input.value.length < minNum) {
		const lengthMsg = `${input.previousElementSibling.innerHTML.slice(0, -1)} powinien zawierać minimalnie ${minNum} liter`
		showEr(input, lengthMsg)
	} else{
		removeEr(input)
	}
}

const checkEmailSpelling = email => {
	const re = /^\S+@\S+\.\S+$/
	if (re.test(email.value)) {
		removeEr(email)
	} else {
		showEr(email, 'Email jest błędny')
	}
}

const checkNameSpelling = name => {
	const re = /^[a-zA-Z\s]*$/

	if (!re.test(name.value)) {
		const spellingMsg = `${name.previousElementSibling.innerHTML.slice(0, -1).toLowerCase()} nie może zawierać znaków `
		showEr(name, spellingMsg)
	}
}

const checkIfElEmpty = el => {
	if (el.value === '' && el !== formTextarea) {
		const msg = `uzupełnij ${el.previousElementSibling.innerHTML.slice(0, -1).toLowerCase()}`
		showEr(el, msg)
	} else if (el.value === '' && el === formTextarea) {
		const msg = `uzupełnij ${el.previousElementSibling.innerHTML.slice(0, -1).toLowerCase()}`
		showEr(el, msg)
	} else {
		removeEr(el)
	}

}

const handleElToCheck = el => {
	if (el === formInputs) {
		el.forEach(input => {
			checkIfElEmpty(input)
		})
	} else {
		checkIfElEmpty(el)
	}
}

const showPopup = () => {

	let numberOfErrors = 0
	formBoxes.forEach(er =>{
		if(er.textContent !== ''){
			numberOfErrors+=1
		}
	})
	if (document.location.search === '?mail_status=sent' && numberOfErrors === 0) {
		msgStatus.classList.add('success')
		msgStatus.textContent = 'Wiadomość wysłana!'

		setTimeout(() => {
			msgStatus.classList.remove('success')
		}, 3000)
	}

	if (document.location.search === '?mail_status=error' && numberOfErrors !== 0) {
		msgStatus.classList.add('error')
		msgStatus.textContent = 'Wystąpił błąd.'

		setTimeout(() => {
			msgStatus.classList.remove('error')
		}, 3000)
	}
}

const handleParametersForFormFunctions = e => {
	e.preventDefault()
	handleElToCheck(formInputs)
	handleElToCheck(formTextarea)
	checkInputLenght(formInputName, 3)
	checkNameSpelling(formInputName)
	checkInputLenght(formInputSurname, 3)
	checkNameSpelling(formInputSurname)
	checkEmailSpelling(formInputEmail)
	checkInputLenght(formInputPhoneNumber, 9)
	
	showPopup()
}

const changeFooterYear = () => {
	footerYear.textContent = new Date().getFullYear()
}
changeFooterYear()
window.addEventListener('scroll', scrollSpy)
if (quoteSection !== null) {
	offerChooseBtnBox.addEventListener('click', checkClickedButton)
	quoteIconLeft.addEventListener('click', changeQuoteLeft)
	quoteIconRight.addEventListener('click', changeQuoteRight)
	quoteSection.addEventListener('touchstart', checkStartDraggingPosition)
	quoteSection.addEventListener('touchmove', checkCurrentDraggingPosition)
	quoteSection.addEventListener('touchend', checkEndDraggingPosition)
}
burgerBtn.addEventListener('click', showNavMenu)
navItemLinks.forEach(el => {
	el.addEventListener('click', closeNavMenu)
})
formBtn.addEventListener('click', handleParametersForFormFunctions)
