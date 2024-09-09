import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any)  {
    let msg: string;

    if(errorResponse.status >= 400 && errorResponse.status <= 499) {
      if(typeof errorResponse.json()[0].userMessage === 'string'){
        msg = errorResponse.json()[0].userMessage;
      }else{
        msg = 'Erro ao processar serviço remoto. Tente novamente.';
        console.log("Ocorreu um erro", errorResponse)
      }
    }else{
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log("Ocorreu um erro", errorResponse)
    }

    this.toasty.error(msg);
  }

}

