class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Erstellen der internen HTML-Struktur
        const buttonBox = document.createElement('a');
        buttonBox.classList.add('button-box');

        const button = document.createElement('div');
        button.classList.add('button');
        button.textContent = this.getAttribute('text') || 'Button'; // Standardwert "Button" setzen

        buttonBox.appendChild(button);
        this.shadowRoot.appendChild(buttonBox);

        // Anfügen der internen CSS-Stile
        const style = document.createElement('style');
        style.textContent = `

            a {
                text-decoration: none;
            }


            .button-box, .button {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-tap-highlight-color: transparent;

            .button-box {
                display: flex;
                flex-direction: column;
            }

            .button {
                padding: var(--button-padding, 10px 30px);
                background-color: var(--button-bg-color, #f4f4f4);
                color: var(--button-text-color, #222222);
                border-radius: var(--button-radius, 999px);
                transition: transform 0.5s ease;
            }
        `;
        this.shadowRoot.appendChild(style);

        // Hinzufügen von Event-Listenern
        this.setupEventListeners(buttonBox, button);
    }

    // Überwachen von Änderungen an benutzerdefinierten Attributen
    static get observedAttributes() {
        return ['href', 'text'];
    }

    // Reagieren auf Änderungen an benutzerdefinierten Attributen
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'href') {
            const buttonBox = this.shadowRoot.querySelector('.button-box');
            buttonBox.setAttribute('href', newValue);
        } else if (name === 'text') {
            const button = this.shadowRoot.querySelector('.button');
            button.textContent = newValue;
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
        let isTouchStart = false;
        buttonBox.addEventListener('touchstart', (event) => {
            isTouchStart = true;
            scaleButton(0.9);
            event.preventDefault(); // Unterdrücke das Standardverhalten des Touch-Events
        });

        buttonBox.addEventListener('touchmove', (event) => {
            if (isTouchStart) {
                const rect = buttonBox.getBoundingClientRect();
                const x = event.touches[0].clientX;
                const y = event.touches[0].clientY;
                if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                    scaleButton(1);
                    isTouchStart = false;
                }
                event.preventDefault(); // Unterdrücke das Standardverhalten des Touch-Events
            }
        });

        buttonBox.addEventListener('touchend', () => {
            if (isTouchStart) {
                isTouchStart = false;
                scaleButton(1);
                window.location.href = buttonBox.getAttribute('href');
            }
        });

        // Klick-Event-Listener hinzufügen
        buttonBox.addEventListener('click', (event) => {
            if (!isTouchStart) {
                event.preventDefault();
                window.location.href = buttonBox.getAttribute('href');
            }
        });
    }
}

// Registrieren der Webkomponente
customElements.define('custom-button', CustomButton);
