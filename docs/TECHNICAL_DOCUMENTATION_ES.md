# Verificador de interacciones entre medicamentos y body art - Documentación técnica

**Otros idiomas:** [English](../TECHNICAL_DOCUMENTATION.md) · [Français](TECHNICAL_DOCUMENTATION_FR.md) · [Italiano](TECHNICAL_DOCUMENTATION_IT.md) · [Deutsch](TECHNICAL_DOCUMENTATION_DE.md) · [Nederlands](TECHNICAL_DOCUMENTATION_NL.md) · [Português](TECHNICAL_DOCUMENTATION_PT.md)

---

## Índice

1. [Arquitectura](#arquitectura)
2. [Estructura de archivos](#estructura-de-archivos)
3. [Esquemas de datos](#esquemas-de-datos)
4. [El sistema de internacionalización](#el-sistema-de-internacionalización)
5. [Búsqueda geográfica: enlaces a Maps en el idioma local](#búsqueda-geográfica-enlaces-a-maps-en-el-idioma-local)
6. [Pruebas y fuentes](#pruebas-y-fuentes)
7. [Estado y almacenamiento](#estado-y-almacenamiento)
8. [Incrustación](#incrustación)
9. [Personalización](#personalización)
10. [Seguridad](#seguridad)
11. [Navegadores compatibles](#navegadores-compatibles)

---

## Arquitectura

HTML, CSS y JavaScript ES2015+ estáticos. Sin framework, sin empaquetador, sin gestor de paquetes y sin llamadas de red en tiempo de ejecución, salvo los enlaces de Google Maps que el usuario decide pulsar.

Cada conjunto de datos está **congelado en tiempo de compilación dentro de un archivo JavaScript**, de forma deliberada. La herramienta nunca llama a SUPP.AI, PubMed ni a ninguna otra API mientras un cliente la usa. Por tanto no puede romperse porque un tercero esté caído, no puede revelar lo que un usuario está consultando, y su comportamiento es reproducible solo con el repositorio.

El orden de carga importa: los archivos de datos declaran `const` de nivel superior que `app.js` lee, así que `app.js` va el último.

```
index.html
  -> css/style.css, css/a11y.css, css/print.css
  -> js/med-content-i18n.js      (texto clínico, 6 idiomas)
  -> js/medication-sources.js    (citas aprobadas)
  -> js/supplement-stacking.js   (instantánea de SUPP.AI)
  -> js/geo-search.js            (términos de búsqueda en Maps + mapa de zonas)
  -> js/app.js                   (datos, interfaz, renderizado)
```

Seis pestañas, conmutadas en el cliente, sin enrutamiento: `checker`, `supplements`, `brief`, `reminders`, `safety`, `faq`.

## Estructura de archivos

| Ruta | Tamaño | Función |
|---|---|---|
| `index.html` | ~43 KB | Marcado, JSON-LD, estructura de pestañas, puente de tema para iframe |
| `css/style.css` | ~60 KB | Todo el estilo de los componentes, claro y oscuro mediante tokens en `:root` |
| `css/a11y.css` | ~1 KB | Utilidades de foco visible y lector de pantalla |
| `css/print.css` | ~2 KB | Reglas de impresión para la ficha profesional |
| `js/app.js` | ~181 KB | Datos `CATEGORIES`, 65 funciones, todo el renderizado |
| `js/med-content-i18n.js` | ~127 KB | 684 cadenas clínicas redactadas a mano |
| `js/supplement-stacking.js` | ~48 KB | 66 suplementos, 49 pares, 132 artículos |
| `js/geo-search.js` | ~14 KB | 38 idiomas de consulta, 217 correspondencias de zonas |
| `js/medication-sources.js` | ~2 KB | Citas de PubMed aprobadas por medicamento |

## Esquemas de datos

### `CATEGORIES` (en `app.js`)

La única fuente de verdad para los medicamentos. 13 categorías, 38 medicamentos.

```js
const CATEGORIES = [
  {
    id: 'pain',
    label: 'Painkillers & Anti-inflammatories (NSAIDs)',
    meds: [
      {
        id: 'ibuprofen',              // clave estable, usada por todos los demás archivos
        name: 'Ibuprofen',
        sub: 'Advil, Nurofen, Motrin',
        cat: 'pain',
        sev: 'mod',                    // 'high' | 'mod' | 'low'
        riskBadges: ['Bleeding Risk', 'Plasma Oozing'],
        tattoo: '...',                 // texto fuente en inglés
        piercing: '...',
        wait: '...',
        tags: 'pain, nsaid, advil, ...' // sinónimos de búsqueda, marcas regionales incluidas
      }
    ]
  }
]
```

`medMap` es una tabla plana `id -> medicamento` construida a partir de esta estructura al arrancar.

Identificadores de categoría: `pain`, `numbing`, `blood`, `retinoid`, `anxiety`, `hormone`, `stimulant`, `metabolic`, `corticosteroid`, `immuno`, `supplement`, `antibiotic`, `substance`.

**El nivel de atención se refiere al riesgo del procedimiento, no a la gravedad del medicamento.** `high` significa que la interacción con una aguja es relevante. Un medicamento vital puede perfectamente ser `low`.

### `MED_CONTENT_I18N` (en `med-content-i18n.js`)

```js
{ ibuprofen: { fr: { tattoo, piercing, wait }, it: {...}, es: {...},
               de: {...}, nl: {...}, pt: {...} } }
```

38 medicamentos x 3 campos x 6 idiomas = 684 cadenas. El inglés está en `CATEGORIES`, así que no se repite aquí.

### `SUPPLEMENT_STACKING` (en `supplement-stacking.js`)

```js
[ { cui: 'C0016157', supplement: 'Fish Oil',
    interactions: [ { drug: 'Aspirin',
                      papers: [ { pmid, doi, title, year, clinical } ] } ] } ]
```

Generado desde SUPP.AI. Solo se incluyen los pares con al menos un estudio humano o clínico; los artículos retractados quedan excluidos. `cui` es el identificador de concepto UMLS, y es lo que hace auditable la correspondencia.

### `MEDICATION_SOURCES` (en `medication-sources.js`)

```js
{ warfarin: [ { url, pmid, claim } ] }
```

`claim` indica para qué se cita el artículo. Un objeto vacío no muestra ninguna línea de fuentes, nunca un encabezado vacío.

## El sistema de internacionalización

Dos capas distintas, y confundirlas es el fallo clásico:

1. **Las cadenas de interfaz** están en `TRANSLATIONS` (en `app.js`), indexadas por idioma y luego por clave, y se aplican mediante los atributos `data-i18n` y `data-i18n-placeholder`.
2. **Las cadenas clínicas** están en `med-content-i18n.js` y se leen con `medText(med, field)`.

`medText()` devuelve el inglés cuando falta una traducción y levanta una bandera `medTextFellBack`, que muestra un aviso visible. El silencio no es una opción: quien ve una interfaz en español dará por supuesto que las indicaciones clínicas se han revisado en español.

Toda vista que no sea la inglesa lleva un aviso permanente que declara la página traducida y señala el inglés como versión de referencia. No es un banner de "traducción en curso": es permanente, porque la garantía no cambia.

**El texto clínico está redactado a mano, no traducido automáticamente.** El orden en que se construyó es la parte reutilizable: primero el francés, y solo los medicamentos de atención alta, porque era la única porción que un revisor podía comprobar de verdad antes de publicarla. Una vez revisada, su vocabulario quedó fijado para los otros cinco idiomas. Las decisiones terminológicas están anotadas en la cabecera de `med-content-i18n.js` y deben leerse antes de añadir un idioma.

## Búsqueda geográfica: enlaces a Maps en el idioma local

`geo-search.js` alimenta cuatro enlaces: estudio, médico, farmacia y hospital.

**La etiqueta del botón está en el idioma de interfaz del lector. La consulta a Maps está en el idioma del lugar donde se encuentra físicamente.** Son deliberadamente distintos. Un lector hispanohablante en Bangkok que busca `farmacia` no encuentra casi nada; `ร้านขายยา` encuentra todas las farmacias de la calle.

La ubicación se deduce de `Intl.DateTimeFormat().resolvedOptions().timeZone` y se convierte mediante `GEO_SEARCH_ZONES` (217 entradas) en uno de los 38 idiomas de consulta, con el inglés por defecto.

**Nunca se solicita permiso de geolocalización**, y es una decisión de diseño, no un olvido:

- Google Maps ya centra una búsqueda "cerca de aquí" en el propio dispositivo, así que las coordenadas no hacen falta para que la búsqueda funcione.
- Lo único que la ubicación determina es el idioma de la consulta, y la zona horaria lo responde sin ventana de permiso, sin clave de API, sin llamadas de red y sin que ningún dato personal salga de la página.
- Un diálogo de permiso en una página médica cuesta confianza, y todo usuario que lo rechaza pierde la función por completo.

El precio es que una VPN declara la zona equivocada: por eso la interfaz ofrece una selección manual de idioma, guardada en `localStorage`.

En la tabla solo figuran las zonas cuyo idioma **no** es el inglés; todo lo demás recae en el inglés por defecto, que Maps maneja bien en todo el mundo.

Una trampa que conviene conservar: la consulta tailandesa para un estudio es `ร้านสัก`, nunca `สัก` a secas, que también significa teca y devuelve aserraderos.

`geo-search.js` incluye una comprobación sin conexión. Ejecute `node js/geo-search.js` para verificar que cada idioma tiene los cuatro términos, que cada zona asignada apunta a un idioma conocido y que los idiomas desconocidos recaen correctamente en el inglés.

### El número de emergencias local

`geoEmergencyNumber()` convierte la misma zona horaria en un número de emergencias local:
172 zonas apuntan a 19 números, y cualquier zona sin asignar recae en `112 / 911`.

**Esta tabla tiene el perfil de riesgo contrario al de los términos de Maps de arriba, y
está construida en consecuencia.** Una consulta de Maps equivocada no devuelve nada; un
número de emergencias equivocado cuesta tiempo en la única situación en la que el tiempo
es todo el problema. Por eso solo se listan números bien establecidos, no se adivina
nada, y la interfaz siempre imprime « confirme el número correcto de su país y téngalo
en la pared del estudio » junto al valor detectado. Donde un país tiene una línea de
ambulancia distinta de la de policía (Noruega 113, Suiza 144, Brasil 192, Rusia 103) se
indica el número **médico**: esta guía se abre por una anafilaxia o una hemorragia, no
por un delito.

El número se rellena al abrir la ventana y no al cargar la página, de modo que un
teléfono que aterriza en otro país muestra el nuevo número sin recargar.

## Pruebas y fuentes

Las reglas que gobiernan el contenido son más estrictas que las que gobiernan el código.

- **Las afirmaciones sin respaldo no se publican.** El alcohol, el ibuprofeno y el naproxeno se describían como capaces de expulsar la tinta de la piel. Dos búsquedas en Europe PMC no hallaron pruebas. El texto ahora dice que el efecto sobre la retención de la tinta no se ha estudiado.
- **Las citas se adjuntan sobre prueba.** Un identificador suelto junto a una frase sigue sin verificar hasta que una persona confirma que el artículo respalda esa frase. `medication-sources.js` solo recibe citas aprobadas.
- **La ausencia de datos se escribe como ausencia de datos**, nunca como ausencia de riesgo.

Al buscar literatura para respaldar una afirmación, ordene por relevancia y no por número de citas. Ordenar por citas devuelve lo más famoso del campo, no lo más pertinente a la pregunta.

## Estado y almacenamiento

Todo el estado es del lado del cliente. No se transmite nada a ninguna parte.

| Clave de `localStorage` | Contenido |
|---|---|
| `ui_lang_v1` | Idioma de interfaz elegido |
| `geo_search_lang_v1` | Selección manual del idioma de consulta en Maps |
| `readiness_assessment_autosave_v1` | Valores de la calculadora de preparación |
| `recent_searches_v1` | Búsquedas recientes de medicamentos |
| `appointment_datetime` | Hora de la cita para las cuentas atrás de suspensión |

Cada lectura y cada escritura va envuelta en un `try/catch`: las ventanas privadas y los navegadores que bloquean los datos de sitio no deben romper la página.

## Incrustación

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0"
        title="Medication Interaction Checker"></iframe>
```

La página detecta `window.self !== window.top`, pasa a oscuro por defecto y luego escucha un mensaje de tema:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
```

`index.html` lleva `noindex, nofollow` para que una copia incrustada nunca compita con la página canónica en los resultados de búsqueda. Retire esa etiqueta si la aloja como su propia página principal.

## Personalización

**Añadir un medicamento:** agréguelo al array `CATEGORIES[].meds` correspondiente en `app.js`. Solo `id`, `name`, `cat`, `sev`, `tattoo` y `piercing` son obligatorios. Añada después las seis traducciones en `med-content-i18n.js` bajo el mismo `id`, o la herramienta recaerá en el inglés y mostrará el aviso de reserva.

**Añadir un idioma:** cree un bloque `TRANSLATIONS` para la interfaz, añada el idioma a cada medicamento en `med-content-i18n.js` y lea antes la cabecera terminológica de ese archivo para que el vocabulario del oficio siga siendo coherente. Un idioma parcial es peor que ninguno.

**Añadir un idioma de consulta en Maps:** añada una entrada en `GEO_SEARCH_TERMS`, un endónimo en `GEO_SEARCH_LANG_NAMES` y las zonas correspondientes en `GEO_SEARCH_ZONES`. Después ejecute `node js/geo-search.js`.

**Cambiar el estilo:** todo deriva de propiedades personalizadas CSS en `:root`, con una sobrescritura `.light-mode`. Modifique los tokens, no los componentes.

## Seguridad

- **Todo contenido interpolado pasa por `escHtml()`**, que escapa `&`, `<`, `>` y `"`. El DOM se construye con plantillas literales: cualquier valor sin escapar sería un punto de inyección.
- **No se transmite ninguna entrada del usuario.** No hay backend, ni llamadas analíticas, ni scripts de terceros.
- **Los enlaces a Maps llevan `rel="noopener noreferrer"`** y se abren en una pestaña nueva.
- **No existe ningún campo de credenciales, pago o identidad en la herramienta.**

## Navegadores compatibles

Cualquier navegador con ES2015, `Intl`, propiedades personalizadas CSS y `localStorage`: Chrome, Edge, Firefox, Safari y sus equivalentes móviles. No hay capa de polyfill ni fase de transpilación.

---

## Soporte

- Correo: <support@poliinternational.com>
- Incidencias: <https://github.com/Poli-International/medication-interaction-checker/issues>
