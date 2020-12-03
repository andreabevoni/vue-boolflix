// In questo esercizio iniziamo a replicare la logica che sta dietro a tantissimi siti che permettono la visione di film e telefilm.
// Per fare questo, come fanno siti molto più rinomati, utilizzeremo un API che ci permette di avere un insieme di risultati congrui alla nostra ricerca.

// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo, Titolo Originale, Lingua e Voto

// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili.

// Milestone 3:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco.
// Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare per poi aggiungere la parte finale dell’URL passata dall’API.

// Milestone 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix.
// Mettiamo un header che contiene logo e search bar, dopo aver ricercato qualcosa nella searchbar i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina.
// Andando con il mouse sopra una card (on hover), appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview.

// Milestone 5 (Opzionale):
// Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno parte del cast aggiungendo alla nostra scheda SOLO i primi 5 restituiti dall’API con Nome e Cognome, e i generi associati al film con questo schema: “Genere 1, Genere 2, …”.

// Milestone 6 (Opzionale):
// Creare una lista di generi richiedendo quelli disponibili all'API e creare dei filtri con i generi tv e movie per mostrare/nascondere le schede ottenute con la ricerca.



const databaseMovie = "https://api.themoviedb.org/3/search/movie?api_key=1b9a718974945696fe81f966f55c9ee4&language=it-IT";
const databaseTV = "https://api.themoviedb.org/3/search/tv?api_key=1b9a718974945696fe81f966f55c9ee4&language=it-IT";
const posterLink = "http://image.tmdb.org/t/p/w342/";

var app = new Vue({
  el: "#root",
  data: {
    search: "",
    database: []
  },
  methods: {
    // funzione che fa partire le due ricerche quando l'utente clicca sul bottone, che parte solo se ha effettivamente scritto qualcosa
    startSearch: function() {
      // azzero il database prima di aggiungere le nuove richieste
      this.database = [];
      this.apiCall(databaseMovie);
      this.apiCall(databaseTV);
    },
    // funzione che richiama l'API e pusha l'array risultante nel nostro database, poi ordina questo database in base alla popolaritá (in maniera decrescente)
    apiCall: function(db) {
      axios.get(`${db}&query=${this.search}`)
      .then(result => {
        this.database.push(...result.data.results);
        this.database.sort(function (a, b) {
          return b.popularity - a.popularity;
        });
      });
    },
    // funzione che prende il voto di TMDB e lo ritorna sotto forma di numero da 0 a 5
    voteStar: function(vote) {
      return Math.round(vote / 2);
    },
    // funzione che setta un'immagine generica per le lingue di cui non ho scaricato la bandiera
    genericFlag: function(event) {
      event.target.src = "img/flags/unknown.png"
    }
  }
});
