import 'package:flutter/material.dart';

class Regras extends StatefulWidget {

  @override
  _RegrasState createState() => _RegrasState();
}

class _RegrasState extends State<Regras> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(
          color: Colors.white,
        ),
        backgroundColor: const Color.fromARGB(255, 61, 0, 88),
        title: const Text(
          'Regras do game',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: Container(
        padding: const EdgeInsets.all(32),
        child: Column(
          children: [
            Text(
              'O jogo envolve 3 ou mais jogadores, com 1 deles sendo o espião e os demais atuando como profissionais em um ambiente sorteado. '
              'O objetivo dos profissionais é identificar quem é o espião, enquanto o espião deve descobrir onde está sem ser descoberto.\n\n'
              'A dinâmica ocorre em ciclos: cada jogador faz 1 pergunta para outro jogador à sua escolha, tentando coletar pistas. '
              'O espião deve ser estratégico para descobrir o ambiente sem revelar sua identidade.\n\n'
              'A partida começa com todos os jogadores identificando apenas sua própria função no jogo. '
              'Para isso, cada jogador deve clicar no ícone 👁 ao lado do seu nome.\n\n'
              'Se o espião tentar adivinhar o ambiente e errar, ele perde. Para acusar um espião, a maioria dos jogadores deve concordar. '
              'O jogo termina quando o espião é identificado ou consegue adivinhar corretamente o ambiente.',
              style: TextStyle(
                fontSize: 16,
                height: 1.5, // Define o espaçamento entre linhas
              ),
              textAlign: TextAlign.justify, // Justifica o texto para melhor apresentação
            ),
          ],
        ),
      ),
    );
  }

}
