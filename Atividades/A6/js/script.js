const masks = {
    cep(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    }
}

document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js

    $input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value)
    }, false)
})


function findCEP(cep) {
    return fetch(`https://viacep.com.br/ws/${cep}/json/`); 
}

const form = document.querySelector('#cep-form');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})

async function doSubmit() {
    const result_el = document.querySelector('#result');
    const cep = document.querySelector('#cep');

    try {
        const cepResponse = await findCEP(cep.value);
        const data = await cepResponse.json();

        const resultResponse = await fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${data.uf}`)
        const dataResponse = await resultResponse.json();

        if (dataResponse.uf) 
            result_el.innerHTML = "ESTADO : [" + dataResponse.uf + "]  <br> CASOS DE COVID : " + dataResponse.cases;

        else 
            result_el.innerHTML = dataResponse.error;

    } catch (err) {
        console.log(err);
    }
}