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

const database = "https://api.themoviedb.org/3/search/movie?api_key=1b9a718974945696fe81f966f55c9ee4&language=it-IT";

var app = new Vue({
  el: "#root",
  data: {
    search: "",
    show: false,
    found: true,
    dbMovie: []
  },
  methods: {
    // funzione per cercare sull'API i film
    startSearch: function() {
      // alla pressione del bottone controllo se l'utente ha inserito una stringa per effettuare la ricerca
      if (this.search != "") {
        axios.get(`${database}&query=${this.search}`)
        .then(result => {
          // controllo se l'array di ricerca é vuoto
          if (result.data.results.length > 0) {
            this.dbMovie = result.data.results;
            this.found = true;
          } else {
            this.found = false;
          }
          this.show = true;
        });
      } else {
        this.show = false;
      }
    },
    // funzione che prende il voto di TMDB e lo ritorna sotto forma di numero da 0 a 5
    voteStar: function(vote) {
      return Math.round(vote / 2);
    }
  }
});
