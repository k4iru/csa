async function getSeat(){

    // create a fragment to append and remove, safer than direct dom manipularion
    let fragment = new DocumentFragment();
    let node = document.getElementById('seat');
    let searchName = document.getElementById('input_name').value.split(" ");

    // remove old results
    while(node.lastChild) {
        node.removeChild(node.lastChild);
    }

    try {

        if (searchName.length !== 2) {
            fragment = seatNotFound(searchName.join(" "));
        }

        else {

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

            if (response.status === 200) {
                const {location} = await response.json();
                fragment = seatFound(searchName[0], location.floor, location.seat);
            }

            else {
                fragment = seatNotFound(searchName.join(" "));
            }
        }
    } catch(e) {
        return e;
    }

    finally {
        node.appendChild(fragment);
    }
}

function seatNotFound(name) {
    let fragment = new DocumentFragment();
    let error_el = document.createElement('p');
    let name_el = document.createElement('p');

    error_el.className = 'seat-text seat-text-fail';
    name_el.className = 'seat-text seat-text-fail';

    error_el.innerText = `Sorry, cannot find`;
    name_el.innerText = `${name} in the system`;

    fragment.appendChild(error_el);
    fragment.appendChild(name_el);

    return fragment;
}

function seatFound(name, floor, seat){
    let fragment = new DocumentFragment();
    let element = []

    for (let i = 0; i < 3; i++) {
        let el = document.createElement('p');
        el.className = 'seat-text seat-text-success';
        element.push(el);

    }
    element[0].innerText = `${name} is seated on`;
    element[1].innerText = `Floor ${floor}`;
    element[2].innerText = `Seat ${seat}`;

    for (const el of element) { fragment.appendChild(el) };

    return fragment;
}
