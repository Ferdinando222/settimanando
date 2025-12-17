---
layout: post
title: "COME UNA MINUSCOLA MOSCA DAL SUPER UDITO HA ISPIRATO LA COSTRUZIONE DI NUOVI MICROFONI MEMS "
category: "Curiosità tech"
date: 2025-12-11
subtitle: "Ormia Ochracea: la mosca dal super udito"
time-reading: "8 min"
image: /assets/picture_blog/o-ochracea.jpg
---


<article class="container">
    <div class=" hero-text article-content">
        <p> <strong>“Ogni cosa che puoi immaginare, la natura l’ha già creata”.</strong> Così Albert Einstein, con una grande coscienza ambientalista, si esprimeva nei confronti della natura più di 70 anni fa. La natura è sempre stata fonte di ispirazione per i più grandi scienziati e per la creazione di nuove tecnologie. Nel Rinascimento, Leonardo da Vinci trascorreva ore ad osservare il volo degli uccelli, cercando di coglierne ogni dettaglio e ogni segreto. Quella capacità di liberarsi nell’aria, allora percepita come un sogno irraggiungibile, è oggi diventata una realtà. Così come l’architetto Joseph Paxton, che progettò il Crystal Palace nel 1851 prendendo spunto dalla struttura delle foglie di un giacinto sudamericano.</p>
        <p>Potrei andare avanti per ore, citando esempi che spaziano dall’ingegneria all’architettura, dalla moda fino ai più avanzati metamateriali. Ma in questo articolo mi limiterò a presentarvi un caso per me particolarmente vicino, perché riguarda il mondo dell’audio e, in particolare, quello dei microfoni: quello di una minuscola mosca gialla notturna, conosciuta con il nome scientifico <strong>Ormia Ochracea</strong>.</p>
        <div class="image-container">
            <img src="{{ '/assets/picture_blog/o-ochracea.jpg' | relative_url }}" alt="Ormia Ochracea" class="animated-image">
        </div>
        <p>Ed è il classico esempio di non giudicare un libro dalla copertina: dall’aspetto tutt’altro che elegante (come potrete vedere dalla foto sopra), chi direbbe mai che un esserino così minuscolo possa possedere un udito e un senso dell’orientamento sonoro straordinari? Sulla carta sembrerebbe del tutto incapace di localizzare con precisione una sorgente sonora, eppure lo fa. E il motivo sarà più chiaro dopo aver fatto un piccolo excursus sul magico mondo dell’audio binaurale. Per chi non fosse pratico dell’argomento, cercherò di spiegare il tutto nel modo più intuitivo possibile. Se invece sei già ferrato sull’argomento, allora puoi anche saltare questa parte e passare al prossimo paragrafo. 
        </p>
        <h2>Introduzione al binaurale </h2>
        <p>Vi siete mai chiesti perché l’uomo, così come la maggior parte degli animali, abbia due orecchie e non una sola? Non per una questione di estetica o di simmetria, ma perché ci aiutano a capire da dove proviene un suono. Il cervello, infatti, riesce a rilevare i minimi ritardi e le differenze di intensità tra ciò che arriva a un orecchio e all’altro, e sfrutta queste informazione in modo da individuare con precisione la posizione della sorgente sonora.</p>
        <p>Nel dettaglio, sfrutta due segnali principali, <strong>l’ITD </strong> (Interaural Time Difference) e <strong>l’ILD </strong>(Interaural Level DIfference). L’ITD rappresenta la <strong>differenza di tempo </strong>con cui un suono raggiunge le due orecchie [1][2]. Nel pratico, se la tua sorgente sonora è localizzata alla tua destra, allora arriverà prima nell’orecchio destro e poi con un certo ritardo nell’orecchio sinistro. Ecco, quel ritardo rappresenta il tuo ITD. In generale questo segnale è particolarmente efficace per localizzare suoni a <strong>bassa frequenza</strong> (approsimativamente meno di 1kHz), perché in questo caso le lunghezze d’onda sono più grandi del nostro capo ( e quindi riescono ad “andare oltre” la nostra testa). L’ILD invece rappresenta la differenza di <strong> intensità di volume </strong>tra le due orecchie. Quindi, per riprendere l'esempio precedente, se la tua sorgete è localizzata alla tua destra, allora l’orecchio destro lo percepirà più forte rispetto a quello sinistro, perché la tua testa fa da “ombra” acustica e attenuerà un po' dell’energia sonora. Al contrariro dell’ITD, l’ILD è più efficace alle <strong>alte frequenze</strong> (approsimativamente maggiore di 1 kHz) questo perché le lunghezze d’onda saranno più corte e saranno più facilmente bloccate dalla testa, creando quindi un effetto ombra maggiore. Il cervello quindi, combinando queste due informazioni, riesce ad orientarsi nello spazio e a localizzare le sorgenti sonore con grande precisione [3]</p>
        <div style="text-align:center; font-size:0.5em;">
            Le immagini sotto sono state generate artificialmente tramite intelligenza artificiale a scopo divulgativo.
        </div>
        <div class="image-row" style="display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0;">
            <div class="image-container" style="flex: 1; text-align: center;">
                <img src="{{'/assets/picture_blog/Gemini_Generated_Image_43r3h43r3h43r3h4.png' | relative_url}}" alt="Esempio ITD" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px;">
                <p><strong>ITD:</strong> Differenza di tempo tra le orecchie</p>
            </div>
            <div class="image-container" style="flex: 1; text-align: center;">
                <img src="{{'/assets/picture_blog/Gemini_Generated_Image_vp7fw4vp7fw4vp7f.png' | relative_url}}" alt="Esempio ILD" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px;">
                <p><strong>ILD:</strong> Differenza di intensità tra le orecchie</p>
            </div> 
        </div>
        <blockquote>
            L’audio binaurale sfrutta le differenze di tempo e di intensità percepite dalle due orecchie per permettere al cervello di localizzare i suoni nello spazio
        </blockquote>
        <h2>Il segreto del super udito della mosca</h2>
            <p>Il metodo alla base dell’audio binaurale però funziona solo a una condizione: che i sensori (che siano orecchie, microfoni o altro) siano <strong>sufficientemente separati</strong>, così da rendere i ritardi e le differenze di livello sonoro abbastanza grandi da essere percepiti. Altrimenti, il nostro cervello farebbe molta fatica a distinguere le differenze. Ecco perché lo scetticismo iniziale nei confronti della nostra super-mosca ha senso: come diavolo fa un esserino così minuscolo, con orecchie praticamente attaccate, a localizzare i suoni con una precisione sorprendente? Parliamo di una creatura che è mediamente grande meno di 1 cm, una testa grande all'incirca 1 mm e i due timpani sono separati tra loro a una distanza che va dai  450-520 μm (per intenderci circa la metà di un chicco di riso). L'ITD naturale in questi casi per una frequenza di 5 kHz misura circa 1,5-2 μs, una grandezza che nessun cervello riesce a distinguere (il cervello umano per esempio può percepire differenze di circa 10–20 μs tra le orecchie) [6]. La risposta che svela il segreto di questa mosca è da cercare nella sua struttura anatomica, completamente diversa dalla nostra, ma sorprendentemente efficace in dimensioni così piccole.</p>
            <p> Essa infatti possiede due membrane situate sotto la testa, che funzionano in modo simile ai nostri timpani ed hanno lo scopo quindi di convertire le vibrazioni in segnali neurali che vanno al cervello. A differenza dei nostri timpani, però, queste membrane non sono separate e indipendenti, ma sono collegate fisicamente da un ponte elastico. Questo significa che quando una membrana vibra, le sue vibrazioni influenzeranno anche l’altra, e viceversa. In fisica, questo fenomeno prende il nome di <strong>coupling</strong>, ovvero accoppiamento tra due sistemi che interagiscono tra loro.
            </p>
            <div class="image-container">
            <img src="{{ '/assets/picture_blog/Gemini_Generated_Image_6s3lyc6s3lyc6s3l.png' | relative_url }}" alt="Ormia Ochracea" class="animated-image">
            </div>
            <p>Il coupling forza i due timpani a muoversi secondo due modi:
                <li><strong>Modo Traslazionale:</strong> ovvero le membrane oscillanno insieme nello stesso verso e si dice che sono in fase. Questo modo permette di capire l'intensità del suono.</li>
                <li><strong>Modo Rotazionale:</strong> ovvero quando una membrana va su, l'altra va giù e si dice che sono in controfase. Questo modo permette invece di capire in che direzione proviene il suono.</li>
            </p>
            <p>
            Questi modi avvengono contemporanemente, ma a secondo della direzione della sorgente sonora, con pesi diversi. Ad esempio se la sorgente è posta di fronte alla mosca, allora il modo traslazionale domina, mentre se il suono arriva da sinistra/destra allora è il modo rotazionale a dominare. In tutti gli altri casi sarà una sorta di ibrido. Questo sistema quindi permette alla mosca di avere una sorta di amplificatore meccanico, che permette di migliorare di <strong>40 volte</strong> i valori naturali di ITD e ILD, raggiungendo prestazioni simili a quello dell'uomo, riuscendo infatti a localizzare suoni con una risoluzione di circa 2°.
            </p>
            <div class="image-container">
            <img src="{{ '/assets/picture_blog/Gemini_Generated_Image_7yad4e7yad4e7yad.png' | relative_url }}" alt="Ormia Ochracea" class="animated-image">
            </div>
            <div class="highlight-box">
                <h4>Come fa la mosca ad avere un udito così direzionale nonostante le sue dimensioni?</h4>
                <p>La propria struttura anatomica permette un accoppiamento meccanico tra le proprie membrane uditive, migliorando sia l'ITD che l'ILD di 40 volte rispetto ai valori naturali attesi</p>
            </div>
        <h2>I nuovi microfoni MEMS direzionali copiano la struttura anatomica della mosca</h2>
            <p> Una volta scoperto il segreto dell'Ormia Ochracea, l'uomo non deve far altro che copiare dalla natura stessa, non pagando neanche conseguenze di copyright. Ed è esattamente ciò che ha fatto. Infatti questo tipo di problema può essere traslato nel mondo dei microfoni <strong>MEMS</strong> (Micro-Electro-Mechanical-System), ovvero minuscoli microfoni (grandi pochi millimetri) realizzati con le stesse tecnologie dei microchip. Oggi vengono usati principalmente in sistemi come smartphone, tablet, laptop, cuffie, smartwatch e smartglasses, ovvero sistemi dove è appunto necessario integrare sensori audio <strong>piccoli, leggeri e a basso consumo</strong>. Insomma, li usiamo ogni giorno senza probabilmente nemmeno rendercene conto.
           <p> Per rendere i microfoni MEMS direzionali, fino a poco tempo fa c'erano due soluzioni principali. La prima consisteva nell'usare due microfoni omnidirezionali (cioè in grado di catturare il suono da tutte le direzioni) e, combinando i segnali,si ottiene un certo grado di direzionalità. La seconda prevedeva di creare due input acustici (attraverso due fori) all'interno di uno stesso microfono. Entrambi i metodi però si sono rilevati non molto soddisfacenti, a causa dell'elevato rumore che generavano e della scarsa direzionalità che riuscivano a raggiungere e, insomma, purtroppo non hanno avuto molto successo.
           </p>
            <p> 
            Il 2009 però rappresenta l'anno di svolta. Il ricercatore e professore dell'università di Binghamnton, <strong>Ronald N. Miles</strong> , nel suo paper pioneristico <em>“A low-noise differential microphone inspired by the ears of the parasitoid fly Ormia ochracea"</em>[4], fu il primo ad applicare l'idea di sensori accoppiati ispirandosi appunto alla struttura dell'Ormia Ochracea e realizzò un microfono miniaturizzato ottenendo ottimi risultati in termini di rumore e direzionalità. Da lì in poi questa idea è stata applicata anche ai microfoni MEMS. Negli anni successivi infatti un gruppo di ricerca dell'università di Strathclyde (Scozia), perfezionò il concetto e tra il 2016 e il 2018 realizzarono i primi microfoni MEMS direzionali biomimetici che imitano la struttura della mosca [5].
            </p>
            <p>
            Un microfono direzionale di questo tipo è utile in diversi contesti. Può essere usato negli apparati acustici per aiutare chi ha difficoltà a comprendere il parlato, soprattuto in ambienti rumorosi. Vengono impiegati in array di microfoni (ovvero un insieme di microfoni posti in una certa geometria) per permettere di migliorare la localizzazione di sorgenti sonore e individuare fonti di rumore. Questo tipo di microfoni direzionali MEMS, grazie alla miniaturizzazione e alla precisione ispirata alla Ormia, sta quindi diventando sempre più interessante per applicazioni sia a scopo industriale che commerciale.
            </p>
        <h2>Semplice, ma geniale</h2>
            <p>
            Non so voi, ma io, dopo aver scoperto il segreto di questa mosca, sono rimasto affascinato dalla genialità della natura: capace di risolvere problemi che sembrano impossibili, ma che, una volta svelati, appaiono straordinariamente semplici. Alla fine, tutto ciò che serviva era collegare tra loro i due sensori… eppure proprio in quella semplicità si nasconde la vera genialità. Ed è forse questo l'insegnamento più grande che la natura ci può dare, al di là della semplice ispirazione.
            </p>
        <h3>Bibliografia</h3>
        <p>
        <ol>
            <li>J. Blauert, <em>Spatial Hearing: The Psychophysics of Human Sound Localization</em>, 2nd ed., Cambridge, MA: MIT Press, 1997. <a href="https://direct.mit.edu/books/oa-monograph/4885/Spatial-HearingThe-Psychophysics-of-Human-Sound" target="_blank" style="color:white;">link</a></li>
            <li>R. H. Gilkey and T. R. Anderson, <em>Binaural and Spatial Hearing in Real and Virtual Environments</em>, New York: Lawrence Erlbaum Associates, 1997. [Online]. Available: <a href="https://www.routledge.com/Binaural-and-Spatial-Hearing-in-Real-and-Virtual-Environments/Gilkey-Anderson/p/book/9781138987852" target="_blank" style="color:white;">link</a></li>
            <li>M. M. Bronkhorst, "The cocktail party phenomenon: A review of research on speech intelligibility in multiple-talker conditions," <em>Acta Acustica united with Acustica</em>, vol. 86, no. 1, pp. 117–128, 2000. [Online]. Available: <a href="https://www.researchgate.net/publication/230739432_The_Cocktail_Party_Phenomenon_A_Review_of_Research_on_Speech_Intelligibility_in_Multiple-Talker_Conditions" target="_blank" style="color:white;">link</a></li>
            <li>R. N. Miles, M. Leijon, and D. M. Green, "A low-noise differential microphone inspired by the ears of the parasitoid fly Ormia ochracea," <em>J. Acoust. Soc. Am.</em>, vol. 125, no. 1, pp. 249–258, 2009. [Online]. Available: <a href="https://www.researchgate.net/publication/24264771_A_low-noise_differential_microphone_inspired_by_the_ears_of_the_parasitoid_fly_Ormia_ochracea" target="_blank" style="color:white;">link</a></li>
            <li>Y. Zhang, R. Bauer, W. M. Whitmer, J. C. Jackson, J. F. C. Windmill, and D. Uttamchandani, "Development of MEMS directional microphones inspired by the ears of Ormia ochracea," University of Strathclyde Research Publications, 2016–2018. [Online]. Available: <a href="https://www.sciencedirect.com/science/article/pii/S0003682X24005103" target="_blank" style="color:white;">link</a></li>
            <li>"Ormia ochracea," Wikipedia. <a href="https://en.wikipedia.org/wiki/Ormia_ochracea" target="_blank" style="color:white;">link</a>.</li>
        </ol>
        </p>

