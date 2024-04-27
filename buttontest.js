class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Erstellen der internen HTML-Struktur
        const buttonBox = document.createElement('a');
        buttonBox.classList.add('button-box');

        const button = document.createElement('div');
        button.classList.add('button');
        button.textContent = this.getAttribute('text') || 'Text'; // Verwenden des Attributs 'text' oder Standardwert

        buttonBox.appendChild(button);
        this.shadowRoot.appendChild(buttonBox);

        // Anfügen der internen CSS-Stile
        const style = document.createElement('style');
        style.textContent = `
            .button-box, .button {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
            }
            .button {
                padding: 10px 30px;
                background-color: #72f2f2;
                border-radius: 999px;
                transition: transform 0.5s ease;
            }
            .button-box {
                display: flex;
                flex-direction: column;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    // Überwachen von Änderungen an benutzerdefinierten Attributen
    static get observedAttributes() {
        return ['href'];
    }

    // Reagieren auf Änderungen an benutzerdefinierten Attributen
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'href') {
            const buttonBox = this.shadowRoot.querySelector('.button-box');
            buttonBox.setAttribute('href', newValue);
        }
    }
}

// Registrieren der Webkomponente
customElements.define('custom-button', CustomButton);
