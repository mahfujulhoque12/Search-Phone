

const loadData= async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const  res=await fetch(url);
    const data=await res.json();
    dispalyPhones(data.data,dataLimit)
}


const dispalyPhones=(phones,dataLimit)=>{
 const phoneContainer=document.getElementById("phone-container");
 phoneContainer.textContent=''

 //display 10 phone
 const ShowAll=document.getElementById("show-all");
 if(dataLimit && phones.length > 10){
    phones=phones.slice(0,10)
    ShowAll.classList.remove("d-none")
 }
 else{
    ShowAll.classList.add("d-none")
 }


 //display no phone found
 const noPhone=document.getElementById("no-phone-found");
 if(phones.length===0){
    noPhone.classList.remove("d-none")
 }
 else{
    noPhone.classList.add('d-none')
 }

 //display all phone
    phones.forEach(phone=>{
       const phoneDiv=document.createElement('div');
       phoneDiv.classList.add('col')
       phoneDiv.innerHTML=`
       <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
       `;
       phoneContainer.appendChild(phoneDiv)
    })

    // stop loader
    toggleSpeaner(false)
}

const processSearch=(dataLimit)=>{
    toggleSpeaner(true)
    const searchField=document.getElementById("btn-field");
    const searchText=searchField.value;
    loadData(searchText,dataLimit)
    searchField.value='';
}

document.getElementById("btn-search").addEventListener('click',function(){
    // start loader
    processSearch(10);
  

})

// search input fiele event key handler
document.getElementById('btn-field').addEventListener('keydown',function(e){
   if(e.key==='Enter'){
    processSearch(10);
   }
})


const toggleSpeaner=(isLoading)=>{
    const loader=document.getElementById("loader");
    if(isLoading){
        loader.classList.remove('d-none')
    }else{
        loader.classList.add('d-none')
    }
}


document.getElementById("btn-show-all").addEventListener('click',function(){
    processSearch();
})


const loadPhoneDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`
    const res=await fetch(url);
    const data=await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails=(phone)=>{
    console.log(phone)
    const modalTitle=document.getElementById("phoneDetailsModalLabel");
    modalTitle.innerText=phone.name
    const phoneDetails=document.getElementById("phone-details");
    phoneDetails.innerHTML=`
    <p>Relase Data: ${phone.releaseDate?phone.releaseDate:"no relase date found"}</p>
    <p>Bluetooth: ${phone.others?phone.others.Bluetooth:"not found"}</p>
    `
}

 loadData('apple')