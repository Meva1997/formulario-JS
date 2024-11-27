document.addEventListener('DOMContentLoaded', function (){
  
  const name = document.querySelector('#name');
  const email = document.querySelector('#email'); 
  const password = document.querySelector('#password'); 
  const gender = document.querySelector('#gender');
  const age = document.querySelector('#age'); 
  const form = document.querySelector('#extended-form');
  const submit = document.querySelector('#submit-btn');
  const spinner = document.querySelector('#spinner'); 
  const bio = document.querySelector('#bio'); 
  const inputsCheckRadio = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
  
  const formulario = {
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    preferences: [],
    bio: '',
    marital_status: ''
  }
  
  name.addEventListener('input', validar); 
  email.addEventListener('input', validar); 
  password.addEventListener('input', validar);
  gender.addEventListener('change', validar); 
  age.addEventListener('input', validar); 
  bio.addEventListener('input', validar); 
  form.addEventListener('submit', enviar); 


  inputsCheckRadio.forEach(input => {
    input.addEventListener('change', e => {
      const { name, checked, value } = e.target;

      if (input.type === 'checkbox') {
        // Aseguramos que 'preferences' sea un array antes de usar push o filter
        if (!Array.isArray(formulario.preferences)) {
          formulario.preferences = [];
        }

        if (checked) {
          formulario.preferences.push(value); // Agregar al array si está marcado
        } else {
          formulario.preferences = formulario.preferences.filter(pref => pref !== value); // Eliminar del array si no está marcado
        }
      } else if (input.type === 'radio') {
        formulario[name] = value; // Actualizamos directamente el valor del radio seleccionado
      }
      comprobarFormulario();
    })
  })


  
  generarListaGeneros(); 
  
  comprobarFormulario(); 
  
  function validar(e){
    
    if(e.target.value === ''){
      mostrarAlerta('Este campo es obligatorio', e.target.parentElement)
      formulario[e.target.name] = '';
      comprobarFormulario(); 
      return; 
    }
    
    if(e.target.id === 'email' && !validarEmail(e.target.value)){
      mostrarAlerta('Email no valido', e.target.parentElement);
      formulario[e.target.name] = '';
      comprobarFormulario(); 
      return; 
    }
    
    if(e.target.id === 'password' && !validarContraseña(e.target.value)){
      mostrarAlerta('Contraseña invalida', e.target.parentElement); 
      formulario[e.target.name] = '';
      comprobarFormulario(); 
      return; 
    }

    if(e.target.name === 'bio' && e.target.value === ''){
      mostrarAlerta('Este campo es obligatorio', e.target.parentElement)
      formulario[e.target.name] = ''; 
      comprobarFormulario(); 
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

    // Verificar que todos los campos tengan valor (excluyendo preferences y marital_status)
    const formValida = Object.values(formulario).every(value => value !== '' && value !== undefined) &&
    formulario.preferences.length > 0 &&
    formulario.marital_status !== '';

    console.log(formulario); 

    submit.classList.toggle('button-disabled', !formValida);
    submit.disabled = !formValida;
  }
  
  function enviar(e){
  e.preventDefault();   
   
  // Mostrar el spinner mientras se procesa el envío
  submit.style.display = 'none'; 
  spinner.style.display = 'flex'; 
  spinner.classList.remove('hidden'); 
    
    resetFormulario(); 
    resetInputs(); 
  
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
    form.reset();

    Object.keys(formulario).forEach(key => formulario[key] = '');
    formulario.preferences = [];

    resetInputs();
    comprobarFormulario();
  }

  function resetInputs(){
    const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    inputs.forEach(input => input.checked = false); 
    return; 
  }

    
  })