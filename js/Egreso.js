  class Egreso extends Dato {
    static contadorEgresos = 0;
  
    constructor(descripcion, valor) {
      super(descripcion, valor);
      Egreso.contadorEgresos++;
      this._id = Egreso.contadorEgresos;
    }
  
    get id() {
      return this._id;
    }
  }
 
  