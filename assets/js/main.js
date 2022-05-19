'use strict';

const clearFields = () => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
};

const isNumber = (digito) => /^[0-9]+$/.test(digito); 
const cepValido = (cep) => cep.length == 8 && isNumber(cep);

const fillFields = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro; 
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
};

const searchCep = async() => {
    clearFields();

    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if(cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        
        if(endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'O cep digitado não existe!'; 
        }else {
            fillFields(endereco);
        }
    }else {
        document.getElementById('endereco').value = 'Digite apenas números!';
    }
};
document.getElementById('cep').addEventListener('focusout', searchCep);