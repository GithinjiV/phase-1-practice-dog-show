document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/dogs'
    const tableBody = document.querySelector('tbody#table-body')
    const dogForm = document.querySelector('form#dog-form')
    document.addEventListener('click', handleEvents)

    fetch(URL)
        .then(res=> res.json())
        .then(dogs => listDogs(dogs))
    
    function listDogs(dogs){
        dogs.forEach(dog=>{
            tableBody.innerHTML += `<tr>
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button id="edit-btn" data-id= ${dog.id} >Edit</button></td>
            </tr>`
        })
    }

    function handleEvents(e){
        if(e.target.id == 'edit-btn'){
            editDog(e.target.dataset.id)
        }else if(e.target.parentElement.id == 'dog-form'){
            editedDog(e)
        }
    }

    function editDog(id){
        fetch(`${URL}/${id}`)
            .then(res=> res.json())
            .then(dog=>{
                dogForm.name.value = dog.name
                dogForm.breed.value = dog.breed
                dogForm.sex.value = dog.sex
                dogForm.dataset.id = dog.id
            })
    }

    function editedDog(e){
        let dog ={
            name: e.target.parentElement.name.value,
            breed: e.target.parentElement.breed.value,
            sex: e.target.parentElement.sex.value
        }
        fetch(`${URL}/${e.target.parentElement.dataset.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json',
                accepts:'application/json'
            },
            body: JSON.stringify(dog)
        })
        .then(res=> res.json())
        .then(dog=>{
            let gotDog = document.querySelector(`tr[data-id = ${dog.id}]`)
            gotDog.children[0].innerText = dog.name
            gotDog.children[1].innerText = dog.breed
            gotDog.children[2].innerText = dog.sex
        })
    }
})