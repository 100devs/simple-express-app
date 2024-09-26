const update = document.querySelector('#update-button')
const remove = document.querySelector('#delete-button')
const message = document.querySelector('#message')

update.addEventListener('click', _ =>{
    fetch('/activities', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data[Math.floor(Math.random()*4)])
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

remove.addEventListener('click', _ => {
    fetch('/activities', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Evil Cat'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No more activity - the evil cat is gone!'){
            message.textContent = 'No more activity - the evil cat is gone!'
        } else {
            window.location.reload(true)
        }
    })
})

data = [
    {
        name: 'Evil Cat',
        activity: 'bashing pug faces'
    },
    {
        name: 'Evil Cat',
        activity: 'sleeping in pug beds'
    },
    {
        name: 'Evil Cat',
        activity: 'eating pug food'
    },
    {
        name: 'Evil Cat',
        activity: 'stealing attention from pugs'
    }
]