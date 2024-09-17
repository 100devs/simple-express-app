const deleteText = document.querySelectorAll('#delete-button')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCat)
})

async function deleteCat(){
    const sName = this.parentNode.childNodes[1].innerText
    const cName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteSongs', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'catName': cName,
              'songName': sName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
