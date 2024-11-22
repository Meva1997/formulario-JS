document.addEventListener('DOMContentLoaded', function (){
  
    const name = document.querySelector('#name');
    const email = document.querySelector('#email'); 
    const password = document.querySelector('#password'); 
    const gender = document.querySelector('#gender');
    const age = document.querySelector('#age'); 
    const form = document.querySelector('#extended-form');
    const submit = document.querySelector('#submit-btn');
    const spinner = document.querySelector('#spinner'); 
    
    const formulario = {
      name: '',
      email: '',
      password: '',
      gender: ''
    }
    
    name.addEventListener('input', validar); 
    email.addEventListener('input', validar); 
    password.addEventListener('input', validar);
    gender.addEventListener('change', validar); 
    form.addEventListener('submit', enviar); 
  
    
    generarListaGeneros(); 
    
    comprobarFormulario(); 
    
    function validar(e){
      
      if(e.target.value === ''){
        mostrarAlerta('Este campo es obligatorio', e.target.parentElement)
        formulario[e.target.name] = '';
        return; 
      }
      
      if(e.target.id === 'email' && !validarEmail(e.target.value)){
        mostrarAlerta('Email no valido', e.target.parentElement);
        formulario[e.target.name] = '';
        return; 
      }
      
      if(e.target.id === 'password' && !validarContraseña(e.target.value)){
        mostrarAlerta('Contraseña invalida', e.target.parentElement); 
        formulario[e.target.name] = '';
        return; 
      }
      
      eliminarAlerta(e.target.parentElement);//para borrar alerta al completar input 
      
      formulario[e.target.name] = e.target.value.trim() //para llenar el objeto y poder validar el envio del formulario 
      
      comprobarFormulario(); 
    
    }
    
    
    function mostrarAlerta(mensaje, referencia){
      
      eliminarAlerta(referencia); 
      
      const alerta = document.createElement('P');
      alerta.textContent = mensaje; 
      alerta.classList.add('error'); 
      referencia.appendChild(alerta); 
    }
    
    function eliminarAlerta(referencia){
      const alerta = referencia.querySelector('.error'); 
      if(alerta){
        alerta.remove('error')
      }
    }
    
    function validarEmail(email){
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const resultado = regex.test(email); 
      return resultado; 
    }
    
    function validarContraseña(password){
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&"])[A-Za-z\d@$!%*?&]{6,}$/;
      const resultado = regex.test(password);
      return resultado;  
    }
    
    function generarListaGeneros(){
      const generos = ['Hombre', 'Mujer', 'Otro'];
      
      generos.forEach((genero) => {
        const option = document.createElement('option');
        option.textContent = genero; 
        gender.appendChild(option); 
      });  
    }
    
    function comprobarFormulario(){
      const formValida = Object.values(formulario).every(value => value !== '')
      
      if(formValida){
        submit.classList.remove('button-disabled'); 
        submit.disabled = false; 
        return; 
      }
      submit.classList.add('button-disabled'); 
      submit.disabled = true; 
    }
    
    function enviar(e){
    e.preventDefault();   
     
    // Mostrar el spinner mientras se procesa el envío
    submit.style.display = 'none'; 
    spinner.style.display = 'flex'; 
    spinner.classList.remove('hidden'); 
      
      resetFormulario(); 
      resetCheckbox(); 
      resetRadio(); 
    
    // Simulación de envío de datos con un retraso
    setTimeout(() => {
      spinner.style.display = 'none'; 
      
      // Crear y mostrar la alerta de éxito
      const alertaExito = document.createElement('P');
      alertaExito.textContent = 'Formulario enviado'; 
      alertaExito.classList.add('exito'); 
      form.appendChild(alertaExito); 
      
      // Eliminar la alerta después de 3 segundos
      setTimeout(() => {
        alertaExito.remove(); 
        submit.style.display = 'block'; // Volver a mostrar el botón de envío
      }, 3000); 
    }, 3000); 
      
  }
  
    function resetFormulario(){
      // Reseteamos el objeto de formulario
      formulario.name = '';
      formulario.email = '';
      formulario.password = ''; 
      formulario.gender = ''; 
      
      // Reseteamos los campos del formulario en la interfaz
      name.value = '';
      email.value = '';
      password.value = '';
      gender.value = ''; // O si prefieres, puedes establecer el valor por defecto de "Selecciona una opción
      age.value = ''; 
      bio.value = ''; 
    
      comprobarFormulario(); // Verifica si el formulario sigue siendo válido después de resetear
    }

    function resetCheckbox(){
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach(checkbox => checkbox.checked = false); 
        return; 
    }
    function resetRadio(){
        const radio = document.querySelectorAll('input[type="radio"]')
        radio.forEach(radio => radio.checked = false); 
        return; 
    }
  
    
  })