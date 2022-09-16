
export function validate(post) {
  
  let errors = {}
  if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(post.email)){
    errors.email = ""
  }else {
    errors.email = "el formato del email es invalido"
  }
  if(post.password.length <= 6){
    errors.password ="la contraseña debe tener al menos 7 caracteres"
   }else{
    errors.password = ""
   }
  
  post.name
    ? (errors.name = "")
    : (errors.name) = "Necesitas llenar el campo nombre!"

  post.dateOfBirth
    ? (errors.dateOfBirth = "")
    : (errors.dateOfBirth = "Necesitas llenar el campo fecha de nacimiento!")

  post.identification
    ? (errors.identification = "")
    : (errors.identification = "Necesitas llenar el campo indentificacion!")

  post.country
    ? (errors.country = "")
    : (errors.country = "Necesitas llenar el campo de pais!")

  post.address
    ? (errors.address = "")
    : (errors.address = "Necesitas llenar el campo de direccion!")

   post.rol
    ? (errors.rol = "")
    : (errors.rol = "Necesitas llenar el campo de rol!")
  

  return errors
}


export function validateProfessional(postprofessional) {
  let professionalError = {}

  postprofessional.medicalLicense
    ? (professionalError.medicalLicense = "")
    : (professionalError.medicalLicense = "Necesitas llenar el campo de Licencia medica!")

  return professionalError
}









