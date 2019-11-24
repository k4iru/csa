async function getSeat(){
    let fragment = new DocumentFragment();
    let node = document.getElementById('seat');
    while(node.lastChild) {
        node.removeChild(node.lastChild);
    }

    let searchName = document.getElementById('input_name').value.split(" ");
    try {
        let response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                first: searchName[0],
                last: searchName[1]
            })
        });

        const result = await response.json();
        let element = []
        for (let i = 0; i < 3; i++) {
            let el = document.createElement('p');
            el.className = 'seat-text';
            element.push(el);

        }
        element[0].innerText = `${searchName[0]} is seated on`;
        element[1].innerText = `Floor ${result.location.floor}`;
        element[2].innerText = `Seat ${result.location.seat}`;

        for (const el of element) { fragment.appendChild(el) };
        node.appendChild(fragment);
        console.log(response.status);
    } catch(e) {
        return e;
    }
}
