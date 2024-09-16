const deleteBtn = document.querySelectorAll('.fa-trash')
const editBtn = document.querySelectorAll('.fa-edit')
const cancelBtn = document.querySelectorAll('.cancel')

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteItem)
})

Array.from(editBtn).forEach((element) => {
    element.addEventListener('click', edit)
})

Array.from(cancelBtn).forEach((element) => {
    element.addEventListener('click', cancel)
})

async function edit() {
    const editTodo = prompt('edit')
    if (editTodo == null || editTodo == "") {
        return 1
    } else {
        const nameTodo = this.parentNode.childNodes[1].innerText
        try {
            const response = await fetch('editTodo', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'editName': editTodo,
                    'todoName': nameTodo

                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()

        } catch (err) {
            console.log(err)
        }
    }
}
async function deleteItem() {
    const delTodo = this.parentNode.childNodes[1].innerText

    try {
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'todoName': delTodo

            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }

}