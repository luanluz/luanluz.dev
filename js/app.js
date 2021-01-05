/**
 * ----------------------------------------------------------
 * Debounce do Lodash
 * ----------------------------------------------------------
 */
const debounce = function (func, wait, immediate) {
    let timeout;
    return function (...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


/**
 * ----------------------------------------------------------
 * Instruções para mostrar e esconder o cabeçalho
 * ----------------------------------------------------------
 */
const mainHeader = document.querySelector('header.main-header');
const aside = document.querySelector('main aside');

function activeMainHeader() {
    let scroll = window.pageYOffset;

    if (scroll > aside.scrollTop + mainHeader.offsetHeight) {
        mainHeader.classList.add("active");
    }
    else {
        mainHeader.classList.remove("active");
    }
}

window.addEventListener(
    'scroll',
    debounce(() => activeMainHeader(), 200)
);


/**
 * ----------------------------------------------------------
 * Instruções para alternar entre as abas e mostrar o conteúdo
 * correspondente
 * ----------------------------------------------------------
 */
// Obtém os elementos das guias do sidemenu e do rodapé
let tabs = document.querySelectorAll("aside .tab");
let bottomTabs = document.querySelectorAll("footer .bottom-tab");
// Obtém as seções
let contentSections = document.querySelectorAll("main section");

// Adiciona o evento 'click' em todas as abas disparando uma função
// e passando como parâmetro o índice atual, a aba atual e o objeto evento
// Abas do sidemenu
tabs.forEach((tab, index) => {
    tab.addEventListener("click",
        (event) => showContentSections(index, tab, event),
        false
    );
});
// Abas do rodapé
bottomTabs.forEach((tab, index) => {
    tab.addEventListener("click",
        (event) => showContentSections(index, tab, event),
        false
    );
});

// Funlão para esconder todas as seções e mostrar somente
// a escolhida pelo usuário
function showContentSections(currentElement, currentTab, event) {
    event.preventDefault();
    window.scrollTo(0, 0);

    contentSections.forEach((element) => {
        element.classList.remove("sections-transitions");
        element.style.display = "none";
    });

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    bottomTabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    contentSections[currentElement].classList.add("sections-transitions");
    contentSections[currentElement].style.display = "block";

    currentTab.classList.add("active");
}

// Por padrão, mostra a primeira seção
tabs[0].click();


/**
 * ----------------------------------------------------------
 * Instruções para mostrar e esconder o modal
 * ----------------------------------------------------------
 */
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#content-modal");
const elements = document.querySelectorAll(".open-modal");

elements.forEach((element) => {
    element.onclick = () => {
        modalContent.innerHTML = element.lastElementChild.innerHTML;
        modal.classList.add('show');
    }
});

// Obtém o elemento que 'fecha' o modal
let closeElement = document.querySelector("#modal-close");
// Atribui a instrução de remover o modal no evento de click
closeElement.onclick = () => modal.classList.remove('show');
// Remove o modal caso clique fora do conteúdo do modal 
modal.onclick = (e) => {
    if(e.target === modal)
        modal.classList.remove('show');
}


/**
 * ----------------------------------------------------------
 * Remove o alerta de cookies
 * ----------------------------------------------------------
 */
cookiesNotification = document.getElementById("cookies-notification");

cookiesNotification.childNodes[3].childNodes[3].onclick = () => {
    cookiesNotification.style.display = "none";
    localStorage.setItem('cookies-notification', 'true');
}

if(!localStorage.getItem('cookies-notification')) {
    cookiesNotification.style.display = "block";
}


/**
 * ----------------------------------------------------------
 * Instruções para enviar e-mail com o assunto e corpo preenchidos
 * ----------------------------------------------------------
 */
document.addEventListener('keyup', (event) => {
    let subjectValue = document.querySelector('#subject').value;
    let messageValue = document.querySelector('#message').value;
    const submitButton = document.querySelector('div.form a');

    if(subjectValue && messageValue) {
        submitButton.classList.remove('disabled');
        submitButton.setAttribute('href', `mailto:luanluzdev@gmail.com?subject=${subjectValue}&body=${messageValue}`);
    } else {
        submitButton.classList.add('disabled');
        submitButton.removeAttribute('href');
    }
});
