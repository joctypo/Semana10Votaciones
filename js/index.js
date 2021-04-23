//alert("Registrado");
const cedula= document.getElementById('cedula');
const nombre= document.getElementById('nombre');
const id= document.getElementById('id');
const registrar= document.getElementById('Registrate_boton');
const votacion= document.getElementById('votacion_boton');
const candidatos= document.getElementById('candidato_boton');
const votados= document.getElementById('votar_boton');

//Firebase
var database= firebase.database();


registro = () =>{
    let ce = cedula.value;
    let nom= nombre.value;
    
    if(ce===''){

        alert("Digite su id");

    }else {
       
        database.ref('users/'+ce).on('value',function(data){
            
                    let valor = data.val();
                    if(valor !== null){
                        alert("El usuario ya esta registrado"); 
                    }
                    if(valor === null) {
                        alert("Registro Exitoso"+ nom);
                        let usuario = {
                            cedula: ce,
                            nombre: nom,
                        }
                        //let json = JSON.stringify(usuario);
                        database.ref('users/'+usuario.cedula).set(usuario);
                        


                    }       
        });
    }

   
}

votar = () =>{

    let idd = id.value;

    if (idd === ''){
        
        alert("El usuario no esta registrado");


                    }else{

                        database.ref('users').on('value',function(data){
                            data.forEach(
                                  function(user){
                 
                                     let clave = user.key;
                                     let valor = user.val();
                                    

                                     if(idd === valor.cedula){
                 
                                         let nom = valor.nombre;   

                                         let urna = {
                                             id: idd,
                                             nombre: nom,
                                             
                                         }
                                         
                                         let json = JSON.stringify(urna);
                                         database.ref('votos/'+urna.id).push().set(urna);
                 
                 
                                         alert("Se registro su voto");

                        
                    } else {alert("El candidato no esta registrado");}
                }

           )     



        });
       // alert("El usuario no esta registrado");

    }


}

verregistrototal = () =>{

    database.ref('users').on('value',function(data){
        let candidatos = '';
        data.forEach(
              function(user){

                 let clave = user.key;
                 let valor = user.val();
                 candidatos = candidatos + valor.cedula + " " + valor.nombre + "\n";
                 //alert(value.cedula + "  " +value.nombre );

               
             }

        )     

           alert(candidatos); 

     });

}

votacionregistro = () => {
    
    database.ref('votos').on('value',function(data){
        let candidatosname = [];
        let votoscandidatos = [];
        let contadortotal = 0;  
        let listaporcentajes = '';
        let contador = ''; 

        data.forEach(
              
               function(user){
                let clave = user.key;
                let valor = user.val();

               // alert("Entra");
                let contador = user.numChildren();
                votoscandidatos.push(contador);
                contadortotal = contador + contadortotal;
                
                //let identificacion = element.key; 
                let identidad = user.key;
                candidatosname.push(identidad);     
                console.log(identidad + contador);

               /* database.ref('votos/'+valor.id).on('value',function(data2){
                    data2.forEach(
                           
                           function(user2){
                                 alert("Entra");
                                let contador = user2.numChildren();
                                contadortotal = contador + contadortotal;
                                votoscandidatos.push(contadortotal);
                                //let identificacion = element.key; 

                                candidatosname.push(valor.nombre); 



                            }) });
*/




               } )
            
            for(let i= 0; i<votoscandidatos.length; i++){

                let porcent = (votoscandidatos[i]/contadortotal)*100; 
                listaporcentajes += candidatosname[i] + " " + porcent + "%" +"\n"; 

            }
            
           alert(listaporcentajes);
            
            });

 }

registrar.addEventListener('click',registro);
votados.addEventListener('click',votar);
votacion.addEventListener('click',votacionregistro);
candidatos.addEventListener('click',verregistrototal);