/* MF + Benito — Configuración del evento
 * 1) Pegar el número de WhatsApp con código de país, SOLO dígitos (ej.: 5233XXXXXXXX).
 * 2) Pegar la URL exacta de Google Maps cuando la compartan.
 * La "mesa de regalos Liverpool" es una broma interactiva: no enlaza a una tienda.
 * Si no hay un número configurado, WhatsApp pedirá al visitante elegir el contacto.
 */
const EVENT = Object.freeze({
  whatsappNumber: '',
  googleMapsUrl: ''
});

const $ = (selector, root = document) => root.querySelector(selector);
const finePointer = window.matchMedia('(pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Entrada suave de bloques. Mantener contenido visible sin IntersectionObserver.
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.09, rootMargin: '0px 0px 36px 0px' });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
}

// Movimiento mínimo sólo para escritorio; sin bloquear gestos móviles.
const heroVisual = $('[data-parallax]');
if (heroVisual && finePointer && !reducedMotion) {
  const hero = $('#inicio');
  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroVisual.style.setProperty('--parallax-x', `${(x * 11).toFixed(1)}px`);
    heroVisual.style.setProperty('--parallax-y', `${(y * 11).toFixed(1)}px`);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    heroVisual.style.setProperty('--parallax-x', '0px');
    heroVisual.style.setProperty('--parallax-y', '0px');
  });
}

// Lugar: búsqueda provisional hasta contar con el pin exacto.
const mapsLink = $('#mapsLink');
const mapsNote = $('#mapsNote');
if (EVENT.googleMapsUrl.trim()) {
  mapsLink.href = EVENT.googleMapsUrl.trim();
  mapsLink.firstChild.textContent = 'ABRIR UBICACIÓN EXACTA ';
  mapsNote.textContent = 'Abre el mapa para llegar a la cabaña.';
}

// MESA DE REGALOS (DE MENTIRITAS): el invitado elige al consentido y se arma el drama.
// Las respuestas varían en cada elección, sin repetir la última frase del mismo personaje.
const giftStart = $('#giftStart');
const giftGame = $('#giftGame');
const giftReaction = $('#giftReaction');
const giftReactionTag = $('#giftReactionTag');
const giftReactionText = $('#giftReactionText');
const giftJealousText = $('#giftJealousText');
const giftChoices = document.querySelectorAll('[data-gift-person]');
const giftLines = {
  mf: {
    happy: [
      '¡Hasta que te vas a mochar, perro! Ya era hora.',
      '¿Ves? Tú sí sabes quién manda en esta fiesta.',
      'Sabía que tenías buen gusto. Y cartera.',
      '¡Ay, mira! Alguien sí me quiere. Queda anotado.',
      'De todos los invitados, tú sí vienes bien educado.',
      '¡Esaaaa! Te acabas de ganar mi cariño (por hoy).'
    ],
    jealous: [
      'Ah, ¿y a mí qué? ¿Puras gracias o qué?',
      '¿A ella sí y a mí no? Buenísimo, eh.',
      'Yo también cumplo, por si se te había olvidado.',
      '¿Entonces yo nomás vengo de decoración?',
      'Qué detalle… para ella. Yo también existo.',
      'Te voy a sentar lejos de mí en la cabaña.'
    ]
  },
  benito: {
    happy: [
      '¡Hasta que regalas algo, perro! Ya te estábamos perdiendo la fe.',
      'Por fin alguien que reconoce al verdadero cumpleañero.',
      'Eso, padrino. No esperaba menos de ti.',
      'Ya sabía que eras de los míos. ¡Salud!',
      'Traes buen corazón… o mucha culpa. Pero gracias.',
      '¡Con eso ya te ganaste una chela imaginaria!'
    ],
    jealous: [
      'Ah, ¿por qué a él sí y a mí no? Explícame.',
      '¿Neta? ¿Le diste clic a Benito? Interesante…',
      'Perfecto. Tomo nota para tu cumpleaños.',
      '¿Y yo qué? ¿De adorno en la invitación?',
      'Qué bonito. A él sí, ¿verdad?',
      'Hasta el sombrero se me enchuecó del coraje.'
    ]
  }
};
const giftLastIndex = {};
function anotherGiftLine(person, kind) {
  const lines = giftLines[person][kind];
  const key = `${person}-${kind}`;
  let index = Math.floor(Math.random() * lines.length);
  if (index === giftLastIndex[key]) index = (index + 1 + Math.floor(Math.random() * (lines.length - 1))) % lines.length;
  giftLastIndex[key] = index;
  return lines[index];
}

giftStart.addEventListener('click', () => {
  const opening = giftGame.hidden;
  giftGame.hidden = !opening;
  giftStart.setAttribute('aria-expanded', String(opening));
  giftStart.innerHTML = opening ? 'OCULTAR EL CHISME <span aria-hidden="true">↑</span>' : 'VER MESA DE REGALOS <span aria-hidden="true">↗</span>';
  if (opening) giftChoices[0].focus({ preventScroll: true });
});

giftChoices.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.giftPerson;
  giftChoices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
  giftReactionTag.textContent = selected === 'mf' ? 'MARÍA FERNANDA DICE:' : 'BENITO DICE:';
  giftReactionText.textContent = `“${anotherGiftLine(selected, 'happy')}”`;
  giftJealousText.textContent = `${selected === 'mf' ? 'BENITO' : 'MARÍA FERNANDA'}: “${anotherGiftLine(selected, 'jealous')}”`;
  giftReaction.hidden = false;
  giftReaction.classList.remove('gifts__reaction--pop');
  if (!reducedMotion) {
    void giftReaction.offsetWidth; // Reinicia sólo la pequeña animación del chiste.
    giftReaction.classList.add('gifts__reaction--pop');
  }
}));

const form = $('#rsvpForm');
const errorBox = $('#rsvpError');
const hint = $('#rsvpHint');
const nameField = $('#guestName');
const arrivalInputs = document.querySelectorAll('input[name="llegada"]');

function clearFormError() {
  errorBox.hidden = true;
  errorBox.textContent = '';
  nameField.removeAttribute('aria-invalid');
}
nameField.addEventListener('input', clearFormError);
arrivalInputs.forEach(radio => radio.addEventListener('change', clearFormError));

if (!EVENT.whatsappNumber) {
  hint.textContent = 'WhatsApp abrirá el mensaje; el contacto se selecciona manualmente hasta configurar el número de confirmación.';
}

function buildMessage(nombre, llegada) {
  const person = nombre.trim();
  if (llegada === 'no') return `Hola, María Fernanda y Benito. Soy ${person}. Muchas gracias por invitarme ❤️ Esta vez no podré acompañarlos en Tapalpa, ¡pero les deseo un cumpleaños increíble!`;
  const fecha = llegada === 'viernes' ? 'el viernes 16 de octubre' : 'el sábado 17 de octubre';
  return `¡Hola, María Fernanda y Benito! 🎉 Soy ${person} y confirmo mi asistencia al cumpleaños en Tapalpa. Llegaré ${fecha}. ¡Nos vemos allá! 🥳`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearFormError();
  const name = nameField.value.replace(/\s+/g, ' ').trim();
  const arrival = $('input[name="llegada"]:checked');
  if (!name) {
    errorBox.textContent = 'Cuéntanos tu nombre para preparar la confirmación.';
    errorBox.hidden = false;
    nameField.setAttribute('aria-invalid', 'true');
    nameField.focus();
    return;
  }
  if (!arrival) {
    errorBox.textContent = 'Elige si llegas viernes, sábado o no puedes asistir.';
    errorBox.hidden = false;
    arrivalInputs[0].focus();
    return;
  }
  const digits = EVENT.whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(buildMessage(name, arrival.value));
  const url = digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
  // Se abre sólo como resultado de la acción explícita del invitado.
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
});
