
console.log ('the client side javascript file is uploaded')

const form = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('.msgOne')
const msgTwo = document.querySelector('.msgTwo')

form.addEventListener('submit',(e) =>{
        e.preventDefault()

        const location = search.value

        msgOne.textContent = 'Loading...'
        msgTwo.textContent = ''

        fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
                response.json().then((data)=> {
               if (data.error){
                       msgOne.textContent=data.error
               } else{
                       msgOne.textContent = data.location
                       msgTwo.textContent = data.forecast
                    }
                })
        })
})