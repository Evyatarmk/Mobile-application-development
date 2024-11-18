class Duck{
  constructor(name,color,age,weight,image){
    this.name = name;
    this.color = color;
    this.age = age;
    this.weight = weight;
    this.image = image;
  }
  Show(){
    return `
    <div>
    <p>
     name:${this.name}, color:${this.color}, age:${this.age}, weight:${this.weight}
    </p>
    <img src="${this.image}">
  </div>
     `
  }
  Quack(){
    let str="";
    for (let index = 0; index < (this.age*this.weight)/2; index++) {
      str+="Quack"
    }
    const audio = new Audio("duck-quacking-37392.mp3");
    let playCount = 0;

  audio.addEventListener("ended", () => {
    playCount++;
    if (playCount < 3) {
      audio.play(); 
    }
  });

  audio.play(); 

    return str;
  }
}