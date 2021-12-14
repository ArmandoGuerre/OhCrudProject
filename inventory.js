let inventoryListArray = new Array();
const login = ()=> {
  let uNameBox = document.querySelector(".uName");
  let passcodeBox =document.querySelector(".passcode");
  if ((uNameBox.value == "admin") && 
      (passcodeBox.value == "admin")) {
     reveal();
     showLoginSuccess(true);
    }
  else
    showLoginSuccess(false);
}
const reveal = function() {
  let inventoryList = document.querySelector(".floatRightInventory");
  inventoryList.style = "display:inline-block";
  let inventoryEntry = document.querySelector(".inventoryEntry");
  inventoryEntry.style = "display:inline-block";
}
function showLoginSuccess(indicator) {
    let loginMessage = document.querySelector(".loginMessage");
    if (indicator)
        loginMessage.textContent = "Welcome Admin";
    else
        loginMessage.textContent = "Login not recognized";
}
function buildInventoryInstance() {
  let newWorkstationName = 
     document.querySelector(".workstation").value;
  let newUserName = 
     document.querySelector(".user").value;
  let newMac = 
     document.querySelector(".themac").value;//new value placed
  let newIp = 
     document.querySelector(".ipAdd").value;
  let ip = newIp;
  let newInventory = 
        new Inventory(newWorkstationName, 
                    newUserName, 
                    newMac, 
                    ip);
  inventoryListArray.push(newInventory);
  updateInventoryList(newInventory);
  resetFields();
}

function resetFields() {
  document.querySelector(".workstation").textContent="";
  document.querySelector(".user").textContent = "";
  document.querySelector(".themac").textContent="";
  document.querySelector(".ipAdd").textContent="";
}

function updateInventoryListAll(invList) {
  inventoryListArray.forEach((inventory) => {
      let listItem = document.createElement("li");
      let info = `${inventory.wName} ${inventory.userName}, ${inventory.mac} : ${inventory.ipaddress}`;
      listItem.textContent = info;
      invList.append(listItem);
  });
}
const updateInventoryList = (inventory)=> {
  let invList = document.querySelector(".inventoryList");
  let listItem = document.createElement("li");
  listItem.textContent = inventory.info();
  listItem.className = "sos"+inventory.mac;
  invList.append(listItem);
  setModificationsStatus();
};
const getInventoryData = ()=> {
  revealInventoryInfo(true);
  let recordNumberBox = document.querySelector(".recordNumber");
  let recordNumber = recordNumberBox.value;
  recordNumberBox.disabled = true;
  recordNumber = parseInt(recordNumber);
  let inventory = inventoryListArray[recordNumber-1];
  let inventoryData = document.querySelector(".inventoryData");
  let info = inventory.info();
  inventoryData.textContent=info;
  let ipaddressBox = document.querySelector(".newIps");
  ipaddressBox.value = inventory.ipaddress;
};
const setModificationsStatus = function() {
  let modsArea= document.querySelector(".modifications");
  if (inventoryListArray.length > 0)
     modsArea.style = "display:inline-block";
  else
     modsArea.style = "display:none";
};
const revealInventoryInfo = (onOrOff)=> {
  let inventoryInfoArea = document.querySelector(".inventoryInfo");
  if (onOrOff)
    inventoryInfoArea.style = "display: inline-block;";
  else
    inventoryInfoArea.style = "display: none;";
};
const saveInventoryData = function() {
  let recordNumberBox = document.querySelector(".recordNumber");
  let recordNumber = recordNumberBox.value;
  recordNumber = parseInt(recordNumber);
  let inventory = inventoryListArray[recordNumber-1];
  let ipaddressBox = document.querySelector(".newIps");
  inventory.ipaddress = ipaddressBox.value;
  let record = document.querySelector(".sos"+inventory.mac);
  record.textContent = `workstation name: ${inventory.wName} | Assigned User: ${inventory.userName} | WORKSTATION MAC Adress:${inventory.mac} | IP adresss: ${inventory.ipaddress} | `;
  recordNumberBox.disabled = false;
  revealInventoryInfo(false);
  setModificationsStatus();
};
const removeInventory = function() {
  let recordNumberBox = document.querySelector(".recordNumber");
  let recordNumber = recordNumberBox.value;
  recordNumber = parseInt(recordNumber);
  let inventory = inventoryListArray[recordNumber-1];
  inventoryListArray.splice(recordNumber-1, 1);
  let listItem = document.querySelector(".sos"+inventory.mac); 
  let inventoryList = document.querySelector(".inventoryList");
  inventoryList.removeChild(listItem);
  revealInventoryInfo(false);
  setModificationsStatus();
};