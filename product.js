 let title = document.getElementById('title')
 let price = document.getElementById('price')
 let taxes = document.getElementById('taxes')
 let ads = document.getElementById('ads')
 let discount = document.getElementById('discount')
 let total = document.getElementById('total')
 let count = document.getElementById('count')
 let category = document.getElementById('category')
 let submit = document.getElementById('submit')

let mood = 'create'
let tmp ;


// get total

function getTotal () {

if(price.value !='') {
    let result = ( +price.value + +taxes.value + +ads.value)
     - +discount.value
     total.innerHTML = result ;
     total.style.background = '#040'
}
else{
    total.innerHTML = '' ;
    total.style.background = '#a00d07' 
}

}


// create product
let dataPro ;
if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)

}
else{
    dataPro = [] ;
}

 submit.onclick = function () {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount: discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    
    // count
    if (title.value != '' && price.value != ''
     && category.value !='' && newPro.count < 100 ) {

        if (mood === 'create'){
    
            if(newPro.count > 1){
                for(let i = 0 ; i < newPro.count ; i++){
                    dataPro.push(newPro)
                }
                
            }else{
                dataPro.push(newPro)
            }
        }else{
             dataPro[ tmp  ] = newPro ;
             mood = 'create' ; 
             submit.innerHTML = 'Create' ;
             count.style.display = 'block' ;
        }
        clearData()
    }
    localStorage.setItem('product' , JSON.stringify(dataPro))

    // console.log(dataPro)

    showData()
 }

//   localstorage





// clear inputs
function clearData() {
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;
}


// raed
function showData() {
     getTotal()
    let table = '' ;
    for (let i = 0 ; i < dataPro.length ; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
        
    </tr>`
         
       
    }

    document.getElementById('tbody').innerHTML= table ;

   let btnDelete = document.getElementById('deleteAll') ;     
    if(dataPro.length > 0){
        btnDelete.innerHTML =`
         
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>

        `
    }else{
        btnDelete.innerHTML = '' ;
    }
}
showData()


// delete
 
function deleteData (i) {
    dataPro.splice(i , 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll () {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
 


// update
function updateData(i) {
    title.value = dataPro[i].title ;
    price.value = dataPro[i].price ;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads ;
    discount.value = dataPro[i]. discount ;
    getTotal()
    count.style.display='none'
    category.value = dataPro[i].category ;
    submit.innerHTML = 'Updata'
    mood = 'updata'
    count.style.display = 'block'
    tmp = i ;

    scroll({
        top:0,
        behavior:'smooth' ,
    })

}

// search

let searchMood = 'title' ;

function getSearchMood (id) {
 let search = document.getElementById('search') ;
    if(id == 'searchTitle'){
        searchMood = 'title'
    }else{
        searchMood ='category' 
        search.placeholder = 'Search By Category'
    }
    search.placeholder = 'Search By ' + searchMood ;
    search.focus()
    // console.log(searchMood)
    search.value = '' ;
    showData() ;

    }

  let table = '' ;
    function sreachData(value) {
        if(searchMood == 'title') {

          for (let i = 0 ; i < dataPro.length ; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                
            </tr>`
            }

          }

        }else{

            for (let i = 0 ; i < dataPro.length ; i++) {
                if (dataPro[i].category.includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                    
                </tr>`
                }
    
              }

        }
        document.getElementById('tbody').innerHTML= table ;

    }


// clean data




//  let title = document.getElementById('title')
//  let price = document.getElementById('price')
//  let taxes = document.getElementById('taxes')
//  let ads = document.getElementById('ads')
//  let discount = document.getElementById('discount')
//  let total = document.getElementById('total')
//  let count = document.getElementById('count')
//  let category = document.getElementById('category')
//  let submit = document.getElementById('submit')

//  let mood = "create"
//  let tmp;


//  function getTotal() {
//     if(price.value !=""){
//         let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;

//         total.innerHTML= result;
//         total.style.background="#040" ;

//     }
//     else{
//         total.innerHTML="";
//         total.style.background="#a00d07" ;
//     }
//  }


//  if(localStorage.product !=null){
//     dataPro = JSON.parse(localStorage.product)
//  }else{

//      let dataPro = [] ;
//  }


//  submit.onclick = function (){
//     let newPro ={
//         title:title.value,
//         price:price.value,
//         taxes:taxes.value,
//         ads:ads.value,
//         discount:discount.value,
//         total:total.innerHTML,
//         count:count.value,
//         category:category.value
//     }

//     if(title.value !='' && price.value !='' && taxes.value !='' &&ads.value !='' && newPro.count < 100){

//         if(mood == create){
//             if(newPro.count > 1){
//                 for(let i = 0 ; i < newPro.count ; i++){
//                     dataPro.push(newPro);
//                 }
//             }
//             else{
//                 dataPro.push(newPro);
//             }
        
//         }
//     }
//     clearData()

// else{
//     dataPro[ tmp ] =newPro

//     mood ="create"
//     count.style.display="block"
//     submit.innerHTML="Create"


// }

//     localStorage.setItem("product" ,JSON.stringify(dataPro))

//     // console.log(newPro)
//     clearData()
//     showData ()
//  }


//  function clearData() {
//     title.value="";
//     price.value="";
//     taxes.value="";
//     ads.value="";
//     discount.value="";
//     total.innerHTML="";
//     count.value="";
//    category.value="";
//  }





//   function showData() { 
//     getTotal()
//         let table = '' ;
//         for (let i = 0 ; i < dataPro.length ; i++) {
//             table += `
//             <tr>
//             <td>${i+1}</td>
//             <td>${dataPro[i].title}</td>
//             <td>${dataPro[i].price}</td>
//             <td>${dataPro[i].taxes}</td>
//             <td>${dataPro[i].ads}</td>
//             <td>${dataPro[i].total}</td>
//             <td>${dataPro[i].discount}</td>
//             <td>${dataPro[i].category}</td>
//             <td><button onclick="updateData(${i})">update</button></td>
//             <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
            
//         </tr>`
             
           
//         }
    
//         document.getElementById('tbody').innerHTML= table ;
    
//        let btnDelete = document.getElementById('deleteAll') ;     
//         if(dataPro.length > 0){
//             btnDelete.innerHTML =`
             
//             <button onclick="deleteAll()">delete All (${dataPro.length})</button>
    
//             `
//         }else{
//             btnDelete.innerHTML = '' ;
//         }
//     }
//     showData()



//     function deleteData(i) {
//         localStorage.product= JSON.stringify(dataPro),
//         dataPro.splice(i , 1)
//         showData()
//     }

//     function deleteAll(){
//         localStorage.clear()
//         dataPro.splice(0)
//         showData()
//     }


//     function updateData (i) {
//         title.value =dataPro[i].title;
//         price.value =dataPro[i].price;
//         taxes.value =dataPro[i].taxes;
//         ads.value =dataPro[i].ads;
//         discount.value =dataPro[i].discount;
//          getTotal()
//          mood ="update"
//          count.style.display="none" ;
//          tmp = i ;
//          submit.innerHTML="update"
//         category.value =dataPro[i].category;

//         scroll({
//             top:"0",
//             behavior:'smooth' , 

//         })


//     }

     
//     let searchMood = "title"

//     function searchMood(id){
//         let search =document.getElementById('search')
//         if(searchMood == "title"){
//             searchMood = "title";
//             search.placeholder ="search by title"


//         }
//         else{
//             searchMood = "Category" ;
//             search.placeholder ="search by Category"
//         }
//         search.focus()
//         search.value ='';
//         showData()

//     }



//     function sreachData(value){
//         let table =''
//         if(searchMood == "title"){
//             for(let i = 0 ; i < dataPro.length ; i++){
//                 if(dataPro[i].title.includes(value)){
//                     table += `
//                     <tr>
//                     <td>${i+1}</td>
//                     <td>${dataPro[i].title}</td>
//                     <td>${dataPro[i].price}</td>
//                     <td>${dataPro[i].taxes}</td>
//                     <td>${dataPro[i].ads}</td>
//                     <td>${dataPro[i].total}</td>
//                     <td>${dataPro[i].discount}</td>
//                     <td>${dataPro[i].category}</td>
//                     <td><button onclick="updateData(${i})">update</button></td>
//                     <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                    
//                 </tr>`

//                 }
//             }

//         }else{
//             for(let i = 0 ; i < dataPro.length ; i++){
//                 if(dataPro[i].category.includes(value)){
//                     table += `
//                     <tr>
//                     <td>${i+1}</td>
//                     <td>${dataPro[i].title}</td>
//                     <td>${dataPro[i].price}</td>
//                     <td>${dataPro[i].taxes}</td>
//                     <td>${dataPro[i].ads}</td>
//                     <td>${dataPro[i].total}</td>
//                     <td>${dataPro[i].discount}</td>
//                     <td>${dataPro[i].category}</td>
//                     <td><button onclick="updateData(${i})">update</button></td>
//                     <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                    
//                 </tr>`

//                 }
//             }   

//         }
//         document.getElementById('tbody').innerHTML= table ;
//     }
