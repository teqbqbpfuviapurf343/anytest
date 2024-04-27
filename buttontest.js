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
                background-color: #f6f6f6;
                border-radius: 999px;
                transition: transform 0.5s ease;
            }
            .button-box {
                display: flex;
                flex-direction: column;
            }
        `;
        this.shadowRoot.appendChild(style);

        // Hinzufügen von Event-Listenern
        this.setupEventListeners(buttonBox, button);
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

    // Event-Listener-Setup-Methode
    setupEventListeners(buttonBox, button) {
        // Funktion zum Skalieren des Buttons
        const scaleButton = (scale) => {
            button.style.transform = `scale(${scale})`;
        };

        // Event-Listener für Mouseenter und Focusin auf das buttonBox-Element
        buttonBox.addEventListener('mouseenter', () => scaleButton(0.9));
        buttonBox.addEventListener('focusin', () => scaleButton(0.9));

        // Event-Listener für Mouseleave und Focusout auf das buttonBox-Element
        buttonBox.addEventListener('mouseleave', () => scaleButton(1));
        buttonBox.addEventListener('focusout', () => scaleButton(1));

        // Touch-Event-Listener hinzufügen
        buttonBox.addEventListener('touchstart', (event) => {
            scaleButton(0.9);
            event.preventDefault();
        }, { passive: false });

        buttonBox.addEventListener('touchend', () => scaleButton(1));
    }
}

// Registrieren der Webkomponente
customElements.define('custom-button', CustomButton);
