import 'package:flutter/material.dart';
import 'package:spy/partida.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Jogadores extends StatefulWidget {

  @override
  _JogadoresState createState() => _JogadoresState();
}

class _JogadoresState extends State<Jogadores> {

  List<String> jogadores = [
    'Jogador 1',
    'Jogador 2',
    'Jogador 3',
  ];

  final ScrollController _scrollController = ScrollController();

  void _addJogador() {
    setState(() {
      jogadores.add('Novo Jogador');
    });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    });
  }

  Future<Map<String, dynamic>> setPartida() async {
    return await _criaPartida();
  }

  Future<Map<String, dynamic>> _criaPartida() async {
    String url = 'https://spy-api-game.vercel.app/api/partidas';
    http.Response response;

    response = await http.post(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'jogadores': jogadores,
      }),
    );

    // Decodificar a resposta do corpo
    final Map<String, dynamic> responseBody = jsonDecode(response.body);
    if (responseBody['success'] != false) {
      return responseBody;
    } else {
      throw ('${responseBody['message']}');
    }
  }

  void _apiFailure(String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Erro'),
          content: Text(message),
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


  void _editJogador(int index) {
    TextEditingController _controller = TextEditingController(text: jogadores[index]);
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Editar Jogador'),
          content: TextField(
            controller: _controller,
            decoration: InputDecoration(hintText: "Nome do Jogador"),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Cancelar'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Salvar'),
              onPressed: () {
                setState(() {
                  jogadores[index] = _controller.text;
                });
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
          'Defina os Jogadores',
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
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                itemCount: jogadores.length,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                    height: 50,
                    margin: const EdgeInsets.only(bottom: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(jogadores[index]),
                        Row(
                          children: <Widget>[
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () {
                                _editJogador(index);
                              },
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () {
                                setState(() {
                                  if (jogadores.length > 3) jogadores.removeAt(index);
                                });
                              },
                            ),                 
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                ElevatedButton(
                  onPressed: _addJogador,
                  child: const Text('Adicionar'),
                ),
                ElevatedButton(
                  onPressed: () async {
                    final resultadoPartida = await setPartida().then(
                      (value) => value,
                      onError: (error) {
                        _apiFailure(error.toString());
                        return false;
                      },
                    );
                    if (resultadoPartida != false) {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (BuildContext context) => Partida({
                            'partida': resultadoPartida,
                          }),
                        ),
                      );
                    }
                  },
                  child: const Text('Começar Jogo'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

}
