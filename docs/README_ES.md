# Verificador de interacciones entre medicamentos y body art

> Comprueba cómo los medicamentos con receta, los analgésicos sin receta, las cremas anestésicas y los suplementos afectan al sangrado, la cicatrización y el riesgo de desmayo antes de un tatuaje o un piercing.

**En línea:** <https://poliinternational.com/tools/medication-interaction-checker/>

**Leer en otro idioma:** [English](../README.md) · [Français](README_FR.md) · [Italiano](README_IT.md) · [Español](README_ES.md) · [Deutsch](README_DE.md) · [Nederlands](README_NL.md) · [Português](README_PT.md)

---

## Qué es esto

Una referencia libre y gratuita para una pregunta concreta: **¿lo que estoy tomando cambia lo que ocurre cuando una aguja entra en mi piel?**

Los anticoagulantes hacen que una sesión sangre más tiempo. La isotretinoína vuelve la piel tan frágil que se desgarra. Los betabloqueantes atenúan la respuesta a la adrenalina y favorecen los desmayos. La nicotina priva a un piercing reciente del oxígeno que necesita. Casi ningún cliente piensa en mencionarlo, y casi ningún consentimiento informado lo pregunta.

La herramienta cubre **38 medicamentos y sustancias en 13 categorías**, cada uno con su efecto sobre un tatuaje, su efecto sobre un piercing y la espera o suspensión que conviene respetar. Todo funciona en el navegador. Sin cuenta, sin servidor, sin rastreo y sin compilación.

## Qué no es

**Esto es una referencia educativa, no un consejo médico.** No conoce su historial, su dosis ni el motivo por el que toma algo. No suspenda ni modifique nunca un medicamento recetado por algo que haya leído aquí. Esa decisión corresponde al médico que se lo recetó.

## Funciones

- **38 medicamentos, 13 categorías, 3 niveles de atención.** AINE, cremas anestésicas, anticoagulantes, retinoides, sedantes y fármacos para la tensión, hormonas y terapia hormonal, estimulantes, antidiabéticos y agonistas del GLP-1, corticoides, inmunosupresores y biológicos, suplementos de herboristería, antibióticos y antivirales, y sustancias de estilo de vida.
- **Un verificador de suplementos respaldado por publicaciones reales.** 66 suplementos, 49 pares suplemento-medicamento realmente estudiados y 132 estudios humanos o clínicos, extraídos de [SUPP.AI](https://supp.ai/) (Allen Institute for AI). Los artículos retractados quedan excluidos. Donde no tenemos estudios, la herramienta lo dice en lugar de dar a entender que no hay riesgo.
- **Fuentes publicadas, mostradas en la herramienta.** Algunos medicamentos llevan referencias de PubMed. Solo aparecen las citas aprobadas por una persona: nada se adjunta automáticamente.
- **Siete idiomas de interfaz, con el contenido clínico realmente traducido.** Inglés, francés, italiano, español, alemán, neerlandés y portugués. Las 684 cadenas clínicas están redactadas a mano, no traducidas automáticamente, y toda página que no sea la inglesa lleva un aviso permanente que señala el inglés como versión de referencia.
- **Enlaces de "cerca de aquí" que buscan en el idioma del lugar.** Los enlaces a estudio, médico, farmacia y hospital abren Google Maps con la consulta redactada en el idioma del país donde se encuentra, no en el que está leyendo. Un lector hispanohablante en Bangkok que busque "farmacia" no encuentra casi nada; el término tailandés encuentra todas las farmacias de la calle. 38 idiomas de consulta, 217 zonas horarias asignadas. **No se solicita ningún permiso de geolocalización** y ningún dato de ubicación sale de la página: a Google solo va una palabra de búsqueda.
- **La guía de emergencia muestra el número de emergencias de su país.** Antes mostraba « 911 / 112 » para todo el mundo, lo cual es incorrecto en Tailandia (línea médica 1669), el Reino Unido (999), Australia (000), Japón (119) y más. 172 zonas horarias apuntan a 19 números, cualquier zona sin asignar recae en « 112 / 911 », y la guía siempre pide confirmar el número del propio país y tenerlo escrito en la pared del estudio en lugar de fiarse de una deducción.
- **Ficha para el profesional y mensaje al médico.** Convierta una selección en un resumen para entregar a su tatuador o en un borrador de mensaje para su médico.
- **Recordatorios y tiempos de suspensión**, una sección de seguridad en el estudio y preguntas frecuentes.
- **Totalmente estático.** Clone el repositorio, abra `index.html` y funciona sin conexión, salvo los enlaces a Maps.

## Política de evidencia

Esta herramienta habla de medicamentos y de heridas, así que las reglas sobre las fuentes son más estrictas que las del código:

- Una afirmación que no podemos sostener no se publica. Se retiraron tres afirmaciones justamente por eso: el alcohol, el ibuprofeno y el naproxeno se describían como capaces de expulsar la tinta de la piel. Dos búsquedas en Europe PMC no hallaron pruebas, y el texto ahora dice que el efecto sobre la retención de la tinta no se ha estudiado, en lugar de afirmarlo.
- Las citas se adjuntan sobre prueba, nunca de forma automática. Un identificador suelto junto a una frase no es una cita hasta que una persona confirma que el artículo dice lo que dice la frase.
- "No tenemos datos" se escribe "no tenemos datos", nunca "seguro".

## Instalación

### En línea

<https://poliinternational.com/tools/medication-interaction-checker/>

### En local

HTML, CSS y JavaScript puros. Sin dependencias, sin compilación y sin gestor de paquetes.

```bash
git clone https://github.com/Poli-International/medication-interaction-checker.git
cd medication-interaction-checker
# abra index.html en su navegador, o sirva la carpeta:
python3 -m http.server 8000
```

Todas las rutas son relativas: la carpeta funciona desde el disco, desde cualquier subdirectorio o detrás de cualquier alojamiento estático.

### Incrustación

```html
<iframe src="https://poliinternational.com/tools/medication-interaction-checker/"
        width="100%" height="900" style="border:0" title="Medication Interaction Checker"></iframe>
```

La página escucha un `postMessage` de tipo `poli-theme` para que el sitio anfitrión pueda imponer el modo claro u oscuro. Consulte la [documentación técnica](TECHNICAL_DOCUMENTATION_ES.md).

## Documentación

- [Documentación técnica](TECHNICAL_DOCUMENTATION_ES.md): arquitectura, esquemas de datos, sistema de internacionalización, diseño de la búsqueda geográfica, incrustación y personalización.
- [Guía de contribución](../CONTRIBUTING.md)

## Contribuir

Las correcciones del contenido médico son las aportaciones más valiosas, y el criterio es la cita. Si puede señalar un artículo que contradiga algo de aquí, abra una incidencia con el PMID o el DOI y actuaremos.

Las correcciones de traducción son igual de bienvenidas. Indique el idioma, el medicamento y la formulación correcta.

## Licencia

MIT. Consulte [LICENSE](../LICENSE).

## Soporte

- Correo: <support@poliinternational.com>
- Errores: [GitHub Issues](https://github.com/Poli-International/medication-interaction-checker/issues)

---

<div align="center">

Creado por [Poli International](https://poliinternational.com)

[Sitio web](https://poliinternational.com) · [Herramientas gratuitas](https://poliinternational.com/tools/) · [GitHub](https://github.com/Poli-International)

</div>
