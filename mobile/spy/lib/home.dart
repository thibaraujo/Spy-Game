import 'package:flutter/material.dart';
import 'package:spy/jogadores.dart';
import 'package:spy/regras.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(
          color: Colors.white,
        ),
        backgroundColor: const Color.fromARGB(255, 61, 0, 88),
        title: const Text(
          'Spy BR',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: Container(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(32),
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(bottom: 32),
                child: Image.asset(
                  'images/logo-home.png',
                  fit: BoxFit.cover,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  // botoes de comecar jogo e regras do jogo
                  SizedBox(
                    width: 150,
                    height: 50,
                    child: TextButton(
                      onPressed: (){
                        // ir para tela de jogadores
                        Navigator.push(
                          context, 
                          MaterialPageRoute(
                            builder: (BuildContext context) => Jogadores()
                          ),
                        );
                      }, 
                      style: ButtonStyle(
                          backgroundColor: WidgetStateProperty.all<Color>(const Color.fromARGB(255, 61, 0, 88)),
                          foregroundColor: WidgetStateProperty.all<Color>(Colors.white),
                          shape: WidgetStateProperty.all<RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(13.0),
                                  side: BorderSide(color: const Color.fromARGB(255, 61, 0, 88))
                              )
                          ),
                      ),
                      // botão com background
                      child: Text(
                          "Jogar",
                          style: TextStyle(
                              fontSize: 20,
                              color: const Color.fromARGB(255, 255, 255, 255),
                              fontWeight: FontWeight.bold,
                          ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 150,
                    height: 50,
                    child: TextButton(
                      onPressed: (){
                         Navigator.push(
                          context, 
                          MaterialPageRoute(
                            builder: (BuildContext context) => Regras()
                          ),
                        );
                      }, 
                      style: ButtonStyle(
                          backgroundColor: WidgetStateProperty.all<Color>(const Color.fromARGB(255, 61, 0, 88)),
                          foregroundColor: WidgetStateProperty.all<Color>(Colors.white),
                          shape: WidgetStateProperty.all<RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(13.0),
                                  side: BorderSide(color: const Color.fromARGB(255, 61, 0, 88))
                              )
                          ),
                      ),
                      // botão com background
                      child: Text(
                          "Regras",
                          style: TextStyle(
                              fontSize: 20,
                              color: const Color.fromARGB(255, 255, 255, 255),
                              fontWeight: FontWeight.bold,
                          ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        )
      )
    );
  }
}
