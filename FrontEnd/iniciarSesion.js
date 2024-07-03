document.getElementById("buton").addEventListener("click",async () =>{
  console.log("hola");
  /*function convertBase64(file){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    return fileReader.result;
  }
  let t = "http://localhost:8000/subirImagen";
  let img = convertBase64("C:\Users\lalo\Ingeniera-de-Software-2\BackEnd\src\Lalo.jpeg");
  const res = await fetch("http://localhost:8000/subirImagen",{
    method:"POST",
    headers:{
        "Content-Type" : "applicaation/json"
    },
    body: JSON.stringify({
        image: img
    })
   });*/
   /*try{
    const res = await fetch("http://localhost:8000/api/propuestaIntercambio");
    const data = await res.json();
    console.log(data);
    const response = await fetch("http://localhost:8000/api/propuestaIntercambio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productoOfrecido: "6656127e42daa5de01204e57",
                    productoDeseado: "664e071c47ac005b382963a2"
                })
              });
            }catch (error) {
                console.error('Error:', error);
              }
    const que = await res;
    console.log(que);
    */
   let data = { registrado: true }
    const res = await fetch(`http://localhost:8000/api/propuestaIntercambio/666b122fdec1569eed5c1f9d`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
 //console.log(response);
  /* console.log("hola");
    let email = localStorage.getItem("email");
    let t = "http://localhost:8000/api/users/" + email;
    try {
        const res = await fetch(t, {});
        const data = await res.json();
        console.log(data.name);
      } catch (error) {
        console.error('Error:', error);
      }*/
    /*  const res = await fetch("http://localhost:8000/api/sucursales",{
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
   });*/
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