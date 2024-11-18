class Clock{
  constructor(hour,minute,second,countryName){
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.countryName = countryName;
  }
  ConverToSeconds(){
    return this.hour*3600+this.minute*60+this.second
  }
  Show(){
    let timeStr=""
    timeStr += (this.hour < 10) ? `0${this.hour}:` : `${this.hour}:`;
    timeStr += (this.minute < 10) ? `0${this.minute}:` : `${this.minute}:`;
    timeStr += (this.second < 10) ? `0${this.second}` : `${this.second}`;
    return timeStr;
  }
}