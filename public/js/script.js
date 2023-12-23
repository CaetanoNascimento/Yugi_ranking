

function ranking() {
  location.assign('/ranking');
}
function ranking_semanal() {
  location.assign('/semanal/rank');
}


function ranking_pessoal() {
  location.assign('/ranking/particular')
}
function register_genius() {
  location.assign('/register')
}
function start_genius() {
  location.assign('/start')
}

function load_semanal() {

  fetch('http://localhost:8000/player/buscar/' + localStorage.getItem('semestral'), {
    method: 'GET',
    headers: { "content-type": "application/json" }
  }).then(result => {
    return result.json();
  }).then(data => {

    for (let i = 0; i < data.tipos.length; i++) {

      let cardapio = document.createElement('div')
      cardapio.classList.add('div-cadastrado')
      cardapio.classList.add('bounceIn')

      // cardapio.setAttribute("onclick", "(" + data.tipos[i]. + ")");
      cardapio.setAttribute("id", "player" + data.tipos[i].player);

      cardapio.innerHTML = `<div class="span-cadastrado" >
    <span class="nome-cadastrado"  >Player: ${data.tipos[i].player}</span>
    <span>Deck: ${data.tipos[i].deck} </span>
    <span>Cidade: ${data.tipos[i].cidade}</span>
    </div>
    <div class="btn-cadastrado">
    <div class="switch_box box_4">
    <div class="input_wrapper">
        <input type="checkbox" class="switch_4" value="${data.tipos[i].id_player}">
        <svg class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
      <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
    </svg>
        <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
      <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
    </svg>
      </div>
</div>
    </div>`

      document.getElementById("main-start").appendChild(cardapio)
    }
    let button = document.createElement('button')
    button.addEventListener("click", function () {
      iniciar_semanal(data.tipos.length)
    });
    button.innerHTML = `Iniciar Semanal `
    document.getElementById("main-start").appendChild(button)


  })


}

function iniciar_semanal(playes) {

  if (confirm("Iniciar Semanal?")) {

    const e = new Date();
    let text = e.toLocaleString();
    let semanal = {}


    semanal.semanal_data = text
    semanal.id_semestral = localStorage.getItem('semestral')
    semanal.status_semanal = 1

    fetch('http://localhost:8000/semanal', {
      method: 'POST',
      headers:
        { "content-type": "application/json" },
      body: JSON.stringify(semanal)

    }).then(result => {
      return result.json();
    }).then(data => {
      let id_semanal = data.usuarioCriado.id

      localStorage.setItem('id_semanal', id_semanal)

      const d = new Date();
      let text = d.toLocaleString();
      let rodada = {
        id_semanal: id_semanal,
        inicio_partida: text
      }

      fetch('http://localhost:8000/matchs/rodada', {
        method: 'POST',
        headers:
          { "content-type": "application/json" },
        body: JSON.stringify(rodada)

      }).then(result => {
        return result.json();
      }).then(data => {

        let id_rodada = data.id_rodada
        localStorage.setItem('id_rodada', id_rodada)


        let check = document.getElementsByClassName("switch_4")
        let players = []

        for (let i = 0; i < playes; i++) {

          if (check[i].checked == true) {

            players.push(check[i].value)
            let ranking = {
              id_semanal: id_semanal,
              pontos: 0,
              id_player: check[i].value
            }
            fetch('http://localhost:8000/semanal/ranking', {
              method: 'POST',
              headers:
                { "content-type": "application/json" },
              body: JSON.stringify(ranking)

            }).then(result => {

            })
          }

        }


        var nums = players,
          ranNums = [],
          i = nums.length,
          j = 0;

        while (i--) {
          j = Math.floor(Math.random() * (i + 1));
          ranNums.push(nums[j]);
          nums.splice(j, 1);
        }

        for (let i = 0; i = ranNums.length;) {

          let player_1 = ranNums.slice(0, 1)
          let player_2 = ranNums.slice(1, 2)

          let player = {}
          player.player_1 = player_1
          player.player_2 = player_2

          player.round_status = 1
          if (player.player_2 == '') {
            player.player_2 = 11
          }
          player.id_semanal = id_semanal;
          player.id_rodada = id_rodada


          fetch('http://localhost:8000/matchs', {
            method: 'POST',
            headers:
              { "content-type": "application/json" },
            body: JSON.stringify(player)

          }).then(result => {

          })

          ranNums = ranNums.slice(2)

        }
      })




      location.assign('/matchs/2')


    })





  }

}

function new_round() {

  let check = document.getElementsByClassName("switch_4")

  let playes = localStorage.getItem('quantidade_players')



  const atualizar = []
  let winners = []
  let totalcomplete = 0


  for (let i = 0; i < playes; i++) {
    if (check[i].checked == true) {

      winners.push(check[i].value)

    }

  }


  for (let i = 0; i < winners.length; i++) {

    fetch('http://localhost:8000/semanal/player/' + winners[i], {
      method: 'GET'
    }).then(result => {
      return result.json();
    }).then(data => {

      let att = {
        id_semanal: localStorage.getItem('id_semanal'),
        pontos: data.tipos[0].pontos + 3,
        id_player: winners[i]
      }

      atualizar.push(att)
      totalcomplete += 1

      if (totalcomplete >= winners.length) {
        atualizarRank(atualizar)

      }

    })
  }

  empates()



}

function empates() {

  let playes = localStorage.getItem('quantidade_players')
  let draw = document.getElementsByClassName("draw")
  let draws = []
  let playes_draws = playes / 2
  const atualizar = []
  let totalcomplete = 0
  for (let i = 0; i < playes_draws; i++) {
    if (draw[i].checked == true) {

      let player_1 = draw[i].value.slice(0, 1)
      let player_2 = draw[i].value.slice(2, 3)
      draws.push(player_1)
      draws.push(player_2)
    }
  }
  for (let i = 0; i < draws.length; i++) {
    fetch('http://localhost:8000/semanal/player/' + draws[i], {
      method: 'GET'
    }).then(result => {
      return result.json();
    }).then(data => {


      let att = {
        id_semanal: localStorage.getItem('id_semanal'),
        pontos: data.tipos[0].pontos + 1,
        id_player: draws[i]
      }

      atualizar.push(att)
      totalcomplete += 1
      if (totalcomplete >= draws.length) {

        atualizarRank(atualizar)

      }

    })
  }
}

function atualizarRank(atualizar) {

  let terminou = 0
  for (let i = 0; i < atualizar.length; i++) {

    fetch('http://localhost:8000/semanal/atualizar/' + atualizar[i].id_player + '/' + atualizar[i].pontos + '/' + localStorage.getItem('id_semanal'), {
      method: 'PATCH',
      headers: { "content-type": "application/json" }
    }).then(result => {
      return result.json();
    }).then(data => {
      terminou += 1
      if (terminou >= atualizar.length) {
        gerar_partida()
      }
    })



  }

}

function gerar_partida() {


  const d = new Date();
  let text = d.toLocaleString();
  let rodada = {
    id_semanal: localStorage.getItem('id_semanal'),
    inicio_partida: text
  }

  fetch('http://localhost:8000/matchs/rodada', {
    method: 'POST',
    headers:
      { "content-type": "application/json" },
    body: JSON.stringify(rodada)

  }).then(result => {
    return result.json();
  }).then(data => {

    let id_rodada = data.id_rodada
    localStorage.setItem('id_rodada', id_rodada)


    fetch('http://localhost:8000/semanal/ranked/' + localStorage.getItem('id_semanal'), {
      method: 'GET'
    }).then(result => {
      return result.json();
    }).then(data => {

      let o = 1
      let terminou = 0
      let legunt = data.tipos.length
      let player_1 = ''
      let player_2 = ''
      for (let i = 0; i < data.tipos.length; i += 2) {
        try {
          player_1 = data.tipos[i].id_player

          player_2 = data.tipos[o].id_player

        } catch (error) {
          player_2 = 11
        }

        o += 2
        let player = {}
        player.player_1 = player_1
        player.player_2 = player_2
        player.round_status = 1
        player.id_semanal = localStorage.getItem('id_semanal');
        player.id_rodada = id_rodada


        fetch('http://localhost:8000/matchs', {
          method: 'POST',
          headers:
            { "content-type": "application/json" },
          body: JSON.stringify(player)

        }).then(result => {
          return result.json();
        }).then(data => {
          terminou += 2

          if (terminou >= legunt) {
            myVar = setTimeout(function () { window.location.href = "/matchs/2"; }, 1500);
          }
        })

      }
    })

  })



}

function cadastrarPlayer() {
  let url = window.location.href;


  let player = {}

  player.id_semestral = url.replace("http://localhost:8000/player/", "");
  player.player = document.getElementById('nome').value
  player.deck = document.getElementById('deck').value
  player.cidade = document.getElementById('cidade').value

  fetch('http://localhost:8000/player', {
    method: 'POST',
    headers:
      { "content-type": "application/json" },
    body: JSON.stringify(player)

  }).then(result => {
    if (result.ok) {
      alert('Registrado com sucesso')
      fetch('http://localhost:8000/player/buscar/' + player.id_semestral, {
        method: 'GET'
      }).then(result => {
        return result.json();
      }).then(data => {

        for (let i = 0; i < data.tipos.length; i++) {
          let ranking = {
            pontos: 0,
            id_player: data.tipos[i].id_player,
            id_rank: 1

          }
          fetch('http://localhost:8000/ranking/ranker', {
            method: 'POST',
            headers:
              { "content-type": "application/json" },
            body: JSON.stringify(ranking)

          }).then(result => {
            myVar = setTimeout(function () { window.location.href = "/"; }, 2500);
          })


        }
      })



      return result.json()
    } else {

      alert('Ja existe player com esse nome')
    }

  })



}

function atualizarPlayer() {
  let url = window.location.href;


  let player = {}

  player.id_semestral = url.replace("http://localhost:8000/player/", "");
  player.player = document.getElementById('nome').value
  player.deck = document.getElementById('deck').value
  player.cidade = document.getElementById('cidade').value

  fetch('http://localhost:8000/player/atualizar/' + player.deck + '/' + player.player + '/' + player.id_semestral, {
    method: 'PATCH',
    headers: { "content-type": "application/json" }
  }).then(result => {
    return result.json();
  }).then(data => {
    myVar = setTimeout(function () { window.location.href = "/"; }, 2500);
  })
}

function semestral() {
  location.assign('/semestral')
}


function login() {
  location.assign('/login')
}


function start_semanal(semestral) {
  localStorage.setItem('semestral', semestral)
  location.assign('/semanal')
}


function cadastrarSemestral() {
  let semestral = {}

  semestral.semestral = document.getElementById('nome').value
  semestral.id_organizador = localStorage.getItem('id_organizador')
  semestral.status = 1

  fetch('http://localhost:8000/semestral', {
    method: 'POST',
    headers:
      { "content-type": "application/json" },
    body: JSON.stringify(semestral)

  }).then(result => {
    return result.json();
  }).then(data => {
    alert('Registrado com sucesso')
    myVar = setTimeout(function () { window.location.href = "/organizador"; }, 2500);

  });

}

function load_semestral() {

  fetch('http://localhost:8000/semestral/' + localStorage.getItem('id_organizador'), {
    method: 'GET'
  }).then(result => {
    return result.json();
  }).then(data => {

    for (let i = 0; i < data.tipos.length; i++) {

      let novatabelinha = document.createElement("button");
      document.getElementById("main-start").appendChild(novatabelinha);
      novatabelinha.innerHTML = data.tipos[i].semestral

      novatabelinha.addEventListener("click", function () {
        start_semanal(data.tipos[i].id_semestral)
      });

    }



  })
}
function logar() {
  let user = {
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value
  };
  fetch('http://localhost:8000/register/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `${localStorage.getItem("ourToken")}`

    },
    body: JSON.stringify(user)
  }).then(result => {
    if (result.ok) {


      return result.json()
    } else {
      alert('Email ou senha incorreto')


    }
  }).then(data => {


    if (data != undefined) {

      localStorage.setItem('ourToken', data.token)
      localStorage.setItem('id_organizador', data.usuario)
      myVar = setTimeout(function () { window.location.href = "/organizador"; }, 2500);
    }
  });

}
function cadastrarOrganizador() {
  let organizador = {}
  organizador.nome_organizador = document.getElementById('nome').value
  organizador.email_organizador = document.getElementById('email').value
  organizador.senha = document.getElementById('senha').value



  fetch('http://localhost:8000/register', {
    method: 'POST',
    headers:
      { "content-type": "application/json" },
    body: JSON.stringify(organizador)

  }).then(result => {
    return result.json();
  }).then(data => {
    alert('Registrado com sucesso')
    myVar = setTimeout(function () { window.location.href = "/"; }, 2500);

  });

}

function load_round() {

  fetch('http://localhost:8000/matchs/rodadas/' + localStorage.getItem('id_rodada') + "/" + localStorage.getItem('id_semanal'), {
    method: 'GET'
  }).then(result => {
    return result.json();
  }).then(data => {

    let quantidade = 2 * data.tipos.length
    localStorage.setItem('quantidade_players', quantidade)
    let id_rounds = data
    for (let i = 0; i < data.tipos.length; i++) {
      id_rounds = data.tipos[i].id_rounds
      let id_player_1 = data.tipos[i].player_1
      let id_player_2 = data.tipos[i].player_2

      fetch('http://localhost:8000/player/round/' + id_player_1, {
        method: 'GET'
      }).then(result => {
        return result.json();
      }).then(data => {

        let duelista_1 = data.tipos[0].player

        fetch('http://localhost:8000/player/round/' + id_player_2, {
          method: 'GET'
        }).then(result => {
          return result.json();
        }).then(data => {
          listarDuelos(id_player_1, id_player_2, duelista_1, data.tipos[0].player, id_rounds)





        })

      })





    }


  })
}
function listarDuelos(id_player_1, id_player_2, nome_player_1, nome_player_2, id_rounds) {
  let cardapio = document.createElement('div')
  cardapio.classList.add('div-cadastrado')
  cardapio.classList.add('bounceIn')

  // cardapio.setAttribute("onclick", "(" + data.tipos[i]. + ")");
  cardapio.setAttribute("id", "rodada" + id_rounds);
  cardapio.innerHTML = `  <div class="player">
  <input class="switch_4" type="checkbox" value="${id_player_1}">
  <span id="player1">${nome_player_1}   
  </span>
  

  <img src="/img/marca-x.png" id="x">
  <span id="player2">${nome_player_2}</span>
  <input class="switch_4" type="checkbox" id="check2" value="${id_player_2}">
  <span id="draw">Draw </span>
  <input class="draw" type="checkbox" value="${id_player_1}/${id_player_2}">

</div>`

  document.getElementById("main-start").appendChild(cardapio)
}
function load_rank() {

  fetch('http://localhost:8000/semanal/ranked/' + localStorage.getItem('id_semanal'), {
    method: 'GET'
  }).then(result => {
    return result.json();
  }).then(data => {

    let pontos = data.tipos
    let o = 2
    for (let i = 0; i < data.tipos.length; i++) {
      let player = data.tipos[i].id_player
      fetch('http://localhost:8000/player/rank/' + player, {
        method: 'GET'
      }).then(result => {
        return result.json();
      }).then(data => {

        let jogador = data.tipos[0].player
        let points = pontos[i].pontos
        let novatabelinha = document.createElement("tr");
        document.getElementById("tabela").appendChild(novatabelinha);

        novatabelinha.addEventListener("click", function () {
          ranking_pessoal()
        });
        if (i == 0) {

          document.getElementById('nome_rank').innerHTML = `${jogador}`
          document.getElementById('pts').innerHTML = `${points} pts. <img class="gold-medal" src="/img/distintivo.png" alt="gold medal"/>`
        } else {


          novatabelinha.innerHTML = ` 
            <td class="number">${o}</td>
            <td class="name">${jogador}</td>
            <td class="points">${points} pts.</td>`
          o++
        }




      })
    }

  })


}

function exit() {
  location.assign('/')
}

function load_ranking(){

  let url = window.location.href;


  

  rank = url.replace("http://localhost:8000/ranking/", "");
  fetch('http://localhost:8000/ranking/ranked/' + rank, {
    method: 'GET'
  }).then(result => {
    return result.json();
  }).then(data => {

    let pontos = data.tipos
    let o = 2
    for (let i = 0; i < data.tipos.length; i++) {
      let player = data.tipos[i].id_player
      if(player != 11){
        fetch('http://localhost:8000/player/rank/' + player, {
          method: 'GET'
        }).then(result => {
          return result.json();
        }).then(data => {
  
          let jogador = data.tipos[0].player
          let points = pontos[i].pontos
          let novatabelinha = document.createElement("tr");
          document.getElementById("tabela").appendChild(novatabelinha);
  
          novatabelinha.addEventListener("click", function () {
            ranking_pessoal()
          });
          if (i == 0) {
  
            document.getElementById('nome_rank').innerHTML = `${jogador}`
            document.getElementById('pts').innerHTML = `${points} pts. <img class="gold-medal" src="/img/distintivo.png" alt="gold medal"/>`
          } else {
  
  
            novatabelinha.innerHTML = ` 
              <td class="number">${o}</td>
              <td class="name">${jogador}</td>
              <td class="points">${points} pts.</td>`
            o++
          }
  
  
  
  
        })
      }
      }


  })

}

function end_ranking() {
  fetch('http://localhost:8000/semanal/ranked/' + localStorage.getItem('id_semanal'), {
    method: 'GET'
  }).then(result => {
    return result.json();
  }).then(data => {
    console.log(data)
    let semanal = data
    fetch('http://localhost:8000/ranking/ranked/' + 1, {
      method: 'GET'
    }).then(result => {
      return result.json();
    }).then(data => {
      let rank = data
      
      let o = 0
      for (let i = 0; i < rank.tipos.length; i++) {
        try {

          if (rank.tipos[i].id_player == semanal.tipos[o].id_player) {

            let points = rank.tipos[i].pontos + semanal.tipos[o].pontos
            fetch('http://localhost:8000/ranking/atualizar/' + semanal.tipos[i].id_player + '/' + points, {
              method: 'PATCH',
              headers: { "content-type": "application/json" }
            }).then(result => {
              return result.json();
            }).then(data => {
              

            })
            i = 0
            o++

          }
        } catch (error) {
          alert('Semanal finalizado')
          myVar = setTimeout(function () { window.location.href = "/ranking"; }, 2500);

        }


      }


    })


  })

}


/*fetch('http://localhost:8000/matchs/rodadas/' + localStorage.getItem('id_rodada') + "/" + localStorage.getItem('id_semanal') , {
    method: 'GET'
  }).then(result => {
    return result.json();
  }).then(data => {
    console.log(data)
    let id_rounds = data
    for (let i = 0; i < data.tipos.length; i++) {
      id_rounds = data.tipos[i].id_rounds
      console.log('opa')
    fetch('http://localhost:8000/player/round/' + data.tipos[i].player_1 + "/" + data.tipos[i].player_2 , {
      method: 'GET'
    }).then(result => {
      return result.json();
    }).then(data => {
    
      while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
      }

    })
    


    }


  })*/

/*const d = new Date();
 let text = d.toLocaleString();
let rodada = {
   id_semanal: localStorage.getItem('id_semanal'),
   inicio_partida: text
} 
fetch('http://localhost:8000/matchs/rodada', {
  method: 'POST',
  headers:
    { "content-type": "application/json" },
  body: JSON.stringify(rodada)

}).then(result => {
  
})*/