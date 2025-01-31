import 'package:flutter/material.dart';

class Partida extends StatefulWidget {
  final Map<String, dynamic> dadosPartida;
  Partida(this.dadosPartida);

  @override
  _PartidaState createState() => _PartidaState();
}

class _PartidaState extends State<Partida> {

  List<dynamic> _jogadores = [];
  Map<String, dynamic> _partida = {};
  
  
  @override
  void initState() {
    super.initState();
    // _jogadores = widget.dadosPartida['partida']['jogadores'].map((jogador) => jogador['nome']).toList();
    _jogadores = widget.dadosPartida['partida']['jogadores'];
    _partida = widget.dadosPartida['partida']['mapa'];
  }

  
  
  void _viewJogador(int index) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        if(_jogadores[index]['profissao'] == "ESPIÃO") {
          return AlertDialog(
            title: Text('Cenário é: DESCUBRA'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                SizedBox(height: 20),
                Text('VOCÊ É O ESPIÃO!'),
              ],
            ),
            actions: <Widget>[
              TextButton(
                child: Text('Ok'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        }
        return AlertDialog(
          title: Text('Cenário é: ' + _partida['nome']),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              SizedBox(height: 20),
              Text('Sua função é: ' + _jogadores[index]['profissao']),
              SizedBox(height: 20),
              Text('Descrição: ' + _partida['descricao']),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Ok'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(
          color: Colors.white,
        ),
        backgroundColor: const Color.fromARGB(255, 61, 0, 88),
        title: const Text(
          'Partida',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          children: <Widget>[
            Expanded(
              child: ListView.builder(
                itemCount: _jogadores.length, // Quantidade de itens na lista.
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                    height: 50,
                    margin: const EdgeInsets.only(bottom: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(_jogadores[index]['nome']),                   
                        IconButton(
                          icon: const Icon(Icons.visibility_off_rounded),
                          onPressed: () {
                            _viewJogador(index);
                          },
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
              }, 
              child: const Text('Finalizar'),
            ),
          ],
        ),
      ),
    );
  }
}
