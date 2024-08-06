const express = require("express");
const app = express();
const konektujBazu = require("./baza/baza");
const cors = require("cors");
const Korisnik = require("./baza/Korisnik");
const Osiguranje = require("./baza/Osiguranje");

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server sluša na portu ${PORT}`);
});

konektujBazu();

app.use(express.json());
app.use(cors());

app.get("/api/korisnici", async (req, res)=>{
    try{
        const sviKorisnici = await Korisnik.find();

        res.json({
            uspesno: true,
            korisnici: sviKorisnici
        });
    }
    catch(err){
        res.json({
            uspesno: false,
            poruka: err.message
        })
    }
});

app.post("/api/korisnik", async (req, res)=>{
    try{
        const postoji = await Korisnik.find({email: req.body.email});

        res.json({
            uspesno: true,
            postoji: postoji.length
        });
    }
    catch(err){
        res.json({
            uspesno: false,
            poruka: err.message
        })
    }
});

app.post("/api/dodajKorisnika", async (req, res)=>{
    try{
        const ime = req.body.ime;
        const prezime = req.body.prezime;
        const email = req.body.email;

        const nov = new Korisnik({
            ime: ime,
            prezime: prezime,
            email: email
        });

        const sacuvan = await nov.save();

        res.json({
            uspesno: true,
            korisnik: sacuvan
        });
    }
    catch(err){
        res.json({
            uspesno: false,
            poruka: err.message
        })
    }
});

app.get("/api/osiguranja", async (req, res)=>{
    try{
        const osiguranja = await Osiguranje.find();

        res.json({
            uspesno: true,
            osiguranja: osiguranja
        });
    }
    catch(err){
        res.json({
            uspesno: false,
            poruka: err.message
        })
    }
});

app.post("/api/vratiOsiguranje", async (req, res)=>{
    try{
        const osiguranje = await Osiguranje.find({email: req.body.email});
        res.json({
            uspesno: true,
            osiguranje: osiguranje
        });
    }
    catch(err){
        res.json({
            uspesno: false,
            poruka: err.message
        })
    }
});

app.post("/api/osiguranje", async (req, res)=>{
    try{
        const ime = req.body.ime;
        const prezime = req.body.prezime;
        const email = req.body.email;
        const nacin = req.body.nacin;
        const period = req.body.period;
        const destinacija = req.body.destinacija;

        const nov = new Osiguranje({
            ime: ime,
            prezime: prezime,
            email: email,
            nacin: nacin,
            period: period,
            destinacija: destinacija
        })

        const sacuvan = await nov.save();

        res.json({
            uspesno: true,
            osiguranje: sacuvan
        });
    }
    catch(err){
        res.json({
            uspesno: false,
            poruka: err.message
        })
    }
});