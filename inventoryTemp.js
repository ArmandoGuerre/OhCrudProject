class Inventory {
   constructor(wName, userName, mac, ipaddress) {
     this.wName = wName;
     this.userName = userName;
     this.mac = mac
     this.ipaddress = ipaddress;
   }
  
   info() {
      let ip = this.ipaddress
      return `HOSTNAME: ${this.wName} |     ASSIGNED USER: ${this.userName} |     WORKSTATION MAC Adress:${this.mac} |     IP ADDRESS: ${ip} | `;
   }
 }
 