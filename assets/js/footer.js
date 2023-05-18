// Função para carregar o conteúdo do rodapé
function loadFooter() {
    // Cria um objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Define o método HTTP como GET e o URL do arquivo footer.html
    xhr.open('GET', '/footer.html', true);

    // Define a função de callback para quando a requisição estiver concluída
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Insere o conteúdo do rodapé no elemento com o ID 'footer-placeholder'
            document.getElementById('footer-placeholder').innerHTML =
                xhr.responseText;
        }
    };

    // Envia a requisição
    xhr.send();
}

// Chama a função loadFooter quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', loadFooter);
