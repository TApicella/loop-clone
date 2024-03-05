// /**
//  * Makes an element draggable and sets up event handlers
// */
// function dragElement(elmnt) {
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//     if (document.getElementById(elmnt.id + "header")) {
//         // if present, the header is where you move the DIV from:
//         document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//     } else {
//         // otherwise, move the DIV from anywhere inside the DIV:
//         elmnt.onmousedown = dragMouseDown;
//     }

//     function dragMouseDown(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // get the mouse cursor position at startup:
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         document.onmouseup = closeDragElement;
//         // call a function whenever the cursor moves:
//         document.onmousemove = elementDrag;
//     }

//     function elementDrag(e) {

//         let currentSelected = document.getElementsByClassName("item-selected") && document.getElementsByClassName("item-selected").length > 0 && document.getElementsByClassName("item-selected")[0];

//         if (currentSelected) {
//             currentSelected.classList.remove("item-selected")
//         }

//         e = e || window.event;

//         window.game.selectedId = elmnt.id;
//         document.getElementById(elmnt.id).classList.add("item-selected");
//         e.preventDefault();

//         // calculate the new cursor position:
//         pos1 = pos3 - e.clientX;
//         pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         // set the element's new position:

//         elmnt.classList.add("item-selected")
//         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement(e) {
//         // stop moving when mouse button is released:
//         document.onmouseup = null;
//         document.onmousemove = null;
//     }
// }



// const itemRef = {
//     "fruit": {
//         src: "fruit.png",
//         countable: true,
//         count: 0,
//         itemtype: "fruit"
//     }
// }

// function createItem(attrs, inventory = false) {
//     const newItem = document.createElement("img");
//     for (let attr of Object.keys(attrs)) {
//         newItem.setAttribute(attr, attrs[attr]);
//     }
//     newItem.onclick = function (e) {
//         let elem = document.getElementById(e.target.id);

//         if (elem && elem.classList.contains("moveable")) {
//             let currentSelected = document.getElementsByClassName("item-selected");

//             window.game.selectedId = null;;

//             if (currentSelected && currentSelected.length && currentSelected.length > 0) {
//                 let hasTarget = false;
//                 Array.from(currentSelected).forEach((toRemove) => {
//                     toRemove.classList.remove("item-selected")
//                     if (toRemove.id === elem.id) {
//                         hasTarget = true;
//                     }
//                 })
//                 if (!hasTarget) {
//                     elem.classList.add('item-selected');
//                     window.game.selectedId = elem.id;

//                 }
//             }
//             else {
//                 elem.classList.add('item-selected');
//                 window.game.selectedId = elem.id;

//             }
//         }
//     };

//     if (!inventory) {
//         newItem.classList.add("moveable")
//     }

//     newItem.onmouseup = function (e) {
//         if (e.target && e.target.id && document.getElementById(e.target.id)) {
//             for (let elem of document.elementsFromPoint(e.clientX, e.clientY)) {
//                 if (elem.getAttribute("customdrop")) {
//                     e.explicitOriginalTarget = { ...e.target, id: newItem.id }
//                     elem.dispatchEvent(
//                         new CustomEvent(elem.getAttribute("customdrop"), e),
//                     );
//                 }
//             }
//         }
//     }

//     return newItem
// }

// function createInventory(slots, items) {
//     if (!slots) {
//         slots = 10;
//     }
//     if (!items) {
//         items = {};
//     }
//     if (!window.game) {
//         window.game = {};
//     }
//     window.game.inventory = window.game.inventory || {
//         items, slots
//     }

//     window.game.drawInventory = function () {
//         let { items, slots } = window.game.inventory;
//         const newInventory = document.createElement('div');
//         newInventory.id = "inventory";

//         let counter = 0;

//         for (let iname of Object.keys(items)) {
//             let item = items[iname];
//             let { countable, count } = item;
//             let elem = document.createElement("div")
//             elem.style = "position: relative; width: 100px; height: 100px; border: 3px solid #AAAAAA; margin: 6px";
//             let img = createItem(item);
//             img.style = "position: relative; width: 100%;"
//             elem.appendChild(img);
//             if (countable) {
//                 let num = document.createElement("div");
//                 num.innerHTML = "" + count;
//                 num.style = "color: red; position: absolute; font-size: 32px; font-family: sans-serif; left: 75px; top: 65px; z-index: 5";
//                 elem.appendChild(num);
//             }

//             newInventory.appendChild(elem);
//             counter++;
//         }
//         while (counter < slots) {
//             let elem = document.createElement("div")
//             elem.style = "position: relative; width: 100px; height: 100px; border: 3px solid #AAAAAA; margin: 6px";
//             newInventory.appendChild(elem);
//             counter++;
//         }

//         document.getElementById("inventory").replaceWith(newInventory)
//     }

//     document.getElementById("inventoryWrapper").onclick = function (e) {
//         if (!window.game || !window.game.selectedId) {
//             return
//         }
//         let elem = document.getElementById(window.game.selectedId);
//         if (elem && elem.getAttribute("itemtype")) {
 
//             document.dispatchEvent(
//                 new CustomEvent("addInventory", {detail: {explicitOriginalTarget: {id: elem.id}}}
//                 ));
//         }
//     }

//     window.game.drawInventory(window.game.inventory.items)

// }
// document.addEventListener("addInventory", (e) => {
//     let itemTargetId = e.explicitOriginalTarget.id;
//     if(e.detail && e.detail.explicitOriginalTarget){
//         itemTargetId = e.detail.explicitOriginalTarget.id
//     }
//     let itemTarget = document.getElementById(itemTargetId);
//     const itemType = itemTarget.getAttribute("itemtype");
//     if (window.game.inventory.items[itemType]) {
//         window.game.inventory.items[itemType].count++;
//     }
//     else {
//         window.game.inventory.items[itemType] = { ...itemRef[itemType] }
//         window.game.inventory.items[itemType].count = 1;
//     }

//     itemTarget.remove();
//     window.game.drawInventory();
// });

