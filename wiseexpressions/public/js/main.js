const deleteButtons = document.querySelectorAll('.fa-trash');
const likeButtons = document.querySelectorAll('.fa-heart');

Array.from(deleteButtons).forEach((element) => {
    element.addEventListener('click', deleteExpression);
});

Array.from(likeButtons).forEach((element) => {
    element.addEventListener('click', addLike);
});

function validateRequiredFields() {
    const requiredInputs = document.querySelectorAll('.required');
    for (const input of requiredInputs) {
        if (input.value.trim() === "") { //!input.value.trim() will also work here
            alert(`${input.placeholder} is required.`);
            return false;
        }
    }
    return true;
}

const form = document.querySelector('#formSubmit');
    form.addEventListener('submit', function(event) {
        if (!validateRequiredFields()) {
            event.preventDefault();
        }
    });

async function deleteExpression() {
    const expressionId = getExpressionId(this);
    try {
        const response = await fetch(`/deleteExpression/${expressionId}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

async function addLike() {
    const expressionId = getExpressionId(this);
    try {
        const response = await fetch(`/addOneLike/${expressionId}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

function getExpressionId(element) {
    // Assuming your expression ID is stored in a data attribute like data-expression-id
    return element.closest('.greatExpression').dataset.expressionId;
}
