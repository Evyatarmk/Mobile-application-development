class Counter {
    counter;
    Initialize(number) {
      this.counter = number;
    }
    Increment(){
        this.counter++;
    }
    GO(){
        let str="";
        for (let index = 0; index <= this.counter; index++) {
            str+=index+" ";
        }
        return str;
    }
  }

  