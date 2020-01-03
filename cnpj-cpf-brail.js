validation_CNPJ_CPF(cnpj) {
    cnpj = cnpj.replace(/[^\w]/g, "");
    if (cnpj.length == 14) {
      // Elimina CNPJs invalidos conocidos
      if (cnpj == "00000000000000" ||
          cnpj == "11111111111111" ||
          cnpj == "22222222222222" ||
          cnpj == "33333333333333" ||
          cnpj == "44444444444444" ||
          cnpj == "55555555555555" ||
          cnpj == "66666666666666" ||
          cnpj == "77777777777777" ||
          cnpj == "88888888888888" ||
          cnpj == "99999999999999")
            return false;
      // Valida DVs
      let tamano = cnpj.length - 2
      let numeros = cnpj.substring(0, tamano);
      let digitos = cnpj.substring(tamano);
      let suma = 0;
      let pos = tamano - 7;
      for (let i = tamano; i >= 1; i--) {
        suma += numeros.charAt(tamano - i) * pos--;
        if (pos < 2){
          pos = 9;
        }
      }
      let resultado = suma % 11 < 2 ? 0 : 11 - suma % 11;
      if (resultado != digitos.charAt(0)){
        return false;
      }
      tamano = tamano + 1;
      numeros = cnpj.substring(0, tamano);
      suma = 0;
      pos = tamano - 7;
      for (let i = tamano; i >= 1; i--) {
        suma += numeros.charAt(tamano - i) * pos--;
        if (pos < 2){
          pos = 9;
        }
      }
      resultado = suma % 11 < 2 ? 0 : 11 - suma % 11;
      if (resultado != digitos.charAt(1)){
        return false;
      }
      this.destino.rutUser = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")
      return true;
    } else if (cnpj.length == 11) {
      let Suma;
      let Resto;
      Suma = 0;
      // Elimina CPFs invalidos conocidos
      if (cnpj == "00000000000" ||
          cnpj == "11111111111" ||
          cnpj == "22222222222" ||
          cnpj == "33333333333" ||
          cnpj == "44444444444" ||
          cnpj == "55555555555" ||
          cnpj == "66666666666" ||
          cnpj == "77777777777" ||
          cnpj == "88888888888" ||
          cnpj == "99999999999") {
            return false;
      }
      for (let i = 1; i <= 9; i++){
        Suma = Suma + parseInt(cnpj.substring(i - 1, i)) * (11 - i);
      }
      Resto = (Suma * 10) % 11;
      if ((Resto == 10) || (Resto == 11)) {
        Resto = 0;
      }
      if (Resto != parseInt(cnpj.substring(9, 10))) {
        return false;
      }
      Suma = 0;
      for (let i = 1; i <= 10; i++){
        Suma = Suma + parseInt(cnpj.substring(i - 1, i)) * (12 - i);
      }
      Resto = (Suma * 10) % 11;
      if ((Resto == 10) || (Resto == 11)) {
        Resto = 0;
      }
      if (Resto != parseInt(cnpj.substring(10, 11))){
         return false;
      }
      this.destino.rutUser = cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
      return true;
    } else{
      return false;
    }
  } 
