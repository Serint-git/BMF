MF + BENITO — BIRTHDAY WEEKEND
16–18 de octubre de 2026 · Cabaña La Herradura, Tapalpa, Jalisco

LANDING REAL | ESTÁTICA | RESPONSIVA | SIN BASE DE DATOS
Base técnica y experiencia inspiradas en el ZIP "waza.zip" proporcionado.
Diseño gráfico completamente nuevo, con las tres fotografías originales del evento.

ARCHIVOS:
- index.html
- assets/css/invitacion.css
- assets/js/invitacion.js
- assets/img/pareja.webp, maria-fernanda.webp, benito.webp, favicon.svg
- assets/img/portada-whatsapp.jpg (imagen para previsualización al compartir)

CÓMO VERLA:
Abre index.html en el navegador. También puedes subir todos los archivos de
esta carpeta (manteniendo su estructura) a public_html de Hostinger,
o a una subcarpeta /cumple-mfb/ para la liga temporal.
No hace falta ejecutar npm, Composer ni importar una base de datos.

ANTES DE PUBLICAR / COMPARTIR:
Edita las dos líneas de configuración al inicio de assets/js/invitacion.js:

  whatsappNumber: '',          => número receptor con lada, sin +, espacios ni guiones
  googleMapsUrl: '',           => URL exacta de la cabaña proporcionada por el anfitrión

No se reutilizó el WhatsApp del cumpleaños de Waza.
Sin número cargado, el formulario genera el mensaje y abre WhatsApp para
que el invitado elija manualmente a quién enviarlo; NO queda confirmado
hasta que el invitado lo envíe. No se guarda ninguna respuesta en servidor.
Sin liga exacta de Maps, el botón realiza una BÚSQUEDA (no navegación a un
pin confirmado). La sección "Liverpool" ahora es una BROMA INTERACTIVA: botón para revelar
los dos cumpleañeros y un mensaje aleatorio distinto para el elegido y un
reclamo del otro. No hay mesa real, vínculos comerciales, pagos ni compras.

El formulario pregunta nombre y si llega viernes, sábado o no podrá asistir.
La funcionalidad de WhatsApp abre un mensaje prellenado, nunca lo envía automáticamente.

Diseño en colores lima, rosa y azul eléctrico, tipografía editorial, collage
fotográfico, calendario, ubicación, regalos y RSVP; animaciones suaves con
respeto a la configuración de movimiento reducido y a dispositivos móviles.

IMPORTANTE PARA COMPARTIR POR WHATSAPP:
En index.html, cambia el valor de og:image a la URL ABSOLUTA de
portada-whatsapp.jpg en el dominio público una vez publicada la landing.
Con una ruta relativa algunas aplicaciones no muestran la imagen previa.

ITERACIÓN MF-BENITO-002 — CAMBIOS:
- index.html (mesa de regalos con selector María Fernanda / Benito).
- assets/js/invitacion.js (frases aleatorias, sin repetición consecutiva por voz).
- assets/css/invitacion.css (tarjetas, respuestas y ajustes móviles).
- README.txt (instrucciones actualizadas).
Se conservan intactos los archivos de las fotos y el resto de la landing.
