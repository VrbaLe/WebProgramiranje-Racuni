export class Application{
    constructor(brojStanova)
    {
        this.broj= brojStanova;
    }

    draw(container)
    {
        let glavniDiv= document.createElement("div");
        glavniDiv.classList.add("glavniDiv");
        this.drawForma(glavniDiv);
        container.appendChild(glavniDiv);
    }

    drawForma(container)
    {
        let formaDiv= document.createElement("div");
        formaDiv.classList.add("formaDiv");
        container.appendChild(formaDiv);

        let formaGore= document.createElement("div");
        formaGore.classList.add("formaGore");
        formaDiv.appendChild(formaGore);

        let birajStanLabel= document.createElement("label");
        birajStanLabel.innerHTML="Biraj Stan:";
        formaGore.appendChild(birajStanLabel);
        
        let birajStanSelect= document.createElement("select")
        birajStanSelect.classList.add("birajStanSelect");
        formaGore.appendChild(birajStanSelect);

        for(let i=1;i<=this.broj;i++)
        {
            let opcija=document.createElement("option");
            opcija.value=i;
            opcija.text=i;
            birajStanSelect.appendChild(opcija);
        }

        let btnPrikaz= document.createElement("button");
        btnPrikaz.innerHTML="Prikaz informacija";
        btnPrikaz.classList.add("btnPrikaz");
        formaGore.appendChild(btnPrikaz);
 
        formaDiv.appendChild(document.createElement("br"));

        let formaDole=document.createElement("div");
        formaDole.classList.add("formaDole");
        formaDiv.appendChild(formaDole);
        
        let desnoDiv= document.createElement("div");
        desnoDiv.classList.add("desnoDiv");
        container.appendChild(desnoDiv);

        btnPrikaz.onclick= async () => {
            formaDole.innerHTML="";
            desnoDiv.innerHTML="";
            let idStana= document.querySelector(".birajStanSelect").value;
            //console.log(idStana.value);

            let response= await fetch("https://localhost:7080/Ispit/VratiStan/"+ idStana);
            if (!response.ok) throw new Error("Greška pri preuzimanju podataka");

            let data = await response.json();

            console.log(data);

            let brojStanaLabel= document.createElement("label");
            brojStanaLabel.innerHTML="Broj Stana:";
            formaDole.appendChild(brojStanaLabel);

            let brojStanaLabelVrednost= document.createElement("label");
            brojStanaLabelVrednost.innerHTML=idStana;
            formaDole.appendChild(brojStanaLabelVrednost);

            let imeVlasnikaLabel= document.createElement("label");
            imeVlasnikaLabel.innerHTML="Ime vlasnika:";
            formaDole.appendChild(imeVlasnikaLabel);

            let imeVlasnikaLabelVrednost= document.createElement("label");
            imeVlasnikaLabelVrednost.innerHTML=data.ime;
            formaDole.appendChild(imeVlasnikaLabelVrednost);
            
            let povrsinaLabel= document.createElement("label");
            povrsinaLabel.innerHTML="Povrsina(m2):";
            formaDole.appendChild(povrsinaLabel);

            let povrsinaLabelVrednost= document.createElement("label");
            povrsinaLabelVrednost.innerHTML=data.povrsina;
            formaDole.appendChild(povrsinaLabelVrednost);

            let brojClanovaLabel= document.createElement("label");
            brojClanovaLabel.innerHTML="Broj clanova:";
            formaDole.appendChild(brojClanovaLabel);

            let brojClanovaLabelVrednost= document.createElement("label");
            brojClanovaLabelVrednost.innerHTML=data.brclanova;
            formaDole.appendChild(brojClanovaLabelVrednost);

            let btnIzracunaj= document.createElement("button");
            btnIzracunaj.innerHTML="Izracunaj ukupno zaduzenje";
            btnIzracunaj.classList.add("btnIzracunaj");
            formaDole.appendChild(btnIzracunaj);

            btnIzracunaj.onclick= async () =>{
                let idStanaa= document.querySelector(".birajStanSelect").value;

                let res= await fetch("https://localhost:7080/Ispit/IzracunajZaduzenje/"+idStanaa).then(r=>r.json());

                //console.log(res);
                btnIzracunaj.innerHTML=res;
            }

         
            
            data.racuni.forEach(r => {
                let racunDiv= document.createElement("div");
                racunDiv.classList.add("racunDiv");

                let mesecDiv= document.createElement("label");
                mesecDiv.innerHTML="Mesec:";
                racunDiv.appendChild(mesecDiv);      
                
                let mesecDivVrednost= document.createElement("label");
                mesecDivVrednost.innerHTML=r.mesec;
                racunDiv.appendChild(mesecDivVrednost);
                
                let vodaDiv= document.createElement("label");
                vodaDiv.innerHTML="Voda:"
                racunDiv.appendChild(vodaDiv);

                let vodaDivVrednost= document.createElement("label");
                vodaDivVrednost.innerHTML=r.cenavode;
                racunDiv.appendChild(vodaDivVrednost);

                let strujaDiv= document.createElement("label");
                strujaDiv.innerHTML="Struja:";
                racunDiv.appendChild(strujaDiv);

                let strujaDivVrednost= document.createElement("label");
                strujaDivVrednost.innerHTML=r.cenastruje;
                racunDiv.appendChild(strujaDivVrednost);

                let komunalijeDiv= document.createElement("label");
                komunalijeDiv.innerHTML="Komunalije:";
                racunDiv.appendChild(komunalijeDiv);
                
                let komunalijeDivVrednost= document.createElement("label");
                komunalijeDivVrednost.innerHTML=r.cenakomunalija;
                racunDiv.appendChild(komunalijeDivVrednost);

                let placenDiv= document.createElement("label");
                placenDiv.innerHTML="Placen:"
                racunDiv.appendChild(placenDiv);

                let placenDivVrednost= document.createElement("label");
                placenDivVrednost.innerHTML=r.placen;
                racunDiv.appendChild(placenDivVrednost);
                desnoDiv.appendChild(racunDiv);

                if(r.placen==true)
                    racunDiv.classList.add("placenBoja");
                if(r.placen==false)
                    racunDiv.classList.add("neplacenBoja");
            });
        }

        
        
    }


}