/**
 * Cria o objeto "Desenhavel" que será a classe base para todos os objetos desenháveis do jogo
 * Define as variáveis padrão
 * Todos os objetos filhos herdarão, assim como as funções padrão.
 */
function Desenhavel() {
    this.velocidade = 0;
    this.larguraCanvas = 0;
    this.alturaCanvas = 0;

    // Define uma função abstrata para ser sobrescrita nos objetos filhos
    this.desenhar = function(){
    };
    
    this.inciar = function(x,y){
        //Variáveis padrão do eixo cartesiano
        this.x = x;
        this.y = y;
    }
}
/**
 * Define um objeto para manter todas as nossas imagens do jogo para
 * evitar que elas sejam criadas mais de uma vez.
 */

var repositorio = new function(){
    this.planofundo = new Image();

    // configura os caminhos (src) das imagens 
    this.planofundo.src = "imgs/pf.png";
}

/**
 * Cria o objeto PlanoFundo que se tornará um filho do
 * objeto Desenhavel. O plano de fundo será desenhado nesse objeto
 * e criará a ilusão de movimento ao deslocar a imagem.
 */

function PlanoFundo() {
    this.velocidade = 1; // Redefine a velocidade do plano de fundo para pintura
    
    // Implementa a função abstrata
    this.desenhar = function() {
        // pinta o plano de fundo
        this.x -= this.velocidade;
        this.context.drawImage(repositorio.planofundo, this.x, this.y);

        // desenha outra imagem na borda superior da primeira imagem
        this.context.drawImage(repositorio.planofundo, this.x + this.larguraCanvas, this.y);

        // Caso a imagem for deslocada para fora da tela , redefine
        if (Math.abs(this.x)>= this.larguraCanvas)
            this.x = 0;
    }; 
}
// Define o PlanoFundo como herdeiro das propriedades de Desenhavel
PlanoFundo.prototype = new Desenhavel();

/**
 * Cria um objeto mais genérico que se encarregará de lidar com os dados do jogo.
 */
function Jogo() {
    this.iniciar = function () {
        //Recupera o elemento Canvas
        this.pfCanvas = document.getElementById('planoDeFundo');
        var retorno = false;

        // verifica se há suporte para o canvas
        if (this.pfCanvas.getContext) {
            // inicializa o objeto de plano de PlanoFundo
            this.planofundo = new PlanoFundo();
            this.planofundo.inciar(0,0); // Inicia no ponto 0,0

            this.pfContext = this.pfCanvas.getContext('2d');

            //Iniciliza os objetos configurando as propiedades em questão
        }
    }
}