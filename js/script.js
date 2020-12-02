// In questo esercizio iniziamo a replicare la logica che sta dietro a tantissimi siti che permettono la visione di film e telefilm.
// Per fare questo, come fanno siti molto più rinomati, utilizzeremo un API che ci permette di avere un insieme di risultati congrui alla nostra ricerca.

// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo, Titolo Originale, Lingua e Voto

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
    }
  }
});
