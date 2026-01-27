# Efectividad de la Inversión en Infraestructura Eléctrica: Una Lectura Sociotécnica del Sistema Chileno (2017-2025)

**Autor**: Análisis de Datos SEC Chile  
**Fecha**: Enero 2026  
**Enfoque**: *Descripción Densa*, Métodos Mixtos y Justicia Energética

---

## Introducción

La modernización de la infraestructura eléctrica en Chile ha sido una de las prioridades estratégicas de la última década, movilizando inversiones superiores a los **US$ 10.000 millones** con un compromiso fundamental: permitir una **generación energética limpia y socialmente responsable** (Ministerio de Energía, 2019). Si bien la "confiabilidad" era parte del discurso, el motor principal fue la **Descarbonización de la Matriz** y la integración de energías renovables variables (ERV) desde el norte. Sin embargo, la percepción ciudadana sugieren una persistente fragilidad en el sistema de **Distribución** (Baja Tensión). Este documento explora dicha contradicción.

**Adelanto de Resultados**: El análisis de 6.2 millones de registros de interrupciones revela que, si bien la inversión en el segmento de **Transmisión** (Alta Tensión) ha reducido los tiempos de reposición en zonas específicas como el norte grande (Caso REDENOR), existe un "desacople temporal" significativo: las mejoras en el transporte de energía tardan hasta tres años en permear hacia la red de **Distribución** (Media/Baja Tensión) y la calidad percibida por el usuario. Más crítico aún, se detecta una profunda desigualdad territorial donde la robustez de las **Subestaciones** principales choca contra la fragilidad de los alimentadores locales.

**Estructura del Documento**: A continuación, se presentan los **Antecedentes y Marco Teórico** (Sección 1), donde se establece el lente de Justicia Energética y Resiliencia para interpretar los datos. La **Metodología** (Sección 2) detalla el procesamiento de la data cruda y la selección de casos. La sección central, **Narrativas de la Red** (Sección 3), expone los resultados empíricos a través de cuatro estudios de caso paradigmáticos. Finalmente, la **Discusión** (Sección 4) y **Conclusión** (Sección 5) sintetizan las implicancias de política pública, cuestionando si nuestros estándares regulatorios actuales son suficientes para el nuevo escenario climático.

---

## 1. Antecedentes y Marco Teórico

### 1.1 Marco Teórico: De la Confiabilidad a la Justicia Energética
Para analizar la fricción entre la modernidad prometida por la inversión y la realidad vivida por el usuario, este estudio trasciende la ingeniería tradicional para adoptar marcos teóricos contemporáneos que vinculan la técnica con lo social. En primer lugar, se utiliza el **Ciclo de Resiliencia de Infraestructura** propuesto por Hollnagel (2014), el cual sugiere que ante la volatilidad climática del Antropoceno, el paradigma debe desplazarse desde la simple "Confiabilidad" —entendida como la minimización de fallas— hacia la **Resiliencia**. Esta se define como la capacidad no solo de absorber y recuperar el sistema tras un evento, sino crucialmente de *Adaptar* su funcionamiento ante amenazas de Alto Impacto y Baja Frecuencia (*HILF Events*). La pertinencia de este enfoque se manifiesta en el "lag" de adaptación observado en obras estructurales, sugiriendo que la ingeniería chilena ha sido eficiente en resistencia pero lenta en adaptación evolutiva.

Complementariamente, se integra el marco de **Justicia Energética** de Sovacool y Dworkin (2015), enfocándose específicamente en las dimensiones de Justicia Distributiva y de Reconocimiento. La teoría postula que las métricas técnicas no son neutrales; la exclusión regulatoria de los "Eventos Mayores" del cálculo oficial de calidad (SAIFI) constituye una falla de reconocimiento.

Es crucial distinguir aquí entre eventos "normales" y **Eventos Críticos (Fuerza Mayor)**. La normativa actual (SEC) permite recalificar interrupciones causadas por eventos climáticos extremos (vientos > 100km/h), limpiando la estadística oficial. Sin embargo, en un contexto de Cambio Climático, ¿cuántos de estos "eventos fuera de rango" pasarán a ser la nueva normalidad operativa? Al ignorar estos datos en la evaluación de desempeño, el regulador construye una realidad paralela que deslegitima la queja ciudadana.

### 1.2 Antecedentes Empíricos Internacionales
La literatura internacional ofrece precedentes robustos que validan la tensión entre flujos de capital e indicadores de calidad. Investigaciones de OLADE (2022) en ocho países latinoamericanos han demostrado cuantitativamente que el aumento en la remuneración tarifaria (VAD) correlaciona positivamente con mejoras en los índices SAIDI, pero con un desfase temporal (*lag*) estructural de entre uno y dos años. Este hallazgo proporciona un marco de referencia crítico para evaluar el caso chileno: la detección de tiempos de maduración de tres años en proyectos como Cardones-Polpaico indica una fricción institucional y técnica superior al promedio regional, que requiere explicación más allá de la mera construcción física.

Por otro lado, estudios sobre pobreza energética en el Caribe (Garrick et al., 2020) revelan que la inversión privada, si bien reduce los promedios nacionales de interrupción hasta en un 45%, tiende a concentrar sus beneficios en zonas urbanas densas y rentables. Este fenómeno de segregación de la calidad del servicio ofrece un espejo para interpretar la realidad chilena, ayudando a explicar por qué regiones con alta ruralidad o conflicto territorial, como La Araucanía, permanecen estancadas en sus niveles de confiabilidad a pesar de los montos generales de inversión transados en el mercado.

### 1.3 Planteamiento del Problema Nacional
Chile enfrenta actualmente una marcada "disonancia cognitiva" en su sector eléctrico: la coexistencia de una inversión histórica superior a los US$10.000 millones en la última década con una percepción ciudadana de fragilidad extrema, cristalizada tras el colapso de agosto de 2024. A la luz de los marcos de Resiliencia y Justicia Energética, esta contradicción no puede explicarse solo por la severidad del clima, sino por la rigidez de un diseño regulatorio (IEEE 1366) que, al depurar la estadística de fallas, optimiza la red para el cumplimiento normativo en lugar de prepararla para la supervivencia ante la crisis climática.

### 1.4 Propósito y Objetivos de la Investigación

Para esta investigación, se han definido los siguientes elementos estructurales:
*   **Objeto de Estudio**: La calidad del suministro eléctrico residencial en relación con la inversión en infraestructura de transmisión.
*   **Concepto Central**: *Disonancia Sociotécnica* (la brecha entre la modernización tecnológica y la experiencia de vulnerabilidad del usuario).
*   **Delimitación**: Sistema Eléctrico Nacional de Chile, período 2017-2025.

**Pregunta de Investigación**:
¿Cómo se manifiesta la **disonancia sociotécnica** en la relación entre los flujos de inversión en infraestructura de transmisión y la continuidad del suministro eléctrico percibida por los usuarios en Chile (2017-2025)?

**Objetivo General**:
**Explorar** cómo se manifiesta la **disonancia sociotécnica** en la relación entre los flujos de inversión en infraestructura de transmisión y la continuidad del suministro eléctrico percibida por los usuarios en Chile (2017-2025).

**Objetivos Específicos**:
1.  **Describir** la brecha cuantitativa entre los indicadores oficiales (SAIFI regulado) y la data cruda de interrupciones (*Raw Data*), para dimensionar la realidad operativa no reconocida por la normativa.
2.  **Identificar** patrones de desconexión territorial en zonas de alta inversión (cobertura) pero baja resiliencia (continuidad), utilizando estudios de caso en el norte, centro y sur del país.
3.  **Interpretar** dicha disonancia a la luz de los principios de Justicia Energética, para proponer nuevas categorías de análisis que integren la variable climática y social en la evaluación de proyectos.

---

## 2. Metodología: Escuchando al Dato Crudo

Para superar la "higiene estadística", adoptamos un diseño de **Estudio de Caso Múltiple** con enfoque de **Métodos Mixtos**. En primer lugar, realizamos un análisis cuantitativo exploratorio del *Raw SAIFI* —el dato sucio, con ruido y clima—, porque es ahí donde reside la verdad del usuario.

<!-- COMPONENT: CONCEPT_BOX -->

![Figura 1: Series de Tiempo Globales](figures/figura1_timeseries.png)
*Figura 1: Evolución temporal de interrupciones y eventos clave (Fuente: Elaboración propia)*

**Interpretación de la Figura 1**: La serie de tiempo revela picos que coinciden con eventos climáticos o sociales. Destaca el pico inicial de **"Nevazón Julio 2017"**, un evento que paralizó Santiago y que en nuestra data cruda aparece con magnitud similar a eventos posteriores, aunque administrativamente fue "perdonado". Del mismo modo, la persistencia de interrupciones masivas en 2024 —a pesar de la inversión récord— evidencia que la "fricción institucional" sigue vigente: el sistema ha mejorado en capacidad instalada, pero no en su **diálogo con el clima** ni en la **experiencia del usuario**.

> [!NOTE]
> **Disclaimer Metodológico**: Dado el carácter exploratorio de este estudio, el concepto de *Descripción Densa* (Geertz) se aplica aquí como una herramienta de interpretación de "trazos digitales" y contextos territoriales, y no como una etnografía de campo tradicional con entrevistas. Buscamos "densificar" el dato numérico cruzándolo con narrativas locales y eventos climáticos. (Ver Anexo A).

En segundo lugar, seleccionamos cuatro estudios de caso no por su monto, sino por su potencial narrativo. Cada caso (Desierto, Valle, Urbe, Bosque) cuenta una historia distinta de adaptación o fracaso.

![Figura 2: Mapa de Calor Geográfico](figures/figura2_heatmap.png)
*Figura 2: Concentración geográfica de eventos (Fuente: Elaboración propia)*

---

## 3. Narrativas de la Red (Resultados)

### 3.1 La Paradoja de Coquimbo (El Gigante Dormido)
La línea Cardones-Polpaico (**Sistema de Transmisión Nacional, 500 kV**) fue celebrada como la columna vertebral energética de Chile, conectando los centros de **Generación** del norte con la demanda central. Sin embargo, durante tres años (2019-2021), los habitantes de Coquimbo vivieron una paradoja: mientras la "macro-carretera" de energía fluía a máxima capacidad, el suministro en la red de **Distribución** local seguía fallando.

![Figura 3: Caso Coquimbo](figures/figura3_coquimbo.png)
*Figura 3: Persistencia de fallas en Coquimbo post-interconexión (Fuente: Elaboración propia)*

**Interpretación de la Figura 3**: El gráfico muestra la evolución diaria de clientes afectados (eje Y). La **línea ámbar** marca los hogares sin luz y la **franja sombreada** el periodo de inversión.
Lo contraintuitivo es que la curva no se aplana inmediatamente tras la obra. El **pico extremo inicial (Enero 2019)** tiene una causa clara: el **Sismo 6.7 Mw**.
Aunque el evento sísmico terminó, el **daño estructural persistió en el tiempo** en la infraestructura de **Distribución** (postes, transformadores de barrio y aisladores), dejando una red local "herida" que no pudo aprovechar la potencia disponible en las grandes **Subestaciones de Transmisión** de inmediato. Esta **inercia del daño físico** en la "última milla" eléctrica explica el *lag* de recuperación.

### 3.2 La Cirugía del Desierto (REDENOR)
En Arica, el caso es opuesto. La inversión en REDENOR (**Transmisión Zonal/Alta Tensión, 110/220 kV**) actuó como una intervención quirúrgica efectiva.

![Figura 4: Caso Arica](figures/figura4_arica.png)
*Figura 4: Impacto de la redondancia en Arica (Fuente: Elaboración propia)*

**Interpretación de la Figura 4**: Este gráfico de barras compara el volumen total de afectación año a año. Se observa un **quiebre estructural** claro: las barras altas de los años previos a la inversión colapsan a niveles mínimos tras el cierre del anillo de transmisión (2020). Aquí la redundancia técnica sí eliminó la vulnerabilidad, validando la tesis de que en topologías simples (desierto), la inversión física tiene un retorno inmediato.

### 3.3 La Furia del Sur (Pichirropulli)
En la región de Los Lagos, la inversión chocó contra un muro verde. A pesar de los refuerzos en **Subestaciones de Transmisión** como Pichirropulli (**220 kV**), los índices de falla en los alimentadores de **Distribución** (**Media Tensión**) que atraviesan zonas forestales apenas mejoraron. La energía llega con robustez a la zona, pero falla en el tramo final hacia los hogares.

![Figura 5: Ranking Empresas](figures/figura5_companies.png)
*Figura 5: Empresas con mayor afectación de clientes (Fuente: Elaboración propia)*

**El Factor Vegetación**: Como se observa en el ranking (Figura 5), las empresas con mayor afectación operan en zonas de alta densidad forestal. La normativa chilena (Norma Técnica de Calidad de Servicio, CNE, 2020) establece franjas de seguridad estrictas, pero la realidad territorial muestra una fricción constante entre el tendido eléctrico y las plantaciones forestales exóticas. La caída de árboles sobre líneas sigue siendo la causa principal de fallas masivas en el sur, sugiriendo que "el problema no es el cable, es el árbol" (y la planificación territorial que permite su coexistencia).

### 3.4 El Gap de la Percepción: Una Cuestión de Justicia
Finalmente, al observar la tendencia nacional:

![Figura 1: Series de Tiempo Globales](figures/figura1_timeseries.png)
*Figura 1: Evolución temporal de interrupciones y eventos clave (Fuente: Elaboración propia)*

**Interpretación de la Figura 1**: La serie de tiempo revela picos que coinciden con eventos climáticos o sociales, no con fallas técnicas aisladas. La brecha entre el *SAIFI Oficial* (~4 cortes) y el *SAIFI Real* visible en estos picos (~12 cortes) constituye una **falla de reconocimiento** (Sovacool, 2015). Cuando la autoridad depura estos "eventos de fuerza mayor", está borrando estadísticamente la experiencia de vulnerabilidad de la ciudadanía.

---

## 4. Discusión: Hacia una Ecología de la Infraestructura

Los hallazgos nos obligan a replantear la relación infraestructura-sociedad bajo el lente del **Ciclo de Resiliencia**. No estamos ante un problema meramente técnico de "poner más cables". Estamos ante una crisis de la fase de **Adaptación**.

La estrategia actual ha sido "robustecer" (postes más gruesos). Pero ante eventos como los vientos de 124 km/h de 2024, la resistencia bruta es fútil. ¿Deberíamos movernos hacia una red "antifrágil" (Taleb), descentralizada y capaz de fallar "graciosamente" en lugar de colapsar catastróficamente?
    
### La Trampa de los Promedios y el Destino de la Inversión

Es fundamental refinar la causalidad entre "inversión" y "calidad de servicio". Los informes anuales del **Coordinador Eléctrico Nacional** y la **CNE** (2024) distinguen explícitamente entre inversión en el **Sistema Nacional** (columna vertebral) y **Sistemas Zonales**. En propuestas recientes, la proporción oscila significativamente (e.g., 47% Nacional vs 53% Zonal para 2026), lo que confirma que "inversión" no es un bloque monolítico.

Si bien esta data es pública, atribuir la eficiencia de cada dólar "Zonal" o "Dedicado" (minería) a la mejora del suministro residencial requiere un nivel de granularidad que excede este estudio exploratorio. Por tanto, otorgamos el **beneficio de la duda**: no toda inversión "oculta" es ineficiencia; gran parte obedece a dinámicas industriales desacopladas de la demanda regulada. Sin embargo, esto refuerza la hipótesis de que el "monto total" (US$ 10.000 MM) es un proxy imperfecto para la expectativa de bienestar ciudadano.

Asimismo, al analizar el impacto del *lag*, debemos distinguir entre **Ruido Estadístico** y **Falla Estructural**. En proyectos pequeños (< US$ 5 millones), un atraso de un año puede ser irrelevante o absorbido por holguras operativas. Sin embargo, en mega-obras como Cardones-Polpaico, el *lag* no es un error de redondeo: es una falla sistémica que expone a todo el país a costos de operación ineficientes y riesgos de racionamiento. El análisis de este estudio se centra en estos desacoples estructurales, reconociendo que la "micro-causalidad" en proyectos menores requiere una granularidad de datos que excede el alcance público actual.

Asimismo, la discusión sobre el *lag* debe incorporar el **Costo Económico del Atraso**. Existe una relación positiva entre el retardo de los proyectos y el precio final de la red. Un año de desfase en una obra de **Alta Tensión** (como Cardones-Polpaico) no solo posterga la robustez técnica, sino que genera sobrecostos operativos (intereses, contratos de suministro ineficientes) que eventualmente son trasladados a la tarifa del usuario final (CNE, 2020). Aunque aislar el efecto causal de este *lag* en una factura específica es complejo dado el volumen de inversiones mineras e industriales, filosóficamente implica que el usuario paga hoy por una "modernidad" que llega con retraso a su hogar.



---

## 5. Conclusión Abierta

La inversión en infraestructura eléctrica en Chile ha sido exitosa en su misión de **integrar mercados**, pero incompleta en su promesa de **garantizar justicia distributiva**. El *lag* detectado no es solo tiempo: es la fricción institucional de un país que cambia más rápido que sus leyes.

Queda abierta la interrogante para el lector y el regulador: En un Antropoceno marcado por la volatilidad climática, **¿seguiremos diseñando redes para un clima que ya no existe, basándonos en estadísticas que borran los eventos que más nos importan?**

El dato nos dice *qué* pasó. La respuesta sobre *qué hacer* no está en el Excel, sino en el pacto social que decidamos construir.



---

## 6. Referencias Seleccionadas
*   Geertz, C. (1973). *[The Interpretation of Cultures](https://books.google.cl/books/about/The_Interpretation_of_Cultures.html?id=br6X2wT5eXQC)*.
*   Hollnagel, E. (2014). *[Resilience Engineering in Practice](https://www.ashgate.com/pdf/SamplePages/Resilience_Engineering_in_Practice_Intro.pdf)*.
*   Ministerio de Energía. (2019). *[Plan de Descarbonización: Acuerdo de retiro de centrales a carbón](https://energia.gob.cl/sites/default/files/plan_de_descarbonizacion_de_la_matriz_energetica_0.pdf)*.
*   Comisión Nacional de Energía (CNE). (2020). *[Informe Técnico Definitivo: Fijación de Precios de Nudo Promedio](https://www.cne.cl/normativas/electrica/fijacion-de-precios/precio-de-nudo-promedio/)*.
*   Sovacool, B. & Dworkin, M. (2015). *[Energy Justice: Conceptual Insights](https://www.researchgate.net/publication/273136273_Energy_Justice_Conceptual_Insights)*.
*   OLADE (2022). *[Informe de Calidad de Servicio Eléctrico en LatAm](https://www.olade.org/publicaciones/)*.

---

## Anexo A: Glosario Metodológico

Para efectos de esta investigación exploratoria, se definen los siguientes conceptos clave:

**1. Estudio de Caso (Case Study)**
Estrategia de investigación que investiga un fenómeno contemporáneo dentro de su contexto real, especialmente cuando los límites entre el fenómeno y el contexto no son evidentes. En este estudio, cada región (ej. Caso Arica) se trata como un sistema único de interacciones entre clima, infraestructura y regulación.
*   *Leer más*: [Yin, R. K. (2018). Case Study Research and Applications](https://us.sagepub.com/en-us/nam/case-study-research-and-applications/book250150)

**2. Descripción Densa (Thick Description)**
Concepto acuñado por Clifford Geertz para la antropología, que busca explicar no solo la conducta (el dato), sino su contexto. En nuestra "etnografía digital", aplicamos esto cruzando el *dato frío* (un corte de luz) con el *contexto denso* (una ola de calor, una protesta social, un conflicto territorial), para dotar de significado al número.
*   *Leer más*: [La interpretación de las culturas (Geertz)](https://antroporecursos.files.wordpress.com/2009/03/geertz-c-1973-la-interpretacion-de-las-culturas.pdf)

**3. Métodos Mixtos (Mixed Methods)**
Enfoque que integra datos cuantitativos y cualitativos para proveer una comprensión más completa del problema. Aquí, utilizamos estadística descriptiva (Series de Tiempo, SQL) para hallar el *qué*, y marcos teóricos sociotécnicos (Justicia Energética) para explorar el *por qué*.
