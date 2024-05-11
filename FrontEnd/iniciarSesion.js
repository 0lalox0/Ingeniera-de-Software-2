document.getElementById("buton").addEventListener("click",async () =>{
    console.log("hola");
      const res = await fetch("http://localhost:8000/api/sucursales",{
    method:"POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        nombre: "LAlO",
        ciudad: "nazi",
        calle: "Romeo",
        numero: 221
    })
   });
 /*  const res = await fetch("http://localhost:8000/api/test",{
    method:"POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        test: "Hola",
        lol: 12
    })
   });*/
})
//test push